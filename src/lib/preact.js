'use strict';

import * as preact from 'preact';
let {h, Component} = preact;

let componentPrototype = Component.prototype;

let wrapTag = tag => {
  return function () {
    let args = Array.prototype.slice.call(arguments);
    args.unshift(tag);
    return h.apply(null, args);
  };
};

export function $() {
  if (!arguments[0]) throw new Error("Missing component declaration");

  if (typeof arguments[0].render == 'function' && (!arguments[0].prototype || !arguments[0].prototype.render)) {
    arguments[0] = createClass(arguments[0]);
  }

  return h.apply(null, arguments);
}

export function render(component, node, merge) {
  return preact.render(component, node, merge || node.lastChild);
}

export function createClass(obj) {

  if (obj.__CREF__) return obj.__CREF__;

  function F() {
    Component.apply(this, arguments);
  }

  let p = F.prototype = Object.create(componentPrototype);
  F.prototype.getDOMNode = function () {
    return this.base;
  };
  F.prototype.isMounted = function () {
    return !!this.base;
  };
  for (let i in obj) {
    if ('getDefaultProps' == i) {
      //noinspection JSUnfilteredForInLoop
      F['defaultProps'] = obj[i]();
    }
    //noinspection JSUnfilteredForInLoop
    p[i] = obj[i];
  }

  p.constructor = F;

  Object.defineProperty(obj, '__CREF__', {
    value: F,
    writable: true
  });

  return F;
}

export function unmountComponentAtNode(container) {
  render(h(() => null), container);
}

export function findDOMNode(component) {
  return component.base || null;
}

export {
  Component,
  h,
  $ as createElement,
  $ as E,
  preact
};

const supportedTags = 'a abbr address area article aside audio b base bdi bdo big blockquote ' +
  'body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog ' +
  'div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup ' +
  'hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem ' +
  'meta meter nav noscript object ol optgroup option output p param picture pre progress q rp ' +
  'rt ruby s samp script section select small source span strong style sub summary sup table ' +
  'tbody td textarea tfoot th thead time title tr track u ul var video wbr';

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
export const DOM = supportedTags
  .split(' ')
  .reduce((base, t) => {
    base[t] = wrapTag(t);
    return base;
  }, {});
