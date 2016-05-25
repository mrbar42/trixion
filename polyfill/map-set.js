'use strict';

/* eslint-disable */

(function (global) {
  "use strict";

  var random = Math.random,
      unique = 0,
      globalWMKey = "gwm" + random(),
      internalKey = {},
      hasOwnProp = Object.prototype.hasOwnProperty,
      defineProperty = Object.defineProperty,
      defineProperties = Object.defineProperties,
      enumFalse = {
    enumerable: false
  };

  function WeakMap() {
    if (this instanceof WeakMap) {
      defineProperty(this, "__wm__", {
        value: {}
      });
      this.clear();
    } else {
      return new WeakMap();
    }
  }

  WeakMap.prototype = {
    clear: function clear() {
      var wm = this.__wm__;
      wm.key = "c" + random() + unique++;
      wm.keys = [];
      wm.values = [];
    },
    get: function get(key) {
      return weakMapHelper(this, key);
    },
    set: function set(key, value) {
      var i,
          wm = this.__wm__,
          keys = wm.keys,
          values = wm.values,
          wmObj = getCollObj(key, 1);
      if (!wmObj) {
        i = keys.indexOf(key);
        if (i < 0) {
          keys.push(key);
          values.push(value);
        } else {
          values[i] = value;
        }
      } else {
        wmObj[wm.key] = value;
      }
    },
    has: function has(key) {
      return weakMapHelper(this, key, internalKey) !== internalKey;
    },
    delete: function _delete(key) {
      var i,
          wm = this.__wm__,
          keys = wm.keys,
          wmObj = getCollObj(key);
      if (!wmObj) {
        i = keys.indexOf(key);
        if (i >= 0) {
          keys.splice(i, 1);
          wm.values.splice(i, 1);
          return true;
        }
      } else if (wmObj[wm.key]) {
        delete wmObj[wm.key];
        return true;
      }
      return false;
    }
  };

  defineProperties(WeakMap.prototype, {
    clear: enumFalse,
    get: enumFalse,
    set: enumFalse,
    has: enumFalse,
    delete: enumFalse
  });

  function weakMapHelper(wm, o, defaultValue) {
    wm = wm.__wm__;
    var i,
        key = wm.key,
        wmObj = getCollObj(o);
    if (!wmObj) {
      i = wm.keys.indexOf(o);
      return i < 0 ? defaultValue : wm.values[i];
    }
    return wmObj && key in wmObj ? wmObj[key] : defaultValue;
  }

  function getCollObj(o, create) {
    var get,
        _get,
        set,
        con,
        desc = Object.getOwnPropertyDescriptor(o, "constructor");
    if (desc && hasOwnProp.call(desc, "get")) {
      get = _get = desc.get;
      set = desc.set;
      if (hasOwnProp.call(get, globalWMKey)) {
        return get[globalWMKey];
      }
    }
    if (create && !(Object.isSealed(o) || desc && !desc.configurable)) {
      if (get) {
        get = get.bind();
        Object.getOwnPropertyNames(_get).forEach(function (key) {
          get[key] = _get[key];
        });
      } else {
        con = o.constructor;
        get = function get() {
          return con;
        };
        set = function set(newCon) {
          con = newCon;
        };
      }
      defineProperty(o, "constructor", {
        get: get,
        set: set
      });
      return get[globalWMKey] = Object.create(null);
    }
  }

  function Map() {
    if (this instanceof Map) {
      defineProperty(this, "__wm__", {
        value: {}
      });
      this.clear();
    } else {
      return new Map();
    }
  }

  Map.prototype = {
    clear: function clear() {
      WeakMap.prototype.clear.call(this);
      var wm = this.__wm__;
      wm._keys = [];
      wm._values = [];
      wm.primitives = {};
    },
    get: function get(key) {
      var wm = this.__wm__;
      return wm._values[mapGetHelper(this, wm, key)];
    },
    set: function set(key, value) {
      var wm = this.__wm__,
          i = mapGetHelper(this, wm, key);
      if (i == void 0) {
        i = wm._keys.push(key) - 1;
        mapSetHelper(this, wm, key, i);
      }
      wm._values[i] = value;
    },
    has: function has(key) {
      return mapGetHelper(this, this.__wm__, key) != void 0;
    },
    delete: function _delete(key) {
      var wm = this.__wm__,
          i = mapGetHelper(this, wm, key);
      if (i != void 0) {
        mapSetHelper(this, wm, key, undefined);
        delete wm._keys[i];
        delete wm._values[i];
        return true;
      }
      return false;
    },
    forEach: function forEach(callback, thisArg) {
      var wm = this.__wm__;
      wm._keys.forEach(function (key, i) {
        callback.call(thisArg, wm._values[i], key, this);
      }, this);
    },
    get size() {
      return Object.keys(this.__wm__._keys).length;
    }
  };

  function mapGetHelper(that, wm, key) {
    if (Object(key) !== key) {
      //primitive
      return (1 / key == -Infinity ? wm : wm.primitives)[key];
    }
    return WeakMap.prototype.get.call(that, key);
  }

  function mapSetHelper(that, wm, key, i) {
    if (Object(key) !== key) {
      //primitive
      return (1 / key == -Infinity ? wm : wm.primitives)[key] = i;
    }
    return WeakMap.prototype.set.call(that, key, i);
  }

  defineProperties(Map.prototype, {
    clear: enumFalse,
    get: enumFalse,
    set: enumFalse,
    has: enumFalse,
    delete: enumFalse,
    forEach: enumFalse,
    size: enumFalse
  });

  function Set() {
    if (this instanceof Set) {
      defineProperty(this, "__wm__", {
        value: {}
      });
      this.clear();
    } else {
      return new Set();
    }
  }

  Set.prototype = {
    add: function add(item) {
      var wm = this.__wm__,
          map = this.__wm__.map;
      if (!map.has(item)) {
        map.set(item, wm.values.push(item) - 1);
      }
    },
    delete: function _delete(item) {
      var wm = this.__wm__,
          map = this.__wm__.map,
          i = map.get(item);
      if (i >= 0) {
        map.delete(item);
        wm.values.splice(i, 1);
        return true;
      }
      return false;
    },
    has: function has(item) {
      return this.__wm__.map.has(item);
    },
    clear: function clear() {
      var wm = this.__wm__;
      wm.values = [];
      wm.map = new Map();
    },
    forEach: function forEach(callback, thisArg) {
      var i = 0,
          values = this.__wm__.values;
      while (i < values.length) {
        callback.call(thisArg, values[i++], this);
      }
    },
    get size() {
      return this.__wm__.values.length;
    }
  };

  defineProperties(Set.prototype, {
    clear: enumFalse,
    add: enumFalse,
    has: enumFalse,
    delete: enumFalse,
    forEach: enumFalse,
    size: enumFalse
  });

  if (!global.WeakMap) {
    global.WeakMap = WeakMap.bind();
  }

  if (!global.Map) {
    global.Map = Map.bind();
  }

  if (!global.Set) {
    global.Set = Set.bind();
  }
})(typeof window != 'undefined' && window || typeof self != 'undefined' && self || undefined || {});