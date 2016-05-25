# General API With Examples
 
Index:

 - App rendering
 - Creating components
 - Router
 - Store
 - Store persistence
 - Misc
 
## App rendering

```javascript
import {Router, render, $} from 'trixion';
import routes from './routes';

// $ = createElement

render($(Router, {routes}), document.getElementById('app'));
```

##### with hot reload

```javascript
import {Router, render, $} from 'trixion';

import routes from './routes';

// $ = createElement

const root = document.getElementById('app');
const renderer = routes => render($(Router, {routes}), root);

// Normal render
if (!__DEV__) {
  renderer(routes);
}
// Dev render
else {
  // refresh app routes on file change
  module.hot.accept('./routes', () => renderer(require('./routes').default));

  renderer(routes);
}

```

## Creating components

You you've never heard of it, please read about [preact](https://github.com/developit/preact).

**note** - createElement = E = $  
meaning all of these are the same:
  
  - `createElement(Button)`
  - `E(Button)`
  - `$(Button)`
  - `h(Button)` - is similar, but doesn't support object literal components.

I personally use `$` because it looks cleaner.
if you use jQuery you might not like it... up to.

```javascript
import {DOM, Component, h, createClass, createElement, preact} from 'trixion';

// included for backward compatibility but you probalby don't want to use:
// createClass
// createElement
// h - original function from preact
// preact - reference to the preact exports object

// good ol' createClass
const Component = createClass({
  render() {
    return DOM.span(null, "My Component");
  }
})

// props as first argument
const FunctionComponent = props => DOM.div(null, "My Component");

// with direct destructoring
const FunctionComponent2 = ({onClick, target}) => DOM.button({onClick}, text || "Submit");

// Don't panic - but object literal is also included
// must be rendered with 'E' though (look at the next example)
const ComponentLiteral = {
  componentWillReceiveProps(nextProps) {
    // do stuff
  },
  render() {
    return 
  }
}

// es6 class
class ClassComponent extends Component {
    render() {
        return DOM.div(null,
          E(FunctionComponent),
          E(FunctionComponent2),
          E(ComponentLiteral)
        )
    }
}

```

## Router (or in-app navigation)

### Navigation

```javascript
import {navigate, go, back} from 'trixion';

// simple navigation to path
navigate('/faq');

// using the replace options 
// replacing state means that the current page will not be remembered
navigate('/faq', {replace: true});

// go back
back();

// go back -n pages to history
go(-1) // = back()
go(-2) // go back 2 pages etc

// By default, back will not exceed the boundaries of the app
// calling back many times will go back until the entry point to the app
// to override this behavior, pass `noBoundary` option to the back call
back({noBoundary: true});

// normaly the query and hash will be overrided
// to preserve them you may use `preserveSearch` and `preserveHash` respectedally
// example: /home?query=string#hello -> /faq?query=string#hello 
navigate('/faq', {
  preserveSearch: true, 
  preserveHash: true
});
// note - including search/hash will override the override
```

## Routes

**important** nested routes are passed through `props.children`. always render children on route components.

###### Route options
 
  - `component` - valid component  
  - `componentAsync(cb)` - load component asynchronously and return it to the callback
  - `onEnter(navigate, props)` - life cycle hook before the route is mounted.  
    `props` will contain params if there are any, props can be mutated freely here. 
     calling navigate will cancel current mount
  - `onEnterAsync(done, navigate, props)` - same as `onEnter` but first argument is `done` callback.  
     adding "truthy" error value to the callback will cancel the mount 
  - `onLeave(navigate)`
  - `loader` - valid component to show while component is loading or locked by async life cycle  
     loader is inherited, meaning it applies to all nested children and children of children.
     the loader can be explicitly disabled by passing `null`.
  - `path`
      - `String` - always relative to parent. leading slash can be omitted.  
        special chars: `?` `*`  
        named params: `:paramName` - available as `props["paramName"]`
      - `RegExp` - matching is done on the __relative path__ without the paren't path   
         the path will always contain heading slash.  
         if any groups are matched they will be available is Array as `props.params`. 
      - `undefined` | '/' - blank path = default route  
         **note:** only one route can be default
  - `strictPath` - enforce strict path upon matching. used mainly for RegRxp path where  
     multiple uris can be matched bu only a specific one is wanted.
  - `children` - nesting of child routes
  - `default` - explicitly declare as default amongst same level routes

notes:
  - routes are matched by declaration order.

```javascript
import {DOM} from 'trixion';

let Index = ({children}) => {
  return DOM.div(null,
    DOM.span(null, "Fixed navigation bar"),
    children, // nested route will be rendered here
    DOM.span(null, "Fixed footer")
  );
}

export default [
  {
    path: '/',
    component: Index,
    loader: Loader,
    children: [
      {
        // no path = default route
        component: Home
      },
      {
        path: 'dashboard',
        componentAsync: cb => {
          require.ensure([], require => {
            cb(require('./views/dashboard').default);
          }, "views/dashboard")
        }
      },
      {
        path: 'profile/:user',
        loader: null, // disable loader explicitly
        onEnterAsync(done, navigate, props) {
         // param value is stored in
         // props.user
         // call `done` when async tasks are completed
         setTimeout(done, 0);
        },
        componentAsync(cb) {
         require.ensure([], require => cb(require('./views/profile').default), 'views/profile');
        }
      },
      { 
        path: /\/(faq|frequently-?asked-?questions)$/i,
        strictPath: '/faq', // example: `/frequently-asked-questions` will be matched and replaced with /faq
        onEnter(navigate, props) {
          // any group match is available as
          // props.params = ['group1', 'group2', ...]
        },
        componentAsync(cb) {
          require.ensure([], require => cb(require('src/views/faq').default), 'views/faq');
        }
      }
    ]
  },
  {
      path: '*',
      component: NotFound
  }
]
```


## Store

1. The state is deeply frozen in development, so there is a performance penalty.
2. change event is emitted only if the state was actually changed
3. arrays are not merged - they will override the previous value entirely
4. whenever using path - the last item in the path is an object. it wasn't meant for values.

```javascript
import {dispatch, store, addReducer} from 'trixion';

let initialState = {};
store('boot', initialState);

// dispatch is sugar over store
dispatch({type: 'SESSION_LOADING', payload: {}})
// same as
store({type: 'SESSION_LOADING', payload: {}})

// get state
let currentState = store();
// also available via sugar
store.getState();
// get state at specific path
store('session.user')

let changeHandler = state => {
                      // invoked on every state change with updated state 
                    };
let subscription = store.subscribe(changeHandler);

// unsubscribe
store.unsubscribe(changeHandler);
// or (if you wat to avoid keeping refs to the handler)
subscription.unsubscribe();


addReducer((state, action) => {
  switch (action.type) {
  case 'SESSION_LOADING':
    // only return the difference
    // to delete a property - simpley assign null value e.g. {loading: null}
    return {loading: true}
  }
})


// access to state can be scoped (these seem crazy if its your first time)
// path in state is in string with dot notation
// if a given path doesn't exist, it will be crated implicitly

store.subscribe('session.user', state => {
  // the state is actually state.session.user
  // change emits only on changes to that path and its children
})

let initialReducerState = {loading false};
addReducer('session', (state, action) => {
  // state is actually state.session
  // all returned data will be merged respected to state.session...
})

// reducers tree
// this method allows you to update state directly with string path
store('session', {loading: true})
// means: state.session.loading = true

// delete property
store('lists.items', {firstItem: null})
// this will delete state.lists.items.firstItem
// if state.lists.items would be left empty, it would get delete as well
```

## Store persistence

This is a pretty unique feature built into trixion.  
it allows you to persist sections of the state onto `localStorage` and `sessionStorage`.

There is no action needed more than calling the attach method  
the mirroring is completely transparent.

please note that localStorage is shared across tabs  
every change you'll make in one tab will be reflected to the other (pretty cool).  
think about facebook's chat, if you expand it on one tab - it will expand on all.


```javascript
import {attachPersistence, attachSessionPersistence} from 'trixion';

// this will make state.session survive a tab reload
// upon loading the old state will be loaded and every change is mirrored
attachSessionPersistence('session');

// this will make state.persistent survive "forever"
// cool note - this will sync all tabs with your app
// to have the same state in the given path 
attachSessionPersistence('persistent');
```


## Misc

#### cl

this is a common classes helpers.  
it takes string values and concatenates them to a className.  
falsy values such as `null` `undefined` `false` `0` are ignored.  

```javascript
import {cl} from 'trixion';

export default {
  render({className, active}) {
    
    return DOM.div({
      className: cl(
        "message-box"
        className,
        active && "active"
      )
    })    
  }
}
```

