# Trixion

Trixion is an ultra light modern web stack.
 its goal is to produce a very light bundle yet to support latest conventions.
 
\*\* **Trixion is still in beta stage - please use with care and submit any issue you encounter** \*\*
 
## TL;TR

clone the [trixion-starter](https://github.com/mrbar42/trixion-starter) project  
and instead of any other dependency you may use (react, react-dom, redux, react-redux, react-router etc)  
simply use trixion - its all in there. The whole thing weights ~15kb though (batteries included).

check out the [examples](https://github.com/mrbar42/trixion/tree/master/docs)

## What's in it?
 most of the functionality of react, redux, routing, hot-reload...
 
 yet the only dependency is [preact](https://github.com/developit/preact).  
 preact is baked in, so the only package you need is trixion.
 
 - Component based UI
    - createClass
    - es6 classes
    - functional component
    - object literal components (yes yes... its true)
 - state store
    - simple reducers declaration
    - scoped reducers (on sections of the state)
    - serializing/de-serializing state
    - reducers tree support
    - scoped subscription
    - store connectors with memoization (like reselect + redux-react)
    - persistent state middleware (with local/session storage)
 - html5 routing
    - nested routes 
    - async component loading (optional loader) 
    - lifecycle hooks 
    - async lifecycle hooks!
    - pushing and replacing state without reload
 - some built in helpers
 - lean modern polyfills
  
 
## But why?
 
Here is a small table that shows the bundle sizes of common boilerplate  
 projects for component based + routing + global state store frontend.

All bundles were made with `NODE_ENV=production` and `-p` flag for webpack.

 
 Project                  | stargazers | minified | min+gzip 
:---                      | :---: | ---: | ---:
[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)  | 5713 | 561.3kb | 170.3kb
[react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)  | 3864 | 103.8kb | 38.9kb
[react-slingshot](https://github.com/coryhouse/react-slingshot)  | 3262 | 210.4kb | 59.3kb
[react-isomorphic-starterkit](https://github.com/RickWong/react-isomorphic-starterkit)  | 1874 | 229.4kb | 66.8kb
[28kb-react-redux-routing](https://github.com/matthewmueller/28kb-react-redux-routing)  | 249 | 88kb | 25.9kb
**trixion**  | - | 56.8kb | 15kb

## So, Why should I use it?
 
 well, you don't...  
 Most people doesn't seem to care what their bundle size is.  
 But if any of these apply to you, then know that this project was built for people like you:
  
  - you care about your bundle size 
  - you plan on building large app and understand that small core with lazy loading is the answer
  - you made performance tests and saw the huge impact of large bundles on mobile platforms
  - your DEV environment is too slow to build and reload
  - you're feeling like playing with something new

## Lean web - Here We Come!

  - always be aware of your bundle size
  - as much lazy load as possible
  - check the size of each library you use - here are [couple of methods](https://github.com/mrbar42/trixion/blob/master/docs/DEPENDENCIES.md)

## Not in the scope

Some features are not supported in trixion such as async store middlewares, state loggers,  
 redux related state players/manipulators and many more.
 
The reasons are:
  - Its still in early stages
  - more use cases usually means larger libs that increase bundle size for everyone 
  - simplicity is a bless

# docs

if you've never heard of [react](https://github.com/facebook/react)/[preact](https://github.com/developit/preact),
[redux](https://github.com/reactjs/redux),
[redux-react](https://github.com/reactjs/react-redux),
[html5 routing](https://developer.mozilla.org/en-US/docs/Web/API/History_API)  
you are going to find it somewhat difficult to understand as trixion doesn't include the fundamental explanation.  
Its recommended to read on each of the modules concepts and principles. 
 
###### Resources
 - [docs by examples](https://github.com/mrbar42/trixion/tree/master/docs)
 - [the included polyfills](https://github.com/mrbar42/trixion/blob/master/docs/POLYFILLS.md)
 - [handling your dependencies](https://github.com/mrbar42/trixion/blob/master/docs/DEPENDENCIES.md)

## Exports

Here is a full list of the things that are exported from trixion (lots of them).

###### Components:

  - `DOM`
  - `$`
  - `createElement` - alias of `$`
  - `E` - alias of `$`
  - `Component`
  - `createClass`
  - `render`
  - `findDOMNode`
  - `unmountComponentAtNode`
  - `h`
  - `preact`

###### Store: 

  - `store`
  - `dispatch` - alias of `store`
  - `addReducer`
  - `connect` - store connector
  - `attachPersistence` 
  - `attachSessionPersistence`
  
###### Routing:

  - `Router`
  - `Link`
  - `navigate`
  - `go`
  - `back`
  
###### Misc:

  - `app` - any-purpose global namespace for your use 
  - `cl` - className helper. see examples
  - `assign` - Object.assign like function
  - `setImmediate` 
  - `clearImmediate`
  - `DEBUG` - true if process.env.NODE_ENV !== 'production'
  - `parseUri` - parse uri to pathname, search and hash 

## I want to help!

Contribution would be much appreciated.  
Either by creating pull requests of opening issues.
