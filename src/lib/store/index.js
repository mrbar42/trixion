'use strict';

import {setImmediate, clearImmediate} from '../../polyfill/set-immediate';
import {assign} from '../utils';

const ROOT_PATH = "@@ROOT_PATH@@";
const BOOT_ACTION = "@@BOOT_ACTION@@";
const listeners = Object.create(null);
//noinspection JSUnresolvedVariable
const DEBUG = process.env.NODE_ENV != 'production';
let state = {};
let pendingUpdates = null;
let booted;
let _reducers = [];

/**
 * United dispatch/store function.
 * dispatch is async due to batching
 * @param {String|Object} [path]
 * @param {Object} [action]
 *
 * Example:
 * # set initial state
 * store('boot', {});
 *
 *  # get state:
 *  let state = store();
 *
 *  # dispatch using reducers tree
 *  // before { dot: { notation: { object: 'existing value', other: 'value' } } }
 *  store('dot.notation', {object: 'to merge in the given path'})
 *  // after { dot: { notation: { object: 'to merge in the given path', other: 'value' } } }
 *
 *  # plain action dispatch
 *  addReducer(action => {
 *    switch () {
 *    }
 *  })
 *  store({type: 'MY_ACTION', payload: {my: 'data'}})
 *
 */
export function store(path, action) {
  return dispatch(path, action);
}
export default store;

store.subscribe = function (path, listener) {
  return subscriber(path, listener);
};

store.unsubscribe = function (path, listener) {
  return subscriber(path, listener, true);
};

store.forceUpdate = function () {
  for (let path in listeners) {
    //noinspection JSUnfilteredForInLoop
    invokeListeners(listeners[path], [state]);
  }
};

store.getState = function () {
  return store();
};

export function addReducer(path, reducer) {
  if (typeof path == 'function') {
    reducer = path;
    path = null;
  }

  if (path && typeof path != 'string' || !reducer) {
    throw new Error("Wrong input to addReducer - expects optional string path and reducer function");
  }

  let addItem = () => {
    let reducerItem = {
      path: path || '',
      reducer
    };
    // get initial state
    invokeReducers([reducerItem], state, {type: BOOT_ACTION});

    _reducers.push(reducerItem);
  };

  // if not booted allow boot to propagate first
  if (booted) addItem();
  else setImmediate(addItem);

  return {
    destroy() {
      if (booted) removeReducer(path, reducer);
      else setImmediate(removeReducer, path, reducer);
    }
  };
}

export function removeReducer(path, reducer) {
  if (typeof path == 'function') {
    reducer = path;
    path = null;
  }

  let index = _reducers.indexOf(reducer);
  if (index !== -1) {
    _reducers.splice(index, 1);
  }
}

// ------------- Internals -------------

setImmediate(() => setImmediate(() => setImmediate(() => booted = true)));

function invokeReducers(reducers, data, action) {
  let reduce = () => reducers
    .reduce((changed, reducerItem) => {
      // get section by path
      let [dataSection, parent, prop] = getDeepPath(reducerItem.path, data);
      // invoke reducer on specific path
      let retVal = reducerItem.reducer(dataSection, action);
      let [didChange, result] = assignRecursive(dataSection, retVal);
      if (didChange && parent) {
        parent[prop] = result;
      }
      return didChange || changed;
    }, false);

  if (booted) return reduce();
  return setImmediate(reduce);
}

function getDeepPath(path, rootObj) {
  if (!path) return [rootObj];
  let paths = path.split('.');
  let parent;
  let prop;
  let target = rootObj;
  let l = paths.length;
  let i = 0;
  // creating missing object dynamically
  while (i < l) {

    let p = paths[i];
    //console.log("dispatching to path", i, p);
    if (!target[p]) {
      target[p] = {};
    }
    // store reference to the parent to allow override
    parent = target;
    prop = p;
    target = target[p];
    i++;
  }

  return [target, parent, prop];
}

function dispatch(path, action) {
  if (path === void 0) {
    return DEBUG ? deepFreeze(state) : state;
  }
  else if (typeof path == 'string' && action === void 0) {
    let [statePath] = getDeepPath(path, state)[0];
    return DEBUG ? deepFreeze(statePath) : statePath;
  }

  //console.log("DISPATCH", path, action, new Error().stack);
  let normalizedAction;
  if (isObj(path)) {
    normalizedAction = path;
  }
  else {
    normalizedAction = {
      type: path,
      payload: action
    };
  }

  let changed;
  if (typeof path == 'string') {
    if (!isObj(action)) throw new Error("Can't use tree update without valid data (expects Object)");
    let parent;
    let prop;
    let target;
    if (path == 'boot') {
      target = state;
      booted = true;
    }
    else {
      // get deep path from dot notation - creates children implicitly
      [target, parent, prop] = getDeepPath(path, state);
    }
    let [didChanged, result] = assignRecursive(target, action) || changed;
    if (didChanged && parent) {
      parent[prop] = result;
    }

    changed = changed || didChanged;
  }
  else {
    path = '';
    changed = invokeReducers(_reducers, state, normalizedAction) || changed;
  }

  // console.log("PROCESSED DISPATCH changed?", !!changed);
  if (changed) {
    state = assign({}, state);
    updateSubscribers(path);
  }
}

function updateSubscribers(path) {
  let key = path || ROOT_PATH;
  // console.log("adding subscribers to que update on path", key);
  if (pendingUpdates) {
    pendingUpdates.add(key);
    return;
  }

  pendingUpdates = new Set();
  pendingUpdates.add(key);
  setImmediate(() => {
    // console.log("INVOKING QUE of subscribers");
    let rootInvoked;
    let newState = state;
    if (DEBUG) {
      newState = deepFreeze(newState);
    }

    let list = pendingUpdates;
    pendingUpdates = null;
    // shared track of invoked listeners for all paths to avoid multi calls to same invoker
    let invokedListeners = new Set();
    for (let paths of list.values()) {
      paths = paths.split('.');
      while (paths.length) {
        let path = paths.join('.');
        // track invocation of root path
        if (path == ROOT_PATH) rootInvoked = true;
        // console.log("invoking listeners for path", path, listeners[path] && listeners[path].size);
        invokeListeners(listeners[path], [newState], invokedListeners);
        paths.pop();
      }
    }

    if (!rootInvoked) {
      //console.log("invoking listeners for ROOT_PATH", listeners[ROOT_PATH] && listeners[ROOT_PATH].size);
      invokeListeners(listeners[ROOT_PATH], [newState], invokedListeners);
    }
  });
}

function subscriber(path, listener, remove) {
  if (!path) throw new Error("listener must be provided");
  if (typeof path == 'function') {
    listener = path;
    path = ROOT_PATH;
  }

  if (!listeners[path]) {
    listeners[path] = new Set();
  }

  if (remove) {
    listeners[path].delete(listener);
    if (!listeners[path].size) {
      delete listeners[path];
    }
  }
  else {
    listeners[path].add(listener);
  }

  return !remove && {
      unsubscribe() {
        subscriber(path, listener, true);
      }
    };
}

function invokeListeners(listeners, args, invokedListeners) {
  invokedListeners = invokedListeners || new Set();
  if (!listeners) return;
  for (let listener of listeners.values()) {
    // don't call same listener more than once in a single round
    if (invokedListeners.has(listener)) continue;
    invokedListeners.add(listener);

    listener.apply(null, args);
  }
}

function assignRecursive(base, obj, seen) {
  seen = seen || [];
  // completely empty object
  if (obj === null) return [true, {}];

  if (!isObj(obj)) return [false];
  let changed = false;
  for (let p in obj) {
    if (!obj.hasOwnProperty(p)) continue;

    //console.log(`--- assigning`, p,
    //  Array.isArray(base[p]) ? 'array' : (base[p] !== undefined && typeof base[p] || base[p]), base[p],
    //  Array.isArray(obj[p]) ? 'array' : (obj[p] !== undefined && typeof obj[p] || obj[p]), obj[p]
    //);
    if (isObj(obj[p]) && isObj(base[p])) {
      if (seen.indexOf(obj[p]) > -1) throw new Error("Circular object can't be part of the state tree");
      seen.push(obj[p]);
      let [childChanged, result] = assignRecursive(base[p], obj[p], seen);
      if (childChanged) {
        // changed
        base[p] = result;
        changed = true;
      }
      // remove dangling empty objects
      if (!Object.keys(base[p]).length) {
        delete base[p];
      }
    }
    else if (obj[p] === null) {
      delete base[p];
      changed = true;
    }
    else if (base[p] !== obj[p]) {
      base[p] = obj[p];
      changed = true;
    }
  }

  if (changed) base = assign({}, base);

  return [changed, base];
}

function deepFreeze(obj) {
  if (Array.isArray(obj)) return obj.map(deepFreeze);
  if (!isObj(obj)) return obj;

  let target = {};

  for (let p in obj) {
    if (!obj.hasOwnProperty(p)) continue;
    target[p] = deepFreeze(obj[p]);
  }

  return Object.freeze(target);
}

function isObj(obj) {
  return Object.prototype.toString.call(obj) == '[object Object]';
}
