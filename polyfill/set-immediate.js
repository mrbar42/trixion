'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyfill = polyfill;
var setImmediate = exports.setImmediate = window.setImmediate || function () {
  var args = [];
  var i = -1;
  while (++i < arguments.length) {
    args[i] = arguments[i];
  } // add time argument
  args.splice(1, 0, 0);

  return setTimeout.apply(window, args);
};

var clearImmediate = exports.clearImmediate = window.clearImmediate || function (handle) {
  return clearTimeout(handle);
};

exports.default = setImmediate;
function polyfill() {
  window.setImmediate = setImmediate;
  window.clearImmediate = clearImmediate;
}