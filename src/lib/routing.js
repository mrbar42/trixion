'use strict';


import {createRouter} from './router';
import {createClass, $} from './preact';
import {store} from './store';
import {navigate as navigateHistory} from './store/history';
import {assign, cl} from './utils';

const navigate = url => store(navigateHistory(url));

export const Router = createClass({
  getInitialState() {
    return {
      url: ''
    };
  },
  componentDidMount() {
    this.handleChange = state => {
      if (state.url !== this.state.url) {
        this.setState({url: state.url});
      }
    };
    store.subscribe(this.handleChange);
  },
  componentWillUnmount() {
    store.unsubscribe(this.handleChange);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.routes !== this.routes) {
      this.updateRouter(nextProps.routes);
    }
  },
  updateRouter(routes) {
    this.routes = routes || this.props.routes;
    this.router = createRouter(this.routes, () => {
      // console.log("[REFRESH ROUTER]");
      this.forceUpdate();
    });
  },
  render(props) {
    if (!this.router) this.updateRouter();
    return this.router(location, props);
  }
});

export function Link(props) {
  let {to, options, activeClass = 'active'} = props;

  return $('span', assign({
    onClick: () => navigate(to, options)
  }, props, {
    to: undefined,
    options: undefined,
    activeClass: undefined,
    className: cl(
      location.pathname == to.toString().replace(/(\?|#).*/g, '') > -1 && activeClass,
      props.className
    )
  }));
}
