/* eslint-disable */
/**
 * This is a modified version of:
 * https://github.com/kbjr/polyfill.js
 *
 * Promise Polyfill
 */

var _global = window;

//
// State constants
//
var PENDING      = void(0);
var UNFULFILLED  = 0;
var FULFILLED    = 1;
var FAILED       = 2;

//
// The Promise constructor
//
// @param {callback} the callback that defines the process to occur
//
var Promise = _global.Promise = function(callback) {
  // Check that a function argument was given
  if (typeof callback !== 'function') {
    throw new TypeError('Promise constructor takes a function argument');
  }

  // Check that a new instance was created, and not just a function call was made
  if (! (this instanceof Promise)) {
    throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
  }

  var self = this;

  // The queue of functions waiting for the promise to resolve/reject
  utils.defineProperty(this, 'funcs', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: [ ]
  });

  // The queue of functions waiting for the promise to resolve/reject
  utils.defineProperty(this, 'value', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: void(0)
  });

  // Call the function, passing in the resolve and reject functions
  try {
    callback(resolve, reject);
  } catch (err) {
    reject(err);
  }

  // The {resolve} callback given to the handler function
  function resolve(value) {
    resolvePromise(self, value);
  }

  // The {reject} callback given to the handler function
  function reject(value) {
    rejectPromise(self, value);
  }
};

// --------------------------------------------------------

//
// Assigns handler function(s) for the resolve/reject events
//
// @param {onResolve} optional; a function called when the promise resolves
// @param {onReject} optional; a function called when the promise rejects
// @return Promise
//
Promise.prototype.then = function(onResolve, onReject) {
  var self = this;

  // Create the new promise that will be returned
  var promise = new Promise(function( ) { });

  // If the promise is already completed, call the callback immediately
  if (this.state) {
    setImmediate(function() {
      invokeFunction(self, promise, (self.state === FULFILLED ? onResolve : onReject));
    });
  }

  // Otherwise, add the functions to the list
  else {
    this.funcs.push(promise, onResolve, onReject);
  }

  return promise;
};

//
// Assigns a handler function for the reject event
//
// @param {onReject} a function called when the promise rejects
// @return Promise
//
Promise.prototype.catch = function(onReject) {
  return this.then(null, onReject);
};

// --------------------------------------------------------

//
// Returns an immediately resolving promise which resolves with {value}. If {value} is
// a thenable, the new promise will instead follow the given thenable.
//
// @param {value} the value to resolve with
// @return Promise
//
Promise.resolve = function(value) {
  try {
    var then = utils.thenable(value);
  } catch (err) {
    return new Promise(autoResolve);
  }

  var callback = then
    ? function(resolve, reject) {
    then.call(value, resolve, reject);
  }
    : autoResolve;

  function autoResolve(resolve) {
    resolve(value);
  }

  return new Promise(callback);
};

//
// Returns an immediately rejected promise
//
// @param {reason} the reason for the rejection
// @return Promise
//
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  });
};

//
// Returns a new promise which resolves/rejects based on an array of given promises
//
// @param {promises} the promises to handle
// @return Promise
//
Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    if (! Array.isArray(promises)) {
      resolve([ ]);
      return;
    }

    var values = [ ];
    var finished = false;
    var remaining = promises.length;

    promises.forEach(function(promise, index) {
      var then = utils.thenable(promise);

      if (! then) {
        onResolve(promise);
        return;
      }

      then.call(promise,
        function onResolve(value) {
          remaining--;
          values[index] = value;
          checkIfFinished();
        },
        function onReject(reason) {
          finished = true;
          reject(reason);
        }
      );
    });

    function checkIfFinished() {
      if (! finished && ! remaining) {
        finished = true;
        resolve(values);
      }
    }
  });
};

//
// Returns a new promise which resolve/rejects as soon as the first given promise resolves
// or rejects
//
// @param {promises} an array of promises
// @return Promise
//
Promise.race = function(promises) {
  var promise = new Promise(function() { });

  promises.forEach(function(childPromise) {
    childPromise.then(
      function(value) {
        resolvePromise(promise, value);
      },
      function(value) {
        rejectPromise(promise, value);
      }
    );
  });

  return promise;
};

// --------------------------------------------------------

//
// Determines how to properly resolve the promise
//
// @param {promise} the promise
// @param {value} the value to give the promise
// @return void
//
function resolvePromise(promise, value) {
  if (! handleThenable(promise, value)) {
    fulfillPromise(promise, value);
  }
}

//
// When a promise resolves with another thenable, this function handles delegating control
// and passing around values
//
// @param {child} the child promise that values will be passed to
// @param {value} the thenable value from the previous promise
// @return boolean
//
function handleThenable(promise, value) {
  var done, then;

  // Attempt to get the `then` method from the thenable (if it is a thenable)
  try {
    if (! (then = utils.thenable(value))) {
      return false;
    }
  } catch (err) {
    rejectPromise(promise, err);
    return true;
  }

  // Ensure that the promise did not attempt to fulfill with itself
  if (promise === value) {
    rejectPromise(promise, new TypeError('Circular resolution of promises'));
    return true;
  }

  try {
    // Wait for the thenable to fulfill/reject before moving on
    then.call(value,
      function(subValue) {
        if (! done) {
          done = true;

          // Once again look for circular promise resolution
          if (value === subValue) {
            rejectPromise(promise, new TypeError('Circular resolution of promises'));
            return;
          }

          resolvePromise(promise, subValue);
        }
      },
      function(subValue) {
        if (! done) {
          done = true;

          rejectPromise(promise, subValue);
        }
      }
    );
  } catch (err) {
    if (! done) {
      done = true;

      rejectPromise(promise, err);
    }
  }

  return true;
}

//
// Fulfill the given promise
//
// @param {promise} the promise to resolve
// @param {value} the value of the promise
// @return void
//
function fulfillPromise(promise, value) {
  if (promise.state !== PENDING) {return;}

  setValue(promise, value);
  setState(promise, UNFULFILLED);

  setImmediate(function() {
    setState(promise, FULFILLED);
    invokeFunctions(promise);
  });
}

//
// Reject the given promise
//
// @param {promise} the promise to reject
// @param {value} the value of the promise
// @return void
//
function rejectPromise(promise, value) {
  if (promise.state !== PENDING) {return;}

  setValue(promise, value);
  setState(promise, UNFULFILLED);

  setImmediate(function() {
    setState(promise, FAILED);
    invokeFunctions(promise);
  });
}

//
// Set the state of a promise
//
// @param {promise} the promise to modify
// @param {state} the new state
// @return void
//
function setState(promise, state) {
  utils.defineProperty(promise, 'state', {
    enumerable: false,
    // According to the spec: If the state is UNFULFILLED (0), the state can be changed;
    // If the state is FULFILLED (1) or FAILED (2), the state cannot be changed, and therefore we
    // lock the property
    configurable: (! state),
    writable: false,
    value: state
  });
}

//
// Set the value of a promise
//
// @param {promise} the promise to modify
// @param {value} the value to store
// @return void
//
function setValue(promise, value) {
  utils.defineProperty(promise, 'value', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: value
  });
}

//
// Invoke all existing functions queued up on the promise
//
// @param {promise} the promise to run functions for
// @return void
//
function invokeFunctions(promise) {
  var funcs = promise.funcs;

  for (var i = 0, c = funcs.length; i < c; i += 3) {
    invokeFunction(promise, funcs[i], funcs[i + promise.state]);
  }

  // Empty out this list of functions as no one function will be called
  // more than once, and we don't want to hold them in memory longer than needed
  promise.funcs.length = 0;
}

//
// Invoke one specific function for the promise
//
// @param {promise} the promise the function belongs too (that .then was called on)
// @param {child} the promise return from the .then call; the next in line
// @param {func} the function to call
// @return void
//
function invokeFunction(promise, child, func) {
  var value = promise.value;
  var state = promise.state;

  // If we have a function to run, run it
  if (typeof func === 'function') {
    try {
      value = func(value);
    } catch (err) {
      rejectPromise(child, err);
      return;
    }

    resolvePromise(child, value);
  }

  else if (state === FULFILLED) {
    resolvePromise(child, value);
  }

  else if (state === FAILED) {
    rejectPromise(child, value);
  }
}

// --------------------------------------------------------

var utils = (function(exports) {

  //
  // If the given value is a valid thenable, return the then method; otherwise, return false
  //
  exports.thenable = function(value) {
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      try {
        var then = value.then;
      } catch (err) {
        throw err;
      }

      if (typeof then === 'function') {
        return then;
      }
    }

    return false;
  }

  //
  // Shim Object.defineProperty if needed; This will never run in Node.js land, but
  // is here for when we browserify
  //
  exports.defineProperty = function(obj, prop, opts) {
    if (Object.defineProperty) {
      try {
        return Object.defineProperty(obj, prop, opts);
      } catch (err) { }
    }

    if (opts.value) {
      obj[prop] = opts.value;
    }
  };

  return exports;
}({ }));
