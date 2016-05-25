# Polyfills

Trixion includes an helpers polyfill function and a set of polyfills
that ease enriching older browsers.
 
Polyfills are meant to be lean, and to be loaded only on demand in parallel.

On a modern browser no polyfill should be loaded at all.
 
#### Basic usage

```javascript
  import {polyfill, MODERN_2016} from 'trixion/polyfill';
  
  polyfill(MODERN_2016, () => {
    // safe to require my app
    require('./app');
  })
```

To ease usage of the polyfills, there is a built in preset you may use.

### Preset: MODERN_2016

  total size of all chunks:
  minified: `19.9kb`
  minified+gzip: `6.4kb`

  the preset is divided into smaller chunks that will load individually on demand. 
  
  - ES5
  - JSON
  - Storage
  - BASE64
  - RequestAnimationFrame
  - SetImmediate
  - Promise
  - ObjectAssign
  - MapSet

  
scroll down to see the content of each polyfill

## Adding your own polyfills

the polyfill function expects array of arrays where each nested array has two function like so:

```javascript
    import {polyfill} from 'trixion/polyfill';
    
    const myPromisePolyfill = [
    // first function should return true if feature is missing
    () => typeof Promise == 'undefined' || !Promise.resolve,
    
    // second function will be invoked if the first function returned true
    // the simplest method is to use webpack's lazy load   
    cb => require.ensure([], require => cb(require('./promise-polyfill')), 'polyfill-promise')
    ]
    
    const myPreset = [
      myPromisePolyfill
    ]
    
    polyfill(myPreset, () => {
      // safe to require app
      require('./app')
    })
```


## Built in polyfills

Its also possible to use individual polyfills. 

usage example:

```javascript
  import {polyfill} from 'trixion/polyfill';
  
  const myPreset = [
    polyfill.ES5
    polyfill.JSON
    polyfill.Promise  
  ];
  
  polyfill(myPreset, () => {
    // safe to require my app
    require('./app');
  })
```

##### ES5 
  - `Object.getOwnPropertyNames`
  - `Object.create`
  - `Object.getPrototypeOf`
  - `Object.defineProperty`
  - `Object.defineProperties`
  - `Object.keys`
  - `Function.prototype.bind`
  - `Array.isArray`
  - `Array.prototype.indexOf`
  - `Array.prototype.lastIndexOf`
  - `Array.prototype.every`
  - `Array.prototype.some`
  - `Array.prototype.forEach`
  - `Array.prototype.map`
  - `Array.prototype.filter`
  - `Array.prototype.reduce`
  - `Array.prototype.reduceRight`
  - `String.prototype.trim`
  - `Date.now`
  - `Date.prototype.toISOString`
  
##### JSON
  - `JSON.stringify`
  - `JSON.parse`
  - `Date.prototype.toJSON`
  - `Boolean.prototype.toJSON`
  - `Number.prototype.toJSON`
  - `String.prototype.toJSON`

##### Storage
  - `window.localStorage`
  - `window.sessionStorage`

##### BASE64
  - `window.atob`
  - `window.btoa`

##### RequestAnimationFrame
  - `window.requestAnimationFrame`
  - `window.cancelAnimationFrame`
  
##### SetImmediate
  - `window.setImmediate`
  - `window.clearImmediate`
  
##### Promise
  - `Promise`
  
##### ObjectAssign
  - `Object.assign`
  
##### MapSet
  - `Map`
  - `Set`
  - `WeakMap`
