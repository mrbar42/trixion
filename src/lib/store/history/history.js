'use strict';

export function History({onChange}) {
  if (onChange) {
    window.addEventListener('popstate', event => onChange(event.state), false);
  }

  this.history = window.history;
}

History.prototype.update = function (newUrl, options) {
  let url = window.history.state;

  if (url && newUrl === url || options.replace) {
    this.replace(newUrl);
  }
  else {
    this.push(newUrl);
  }

  // Scroll to the top after we update the page
  if (options.scrollToTop !== false) window.scroll(0, 0);
};

History.prototype.go = function (index, options) {
  if (!window.history.state && options.noBoundary !== true) return;

  if (this.history.go) {
    this.history.go(index);
  }
  else if (index < 0) {
    this.history.back();
  }
};

History.prototype.push = function (url) {
  if (this.history.pushState) {
    //noinspection JSCheckFunctionSignatures
    this.history.pushState(url, null, url);
  }
  else {
    // this will happen only on really really old browsers
    window.location = url;
  }
};

History.prototype.replace = function (url) {
  if (this.history.replaceState) {
    //noinspection JSCheckFunctionSignatures
    this.history.replaceState(url, null, url);
  }
  else {
    // this will happen only on really really old browsers
    window.location.replace(url);
  }
};
