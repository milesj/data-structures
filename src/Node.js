const toString = Object.prototype.toString;

/**
 * A `Node` is an individual unit found within all larger data structures.
 * Its primary purpose is to wrap data (from the client) and define meta data properties.
 *
 * @property {String|Number} key
 * @property {String|Number|Object} value
 */
export default class Node {

    /**
     * Store the data in the node. Only strings, numbers, and objects are permitted.
     *
     * If the data is an object, a key will need to be extracted from the object,
     * which by default is found on the "key" property. A `getNodeKey` function can
     * otherwise be defined on the object to return the key. This key will be used
     * in all comparison expressions within advanced structures, like trees and graphs.
     *
     * If the key is invalid, or empty, an error will be thrown.
     *
     * @param {String|Number|Object} data
     */
    constructor(data) {
        let type = typeof data,
            keyName = this.keyName();

        // Objects
        if (data && toString.call(data) === '[object Object]') {
            this.value = data;
            this.key = (typeof data.getNodeKey === 'function')
                ? data.getNodeKey.call(data, keyName)
                : data[keyName];

        // Strings, Integers
        } else if (data !== '' && type === 'string' || type === 'number') {
            this.value = this.key = data;

        } else {
            throw new Error('A non-empty string, number, or object is required for nodes');
        }

        // Validate the key
        if (!this.isKeyValid()) {
            throw new Error('A valid key is required for nodes');
        }
    }

    /**
     * Returns true if the key is a valid non-empty value.
     *
     * @returns {Boolean}
     */
    isKeyValid() {
        let key = this.key;

        return (key || key === 0 || key === 0.0);
    }

    /**
     * Returns the name of the "key" or "index" property.
     * The key is mandatory for advanced data structures like trees and graphs.
     *
     * @returns {String|Number}
     */
    keyName() {
        return 'key';
    }
}
