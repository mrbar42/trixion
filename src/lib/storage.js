'use strict';

function sessionGet(key) {
  if (!window.sessionStorage) return null;
  try {
    return JSON.parse(window.sessionStorage.getItem(key));
  } catch (e) {
    window.sessionStorage.removeItem(key);
    return null;
  }

}
function sessionSet(key, value) {
  if (!window.sessionStorage) return;

  window.sessionStorage.setItem(key, JSON.stringify(value));
}

export const sessionStore = {
  getItem: sessionGet,
  setItem: sessionSet
};

function persistentGet(key) {
  if (!window.localStorage) return null;

  return JSON.parse(window.localStorage.getItem(key));
}
function persistentSet(key, value) {
  if (!window.localStorage) return;

  window.localStorage.setItem(key, JSON.stringify(value));
}

let listenersCache = new Map();

export function onStorageChange(key, listener) {
  if (window.localStorage) {
    // internal listener wrapper
    let eventListener = e => {
      if (e.key === null || e.key === key) {
        listener(persistentGet(key));
      }
    };

    // save listener to cache
    let obj = {};
    obj[key] = eventListener;
    listenersCache.set(listener, obj);

    // attach listener
    window.addEventListener('storage', eventListener);
  }
}
//noinspection JSUnusedGlobalSymbols
export function offStorageChange(key, listener) {
  let eventListeners = listenersCache.get(listener);
  if (eventListeners[key]) {
    // remove listener
    window.removeEventListener('storage', eventListeners[key]);
  }
}

export const persistentStore = {
  getItem: persistentGet,
  setItem: persistentSet
};
