'use strict';

export const setImmediate = window.setImmediate || function () {
    let args = [];
    let i = -1;
    while (++i < arguments.length) args[i] = arguments[i];
    // add time argument
    args.splice(1, 0, 0);

    return setTimeout.apply(window, args);
  };

export const clearImmediate = window.clearImmediate || (handle => clearTimeout(handle));

export default setImmediate;

export function polyfill() {
  window.setImmediate = setImmediate;
  window.clearImmediate = clearImmediate;
}
