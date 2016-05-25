'use strict';

import {History} from './history';
import {parseUri, assign} from '../../utils';
import {format} from '../../helpers/url-format';

const NAVIGATION_INTERNAL_ACTION = '@@trixion_history/navigate_internal';

export default historyMiddleware;

/**
 * @param {Function} store
 * @param {Object} [opts]
 * @param {Boolean} opts.replace - whether to replace to new path or to push
 * @param {Boolean} opts.scrollToTop = true - whether to scroll to the top of the page on nav change
 * @param {Boolean} opts.preserveQuery = false - whether to leave the query string intact  when only pathname changes
 * @param {Boolean} opts.preserveHash = false - whether to leave the hash intact when only pathname changes
 * @param {Boolean} opts.noBoundary = false - if tru, will allow going back outside the app
 */
export function historyMiddleware(store, opts) {
  let history = new History({
    onChange: url => store({type: NAVIGATION_INTERNAL_ACTION, payload: {url: url}})
  });

  return (state, action) => {
    // console.log("ACTION", action);
    if (action.type !== NAVIGATION_INTERNAL_ACTION) return;

    let {url} = action.payload;
    let options = assign({scrollToTop: true}, opts, action.payload);

    if (typeof url == 'number') {
      history.go(url, options);
    }
    else {
      url = url || '';
      url = parseUri(url);

      let parsedUri = {
        hash: url.hash || (options.preserveHash ? location.hash.replace(/^#/, '') : undefined),
        pathname: url.pathname,
        search: url.search || (options.preserveQuery ? location.search.replace(/^\?/, '') : undefined)
      };

      if (parsedUri.pathname === location.pathname
        && parsedUri.search === location.search
        && parsedUri.hash === location.hash) {
        return;
      }

      let formattedUrl = format(parsedUri);

      history.update(formattedUrl, options);
      return {url: formattedUrl};
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
export function navigate(url, opts = {}) {
  opts.url = url;
  return {
    type: NAVIGATION_INTERNAL_ACTION,
    payload: opts
  };
}

export function go(index, options = {}) {
  index = parseInt(index);
  // ignore NaN
  if (index !== index) return;

  options.url = index;

  return {
    type: NAVIGATION_INTERNAL_ACTION,
    payload: options
  };
}
