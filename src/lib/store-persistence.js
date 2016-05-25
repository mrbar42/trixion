'use strict';

import {store} from './store';
import {persistentStore, sessionStore, onStorageChange} from './storage';

/**
 * state persistence module
 * @example
 * attachPersistence('storage', store);
 * attachSessionPersistence('session', store);
 */


export function attachSessionPersistence(path, options = {}) {
  if (!path) throw new Error("A string path must be provided as first argument. e.g. 'session'");
  const STORAGE_KEY = options.key || 'state';

  // load session state
  let sessionState = sessionStore.getItem(STORAGE_KEY);
  if (isNonEmptyObj(sessionState)) store(path, sessionState);
  // subscribe to store changes
  store.subscribe(path, state => sessionStore.setItem(STORAGE_KEY, state.session));
}


export default attachPersistence;
export function attachPersistence(path, options = {}) {
  if (!path) throw new Error("A string path must be provided as first argument. e.g. 'persistent'");
  const STORAGE_KEY = options.key || 'state';

  // load persistent state
  let persistentState = persistentStore.getItem(STORAGE_KEY);
  if (isNonEmptyObj(persistentState)) store(STORAGE_KEY, persistentState);
  // listen to persistent data changes
  onStorageChange(STORAGE_KEY, persistentState => store(path, persistentState));
  // subscribe to store changes
  store.subscribe(path, state => persistentStore.setItem(STORAGE_KEY, state.persistent));
}

function isNonEmptyObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]' &&
    Object.keys(obj).length;
}
