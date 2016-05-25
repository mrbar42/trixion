(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("trixion", [], factory);
	else if(typeof exports === 'object')
		exports["trixion"] = factory();
	else
		root["trixion"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* globals __DEV__ */
	'use strict';
	
	//############ IMPORTS ############//
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.app = exports.back = exports.go = exports.navigate = exports.Link = exports.Router = exports.connect = exports.addReducer = exports.store = exports.dispatch = exports.attachSessionPersistence = exports.attachPersistence = exports.clearImmediate = exports.setImmediate = exports.assign = exports.parseUri = exports.DEBUG = exports.cl = exports.createSelector = exports.preact = exports.h = exports.unmountComponentAtNode = exports.findDOMNode = exports.render = exports.createClass = exports.Component = exports.E = exports.createElement = exports.$ = exports.DOM = undefined;
	
	var _preact = __webpack_require__(1);
	
	Object.defineProperty(exports, 'DOM', {
	  enumerable: true,
	  get: function get() {
	    return _preact.DOM;
	  }
	});
	Object.defineProperty(exports, '$', {
	  enumerable: true,
	  get: function get() {
	    return _preact.$;
	  }
	});
	Object.defineProperty(exports, 'createElement', {
	  enumerable: true,
	  get: function get() {
	    return _preact.createElement;
	  }
	});
	Object.defineProperty(exports, 'E', {
	  enumerable: true,
	  get: function get() {
	    return _preact.E;
	  }
	});
	Object.defineProperty(exports, 'Component', {
	  enumerable: true,
	  get: function get() {
	    return _preact.Component;
	  }
	});
	Object.defineProperty(exports, 'createClass', {
	  enumerable: true,
	  get: function get() {
	    return _preact.createClass;
	  }
	});
	Object.defineProperty(exports, 'render', {
	  enumerable: true,
	  get: function get() {
	    return _preact.render;
	  }
	});
	Object.defineProperty(exports, 'findDOMNode', {
	  enumerable: true,
	  get: function get() {
	    return _preact.findDOMNode;
	  }
	});
	Object.defineProperty(exports, 'unmountComponentAtNode', {
	  enumerable: true,
	  get: function get() {
	    return _preact.unmountComponentAtNode;
	  }
	});
	Object.defineProperty(exports, 'h', {
	  enumerable: true,
	  get: function get() {
	    return _preact.h;
	  }
	});
	Object.defineProperty(exports, 'preact', {
	  enumerable: true,
	  get: function get() {
	    return _preact.preact;
	  }
	});
	
	var _reselect = __webpack_require__(5);
	
	Object.defineProperty(exports, 'createSelector', {
	  enumerable: true,
	  get: function get() {
	    return _reselect.createSelector;
	  }
	});
	
	var _utils = __webpack_require__(6);
	
	Object.defineProperty(exports, 'cl', {
	  enumerable: true,
	  get: function get() {
	    return _utils.cl;
	  }
	});
	Object.defineProperty(exports, 'DEBUG', {
	  enumerable: true,
	  get: function get() {
	    return _utils.DEBUG;
	  }
	});
	Object.defineProperty(exports, 'parseUri', {
	  enumerable: true,
	  get: function get() {
	    return _utils.parseUri;
	  }
	});
	Object.defineProperty(exports, 'assign', {
	  enumerable: true,
	  get: function get() {
	    return _utils.assign;
	  }
	});
	
	var _setImmediate = __webpack_require__(7);
	
	Object.defineProperty(exports, 'setImmediate', {
	  enumerable: true,
	  get: function get() {
	    return _setImmediate.setImmediate;
	  }
	});
	Object.defineProperty(exports, 'clearImmediate', {
	  enumerable: true,
	  get: function get() {
	    return _setImmediate.clearImmediate;
	  }
	});
	
	var _storePersistence = __webpack_require__(8);
	
	Object.defineProperty(exports, 'attachPersistence', {
	  enumerable: true,
	  get: function get() {
	    return _storePersistence.attachPersistence;
	  }
	});
	Object.defineProperty(exports, 'attachSessionPersistence', {
	  enumerable: true,
	  get: function get() {
	    return _storePersistence.attachSessionPersistence;
	  }
	});
	
	var _store = __webpack_require__(9);
	
	var _reselectConnect = __webpack_require__(11);
	
	var _routing = __webpack_require__(12);
	
	var _history = __webpack_require__(14);
	
	var _history2 = _interopRequireDefault(_history);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//############ INITIALIZE ############//
	// store middlewares
	(0, _store.addReducer)((0, _history2.default)(_store.store));
	
	// store connector
	var connect = (0, _reselectConnect.createConnector)(_store.store);
	
	// navigate action
	var navigate = function navigate(url) {
	  return (0, _store.store)((0, _history.navigate)(url));
	};
	var go = function go(index, options) {
	  return (0, _store.store)((0, _history.go)(index), options);
	};
	var back = function back(options) {
	  return (0, _store.store)((0, _history.go)(-1, options));
	};
	
	// namespace
	var app = {};
	
	//############ EXPORTS ############//
	// preact
	
	// framework base
	exports.dispatch = _store.store;
	exports.store = _store.store;
	exports.addReducer = _store.addReducer;
	exports.
	// reselect
	connect = connect;
	exports.
	// routing
	Router = _routing.Router;
	exports.Link = _routing.Link;
	exports.
	// navigation
	navigate = navigate;
	exports.go = go;
	exports.back = back;
	exports.
	// global namespace
	app = app;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DOM = exports.preact = exports.E = exports.createElement = exports.h = exports.Component = undefined;
	exports.$ = $;
	exports.render = render;
	exports.createClass = createClass;
	exports.unmountComponentAtNode = unmountComponentAtNode;
	exports.findDOMNode = findDOMNode;
	
	var _preact = __webpack_require__(2);
	
	var preact = _interopRequireWildcard(_preact);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var h = preact.h;
	var Component = preact.Component;
	
	
	var wrapTag = function wrapTag(tag) {
	  return function () {
	    var args = Array.prototype.slice.call(arguments);
	    args.unshift(tag);
	    return h.apply(null, args);
	  };
	};
	
	function $() {
	  if (!arguments[0]) throw new Error("Missing component declaration");
	
	  if (typeof arguments[0].render == 'function' && (!arguments[0].prototype || !arguments[0].prototype.render)) {
	    arguments[0] = createClass(arguments[0]);
	  }
	
	  return h.apply(null, arguments);
	}
	
	function render(component, node, merge) {
	  return preact.render(component, node, merge || node.lastChild);
	}
	
	function createClass(obj) {
	  function F() {
	    Component.call(this);
	  }
	
	  var p = F.prototype = Object.create(Component.prototype);
	  for (var i in obj) {
	    if ('getDefaultProps' == i) {
	      //noinspection JSUnfilteredForInLoop
	      F['defaultProps'] = obj[i]();
	    }
	    //noinspection JSUnfilteredForInLoop
	    p[i] = obj[i];
	  }
	
	  return p.constructor = F;
	}
	
	function unmountComponentAtNode(container) {
	  render(h(function () {
	    return null;
	  }), container);
	}
	
	function findDOMNode(component) {
	  return component.base || null;
	}
	
	exports.Component = Component;
	exports.h = h;
	exports.createElement = $;
	exports.E = $;
	exports.preact = preact;
	
	
	var supportedTags = 'a abbr address area article aside audio b base bdi bdo big blockquote ' + 'body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog ' + 'div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup ' + 'hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem ' + 'meta meter nav noscript object ol optgroup option output p param picture pre progress q rp ' + 'rt ruby s samp script section select small source span strong style sub summary sup table ' + 'tbody td textarea tfoot th thead time title tr track u ul var video wbr';
	
	/**
	 * @typedef {Function} tagConstructor
	 * @param {Object|null} props
	 * @param {...*} children
	 */
	
	/**
	 * @prop {tagConstructor} DOM.a(props, ...children)
	 * @prop {tagConstructor} DOM.abbr(props, ...children)
	 * @prop {tagConstructor} DOM.address(props, ...children)
	 * @prop {tagConstructor} DOM.area(props, ...children)
	 * @prop {tagConstructor} DOM.article(props, ...children)
	 * @prop {tagConstructor} DOM.aside(props, ...children)
	 * @prop {tagConstructor} DOM.audio(props, ...children)
	 * @prop {tagConstructor} DOM.b(props, ...children)
	 * @prop {tagConstructor} DOM.base(props, ...children)
	 * @prop {tagConstructor} DOM.bdi(props, ...children)
	 * @prop {tagConstructor} DOM.bdo(props, ...children)
	 * @prop {tagConstructor} DOM.big(props, ...children)
	 * @prop {tagConstructor} DOM.blockquote(props, ...children)
	 * @prop {tagConstructor} DOM.body(props, ...children)
	 * @prop {tagConstructor} DOM.br
	 * @prop {tagConstructor} DOM.button(props, ...children)
	 * @prop {tagConstructor} DOM.canvas(props, ...children)
	 * @prop {tagConstructor} DOM.caption(props, ...children)
	 * @prop {tagConstructor} DOM.cite(props, ...children)
	 * @prop {tagConstructor} DOM.code(props, ...children)
	 * @prop {tagConstructor} DOM.col(props, ...children)
	 * @prop {tagConstructor} DOM.colgroup(props, ...children)
	 * @prop {tagConstructor} DOM.data(props, ...children)
	 * @prop {tagConstructor} DOM.datalist(props, ...children)
	 * @prop {tagConstructor} DOM.dd(props, ...children)
	 * @prop {tagConstructor} DOM.del(props, ...children)
	 * @prop {tagConstructor} DOM.details(props, ...children)
	 * @prop {tagConstructor} DOM.dfn
	 * @prop {tagConstructor} DOM.dialog(props, ...children)
	 * @prop {tagConstructor} DOM.div(props, ...children)
	 * @prop {tagConstructor} DOM.dl(props, ...children)
	 * @prop {tagConstructor} DOM.dt(props, ...children)
	 * @prop {tagConstructor} DOM.em(props, ...children)
	 * @prop {tagConstructor} DOM.embed(props, ...children)
	 * @prop {tagConstructor} DOM.fieldset(props, ...children)
	 * @prop {tagConstructor} DOM.figcaption(props, ...children)
	 * @prop {tagConstructor} DOM.figure(props, ...children)
	 * @prop {tagConstructor} DOM.footer(props, ...children)
	 * @prop {tagConstructor} DOM.form(props, ...children)
	 * @prop {tagConstructor} DOM.h1(props, ...children)
	 * @prop {tagConstructor} DOM.h2(props, ...children)
	 * @prop {tagConstructor} DOM.h3(props, ...children)
	 * @prop {tagConstructor} DOM.h4(props, ...children)
	 * @prop {tagConstructor} DOM.h5
	 * @prop {tagConstructor} DOM.h6(props, ...children)
	 * @prop {tagConstructor} DOM.head(props, ...children)
	 * @prop {tagConstructor} DOM.header(props, ...children)
	 * @prop {tagConstructor} DOM.hgroup(props, ...children)
	 * @prop {tagConstructor} DOM.hr(props, ...children)
	 * @prop {tagConstructor} DOM.html(props, ...children)
	 * @prop {tagConstructor} DOM.i(props, ...children)
	 * @prop {tagConstructor} DOM.iframe(props, ...children)
	 * @prop {tagConstructor} DOM.img(props, ...children)
	 * @prop {tagConstructor} DOM.input(props, ...children)
	 * @prop {tagConstructor} DOM.ins(props, ...children)
	 * @prop {tagConstructor} DOM.kbd(props, ...children)
	 * @prop {tagConstructor} DOM.keygen(props, ...children)
	 * @prop {tagConstructor} DOM.label(props, ...children)
	 * @prop {tagConstructor} DOM.legend(props, ...children)
	 * @prop {tagConstructor} DOM.li
	 * @prop {tagConstructor} DOM.link(props, ...children)
	 * @prop {tagConstructor} DOM.main(props, ...children)
	 * @prop {tagConstructor} DOM.map(props, ...children)
	 * @prop {tagConstructor} DOM.mark(props, ...children)
	 * @prop {tagConstructor} DOM.menu(props, ...children)
	 * @prop {tagConstructor} DOM.menuitem(props, ...children)
	 * @prop {tagConstructor} DOM.meta(props, ...children)
	 * @prop {tagConstructor} DOM.meter(props, ...children)
	 * @prop {tagConstructor} DOM.nav(props, ...children)
	 * @prop {tagConstructor} DOM.noscript(props, ...children)
	 * @prop {tagConstructor} DOM.object(props, ...children)
	 * @prop {tagConstructor} DOM.ol(props, ...children)
	 * @prop {tagConstructor} DOM.optgroup
	 * @prop {tagConstructor} DOM.option(props, ...children)
	 * @prop {tagConstructor} DOM.output(props, ...children)
	 * @prop {tagConstructor} DOM.p(props, ...children)
	 * @prop {tagConstructor} DOM.param(props, ...children)
	 * @prop {tagConstructor} DOM.picture(props, ...children)
	 * @prop {tagConstructor} DOM.pre(props, ...children)
	 * @prop {tagConstructor} DOM.progress(props, ...children)
	 * @prop {tagConstructor} DOM.q(props, ...children)
	 * @prop {tagConstructor} DOM.rp(props, ...children)
	 * @prop {tagConstructor} DOM.rt(props, ...children)
	 * @prop {tagConstructor} DOM.ruby(props, ...children)
	 * @prop {tagConstructor} DOM.s(props, ...children)
	 * @prop {tagConstructor} DOM.samp(props, ...children)
	 * @prop {tagConstructor} DOM.script(props, ...children)
	 * @prop {tagConstructor} DOM.section
	 * @prop {tagConstructor} DOM.select(props, ...children)
	 * @prop {tagConstructor} DOM.small(props, ...children)
	 * @prop {tagConstructor} DOM.source(props, ...children)
	 * @prop {tagConstructor} DOM.span(props, ...children)
	 * @prop {tagConstructor} DOM.strong(props, ...children)
	 * @prop {tagConstructor} DOM.style(props, ...children)
	 * @prop {tagConstructor} DOM.sub(props, ...children)
	 * @prop {tagConstructor} DOM.summary(props, ...children)
	 * @prop {tagConstructor} DOM.sup(props, ...children)
	 * @prop {tagConstructor} DOM.table(props, ...children)
	 * @prop {tagConstructor} DOM.tbody(props, ...children)
	 * @prop {tagConstructor} DOM.td(props, ...children)
	 * @prop {tagConstructor} DOM.textarea
	 * @prop {tagConstructor} DOM.tfoot(props, ...children)
	 * @prop {tagConstructor} DOM.th(props, ...children)
	 * @prop {tagConstructor} DOM.thead(props, ...children)
	 * @prop {tagConstructor} DOM.time(props, ...children)
	 * @prop {tagConstructor} DOM.title(props, ...children)
	 * @prop {tagConstructor} DOM.tr(props, ...children)
	 * @prop {tagConstructor} DOM.track(props, ...children)
	 * @prop {tagConstructor} DOM.u(props, ...children)
	 * @prop {tagConstructor} DOM.ul(props, ...children)
	 * @prop {tagConstructor} DOM.var(props, ...children)
	 * @prop {tagConstructor} DOM.video(props, ...children)
	 * @prop {tagConstructor} DOM.wbr(props, ...children)
	 */
	var DOM = exports.DOM = supportedTags.split(' ').reduce(function (base, t) {
	  base[t] = wrapTag(t);
	  return base;
	}, {});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {!function(global, factory) {
	     true ? module.exports = factory() : 'function' == typeof define && define.amd ? define(factory) : global.preact = factory();
	}(this, function() {
	    'use strict';
	    function VNode(nodeName, attributes, children) {
	        this.nodeName = nodeName;
	        this.attributes = attributes;
	        this.children = children;
	    }
	    function extend(obj, props) {
	        for (var i in props) if (hasOwnProperty.call(props, i)) obj[i] = props[i];
	        return obj;
	    }
	    function clone(obj) {
	        var out = {};
	        for (var i in obj) out[i] = obj[i];
	        return out;
	    }
	    function memoize(fn, mem) {
	        mem = mem || {};
	        return function(k) {
	            return hasOwnProperty.call(mem, k) ? mem[k] : mem[k] = fn(k);
	        };
	    }
	    function delve(obj, key) {
	        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
	        return obj;
	    }
	    function toArray(obj) {
	        var arr = [], i = obj.length;
	        for (;i--; ) arr[i] = obj[i];
	        return arr;
	    }
	    function styleObjToCss(s) {
	        var str = '';
	        for (var prop in s) {
	            var val = s[prop];
	            if (!empty(val)) {
	                if (str) str += ' ';
	                str += jsToCss(prop);
	                str += ': ';
	                str += val;
	                if ('number' == typeof val && !NON_DIMENSION_PROPS[prop]) str += 'px';
	                str += ';';
	            }
	        }
	        return str;
	    }
	    function hashToClassName(c) {
	        var str = '';
	        for (var prop in c) if (c[prop]) {
	            if (str) str += ' ';
	            str += prop;
	        }
	        return str;
	    }
	    function normalize(obj, prop, fn) {
	        var v = obj[prop];
	        if (v && !isString(v)) obj[prop] = fn(v);
	    }
	    function optionsHook(name, a, b) {
	        return hook(options, name, a, b);
	    }
	    function hook(obj, name, a, b, c) {
	        if (obj[name]) return obj[name](a, b, c); else ;
	    }
	    function deepHook(obj, type) {
	        do hook(obj, type); while (obj = obj._component);
	    }
	    function h(nodeName, attributes) {
	        var len = arguments.length, attributeChildren = attributes && attributes.children, children = void 0, arr = void 0, lastSimple = void 0;
	        if (attributeChildren) {
	            delete attributes.children;
	            if (3 > len) return h(nodeName, attributes, attributeChildren);
	        }
	        for (var i = 2; len > i; i++) {
	            var _p = arguments[i];
	            if (!falsey(_p)) {
	                if (!children) children = [];
	                if (_p.join) arr = _p; else {
	                    arr = SHARED_TEMP_ARRAY;
	                    arr[0] = _p;
	                }
	                for (var j = 0; j < arr.length; j++) {
	                    var child = arr[j], simple = !(falsey(child) || child instanceof VNode);
	                    if (simple) child = String(child);
	                    if (simple && lastSimple) children[children.length - 1] += child; else if (!falsey(child)) children.push(child);
	                    lastSimple = simple;
	                }
	            } else ;
	        }
	        var p = new VNode(nodeName, attributes || void 0, children || void 0);
	        optionsHook('vnode', p);
	        return p;
	    }
	    function createLinkedState(component, key, eventPath) {
	        var path = key.split('.'), p0 = path[0], len = path.length;
	        return function(e) {
	            var _component$setState;
	            var t = this, s = component.state, obj = s, v = void 0, i = void 0;
	            if (isString(eventPath)) {
	                v = delve(e, eventPath);
	                if (empty(v) && (t = t._component)) v = delve(t, eventPath);
	            } else v = (t.nodeName + t.type).match(/^input(check|rad)/i) ? t.checked : t.value;
	            if (isFunction(v)) v = v.call(t);
	            if (len > 1) {
	                for (i = 0; len - 1 > i; i++) obj = obj[path[i]] || (obj[path[i]] = {});
	                obj[path[i]] = v;
	                v = s[p0];
	            }
	            component.setState((_component$setState = {}, _component$setState[p0] = v, _component$setState));
	        };
	    }
	    function enqueueRender(component) {
	        if (1 === items.push(component)) (options.debounceRendering || setImmediate)(rerender);
	    }
	    function rerender() {
	        if (items.length) {
	            var currentItems = items, p = void 0;
	            items = itemsOffline;
	            itemsOffline = currentItems;
	            for (;p = currentItems.pop(); ) if (p._dirty) renderComponent(p);
	        }
	    }
	    function isFunctionalComponent(_ref) {
	        var nodeName = _ref.nodeName;
	        return isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
	    }
	    function buildFunctionalComponent(vnode, context) {
	        return vnode.nodeName(getNodeProps(vnode), context || EMPTY) || EMPTY_BASE;
	    }
	    function ensureNodeData(node) {
	        return node[ATTR_KEY] || (node[ATTR_KEY] = {});
	    }
	    function getNodeType(node) {
	        return node.nodeType;
	    }
	    function appendChildren(parent, children) {
	        var len = children.length, many = len > 2, into = many ? document.createDocumentFragment() : parent;
	        for (var i = 0; len > i; i++) into.appendChild(children[i]);
	        if (many) parent.appendChild(into);
	    }
	    function removeNode(node) {
	        var p = node.parentNode;
	        if (p) p.removeChild(node);
	    }
	    function getAccessor(node, name, value, cache) {
	        if ('type' !== name && 'style' !== name && name in node) return node[name];
	        var attrs = node[ATTR_KEY];
	        if (cache !== !1 && attrs && hasOwnProperty.call(attrs, name)) return attrs[name];
	        if ('class' === name) return node.className;
	        if ('style' === name) return node.style.cssText; else return value;
	    }
	    function setAccessor(node, name, value) {
	        if ('class' === name) node.className = value || ''; else if ('style' === name) node.style.cssText = value || ''; else if ('dangerouslySetInnerHTML' === name) {
	            if (value && value.__html) node.innerHTML = value.__html;
	        } else if ('key' === name || name in node && 'type' !== name) {
	            node[name] = value;
	            if (falsey(value)) node.removeAttribute(name);
	        } else setComplexAccessor(node, name, value);
	        ensureNodeData(node)[name] = value;
	    }
	    function setComplexAccessor(node, name, value) {
	        if ('on' !== name.substring(0, 2)) {
	            var type = typeof value;
	            if (falsey(value)) node.removeAttribute(name); else if ('function' !== type && 'object' !== type) node.setAttribute(name, value);
	        } else {
	            var _type = normalizeEventName(name), l = node._listeners || (node._listeners = {}), fn = !l[_type] ? 'add' : !value ? 'remove' : null;
	            if (fn) node[fn + 'EventListener'](_type, eventProxy);
	            l[_type] = value;
	        }
	    }
	    function eventProxy(e) {
	        var fn = this._listeners[normalizeEventName(e.type)];
	        if (fn) return fn.call(this, optionsHook('event', e) || e); else ;
	    }
	    function getNodeAttributes(node) {
	        return node[ATTR_KEY] || getRawNodeAttributes(node) || EMPTY;
	    }
	    function getRawNodeAttributes(node) {
	        var list = node.attributes;
	        if (!list || !list.getNamedItem) return list; else return getAttributesAsObject(list);
	    }
	    function getAttributesAsObject(list) {
	        var attrs = void 0;
	        for (var i = list.length; i--; ) {
	            var item = list[i];
	            if (!attrs) attrs = {};
	            attrs[item.name] = item.value;
	        }
	        return attrs;
	    }
	    function isSameNodeType(node, vnode) {
	        if (isFunctionalComponent(vnode)) return !0;
	        var nodeName = vnode.nodeName;
	        if (isFunction(nodeName)) return node._componentConstructor === nodeName;
	        if (3 === getNodeType(node)) return isString(vnode); else return toLowerCase(node.nodeName) === nodeName;
	    }
	    function getNodeProps(vnode) {
	        var props = clone(vnode.attributes), c = vnode.children;
	        if (c) props.children = c;
	        var defaultProps = vnode.nodeName.defaultProps;
	        if (defaultProps) for (var i in defaultProps) if (hasOwnProperty.call(defaultProps, i) && !(i in props)) props[i] = defaultProps[i];
	        return props;
	    }
	    function collectNode(node) {
	        cleanNode(node);
	        var name = normalizeName(node.nodeName), list = nodes[name];
	        if (list) list.push(node); else nodes[name] = [ node ];
	    }
	    function createNode(nodeName) {
	        var name = normalizeName(nodeName), list = nodes[name], node = list && list.pop() || document.createElement(nodeName);
	        ensureNodeData(node);
	        return node;
	    }
	    function cleanNode(node) {
	        removeNode(node);
	        if (3 !== getNodeType(node)) {
	            if (!node[ATTR_KEY]) node[ATTR_KEY] = getRawNodeAttributes(node);
	            node._component = node._componentConstructor = null;
	        }
	    }
	    function diff(dom, vnode, context) {
	        var originalAttributes = vnode.attributes;
	        for (;isFunctionalComponent(vnode); ) vnode = buildFunctionalComponent(vnode, context);
	        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context);
	        if (isString(vnode)) {
	            if (dom) {
	                var type = getNodeType(dom);
	                if (3 === type) {
	                    dom[TEXT_CONTENT] = vnode;
	                    return dom;
	                } else if (1 === type) collectNode(dom);
	            }
	            return document.createTextNode(vnode);
	        }
	        var out = dom, nodeName = vnode.nodeName || UNDEFINED_ELEMENT;
	        if (!dom) out = createNode(nodeName); else if (toLowerCase(dom.nodeName) !== nodeName) {
	            out = createNode(nodeName);
	            appendChildren(out, toArray(dom.childNodes));
	            recollectNodeTree(dom);
	        }
	        innerDiffNode(out, vnode, context);
	        diffAttributes(out, vnode);
	        if (originalAttributes && originalAttributes.ref) (out[ATTR_KEY].ref = originalAttributes.ref)(out);
	        return out;
	    }
	    function innerDiffNode(dom, vnode, context) {
	        var children = void 0, keyed = void 0, keyedLen = 0, len = dom.childNodes.length, childrenLen = 0;
	        if (len) {
	            children = [];
	            for (var i = 0; len > i; i++) {
	                var child = dom.childNodes[i], key = child._component ? child._component.__key : getAccessor(child, 'key');
	                if (!empty(key)) {
	                    if (!keyed) keyed = {};
	                    keyed[key] = child;
	                    keyedLen++;
	                } else children[childrenLen++] = child;
	            }
	        }
	        var vchildren = vnode.children, vlen = vchildren && vchildren.length, min = 0;
	        if (vlen) for (var i = 0; vlen > i; i++) {
	            var vchild = vchildren[i], child = void 0;
	            if (keyedLen) {
	                var attrs = vchild.attributes, key = attrs && attrs.key;
	                if (!empty(key) && hasOwnProperty.call(keyed, key)) {
	                    child = keyed[key];
	                    keyed[key] = null;
	                    keyedLen--;
	                }
	            }
	            if (!child && childrenLen > min) for (var j = min; childrenLen > j; j++) {
	                var c = children[j];
	                if (c && isSameNodeType(c, vchild)) {
	                    child = c;
	                    children[j] = null;
	                    if (j === childrenLen - 1) childrenLen--;
	                    if (j === min) min++;
	                    break;
	                }
	            }
	            child = diff(child, vchild, context);
	            if (dom.childNodes[i] !== child) {
	                var c = child.parentNode !== dom && child._component, next = dom.childNodes[i + 1];
	                if (c) deepHook(c, 'componentWillMount');
	                if (next) dom.insertBefore(child, next); else dom.appendChild(child);
	                if (c) deepHook(c, 'componentDidMount');
	            }
	        }
	        if (keyedLen) for (var i in keyed) if (hasOwnProperty.call(keyed, i) && keyed[i]) children[min = childrenLen++] = keyed[i];
	        if (childrenLen > min) removeOrphanedChildren(children);
	    }
	    function removeOrphanedChildren(children, unmountOnly) {
	        for (var i = children.length; i--; ) {
	            var child = children[i];
	            if (child) recollectNodeTree(child, unmountOnly);
	        }
	    }
	    function recollectNodeTree(node, unmountOnly) {
	        var attrs = node[ATTR_KEY];
	        if (attrs) hook(attrs, 'ref', null);
	        var component = node._component;
	        if (component) unmountComponent(component, !unmountOnly); else {
	            if (!unmountOnly) {
	                if (1 !== getNodeType(node)) {
	                    removeNode(node);
	                    return;
	                }
	                collectNode(node);
	            }
	            var c = node.childNodes;
	            if (c && c.length) removeOrphanedChildren(c, unmountOnly);
	        }
	    }
	    function diffAttributes(dom, vnode) {
	        var old = getNodeAttributes(dom) || EMPTY, attrs = vnode.attributes || EMPTY, name = void 0, value = void 0;
	        for (name in old) if (empty(attrs[name])) setAccessor(dom, name, null);
	        if (attrs !== EMPTY) for (name in attrs) if (hasOwnProperty.call(attrs, name)) {
	            value = attrs[name];
	            if (!empty(value) && value != getAccessor(dom, name)) setAccessor(dom, name, value);
	        }
	    }
	    function collectComponent(component) {
	        var name = component.constructor.name, list = components[name];
	        if (list) list.push(component); else components[name] = [ component ];
	    }
	    function createComponent(Ctor, props, context) {
	        var list = components[Ctor.name], len = list && list.length, c = void 0;
	        for (var i = 0; len > i; i++) {
	            c = list[i];
	            if (c.constructor === Ctor) {
	                list.splice(i, 1);
	                var inst = new Ctor(props, context);
	                inst.nextBase = c.base;
	                return inst;
	            }
	        }
	        return new Ctor(props, context);
	    }
	    function triggerComponentRender(component) {
	        if (!component._dirty) {
	            component._dirty = !0;
	            enqueueRender(component);
	        }
	    }
	    function setComponentProps(component, props, opts, context) {
	        var d = component._disableRendering;
	        component.__ref = props.ref;
	        component.__key = props.key;
	        delete props.ref;
	        delete props.key;
	        component._disableRendering = !0;
	        if (context) {
	            if (!component.prevContext) component.prevContext = component.context;
	            component.context = context;
	        }
	        if (component.base) hook(component, 'componentWillReceiveProps', props, component.context);
	        if (!component.prevProps) component.prevProps = component.props;
	        component.props = props;
	        component._disableRendering = d;
	        if (!opts || opts.render !== !1) if (opts && opts.renderSync || options.syncComponentUpdates !== !1) renderComponent(component); else triggerComponentRender(component);
	        hook(component, '__ref', component);
	    }
	    function renderComponent(component, opts) {
	        if (!component._disableRendering) {
	            var skip = void 0, rendered = void 0, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, initialBase = isUpdate || component.nextBase;
	            if (isUpdate) {
	                component.props = previousProps;
	                component.state = previousState;
	                component.context = previousContext;
	                if (hook(component, 'shouldComponentUpdate', props, state, context) === !1) skip = !0; else hook(component, 'componentWillUpdate', props, state, context);
	                component.props = props;
	                component.state = state;
	                component.context = context;
	            }
	            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	            component._dirty = !1;
	            if (!skip) {
	                rendered = hook(component, 'render', props, state, context);
	                var childComponent = rendered && rendered.nodeName, childContext = component.getChildContext ? component.getChildContext() : context, toUnmount = void 0, base = void 0;
	                if (isFunction(childComponent) && childComponent.prototype.render) {
	                    var inst = component._component;
	                    if (inst && inst.constructor !== childComponent) {
	                        toUnmount = inst;
	                        inst = null;
	                    }
	                    var childProps = getNodeProps(rendered);
	                    if (inst) setComponentProps(inst, childProps, SYNC_RENDER, childContext); else {
	                        inst = createComponent(childComponent, childProps, childContext);
	                        inst._parentComponent = component;
	                        component._component = inst;
	                        if (isUpdate) deepHook(inst, 'componentWillMount');
	                        setComponentProps(inst, childProps, NO_RENDER, childContext);
	                        renderComponent(inst, DOM_RENDER);
	                        if (isUpdate) deepHook(inst, 'componentDidMount');
	                    }
	                    base = inst.base;
	                } else {
	                    var cbase = initialBase;
	                    toUnmount = component._component;
	                    if (toUnmount) cbase = component._component = null;
	                    if (initialBase || opts && opts.build) base = diff(cbase, rendered || EMPTY_BASE, childContext);
	                }
	                if (initialBase && base !== initialBase) {
	                    var p = initialBase.parentNode;
	                    if (p && base !== p) p.replaceChild(base, initialBase);
	                }
	                if (toUnmount) unmountComponent(toUnmount, !0);
	                component.base = base;
	                if (base) {
	                    var componentRef = component, t = component;
	                    for (;t = t._parentComponent; ) componentRef = t;
	                    base._component = componentRef;
	                    base._componentConstructor = componentRef.constructor;
	                }
	                if (isUpdate) hook(component, 'componentDidUpdate', previousProps, previousState, previousContext);
	            }
	            var cb = component._renderCallbacks, fn = void 0;
	            if (cb) for (;fn = cb.pop(); ) fn.call(component);
	            return rendered;
	        }
	    }
	    function buildComponentFromVNode(dom, vnode, context) {
	        var c = dom && dom._component, oldDom = dom;
	        var isOwner = c && dom._componentConstructor === vnode.nodeName;
	        for (;c && !isOwner && (c = c._parentComponent); ) isOwner = c.constructor === vnode.nodeName;
	        if (isOwner) {
	            setComponentProps(c, getNodeProps(vnode), SYNC_RENDER, context);
	            dom = c.base;
	        } else {
	            if (c) {
	                unmountComponent(c, !0);
	                dom = oldDom = null;
	            }
	            dom = createComponentFromVNode(vnode, dom, context);
	            if (oldDom && dom !== oldDom) {
	                oldDom._component = null;
	                recollectNodeTree(oldDom);
	            }
	        }
	        return dom;
	    }
	    function createComponentFromVNode(vnode, dom, context) {
	        var props = getNodeProps(vnode);
	        var component = createComponent(vnode.nodeName, props, context);
	        if (dom && !component.base) component.base = dom;
	        setComponentProps(component, props, NO_RENDER, context);
	        renderComponent(component, DOM_RENDER);
	        return component.base;
	    }
	    function unmountComponent(component, remove) {
	        hook(component, '__ref', null);
	        hook(component, 'componentWillUnmount');
	        var inner = component._component;
	        if (inner) {
	            unmountComponent(inner, remove);
	            remove = !1;
	        }
	        var base = component.base;
	        if (base) {
	            if (remove !== !1) removeNode(base);
	            removeOrphanedChildren(base.childNodes, !0);
	        }
	        if (remove) {
	            component._parentComponent = null;
	            collectComponent(component);
	        }
	        hook(component, 'componentDidUnmount');
	    }
	    function Component(props, context) {
	        this._dirty = this._disableRendering = !1;
	        this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
	        this.context = context || {};
	        this.props = props;
	        this.state = hook(this, 'getInitialState') || {};
	    }
	    function render(vnode, parent, merge) {
	        var existing = merge && merge._component && merge._componentConstructor === vnode.nodeName, built = diff(merge, vnode), c = !existing && built._component;
	        if (c) deepHook(c, 'componentWillMount');
	        if (built.parentNode !== parent) parent.appendChild(built);
	        if (c) deepHook(c, 'componentDidMount');
	        return built;
	    }
	    var NO_RENDER = {
	        render: !1
	    };
	    var SYNC_RENDER = {
	        renderSync: !0
	    };
	    var DOM_RENDER = {
	        build: !0
	    };
	    var EMPTY = {};
	    var EMPTY_BASE = '';
	    var HAS_DOM = 'undefined' != typeof document;
	    var TEXT_CONTENT = !HAS_DOM || 'textContent' in document ? 'textContent' : 'nodeValue';
	    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol['for']('preactattr') : '__preactattr_';
	    var UNDEFINED_ELEMENT = 'undefined';
	    var NON_DIMENSION_PROPS = {
	        boxFlex: 1,
	        boxFlexGroup: 1,
	        columnCount: 1,
	        fillOpacity: 1,
	        flex: 1,
	        flexGrow: 1,
	        flexPositive: 1,
	        flexShrink: 1,
	        flexNegative: 1,
	        fontWeight: 1,
	        lineClamp: 1,
	        lineHeight: 1,
	        opacity: 1,
	        order: 1,
	        orphans: 1,
	        strokeOpacity: 1,
	        widows: 1,
	        zIndex: 1,
	        zoom: 1
	    };
	    var isFunction = function(obj) {
	        return 'function' == typeof obj;
	    };
	    var isString = function(obj) {
	        return 'string' == typeof obj;
	    };
	    var hasOwnProperty = {}.hasOwnProperty;
	    var empty = function(x) {
	        return null == x;
	    };
	    var falsey = function(value) {
	        return value === !1 || null == value;
	    };
	    var jsToCss = memoize(function(s) {
	        return s.replace(/([A-Z])/g, '-$1').toLowerCase();
	    });
	    var toLowerCase = memoize(function(s) {
	        return s.toLowerCase();
	    });
	    var ch = void 0;
	    try {
	        ch = new MessageChannel();
	    } catch (e) {}
	    var setImmediate = ch ? function(f) {
	        ch.port1.onmessage = f;
	        ch.port2.postMessage('');
	    } : setTimeout;
	    var options = {
	        vnode: function(n) {
	            var attrs = n.attributes;
	            if (attrs && !isFunction(n.nodeName)) {
	                var p = attrs.className;
	                if (p) {
	                    attrs['class'] = p;
	                    delete attrs.className;
	                }
	                if (attrs['class']) normalize(attrs, 'class', hashToClassName);
	                if (attrs.style) normalize(attrs, 'style', styleObjToCss);
	            }
	        }
	    };
	    var SHARED_TEMP_ARRAY = [];
	    var items = [];
	    var itemsOffline = [];
	    var normalizeEventName = memoize(function(t) {
	        return t.replace(/^on/i, '').toLowerCase();
	    });
	    var nodes = {};
	    var normalizeName = memoize(function(name) {
	        return name.toUpperCase();
	    });
	    var components = {};
	    extend(Component.prototype, {
	        linkState: function(key, eventPath) {
	            var c = this._linkedStates || (this._linkedStates = {}), cacheKey = key + '|' + (eventPath || '');
	            return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
	        },
	        setState: function(state, callback) {
	            var s = this.state;
	            if (!this.prevState) this.prevState = clone(s);
	            extend(s, isFunction(state) ? state(s, this.props) : state);
	            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
	            triggerComponentRender(this);
	        },
	        forceUpdate: function() {
	            renderComponent(this);
	        },
	        render: function() {
	            return null;
	        }
	    });
	    var preact = {
	        h: h,
	        Component: Component,
	        render: render,
	        rerender: rerender,
	        options: options,
	        hooks: options
	    };
	    return preact;
	});
	//# sourceMappingURL=preact.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).setImmediate))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(4).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).setImmediate, __webpack_require__(3).clearImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.createSelector = createSelector;
	function createSelector() {
	  var dependencies = Array.prototype.slice.call(arguments);
	  if (!dependencies.length) throw new Error("Must supply at least one state to props function");
	  var resultFunc = dependencies.pop();
	  // if no dependencies simply pass state
	  if (!dependencies.length) dependencies = [function (state) {
	    return state;
	  }, function (_, props) {
	    return props;
	  }];
	
	  // prepare dependencies for return value comparison
	  var cachedDependencies = dependencies.map(function (dependency) {
	    var lastVal = {};
	    return function () {
	      var args = Array.prototype.slice.call(arguments);
	      var newVal = dependency.apply(null, args);
	      if (lastVal !== newVal) {
	        //console.log("STATE CHANGED!", lastVal, newVal);
	        lastVal = newVal;
	        return [true, newVal];
	      }
	      //console.log("STATE DIDN'T CHANGE!", lastVal, newVal);
	      return [false, newVal];
	    };
	  });
	
	  var lastProps = void 0;
	  return function (state, props) {
	    //console.log("invoking selector with state", JSON.stringify(state).slice(0, 200));
	    var collectedDeps = collectDependencies(state, props, cachedDependencies);
	
	    //console.log("Getting props from state",lastProps, collectedDeps, resultFunc);
	    if (collectedDeps || !lastProps) {
	      //console.log("invoking result func");
	      // data has changed = recalculate
	      lastProps = resultFunc.apply(null, collectedDeps);
	      if (!lastProps || (typeof lastProps === 'undefined' ? 'undefined' : _typeof(lastProps)) != 'object') throw new Error("Result function must return object");
	      return [true, lastProps];
	    }
	
	    return [false, lastProps];
	  };
	}
	
	function collectDependencies(state, props, dependencies) {
	  var changed = false;
	  var collectedData = dependencies.map(function (dependency) {
	    var _dependency = dependency(state, props);
	
	    var _dependency2 = _slicedToArray(_dependency, 2);
	
	    var didChange = _dependency2[0];
	    var data = _dependency2[1];
	
	    if (didChange) changed = true;
	    return data;
	  });
	
	  if (changed) return collectedData;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// join classes
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cl = cl;
	exports.parseUri = parseUri;
	function cl() {
	  var args = Array.prototype.slice.call(arguments);
	
	  return args.filter(function (x) {
	    return !!x;
	  }).join(' ');
	}
	
	var DEBUG = exports.DEBUG = process.env.NODE_ENV != 'production';
	
	function parseUri(uri) {
	  var location = {};
	
	  uri = uri.replace(/^(\w+:)?\/\//, '');
	
	  var pathIndex = uri.indexOf('/');
	  var searchIndex = uri.indexOf('?');
	  var hashIndex = uri.indexOf('#');
	
	  if (pathIndex == -1) {
	    location.pathname = '';
	  } else {
	    location.pathname = uri.slice(pathIndex, searchIndex == -1 ? uri.length : searchIndex);
	  }
	  if (searchIndex != -1) {
	    location.search = uri.slice(searchIndex + 1, hashIndex == -1 ? uri.length : hashIndex);
	  }
	  if (hashIndex != -1) {
	    location.hash = uri.slice(hashIndex + 1, uri.length);
	  }
	
	  return location;
	}
	
	var assign = exports.assign = Object.assign || function (target) {
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

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.attachSessionPersistence = attachSessionPersistence;
	exports.attachPersistence = attachPersistence;
	
	var _store = __webpack_require__(9);
	
	var _storage = __webpack_require__(10);
	
	/**
	 * state persistence module
	 * @example
	 * attachPersistence('storage', store);
	 * attachSessionPersistence('session', store);
	 */
	
	function attachSessionPersistence(path) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  if (!path) throw new Error("A string path must be provided as first argument. e.g. 'session'");
	  var STORAGE_KEY = options.key || 'state';
	
	  // load session state
	  var sessionState = _storage.sessionStore.getItem(STORAGE_KEY);
	  if (isNonEmptyObj(sessionState)) (0, _store.store)(path, sessionState);
	  // subscribe to store changes
	  _store.store.subscribe(path, function (state) {
	    return _storage.sessionStore.setItem(STORAGE_KEY, state.session);
	  });
	}
	
	exports.default = attachPersistence;
	function attachPersistence(path) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  if (!path) throw new Error("A string path must be provided as first argument. e.g. 'persistent'");
	  var STORAGE_KEY = options.key || 'state';
	
	  // load persistent state
	  var persistentState = _storage.persistentStore.getItem(STORAGE_KEY);
	  if (isNonEmptyObj(persistentState)) (0, _store.store)(STORAGE_KEY, persistentState);
	  // listen to persistent data changes
	  (0, _storage.onStorageChange)(STORAGE_KEY, function (persistentState) {
	    return (0, _store.store)(path, persistentState);
	  });
	  // subscribe to store changes
	  _store.store.subscribe(path, function (state) {
	    return _storage.persistentStore.setItem(STORAGE_KEY, state.persistent);
	  });
	}
	
	function isNonEmptyObj(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.store = store;
	exports.addReducer = addReducer;
	exports.removeReducer = removeReducer;
	
	var _setImmediate = __webpack_require__(7);
	
	var _utils = __webpack_require__(6);
	
	var ROOT_PATH = "@@ROOT_PATH@@";
	var BOOT_ACTION = "@@BOOT_ACTION@@";
	var listeners = Object.create(null);
	//noinspection JSUnresolvedVariable
	var DEBUG = process.env.NODE_ENV != 'production';
	var state = {};
	var pendingUpdates = null;
	var booted = void 0;
	var _reducers = [];
	
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
	function store(path, action) {
	  return dispatch(path, action);
	}
	exports.default = store;
	
	
	store.subscribe = function (path, listener) {
	  return subscriber(path, listener);
	};
	
	store.unsubscribe = function (path, listener) {
	  return subscriber(path, listener, true);
	};
	
	store.forceUpdate = function () {
	  for (var path in listeners) {
	    //noinspection JSUnfilteredForInLoop
	    invokeListeners(listeners[path], [state]);
	  }
	};
	
	store.getState = function () {
	  return store();
	};
	
	function addReducer(path, reducer) {
	  if (typeof path == 'function') {
	    reducer = path;
	    path = null;
	  }
	
	  if (path && typeof path != 'string' || !reducer) {
	    throw new Error("Wrong input to addReducer - expects optional string path and reducer function");
	  }
	
	  var addItem = function addItem() {
	    var reducerItem = {
	      path: path || '',
	      reducer: reducer
	    };
	    // get initial state
	    invokeReducers([reducerItem], state, { type: BOOT_ACTION });
	
	    _reducers.push(reducerItem);
	  };
	
	  // if not booted allow boot to propagate first
	  if (booted) addItem();else (0, _setImmediate.setImmediate)(addItem);
	
	  return {
	    destroy: function destroy() {
	      if (booted) removeReducer(path, reducer);else (0, _setImmediate.setImmediate)(removeReducer, path, reducer);
	    }
	  };
	}
	
	function removeReducer(path, reducer) {
	  if (typeof path == 'function') {
	    reducer = path;
	    path = null;
	  }
	
	  var index = _reducers.indexOf(reducer);
	  if (index !== -1) {
	    _reducers.splice(index, 1);
	  }
	}
	
	// ------------- Internals -------------
	
	(0, _setImmediate.setImmediate)(function () {
	  return (0, _setImmediate.setImmediate)(function () {
	    return (0, _setImmediate.setImmediate)(function () {
	      return booted = true;
	    });
	  });
	});
	
	function invokeReducers(reducers, data, action) {
	  var reduce = function reduce() {
	    return reducers.reduce(function (changed, reducerItem) {
	      // get section by path
	
	      var _getDeepPath = getDeepPath(reducerItem.path, data);
	
	      var _getDeepPath2 = _slicedToArray(_getDeepPath, 3);
	
	      var dataSection = _getDeepPath2[0];
	      var parent = _getDeepPath2[1];
	      var prop = _getDeepPath2[2];
	      // invoke reducer on specific path
	
	      var retVal = reducerItem.reducer(dataSection, action);
	
	      var _assignRecursive = assignRecursive(dataSection, retVal);
	
	      var _assignRecursive2 = _slicedToArray(_assignRecursive, 2);
	
	      var didChange = _assignRecursive2[0];
	      var result = _assignRecursive2[1];
	
	      if (didChange && parent) {
	        parent[prop] = result;
	      }
	      return didChange || changed;
	    }, false);
	  };
	
	  if (booted) return reduce();
	  return (0, _setImmediate.setImmediate)(reduce);
	}
	
	function getDeepPath(path, rootObj) {
	  if (!path) return [rootObj];
	  var paths = path.split('.');
	  var parent = void 0;
	  var prop = void 0;
	  var target = rootObj;
	  var l = paths.length;
	  var i = 0;
	  // creating missing object dynamically
	  while (i < l) {
	
	    var p = paths[i];
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
	  } else if (typeof path == 'string' && action === void 0) {
	    var _getDeepPath$ = _slicedToArray(getDeepPath(path, state)[0], 1);
	
	    var statePath = _getDeepPath$[0];
	
	    return DEBUG ? deepFreeze(statePath) : statePath;
	  }
	
	  //console.log("DISPATCH", path, action, new Error().stack);
	  var normalizedAction = void 0;
	  if (isObj(path)) {
	    normalizedAction = path;
	  } else {
	    normalizedAction = {
	      type: path,
	      payload: action
	    };
	  }
	
	  var changed = void 0;
	  if (typeof path == 'string') {
	    if (!isObj(action)) throw new Error("Can't use tree update without valid data (expects Object)");
	    var parent = void 0;
	    var prop = void 0;
	    var target = void 0;
	    if (path == 'boot') {
	      target = state;
	      booted = true;
	    } else {
	      var _getDeepPath3 = getDeepPath(path, state);
	      // get deep path from dot notation - creates children implicitly
	
	
	      var _getDeepPath4 = _slicedToArray(_getDeepPath3, 3);
	
	      target = _getDeepPath4[0];
	      parent = _getDeepPath4[1];
	      prop = _getDeepPath4[2];
	    }
	
	    var _ref = assignRecursive(target, action) || changed;
	
	    var _ref2 = _slicedToArray(_ref, 2);
	
	    var didChanged = _ref2[0];
	    var result = _ref2[1];
	
	    if (didChanged && parent) {
	      parent[prop] = result;
	    }
	
	    changed = changed || didChanged;
	  } else {
	    path = '';
	    changed = invokeReducers(_reducers, state, normalizedAction) || changed;
	  }
	
	  // console.log("PROCESSED DISPATCH changed?", !!changed);
	  if (changed) {
	    state = (0, _utils.assign)({}, state);
	    updateSubscribers(path);
	  }
	}
	
	function updateSubscribers(path) {
	  var key = path || ROOT_PATH;
	  // console.log("adding subscribers to que update on path", key);
	  if (pendingUpdates) {
	    pendingUpdates.add(key);
	    return;
	  }
	
	  pendingUpdates = new Set();
	  pendingUpdates.add(key);
	  (0, _setImmediate.setImmediate)(function () {
	    // console.log("INVOKING QUE of subscribers");
	    var rootInvoked = void 0;
	    var newState = state;
	    if (DEBUG) {
	      newState = deepFreeze(newState);
	    }
	
	    var list = pendingUpdates;
	    pendingUpdates = null;
	    // shared track of invoked listeners for all paths to avoid multi calls to same invoker
	    var invokedListeners = new Set();
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = list.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var paths = _step.value;
	
	        paths = paths.split('.');
	        while (paths.length) {
	          var _path = paths.join('.');
	          // track invocation of root path
	          if (_path == ROOT_PATH) rootInvoked = true;
	          // console.log("invoking listeners for path", path, listeners[path] && listeners[path].size);
	          invokeListeners(listeners[_path], [newState], invokedListeners);
	          paths.pop();
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
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
	  } else {
	    listeners[path].add(listener);
	  }
	
	  return !remove && {
	    unsubscribe: function unsubscribe() {
	      subscriber(path, listener, true);
	    }
	  };
	}
	
	function invokeListeners(listeners, args, invokedListeners) {
	  invokedListeners = invokedListeners || new Set();
	  if (!listeners) return;
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = listeners.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var listener = _step2.value;
	
	      // don't call same listener more than once in a single round
	      if (invokedListeners.has(listener)) continue;
	      invokedListeners.add(listener);
	
	      listener.apply(null, args);
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	}
	
	function assignRecursive(base, obj, seen) {
	  seen = seen || [];
	  // completely empty object
	  if (obj === null) return [true, {}];
	
	  if (!isObj(obj)) return [false];
	  var changed = false;
	  for (var p in obj) {
	    if (!obj.hasOwnProperty(p)) continue;
	
	    //console.log(`--- assigning`, p,
	    //  Array.isArray(base[p]) ? 'array' : (base[p] !== undefined && typeof base[p] || base[p]), base[p],
	    //  Array.isArray(obj[p]) ? 'array' : (obj[p] !== undefined && typeof obj[p] || obj[p]), obj[p]
	    //);
	    if (isObj(obj[p]) && isObj(base[p])) {
	      if (seen.indexOf(obj[p]) > -1) throw new Error("Circular object can't be part of the state tree");
	      seen.push(obj[p]);
	
	      var _assignRecursive3 = assignRecursive(base[p], obj[p], seen);
	
	      var _assignRecursive4 = _slicedToArray(_assignRecursive3, 2);
	
	      var childChanged = _assignRecursive4[0];
	      var result = _assignRecursive4[1];
	
	      if (childChanged) {
	        // changed
	        base[p] = result;
	        changed = true;
	      }
	      // remove dangling empty objects
	      if (!Object.keys(base[p]).length) {
	        delete base[p];
	      }
	    } else if (obj[p] === null) {
	      delete base[p];
	      changed = true;
	    } else if (base[p] !== obj[p]) {
	      base[p] = obj[p];
	      changed = true;
	    }
	  }
	
	  if (changed) base = (0, _utils.assign)({}, base);
	
	  return [changed, base];
	}
	
	function deepFreeze(obj) {
	  if (Array.isArray(obj)) return obj.map(deepFreeze);
	  if (!isObj(obj)) return obj;
	
	  var target = {};
	
	  for (var p in obj) {
	    if (!obj.hasOwnProperty(p)) continue;
	    target[p] = deepFreeze(obj[p]);
	  }
	
	  return Object.freeze(target);
	}
	
	function isObj(obj) {
	  return Object.prototype.toString.call(obj) == '[object Object]';
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.onStorageChange = onStorageChange;
	exports.offStorageChange = offStorageChange;
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
	
	var sessionStore = exports.sessionStore = {
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
	
	var listenersCache = new Map();
	
	function onStorageChange(key, listener) {
	  if (window.localStorage) {
	    // internal listener wrapper
	    var eventListener = function eventListener(e) {
	      if (e.key === null || e.key === key) {
	        listener(persistentGet(key));
	      }
	    };
	
	    // save listener to cache
	    var obj = {};
	    obj[key] = eventListener;
	    listenersCache.set(listener, obj);
	
	    // attach listener
	    window.addEventListener('storage', eventListener);
	  }
	}
	//noinspection JSUnusedGlobalSymbols
	function offStorageChange(key, listener) {
	  var eventListeners = listenersCache.get(listener);
	  if (eventListeners[key]) {
	    // remove listener
	    window.removeEventListener('storage', eventListeners[key]);
	  }
	}
	
	var persistentStore = exports.persistentStore = {
	  getItem: persistentGet,
	  setItem: persistentSet
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createConnector = createConnector;
	
	var _utils = __webpack_require__(6);
	
	var _preact = __webpack_require__(1);
	
	function createConnector(store) {
	
	  return function (mapStateToProps, mapDispatchToProps, mergeProps) {
	    return function (component) {
	
	      //console.log("create selector", mapStateToProps, mapDispatchToProps, mergeProps);
	      if (!mapDispatchToProps) mapDispatchToProps = function mapDispatchToProps(dispatch) {
	        return { dispatch: dispatch };
	      };
	      if (!mergeProps) mergeProps = function mergeProps(a, b, c) {
	        return (0, _utils.assign)({}, a, b, c);
	      };
	
	      if (typeof component == 'function') {
	        component = (0, _preact.createClass)({
	          render: component
	        });
	      }
	
	      var hooks = getLifeCycleHooks(component);
	      //console.log("component123", new Error().stack);
	      var cachedProps = void 0;
	      var handler = function handler(props) {
	        //console.log("HANDLER - running mapStateToProps", mapStateToProps);
	        var hasCached = !!cachedProps;
	        var changed = true;
	        var stateProps = mapStateToProps && mapStateToProps(store(), props);
	        if (Array.isArray(stateProps)) {
	          changed = stateProps[0];
	          stateProps = stateProps[1];
	        }
	        var dispatchProps = mapDispatchToProps(store, props);
	
	        var mergedProps = mergeProps(props, stateProps, dispatchProps);
	        if (!isObj(mergedProps)) throw new Error("mergeProps function must return onject");
	        cachedProps = mergedProps;
	        return changed || !hasCached;
	      };
	
	      // ### componentWillMount ### //
	      var storeListener = void 0;
	      component.prototype.componentWillMount = function () {
	        if (mapStateToProps) {
	          //console.log("will mount while mounted - hot reload? - anyways... un-subscribing");
	          if (storeListener) store.unsubscribe(storeListener);
	
	          //console.log("Will mount - subscribing");
	          storeListener = function () {
	            var changed = handler(this.props);
	            //console.log(changed ? "store changed - triggering render" : "store didn't change - ignoring");
	            if (changed) {
	              this.props = cachedProps;
	              this.forceUpdate();
	            }
	          }.bind(this);
	          store.subscribe(storeListener);
	        }
	
	        if (!cachedProps) handler(this.props);
	        this.props = cachedProps;
	        return hooks.componentWillMount && hooks.componentWillMount.apply(this, arguments);
	      };
	
	      // ### componentWillUnmount ### //
	      component.prototype.componentWillUnmount = function (nextProps) {
	        //console.log("Will unmount - un-subscribing");
	        storeListener && store.unsubscribe(storeListener);
	        storeListener = null;
	
	        return hooks.componentWillUnmount && hooks.componentWillUnmount.call(this, nextProps);
	      };
	
	      // ### componentWillReceiveProps ### //
	      component.prototype.componentWillReceiveProps = function (nextProps) {
	        //console.log("Will receive props updating");
	        return hooks.componentWillReceiveProps && hooks.componentWillReceiveProps.call(this, cachedProps);
	      };
	
	      // ### Render ### //
	      component.prototype.render = function (nextProps, state, context) {
	        if (!cachedProps) handler(this.props);
	
	        //console.log("rendering reselect ", !!cachedProps);
	        this.props = cachedProps;
	        return hooks.render && hooks.render.call(this, this.props, state, context);
	      };
	
	      return component;
	    };
	  };
	}
	
	function getLifeCycleHooks(component) {
	  return (0, _utils.assign)({}, component.render ? component : component.prototype);
	}
	
	function isObj(arg) {
	  return Object.prototype.toString.call(arg) == '[object Object]';
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Router = undefined;
	exports.Link = Link;
	
	var _router = __webpack_require__(13);
	
	var _preact = __webpack_require__(1);
	
	var _store = __webpack_require__(9);
	
	var _history = __webpack_require__(14);
	
	var _utils = __webpack_require__(6);
	
	var navigate = function navigate(url) {
	  return (0, _store.store)((0, _history.navigate)(url));
	};
	
	var Router = exports.Router = (0, _preact.createClass)({
	  getInitialState: function getInitialState() {
	    return {
	      url: ''
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;
	
	    this.handleChange = function (state) {
	      if (state.url !== _this.state.url) {
	        _this.setState({ url: state.url });
	      }
	    };
	    _store.store.subscribe(this.handleChange);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    _store.store.unsubscribe(this.handleChange);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.routes !== this.routes) {
	      this.updateRouter(nextProps.routes);
	    }
	  },
	  updateRouter: function updateRouter(routes) {
	    var _this2 = this;
	
	    this.routes = routes || this.props.routes;
	    this.router = (0, _router.createRouter)(this.routes, function () {
	      // console.log("[REFRESH ROUTER]");
	      _this2.forceUpdate();
	    });
	  },
	  render: function render(props) {
	    if (!this.router) this.updateRouter();
	    return this.router(location, props);
	  }
	});
	
	function Link(props) {
	  var to = props.to;
	  var options = props.options;
	  var _props$activeClass = props.activeClass;
	  var activeClass = _props$activeClass === undefined ? 'active' : _props$activeClass;
	
	
	  return (0, _preact.$)('span', (0, _utils.assign)({
	    onClick: function onClick() {
	      return navigate(to, options);
	    }
	  }, props, {
	    to: undefined,
	    options: undefined,
	    activeClass: undefined,
	    className: (0, _utils.cl)(location.pathname == to.toString().replace(/(\?|#).*/g, '') > -1 && activeClass, props.className)
	  }));
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createRouter = createRouter;
	
	var _store = __webpack_require__(9);
	
	var _history = __webpack_require__(14);
	
	var _utils = __webpack_require__(6);
	
	var _setImmediate = __webpack_require__(7);
	
	var _preact = __webpack_require__(1);
	
	var navigate = function navigate(url, opts) {
	  return (0, _store.store)((0, _history.navigate)(url, opts));
	};
	
	var router = null;
	
	function createRouter(routes, refreshRouter) {
	  if (!routes) {
	    if (_utils.DEBUG) throw new Error("Router expects routes definition");
	    return function () {
	      return null;
	    };
	  }
	
	  routes = Array.isArray(routes) ? routes : [routes];
	
	  if (router) router.destroy();
	
	  router = new Router(routes, refreshRouter);
	
	  return function (location, props) {
	    return router.getComponent(location, props);
	  };
	}
	
	function Router(routes, refreshRouter) {
	  var _this = this;
	
	  this.defaultRoute = null;
	  this.matchedChild = null;
	
	  this.refreshRouter = refreshRouter;
	
	  this.routes = routes.map(function (route) {
	    var instance = new Route(_this, route, _this.refreshRouter);
	    // get default route
	    if (resolve(route.path) == '/' || route.default) {
	      if (!_this.defaultRoute) {
	        _this.defaultRoute = instance;
	      } else if (_utils.DEBUG) {
	        throw new Error("Can only have one route without path");
	      }
	    }
	    return instance;
	  });
	}
	
	Router.prototype.destroy = function () {
	  this.destroyed = true;
	  this.routes.forEach(function (route) {
	    return route.destroy();
	  });
	};
	
	Router.prototype.getLoader = function () {
	  return null;
	};
	
	Router.prototype.getComponent = function (location, props) {
	  var _this2 = this;
	
	  // console.log("GETTING COMPONENT ----------------------------------");
	  var matchedRoute = matchRoute(this.routes, location);
	
	  if (this.matchedChild) {
	    this.matchedChild.unmount();
	    this.matchedChild = null;
	  }
	
	  if (matchedRoute) {
	    this.matchedChild = matchedRoute;
	    return this.matchedChild.mount(location, props, function () {
	      return !_this2.destroyed && _this2.refreshRouter();
	    });
	  } else if (this.defaultRoute) {
	    // console.log("seems strict - mounting default");
	    return this.defaultRoute.mount(location, props, function () {
	      return !_this2.destroyed && _this2.refreshRouter();
	    });
	  }
	
	  if (_utils.DEBUG) console.warn("No route was matched and no default route was defined");
	  return null;
	};
	
	function Route(parent, route, refreshRouter) {
	  var _this3 = this;
	
	  if (_utils.DEBUG) {
	    if (!route) throw new Error("Missing route");
	    if (route.component && route.componentAsync || !route.component && !route.componentAsync) {
	      throw new Error("Can have only one component definitions");
	    }
	    if (route.onEnter && route.onEnterAsync) throw new Error("Can't have both sync and async hooks defined");
	  }
	
	  // references
	  this.route = route;
	  this.parent = parent;
	  this.refreshRouter = refreshRouter;
	  this.baseComponent = route.component;
	  this.defaultRoute = null;
	
	  // matching logic
	  this.isStringPath = !(route.path instanceof RegExp);
	  this.path = this.isStringPath ? resolve(route.path || route.strictPath) : '';
	  this.lineage = parent.path || '/';
	  this.fullPath = resolve(this.lineage, this.path);
	  this.strictPath = route.strictPath ? (parent.path == '/' ? '' : parent.path) + '/' + route.strictPath.replace(/^\//, '') : '';
	  this.paramNames = [];
	  this.preparePath();
	
	  // path /dashboard
	  // lineage /settings
	  // fullPath = /settings/dashboard
	
	  // state
	  this.mounted = false;
	  this.asyncLock = false;
	  this.loading = false;
	  this.loadingStart = 0;
	  this.params = {};
	
	  if (route.children && route.children.length) {
	    this.children = route.children.map(function (child) {
	      var instance = new Route(_this3, child, refreshRouter);
	      // get default route
	      if (resolve(instance.path) == '/' || child.default) {
	        if (!_this3.defaultRoute) {
	          _this3.defaultRoute = instance;
	        } else if (_utils.DEBUG) {
	          throw new Error("Can only have one route without path");
	        }
	      }
	
	      return instance;
	    });
	  }
	}
	
	Route.prototype.destroy = function () {
	  this.destroyed = true;
	  this.children.forEach(function (child) {
	    return child.destroy();
	  });
	
	  if (this.mounted) this.unmount();
	};
	
	Route.prototype.mount = function (location, props) {
	  var _this4 = this;
	
	  // console.log("[%s] Is user strict? PN->%s, SP->%s, %s %s",this.route.id, location.pathname, this.strictPath, !!this.strictPath, location.pathname !== this.strictPath);
	  if (this.strictPath && location.pathname !== this.strictPath) {
	    // console.log("navigating to", this.strictPath);
	    navigate(this.strictPath, { replace: true, preserveHash: true, preserveQuery: true });
	    return null;
	  }
	
	  if (this.loading || this.asyncLock) {
	    if (+new Date() - this.loadingStart > 50) return this.getLoader();
	    return null;
	  }
	
	  var mergedProps = (0, _utils.assign)({}, this.params, props);
	
	  // life cycle hook
	  if (!this.mounted && (this.route.onEnter || this.route.onEnterAsync)) {
	    var canceled = false;
	
	    if (this.route.onEnter) {
	      this.route.onEnter(function (a, b) {
	        canceled = true;
	        _this4.unmount();
	        navigate(a, b);
	      }, mergedProps);
	    } else {
	      (function () {
	        _this4.asyncLock = true;
	        _this4.loadingStart = +new Date();
	        var done = function done(err) {
	          if (_this4.mounted) {
	            _this4.asyncLock = false;
	            if (err) return _this4.unmount();
	            _this4.refreshRouter();
	          }
	        };
	        (0, _setImmediate.setImmediate)(function () {
	          _this4.route.onEnterAsync(done, function (a, b) {
	            done(true);
	            navigate(a, b);
	          }, mergedProps);
	        });
	      })();
	    }
	
	    if (canceled) return null;
	  }
	
	  // load async component if needed
	  if (!this.baseComponent) {
	    this.loading = true;
	    this.loadingStart = +new Date();
	    this.route.componentAsync(function (asyncComponent) {
	      if (!asyncComponent && _utils.DEBUG) throw new Error("'componentAsync' must return valid component as callback argument");
	      _this4.loading = false;
	      _this4.baseComponent = asyncComponent;
	      _this4.mounted && _this4.refreshRouter();
	    });
	  }
	
	  this.mounted = true;
	
	  if (this.baseComponent && !this.loading && !this.asyncLock) {
	    this.loadingStart = 0;
	    return (0, _preact.$)(this.baseComponent, mergedProps, this.matchedChild && this.matchedChild.mount(location));
	  }
	
	  this.loadingTimer = setTimeout(function () {
	    if (_this4.loading || _this4.asyncLock) _this4.refreshRouter();
	  }, 50);
	
	  return null;
	};
	
	Route.prototype.unmount = function () {
	  var wasMounted = this.mounted;
	  // reset state
	  this.mounted = false;
	  this.asyncLock = false;
	  this.loading = false;
	  this.loadingStart = 0;
	  clearTimeout(this.loadingTimer);
	  wasMounted && this.route.onLeave && this.route.onLeave(navigate);
	};
	
	Route.prototype.match = function (location) {
	  var _this5 = this;
	
	  if (this.destroyed || !this.matcher) return false;
	
	  // (/settings/account, /settings) -> /account
	  var pathname = resolveDiff(location.pathname, this.lineage);
	  if (!pathname) {
	    // there is no more path to match on - don't match (will probably match the default route)
	    return false;
	  }
	
	  var match = this.matcher.exec(pathname);
	  var isStrict = !this.strictMatcher || this.strictMatcher.test(pathname);
	  // console.log(`ROUTE(${this.isStringPath ? 1 : 0})[${this.matcher}]: ${pathname} -> [${this.matcher}] ${match ? "MATCH!" : "MISS"}`);
	  if (!match) return false;
	
	  if (this.children) {
	    var matchedChild = this.matchChildren(location);
	
	    if (matchedChild) {
	      // console.log(`ROUTE(${this.isStringPath ? 1 : 0})[${this.matcher}]: matched child ${matchedChild.matcher}`);
	      if (this.matchedChild && this.matchedChild !== matchedChild) {
	        this.matchedChild.unmount();
	      }
	      this.matchedChild = matchedChild;
	    } else if (isStrict && this.defaultRoute) {
	      // console.log("Strict match - choosing default route", this.defaultRoute.matcher);
	      this.matchedChild = this.defaultRoute;
	      return true;
	    } else {
	      // console.log("no child could be matched", this.route.id);
	      return false;
	    }
	  } else if (!isStrict) {
	    // console.log("not strict and no children - ignoring", this.route.id, this.strictMatcher);
	    // not a real match
	    return false;
	  }
	
	  var params = this.params = {};
	  // extract params
	  if (match.length > 1) {
	    if (this.isStringPath) {
	      match.slice(1).forEach(function (value, index) {
	        if (_this5.paramNames[index]) params[_this5.paramNames[index]] = value;
	      });
	    } else {
	      params.params = match.slice(1);
	    }
	  }
	
	  return true;
	};
	
	Route.prototype.getLoader = function () {
	  return this.route.loader === null ? null : this.route.loader && (0, _preact.$)(this.route.loader) || this.parent.getLoader();
	};
	
	Route.prototype.matchChildren = function (location) {
	  if (!this.children) return;
	
	  return matchRoute(this.children, location);
	};
	
	Route.prototype.preparePath = function () {
	  var _this6 = this;
	
	  var regex = void 0;
	
	  if (this.isStringPath) {
	    var pathRegex = this.path.replace(/[\-\[\]\/\{}\(\)\+\.\\\^\$\|]/g, "\\$&").replace(/\/?:([^/:?#]+)/gi, function (match, g1) {
	      _this6.paramNames.push(g1);
	      var paramRegex = '([^\/]+)?';
	      if (match.indexOf('/') === 0) paramRegex = '\/?' + paramRegex;
	
	      return paramRegex;
	    }).replace(/\*/g, '.*');
	    regex = new RegExp('^' + pathRegex);
	    this.strictMatcher = new RegExp('^' + (this.lineage == '/' ? '' : this.lineage) + pathRegex + '/?$');
	  } else {
	    regex = this.route.path;
	  }
	  // console.log("path (%s) created matcher %s and strict matcher %s", this.path, regex, this.strictMatcher || null);
	  this.matcher = regex;
	  return regex;
	};
	
	function matchRoute(routes, location, props) {
	  // iterate route and search for a match
	  var matchedRoute = void 0;
	  routes.some(function (route) {
	    var matched = route.match(location);
	
	    if (matched) {
	      // console.log("Matched Path!", route.matcher, route.path);
	      matchedRoute = route;
	      return true;
	    }
	    return false;
	  });
	
	  return matchedRoute;
	}
	
	function resolve() {
	  var joined = [];
	  var i = 0;
	  while (i < arguments.length) {
	    var item = arguments[i] || '';
	    joined.push(item.replace(/^\/|\/$/g, ''));
	    i++;
	  }
	
	  return '/' + joined.filter(function (x) {
	    return !!x;
	  }).join('/');
	}
	
	function resolveDiff(path, lineage) {
	  lineage = resolve(lineage);
	  if (lineage == '/') return path;
	  return resolve(path).replace(lineage, '');
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.historyMiddleware = historyMiddleware;
	exports.navigate = navigate;
	exports.go = go;
	
	var _history = __webpack_require__(15);
	
	var _utils = __webpack_require__(6);
	
	var _urlFormat = __webpack_require__(16);
	
	var NAVIGATION_INTERNAL_ACTION = '@@trixion_history/navigate_internal';
	
	exports.default = historyMiddleware;
	
	/**
	 * @param {Function} store
	 * @param {Object} [opts]
	 * @param {Boolean} opts.replace - whether to replace to new path or to push
	 * @param {Boolean} opts.scrollToTop = true - whether to scroll to the top of the page on nav change
	 * @param {Boolean} opts.preserveQuery = false - whether to leave the query string intact  when only pathname changes
	 * @param {Boolean} opts.preserveHash = false - whether to leave the hash intact when only pathname changes
	 * @param {Boolean} opts.noBoundary = false - if tru, will allow going back outside the app
	 */
	
	function historyMiddleware(store, opts) {
	  var history = new _history.History({
	    onChange: function onChange(url) {
	      return store({ type: NAVIGATION_INTERNAL_ACTION, payload: { url: url } });
	    }
	  });
	
	  return function (state, action) {
	    // console.log("ACTION", action);
	    if (action.type !== NAVIGATION_INTERNAL_ACTION) return;
	
	    var url = action.payload.url;
	
	    var options = (0, _utils.assign)({ scrollToTop: true }, opts, action.payload);
	
	    if (typeof url == 'number') {
	      history.go(url, options);
	    } else {
	      url = url || '';
	      url = (0, _utils.parseUri)(url);
	
	      var parsedUri = {
	        hash: url.hash || (options.preserveHash ? location.hash.replace(/^#/, '') : undefined),
	        pathname: url.pathname,
	        search: url.search || (options.preserveQuery ? location.search.replace(/^\?/, '') : undefined)
	      };
	
	      if (parsedUri.pathname === location.pathname && parsedUri.search === location.search && parsedUri.hash === location.hash) {
	        return;
	      }
	
	      var formattedUrl = (0, _urlFormat.format)(parsedUri);
	
	      history.update(formattedUrl, options);
	      return { url: formattedUrl };
	    }
	  };
	}
	
	/**
	 * Navigate action creator
	 *
	 * @param {String} url
	 * @param {Object} [opts]
	 * @return {Object} action
	 */
	function navigate(url) {
	  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  opts.url = url;
	  return {
	    type: NAVIGATION_INTERNAL_ACTION,
	    payload: opts
	  };
	}
	
	function go(index) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  index = parseInt(index);
	  // ignore NaN
	  if (index !== index) return;
	
	  options.url = index;
	
	  return {
	    type: NAVIGATION_INTERNAL_ACTION,
	    payload: options
	  };
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.History = History;
	function History(_ref) {
	  var onChange = _ref.onChange;
	
	  if (onChange) {
	    window.addEventListener('popstate', function (event) {
	      return onChange(event.state);
	    }, false);
	  }
	
	  this.history = window.history;
	}
	
	History.prototype.update = function (newUrl, options) {
	  var url = window.history.state;
	
	  if (url && newUrl === url || options.replace) {
	    this.replace(newUrl);
	  } else {
	    this.push(newUrl);
	  }
	
	  // Scroll to the top after we update the page
	  if (options.scrollToTop !== false) window.scroll(0, 0);
	};
	
	History.prototype.go = function (index, options) {
	  if (!window.history.state && options.noBoundary !== true) return;
	
	  if (this.history.go) {
	    this.history.go(index);
	  } else if (index < 0) {
	    this.history.back();
	  }
	};
	
	History.prototype.push = function (url) {
	  if (this.history.pushState) {
	    //noinspection JSCheckFunctionSignatures
	    this.history.pushState(url, null, url);
	  } else {
	    // this will happen only on really really old browsers
	    window.location = url;
	  }
	};
	
	History.prototype.replace = function (url) {
	  if (this.history.replaceState) {
	    //noinspection JSCheckFunctionSignatures
	    this.history.replaceState(url, null, url);
	  } else {
	    // this will happen only on really really old browsers
	    window.location.replace(url);
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.format = format;
	function format(urlObj) {
	  return ['protocol', 'auth', 'hostname', 'port', 'pathname', 'search', 'hash'].map(function (key) {
	    switch (key) {
	      case 'protocol':
	        return urlObj.protocol ? urlObj.protocol + '://' : '';
	      case 'auth':
	        return urlObj.auth ? urlObj.auth + '@' : '';
	      case 'port':
	        return urlObj.port ? ':' + urlObj.port : '';
	      case 'search':
	        return urlObj.search ? '?' + urlObj.search : '';
	      case 'hash':
	        return urlObj.hash ? '#' + urlObj.hash : '';
	      case 'hostname':
	        return urlObj[key] || '';
	      case 'pathname':
	        return '/' + (urlObj[key] || '').replace(/^\//, '');
	    }
	  }).join('');
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=trixion.js.map