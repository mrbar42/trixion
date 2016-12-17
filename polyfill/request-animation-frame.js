'use strict';

/* eslint-disable */
/**
 * this is a slightly modified version of:
 *
 *  request-frame - requestAnimationFrame & cancelAnimationFrame polyfill for
 *   optimal cross-browser development.
 *    Version:  v1.4.0
 *     License:  MIT
 *      Copyright Julien Etienne 2015 All Rights Reserved.
 *        github:  https://github.com/julienetie/request-frame
 *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 */

if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
  var vendors, aF, rqAF, assignedRequestAnimationFrame, assignedCancelAnimationFrame, previousTime, mozRAF, mozCAF, hasMozMismatch, func;

  (function () {

    /**
     * hasIOS6RequestAnimationFrameBug.
     * @See {@Link https://gist.github.com/julienetie/86ac394ec41f1271ff0a}
     * - for Commentary.
     * @Copyright 2015 - Julien Etienne.
     * @License: MIT.
     */
    var hasIOS6RequestAnimationFrameBug = function hasIOS6RequestAnimationFrameBug() {
      var webkitRAF = window.webkitRequestAnimationFrame,
          rAF = window.requestAnimationFrame,


      // CSS/ Device with max for iOS6 Devices.
      hasMobileDeviceWidth = screen.width <= 768 ? true : false,


      // Only supports webkit prefixed requestAnimtionFrane.
      requiresWebkitprefix = !(webkitRAF && rAF),


      // iOS6 webkit browsers don't support performance now.
      hasNoNavigationTiming = window.performance ? false : true,
          iOS6Notice = 'setTimeout is being used as a substitiue for' + 'requestAnimationFrame due to a bug within iOS 6 builds',
          hasIOS6Bug = requiresWebkitprefix && hasMobileDeviceWidth && hasNoNavigationTiming;

      function bugCheckresults(timingFnA, timingFnB, notice) {
        if (timingFnA || timingFnB) {
          console.warn(notice);
          return true;
        } else {
          return false;
        }
      }

      function displayResults() {
        if (hasIOS6Bug) {
          return bugCheckresults(webkitRAF, rAF, iOS6Notice);
        } else {
          return false;
        }
      }

      return displayResults();
    };

    /**
     * Native clearTimeout function.
     * @return {Function}
     */


    var clearTimeoutWithId = function clearTimeoutWithId(id) {
      clearTimeout(id);
    };

    /**
     * Based on a polyfill by Erik, introduced by Paul Irish &
     * further improved by Darius Bacon.
     * @see  {@link http://www.paulirish.com/2011/
       * requestanimationframe-for-smart-animating}
     * @see  {@link https://github.com/darius/requestAnimationFrame/blob/
       * master/requestAnimationFrame.js}
     * @callback {Number} Timestamp.
     * @return {Function} setTimeout Function.
     */


    var setTimeoutWithTimestamp = function setTimeoutWithTimestamp(callback) {
      var immediateTime = Date.now(),
          lapsedTime = Math.max(previousTime + 16, immediateTime);
      return setTimeout(function () {
        callback(previousTime = lapsedTime);
      }, lapsedTime - immediateTime);
    };

    /**
     * Queries the native function, prefixed function
     * or use the setTimeoutWithTimestamp function.
     * @return {Function}
     */


    var queryRequestAnimationFrame = function queryRequestAnimationFrame() {
      if (Array.prototype.filter) {
        assignedRequestAnimationFrame = window['request' + aF] || window[vendors.filter(function (vendor) {
          if (window[vendor + rqAF] !== undefined) return vendor;
        }) + rqAF] || setTimeoutWithTimestamp;
      } else {
        return setTimeoutWithTimestamp;
      }
      if (!hasIOS6RequestAnimationFrameBug()) {
        return assignedRequestAnimationFrame;
      } else {
        return setTimeoutWithTimestamp;
      }
    };

    /**
     * Queries the native function, prefixed function
     * or use the clearTimeoutWithId function.
     * @return {Function}
     */


    var queryCancelAnimationFrame = function queryCancelAnimationFrame() {
      var cancellationNames = [];
      if (Array.prototype.map) {
        vendors.map(function (vendor) {
          return ['Cancel', 'CancelRequest'].map(function (cancellationNamePrefix) {
            cancellationNames.push(vendor + cancellationNamePrefix + aF);
          });
        });
      } else {
        return clearTimeoutWithId;
      }

      /**
       * Checks for the prefixed cancelAnimationFrame implementation.
       * @param  {Array} prefixedNames - An array of the prefixed names.
       * @param  {Number} i - Iteration start point.
       * @return {Function} prefixed cancelAnimationFrame function.
       */
      function prefixedCancelAnimationFrame(prefixedNames, i) {
        var cancellationFunction;
        for (; i < prefixedNames.length; i++) {
          if (window[prefixedNames[i]]) {
            cancellationFunction = window[prefixedNames[i]];
            break;
          }
        }
        return cancellationFunction;
      }

      // Use truthly function
      assignedCancelAnimationFrame = window['cancel' + aF] || prefixedCancelAnimationFrame(cancellationNames, 0) || clearTimeoutWithId;

      // Check for iOS 6 bug
      if (!hasIOS6RequestAnimationFrameBug()) {
        return assignedCancelAnimationFrame;
      } else {
        return clearTimeoutWithId;
      }
    };

    /**
     * The type value "request" singles out firefox 4 - 10 and
     * assigns the setTimeout function if plausible.
     */

    // The only vendor prefixes required.
    vendors = ['moz', 'webkit'];


    // Disassembled timing function abbreviations.
    aF = 'AnimationFrame';
    rqAF = 'Request' + aF;


    // Initial time of the timing lapse.
    previousTime = 0;
    mozRAF = window.mozRequestAnimationFrame;
    mozCAF = window.mozCancelAnimationFrame;


    // Checks for firefox 4 - 10 function pair mismatch.
    hasMozMismatch = mozRAF && !mozCAF;

    // Date.now polyfill, mainly for legacy IE versions.

    if (!Date.now) {
      Date.now = function () {
        return new Date().getTime();
      };
    }if (hasMozMismatch) {
      window.requestAnimationFrame = setTimeoutWithTimestamp;
      window.cancelAnimationFrame = clearTimeoutWithId;
    } else {
      window.requestAnimationFrame = queryRequestAnimationFrame();
      window.cancelAnimationFrame = queryCancelAnimationFrame();
    }
  })();
}