const toString = Object.prototype.toString;

/**
 * Returns true if the value is an object and not an array.
 *
 * @param {*} value
 * @returns {Boolean}
 */
export function isObject(value) {
    return (value && toString.call(value) === '[object Object]');
}
