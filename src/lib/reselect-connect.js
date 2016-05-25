'use strict';

import {assign} from './utils';
import {createClass} from './preact';

export function createConnector(store) {

  return (mapStateToProps, mapDispatchToProps, mergeProps) => component => {

    //console.log("create selector", mapStateToProps, mapDispatchToProps, mergeProps);
    if (!mapDispatchToProps) mapDispatchToProps = dispatch => ({dispatch});
    if (!mergeProps) mergeProps = (a, b, c) => assign({}, a, b, c);

    if (typeof component == 'function') {
      component = createClass({
        render: component
      });
    }

    let hooks = getLifeCycleHooks(component);
    //console.log("component123", new Error().stack);
    let cachedProps;
    let handler = (props) => {
      //console.log("HANDLER - running mapStateToProps", mapStateToProps);
      let hasCached = !!cachedProps;
      let changed = true;
      let stateProps = mapStateToProps && mapStateToProps(store(), props);
      if (Array.isArray(stateProps)) {
        changed = stateProps[0];
        stateProps = stateProps[1];
      }
      let dispatchProps = mapDispatchToProps(store, props);

      let mergedProps = mergeProps(props, stateProps, dispatchProps);
      if (!isObj(mergedProps)) throw new Error("mergeProps function must return onject");
      cachedProps = mergedProps;
      return changed || !hasCached;
    };

    // ### componentWillMount ### //
    let storeListener;
    component.prototype.componentWillMount = function () {
      if (mapStateToProps) {
        //console.log("will mount while mounted - hot reload? - anyways... un-subscribing");
        if (storeListener) store.unsubscribe(storeListener);

        //console.log("Will mount - subscribing");
        storeListener = function () {
          let changed = handler(this.props);
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
}

function getLifeCycleHooks(component) {
  return assign({}, component.render ? component : component.prototype);
}

function isObj(arg) {
  return Object.prototype.toString.call(arg) == '[object Object]';
}
