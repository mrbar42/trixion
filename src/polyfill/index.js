'use strict';

import {polyfill as setImmediatePolyfill} from './set-immediate';

export default polyfill;
export function polyfill(list, cb) {
  if (!list || !list.length) return cb();

  let pending = 0;
  let completed = 0;
  let missing = [];
  for (let i = 0; i < list.length; i++) {
    let [isMissing, polyfillEnv] = list[i];

    if (isMissing()) {
      pending++;
      // delay execution to avoid premature ending of function
      missing.push(polyfillEnv);
    }
  }

  if (!missing.length) return cb();

  while (missing.length) missing.shift()(() => ++completed == pending && cb());
}

polyfill.Promise = [
  () => typeof Promise == 'undefined' || !Promise.resolve,
  cb => require.ensure([], require => cb(require('./promise')), 'polyfill/es6')
];

polyfill.BASE64 = [
  () => !window.btoa || !window.atob,
  cb => require.ensure([], require => cb(require('./base64')), 'polyfill/base64')
];

polyfill.Storage = [
  () => !window.localStorage || !window.sessionStorage,
  cb => require.ensure([], require => cb(require('./storage')), 'polyfill/storage')
];

polyfill.RequestAnimationFrame = [
  () => !window.requestAnimationFrame || !window.cancelAnimationFrame,
  cb => require.ensure([], require => cb(require('./request-animation-frame')), 'polyfill/raf')
];

polyfill.JSON = [
  () => typeof JSON == 'undefined' || !JSON.stringify || !JSON.parse,
  cb => require.ensure([], require => cb(require('./json')), 'polyfill/es5')
];

polyfill.SetImmediate = [
  () => !window.setImmediate,
  cb => cb(setImmediatePolyfill())
];

polyfill.ES5 = [
  () => {
    let array = [
      'Object.getOwnPropertyNames',
      'Object.create',
      'Object.getPrototypeOf',
      'Object.defineProperty',
      'Object.defineProperties',
      'Object.keys',
      'Function.prototype.bind',
      'Array.isArray',
      'Array.prototype.indexOf',
      'Array.prototype.lastIndexOf',
      'Array.prototype.every',
      'Array.prototype.some',
      'Array.prototype.forEach',
      'Array.prototype.map',
      'Array.prototype.filter',
      'Array.prototype.reduce',
      'Array.prototype.reduceRight',
      'String.prototype.trim',
      'Date.now',
      'Date.prototype.toISOString'
    ];
    let i = 0;
    let l = array.length - 1;
    while (i++ < l) if (!dotNotation(window, array[i])) return true;
  },
  cb => require.ensure([], require => cb(require('./es5')), 'polyfill/es5')
];

polyfill.ObjectAssign = [
  () => typeof Object.assign != 'function',
  cb => {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      let output = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        let source = arguments[index];
        if (source !== undefined && source !== null) {
          for (let nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
    cb();
  }
];

polyfill.MapSet = [
  () => {
    let arr = ['Map', 'Set', 'WeakMap'];
    while (arr.length) if (typeof window[arr.shift()] == 'undefined') return true;
  },
  cb => require.ensure([], require => cb(require('./map-set')), 'polyfill/map-set')
];

export const MODERN_2016 = [
  polyfill.ES5,
  polyfill.JSON,
  polyfill.Storage,
  polyfill.BASE64,
  polyfill.RequestAnimationFrame,
  polyfill.SetImmediate,
  polyfill.Promise,
  polyfill.ObjectAssign,
  polyfill.MapSet
];

/**
 * Iterates into object using dot notation path
 * @param {Object|Function} root
 * @param {String} path
 * @returns {*}
 */
export function dotNotation(root, path) {
  let subArray = path.split('.');

  let target = root;
  for (let i = 0; i < subArray.length; i++) {
    if (!target[subArray[i]]) return;
    target = target[subArray[i]];
  }

  return target;
}
