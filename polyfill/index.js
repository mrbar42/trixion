'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODERN_2016 = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.polyfill = polyfill;
exports.dotNotation = dotNotation;

var _setImmediate = require('./set-immediate');

exports.default = polyfill;
function polyfill(list, cb) {
  if (!list || !list.length) return cb();

  var pending = 0;
  var completed = 0;
  var missing = [];
  for (var i = 0; i < list.length; i++) {
    var _list$i = _slicedToArray(list[i], 2);

    var isMissing = _list$i[0];
    var polyfillEnv = _list$i[1];


    if (isMissing()) {
      pending++;
      // delay execution to avoid premature ending of function
      missing.push(polyfillEnv);
    }
  }

  if (!missing.length) return cb();

  while (missing.length) {
    missing.shift()(function () {
      return ++completed == pending && cb();
    });
  }
}

polyfill.Promise = [function () {
  return typeof Promise == 'undefined' || !Promise.resolve;
}, function (cb) {
  return require.ensure([], function (require) {
    return cb(require('./promise'));
  }, 'polyfill/es6');
}];

polyfill.BASE64 = [function () {
  return !window.btoa || !window.atob;
}, function (cb) {
  return require.ensure([], function (require) {
    return cb(require('./base64'));
  }, 'polyfill/base64');
}];

polyfill.Storage = [function () {
  return !window.localStorage || !window.sessionStorage;
}, function (cb) {
  return require.ensure([], function (require) {
    return cb(require('./storage'));
  }, 'polyfill/storage');
}];

polyfill.RequestAnimationFrame = [function () {
  return !window.requestAnimationFrame || !window.cancelAnimationFrame;
}, function (cb) {
  return require.ensure([], function (require) {
    return cb(require('./request-animation-frame'));
  }, 'polyfill/raf');
}];

polyfill.JSON = [function () {
  return typeof JSON == 'undefined' || !JSON.stringify || !JSON.parse;
}, function (cb) {
  return require.ensure([], function (require) {
    return cb(require('./json'));
  }, 'polyfill/es5');
}];

polyfill.SetImmediate = [function () {
  return !window.setImmediate;
}, function (cb) {
  return cb((0, _setImmediate.polyfill)());
}];

polyfill.ES5 = [function () {
  var array = ['Object.getOwnPropertyNames', 'Object.create', 'Object.getPrototypeOf', 'Object.defineProperty', 'Object.defineProperties', 'Object.keys', 'Function.prototype.bind', 'Array.isArray', 'Array.prototype.indexOf', 'Array.prototype.lastIndexOf', 'Array.prototype.every', 'Array.prototype.some', 'Array.prototype.forEach', 'Array.prototype.map', 'Array.prototype.filter', 'Array.prototype.reduce', 'Array.prototype.reduceRight', 'String.prototype.trim', 'Date.now', 'Date.prototype.toISOString'];
  var i = 0;
  var l = array.length - 1;
  while (i++ < l) {
    if (!dotNotation(window, array[i])) return true;
  }
}, function (cb) {
  return require.ensure([], function (require) {
    return cb(require('./es5'));
  }, 'polyfill/es5');
}];

polyfill.ObjectAssign = [function () {
  return typeof Object.assign != 'function';
}, function (cb) {
  Object.assign = function (target) {
    'use strict';

    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }
    return output;
  };
  cb();
}];

polyfill.MapSet = [function () {
  var arr = ['Map', 'Set', 'WeakMap'];
  while (arr.length) {
    if (typeof window[arr.shift()] == 'undefined') return true;
  }
}, function (cb) {
  return require.ensure([], function (require) {
    return cb(require('./map-set'));
  }, 'polyfill/map-set');
}];

var MODERN_2016 = exports.MODERN_2016 = [polyfill.ES5, polyfill.JSON, polyfill.Storage, polyfill.BASE64, polyfill.RequestAnimationFrame, polyfill.SetImmediate, polyfill.Promise, polyfill.ObjectAssign, polyfill.MapSet];

/**
 * Iterates into object using dot notation path
 * @param {Object|Function} root
 * @param {String} path
 * @returns {*}
 */
function dotNotation(root, path) {
  var subArray = path.split('.');

  var target = root;
  for (var i = 0; i < subArray.length; i++) {
    if (!target[subArray[i]]) return;
    target = target[subArray[i]];
  }

  return target;
}