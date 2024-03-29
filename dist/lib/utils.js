"use strict";

/**
 * CLI utilities and helpers.
 *
 * @author J. Scott Smith
 * @license BSD-2-Clause-FreeBSD
 * @module lib/utils
 */

/**
 * Adaped from feathers-plus/feathers-hooks-common
 * https://github.com/feathers-plus/feathers-hooks-common/blob/master/lib/common/get-by-dot.js
 */
function getByDot(obj, path) {
  if (path.indexOf('.') === -1) {
    return obj[path];
  }
  return path.split('.').reduce((obj1, part) => typeof obj1 === 'object' ? obj1[part] : undefined, obj);
}
exports.getByDot = getByDot;

/**
 * Adapted from feathers-plus/feathers-hooks-common
 * https://github.com/feathers-plus/feathers-hooks-common/blob/master/lib/common/set-by-dot.js
 */
function setByDot(obj, path, value, ifDelete) {
  // if (ifDelete) {
  //   console.log('DEPRECATED. Use deleteByDot instead of setByDot(obj,path,value,true). (setByDot)')
  // }

  if (path.indexOf('.') === -1) {
    obj[path] = value;
    if (value === undefined && ifDelete) {
      delete obj[path];
    }
    return;
  }
  const parts = path.split('.');
  const lastIndex = parts.length - 1;
  return parts.reduce((obj1, part, i) => {
    if (i !== lastIndex) {
      if (!Object.prototype.hasOwnProperty.call(obj1, part) || typeof obj1[part] !== 'object') {
        obj1[part] = {};
      }
      return obj1[part];
    }
    obj1[part] = value;
    if (value === undefined && ifDelete) {
      delete obj1[part];
    }
    return obj1;
  }, obj);
}
exports.setByDot = setByDot;
function sleep(ms = 1, value) {
  return new Promise(resolve => setTimeout(resolve, ms)).then(() => value);
}
exports.sleep = sleep;