/* globals __DEV__ */
'use strict';

//############ IMPORTS ############//
import {store, addReducer} from './store';
import {createConnector} from './reselect-connect';

import {Router, Link} from './routing';
import History, {navigate as navigateHistory, go as goHistory} from './store/history';


//############ INITIALIZE ############//
// store middlewares
addReducer(History(store));

// store connector
const connect = createConnector(store);

// navigate action
const navigate = url => store(navigateHistory(url));
const go = (index, options) => store(goHistory(index), options);
const back = options => store(goHistory(-1, options));

// namespace
const app = {};

//############ EXPORTS ############//
// preact
export {
  DOM,
  $,
  createElement,
  E,
  Component,
  createClass,
  render,
  findDOMNode,
  unmountComponentAtNode,
  h,
  preact,
  PropTypes
} from './preact';
// reselect
export {createSelector} from './reselect';
export {cl, DEBUG, parseUri, assign} from './utils';
export {setImmediate, clearImmediate} from '../polyfill/set-immediate';
// store persistence
export {attachPersistence, attachSessionPersistence} from './store-persistence';
// framework base
export {
  // store
  store as dispatch,
  store,
  addReducer,
  // reselect
  connect,
  // routing
  Router,
  Link,
  // navigation
  navigate,
  go,
  back,
  // global namespace
  app
};

export default module.exports;
