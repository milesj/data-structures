'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpers = require('./helpers');

/**
 * A `Node` is an individual unit found within all larger data structures.
 * Its primary purpose is to wrap data (from the client) and define meta data properties.
 *
 * @property {String|Number} key
 * @property {String|Number|Object} value
 */

var Node = (function () {

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

    function Node(data) {
        _classCallCheck(this, Node);

        var type = typeof data,
            keyName = this.keyName();

        // Objects
        if ((0, _helpers.isObject)(data)) {
            this.value = data;
            this.key = typeof data.getNodeKey === 'function' ? data.getNodeKey.call(data, keyName) : data[keyName];

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

    _createClass(Node, [{
        key: 'isKeyValid',
        value: function isKeyValid() {
            var key = this.key,
                type = typeof key;

            return (key || key === 0 || key === 0.0) && (type === 'string' || type === 'number');
        }

        /**
         * Returns the name of the "key" or "index" property.
         * The key is mandatory for advanced data structures like trees and graphs.
         *
         * @returns {String|Number}
         */
    }, {
        key: 'keyName',
        value: function keyName() {
            return 'key';
        }
    }]);

    return Node;
})();

exports['default'] = Node;
module.exports = exports['default'];