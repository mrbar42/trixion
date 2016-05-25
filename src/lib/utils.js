'use strict';

// join classes
export function cl() {
  let args = Array.prototype.slice.call(arguments);

  return args.filter(x => !!x).join(' ');
}

export const DEBUG = process.env.NODE_ENV != 'production';

export function parseUri(uri) {
  let location = {};

  uri = uri.replace(/^(\w+:)?\/\//, '');

  let pathIndex = uri.indexOf('/');
  let searchIndex = uri.indexOf('?');
  let hashIndex = uri.indexOf('#');

  if (pathIndex == -1) {
    location.pathname = '';
  }
  else {
    location.pathname = uri.slice(pathIndex, searchIndex == -1 ? uri.length : searchIndex);
  }
  if (searchIndex != -1) {
    location.search = uri.slice(searchIndex + 1, hashIndex == -1 ? uri.length : hashIndex);
  }
  if (hashIndex != -1) {
    location.hash = uri.slice(hashIndex + 1, uri.length);
  }

  return location;
}


export const assign = Object.assign || function (target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    const output = Object(target);
    for (let index = 1; index < arguments.length; index++) {
      const source = arguments[index];
      if (source !== undefined && source !== null) {
        for (const nextKey in source) {
          if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }
    return output;
  };
