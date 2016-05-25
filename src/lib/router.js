'use strict';

import {store} from './store';
import {navigate as navigateHistory} from './store/history';
import {DEBUG, assign} from './utils';
import {setImmediate, clearImmediate} from '../polyfill/set-immediate';
import {$} from './preact';

const navigate = (url, opts) => store(navigateHistory(url, opts));

let router = null;

export function createRouter(routes, refreshRouter) {
  if (!routes) {
    if (DEBUG) throw new Error("Router expects routes definition");
    return () => null;
  }

  routes = Array.isArray(routes) ? routes : [routes];

  if (router) router.destroy();

  router = new Router(routes, refreshRouter);

  return function (location, props) {
    return router.getComponent(location, props);
  };
}


function Router(routes, refreshRouter) {
  this.defaultRoute = null;
  this.matchedChild = null;

  this.refreshRouter = refreshRouter;

  this.routes = routes.map(route => {
    let instance = new Route(this, route, this.refreshRouter);
    // get default route
    if (resolve(route.path) == '/' || route.default) {
      if (!this.defaultRoute) {
        this.defaultRoute = instance;
      }
      else if (DEBUG) {
        throw new Error("Can only have one route without path");
      }
    }
    return instance;
  });
}

Router.prototype.destroy = function () {
  this.destroyed = true;
  this.routes.forEach(route => route.destroy());
};

Router.prototype.getLoader = function () {
  return null;
};

Router.prototype.getComponent = function (location, props) {
  // console.log("GETTING COMPONENT ----------------------------------");
  let matchedRoute = matchRoute(this.routes, location);

  if (this.matchedChild) {
    this.matchedChild.unmount();
    this.matchedChild = null;
  }

  if (matchedRoute) {
    this.matchedChild = matchedRoute;
    return this.matchedChild.mount(location, props, () => !this.destroyed && this.refreshRouter());
  }
  else if (this.defaultRoute) {
    // console.log("seems strict - mounting default");
    return this.defaultRoute.mount(location, props, () => !this.destroyed && this.refreshRouter());
  }

  if (DEBUG) console.warn("No route was matched and no default route was defined");
  return null;
};


function Route(parent, route, refreshRouter) {
  if (DEBUG) {
    if (!route) throw new Error("Missing route");
    if (route.component && route.componentAsync || (!route.component && !route.componentAsync)) {
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
  this.strictPath = route.strictPath ? `${parent.path == '/' ? '' : parent.path}/${route.strictPath.replace(/^\//, '')}` : '';
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
    this.children = route.children.map(child => {
      let instance = new Route(this, child, refreshRouter);
      // get default route
      if (resolve(instance.path) == '/' || child.default) {
        if (!this.defaultRoute) {
          this.defaultRoute = instance;
        }
        else if (DEBUG) {
          throw new Error("Can only have one route without path");
        }
      }

      return instance;
    });
  }
}

Route.prototype.destroy = function () {
  this.destroyed = true;
  this.children.forEach(child => child.destroy());

  if (this.mounted) this.unmount();
};

Route.prototype.mount = function (location, props) {
  // console.log("[%s] Is user strict? PN->%s, SP->%s, %s %s",this.route.id, location.pathname, this.strictPath, !!this.strictPath, location.pathname !== this.strictPath);
  if (this.strictPath && location.pathname !== this.strictPath) {
    // console.log("navigating to", this.strictPath);
    navigate(this.strictPath, {replace: true, preserveHash: true, preserveQuery: true});
    return null;
  }

  if (this.loading || this.asyncLock) {
    if (+new Date - this.loadingStart > 50) return this.getLoader();
    return null;
  }

  let mergedProps = assign({}, this.params, props);

  // life cycle hook
  if (!this.mounted && (this.route.onEnter || this.route.onEnterAsync)) {
    let canceled = false;

    if (this.route.onEnter) {
      this.route.onEnter((a, b) => {
        canceled = true;
        this.unmount();
        navigate(a, b);
      }, mergedProps);
    }
    else {
      this.asyncLock = true;
      this.loadingStart = +new Date;
      let done = err => {
        if (this.mounted) {
          this.asyncLock = false;
          if (err) return this.unmount();
          this.refreshRouter();
        }
      };
      setImmediate(() => {
        this.route.onEnterAsync(done, (a, b) => {
          done(true);
          navigate(a, b);
        }, mergedProps);
      });
    }

    if (canceled) return null;
  }

  // load async component if needed
  if (!this.baseComponent) {
    this.loading = true;
    this.loadingStart = +new Date;
    this.route.componentAsync(asyncComponent => {
      if (!asyncComponent && DEBUG) throw new Error("'componentAsync' must return valid component as callback argument");
      this.loading = false;
      this.baseComponent = asyncComponent;
      this.mounted && this.refreshRouter();
    });
  }

  this.mounted = true;

  if (this.baseComponent && !this.loading && !this.asyncLock) {
    this.loadingStart = 0;
    return $(this.baseComponent, mergedProps, this.matchedChild && this.matchedChild.mount(location));
  }

  this.loadingTimer = setTimeout(() => {
    if (this.loading || this.asyncLock) this.refreshRouter();
  }, 50);

  return null;
};

Route.prototype.unmount = function () {
  let wasMounted = this.mounted;
  // reset state
  this.mounted = false;
  this.asyncLock = false;
  this.loading = false;
  this.loadingStart = 0;
  clearTimeout(this.loadingTimer);
  wasMounted && this.route.onLeave && this.route.onLeave(navigate);
};

Route.prototype.match = function (location) {
  if (this.destroyed || !this.matcher) return false;

  // (/settings/account, /settings) -> /account
  let pathname = resolveDiff(location.pathname, this.lineage);
  if (!pathname) {
    // there is no more path to match on - don't match (will probably match the default route)
    return false;
  }

  let match = this.matcher.exec(pathname);
  let isStrict = !this.strictMatcher || this.strictMatcher.test(pathname);
  // console.log(`ROUTE(${this.isStringPath ? 1 : 0})[${this.matcher}]: ${pathname} -> [${this.matcher}] ${match ? "MATCH!" : "MISS"}`);
  if (!match) return false;

  if (this.children) {
    let matchedChild = this.matchChildren(location);

    if (matchedChild) {
      // console.log(`ROUTE(${this.isStringPath ? 1 : 0})[${this.matcher}]: matched child ${matchedChild.matcher}`);
      if (this.matchedChild && this.matchedChild !== matchedChild) {
        this.matchedChild.unmount();
      }
      this.matchedChild = matchedChild;
    }
    else if (isStrict && this.defaultRoute) {
      // console.log("Strict match - choosing default route", this.defaultRoute.matcher);
      this.matchedChild = this.defaultRoute;
      return true;
    }
    else {
      // console.log("no child could be matched", this.route.id);
      return false;
    }
  }
  else if (!isStrict) {
    // console.log("not strict and no children - ignoring", this.route.id, this.strictMatcher);
    // not a real match
    return false;
  }

  let params = this.params = {};
  // extract params
  if (match.length > 1) {
    if (this.isStringPath) {
      match
        .slice(1)
        .forEach((value, index) => {
          if (this.paramNames[index]) params[this.paramNames[index]] = value;
        });
    }
    else {
      params.params = match.slice(1);
    }
  }

  return true;
};

Route.prototype.getLoader = function () {
  return this.route.loader === null ? null : this.route.loader && $(this.route.loader) || this.parent.getLoader();
};

Route.prototype.matchChildren = function (location) {
  if (!this.children) return;

  return matchRoute(this.children, location);
};

Route.prototype.preparePath = function () {
  let regex;

  if (this.isStringPath) {
    let pathRegex = this.path
      .replace(/[\-\[\]\/\{}\(\)\+\.\\\^\$\|]/g, "\\$&")
      .replace(/\/?:([^/:?#]+)/gi, (match, g1) => {
        this.paramNames.push(g1);
        let paramRegex = '([^\/]+)?';
        if (match.indexOf('/') === 0) paramRegex = '\/?' + paramRegex;

        return paramRegex;
      })
      .replace(/\*/g, '.*');
    regex = new RegExp('^' + pathRegex);
    this.strictMatcher = new RegExp(`^${this.lineage == '/' ? '' : this.lineage}${pathRegex}\/?$`);
  }
  else {
    regex = this.route.path;
  }
  // console.log("path (%s) created matcher %s and strict matcher %s", this.path, regex, this.strictMatcher || null);
  this.matcher = regex;
  return regex;
};

function matchRoute(routes, location, props) {
  // iterate route and search for a match
  let matchedRoute;
  routes.some(route => {
    let matched = route.match(location);

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
  let joined = [];
  let i = 0;
  while (i < arguments.length) {
    let item = arguments[i] || '';
    joined.push(item.replace(/^\/|\/$/g, ''));
    i++;
  }

  return '/' + joined.filter(x => !!x).join('/');
}

function resolveDiff(path, lineage) {
  lineage = resolve(lineage);
  if (lineage == '/') return path;
  return resolve(path).replace(lineage, '');
}
