'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isObject = isObject;
var toString = Object.prototype.toString;

/**
 * Returns true if the value is an object and not an array.
 *
 * @param {*} value
 * @returns {Boolean}
 */

function isObject(value) {
  return value && toString.call(value) === '[object Object]';
}