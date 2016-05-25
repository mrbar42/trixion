'use strict';

export function createSelector() {
  let dependencies = Array.prototype.slice.call(arguments);
  if (!dependencies.length) throw new Error("Must supply at least one state to props function");
  let resultFunc = dependencies.pop();
  // if no dependencies simply pass state
  if (!dependencies.length) dependencies = [state=>state, (_, props)=>props];

  // prepare dependencies for return value comparison
  let cachedDependencies = dependencies.map(dependency => {
    let lastVal = {};
    return function () {
      let args = Array.prototype.slice.call(arguments);
      let newVal = dependency.apply(null, args);
      if (lastVal !== newVal) {
        //console.log("STATE CHANGED!", lastVal, newVal);
        lastVal = newVal;
        return [true, newVal];
      }
      //console.log("STATE DIDN'T CHANGE!", lastVal, newVal);
      return [false, newVal];
    };
  });

  let lastProps;
  return function (state, props) {
    //console.log("invoking selector with state", JSON.stringify(state).slice(0, 200));
    let collectedDeps = collectDependencies(state, props, cachedDependencies);

    //console.log("Getting props from state",lastProps, collectedDeps, resultFunc);
    if (collectedDeps || !lastProps) {
      //console.log("invoking result func");
      // data has changed = recalculate
      lastProps = resultFunc.apply(null, collectedDeps);
      if (!lastProps || typeof lastProps != 'object') throw new Error("Result function must return object");
      return [true, lastProps];
    }

    return [false, lastProps];
  };
}


function collectDependencies(state, props, dependencies) {
  let changed = false;
  let collectedData = dependencies.map(dependency => {
    let [didChange, data] = dependency(state, props);
    if (didChange) changed = true;
    return data;
  });

  if (changed) return collectedData;
}
