'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.hashKey = hashKey;
exports.modulo = modulo;
exports.djb2 = djb2;
exports.sdbm = sdbm;
exports.sax = sax;
exports.fnv = fnv;
exports.oat = oat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Collection2 = require('../Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

var _helpers = require('../helpers');

var hasherProp = Symbol('hasher');

/**
 * A `HashTable` is a data structure used to map keys to buckets of values. The table uses a hash function
 * to compute a unique hash key, which maps to a bucket, into which a value would be placed into.
 *
 * The implementation uses separate chaining, coupled with arrays, to handle collision resolution,
 * instead of using open addressing and some type of probing mechanism. It attempts to uniformly distribute values
 * across multiple buckets, using arrays of values within each bucket, instead of mapping a single value
 * to a single hash key.
 *
 * If a data structure is required for mapping keys to values, the built-in `Map` and `WeakMap` should suffice.
 *
 * @property {Map} items - Mapping of keys to buckets
 * @property {Number} itemSize - Count of all items across all buckets
 */

var HashTable = (function (_Collection) {
    _inherits(HashTable, _Collection);

    /**
     * Set the hashing function and the bucket capacity.
     * A capacity is required as we want to even distribute values into buckets.
     *
     * @param {Function} hasher
     * @param {Number} capacity
     */

    function HashTable(hasher, capacity) {
        _classCallCheck(this, HashTable);

        _get(Object.getPrototypeOf(HashTable.prototype), 'constructor', this).call(this, capacity);

        if (typeof hasher !== 'function') {
            this.error('{class} requires a valid hashing function');
        }

        if (typeof capacity !== 'number' || capacity <= 0) {
            this.error('{class} requires a bucket capacity');
        }

        this.items = new Map();
        this.itemSize = 0;
        this[hasherProp] = hasher;
    }

    /**
     * Attempt to extract a value to use as the hash key.
     * If the value is an object, check within the "hash", "key", and "id" properties.
     * Else, we can assume the value is a string or integer.
     *
     * @param {*} value
     * @returns {String|Number}
     */

    /**
     * {@inheritdoc}
     */

    _createClass(HashTable, [{
        key: Symbol.iterator,
        value: function value() {
            return this.items[Symbol.iterator]();
        }

        /**
         * Returns true if the defined value exists within a bucket.
         *
         * @param {*} value
         * @returns {Boolean}
         */
    }, {
        key: 'contains',
        value: function contains(value) {
            return this.getBucket(this.hash(value)).indexOf(value) >= 0;
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'empty',
        value: function empty() {
            this.items.clear();
            this.itemSize = 0;
            this.size = 0;

            return this;
        }

        /**
         * Returns a bucket at the defined key. If no bucket exists, an empty array is returned.
         *
         * @param {Number} key
         * @returns {*[]}
         */
    }, {
        key: 'getBucket',
        value: function getBucket(key) {
            return this.hasBucket(key) ? this.items.get(key) : [];
        }

        /**
         * Returns true if a bucket exists at the defined key.
         *
         * @param {Number} key
         * @returns {Boolean}
         */
    }, {
        key: 'hasBucket',
        value: function hasBucket(key) {
            return this.items.has(key);
        }

        /**
         * Utilize the hashing function to generate a hash key based on the data passed in.
         * This hash key will determine the bucket to place all items into.
         *
         * The current table size and capacity are passed as arguments to the hashing function.
         *
         * @param {*} value
         * @returns {Number}
         */
    }, {
        key: 'hash',
        value: function hash(value) {
            return this[hasherProp].call(null, value, this.capacity, this.size, this.itemSize);
        }

        /**
         * Returns an array of all keys in the table.
         *
         * @returns {Number[]}
         */
    }, {
        key: 'keys',
        value: function keys() {
            var keys = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.items.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    keys.push(key);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return keys;
        }

        /**
         * Place a value into a specific bucket, which is determined by computing a hash key from the
         * defined hashing function.
         *
         * If the bucket does not exist, it will be created, else if the capacity is full,
         *  an error will be thrown.
         *
         * @param {*} value
         * @returns {HashTable}
         */
    }, {
        key: 'put',
        value: function put(value) {
            var key = this.hash(value);

            // Insert into bucket
            if (this.hasBucket(key)) {
                this.getBucket(key).push(value);

                // Doesn't exist yet
            } else {

                    // Too many buckets
                    if (this.isFull()) {
                        this.error('{class} is full; too many buckets');

                        // Create the bucket
                    } else {
                            this.items.set(key, [value]);

                            // Increase bucket size
                            this.size += 1;
                        }
                }

            // Increase item size
            this.itemSize += 1;

            return this;
        }

        /**
         * Place multiple values into a bucket.
         *
         * @param {*[]} values
         * @returns {HashTable}
         */
    }, {
        key: 'putAll',
        value: function putAll(values) {
            values.forEach(this.put.bind(this));

            return this;
        }

        /**
         * Remove an individual value from the bucket that it was placed into, based on the hash key.
         * Will return true if the value existed in the bucket and was removed.
         *
         * @param {*} value
         * @returns {Boolean}
         */
    }, {
        key: 'remove',
        value: function remove(value) {
            var key = this.hash(value),
                bucket = this.getBucket(key),
                result = false;

            if (!bucket.length) {
                return result;
            }

            // Remove the value
            var index = bucket.indexOf(value);

            if (index >= 0) {
                bucket.splice(index, 1);

                // Decrease item size
                this.itemSize -= 1;

                result = true;
            }

            // Update bucket
            this.items.set(key, bucket);

            return result;
        }

        /**
         * Remove multiple values from their assigned buckets.
         *
         * @param {*[]} values
         * @returns {Boolean}
         */
    }, {
        key: 'removeAll',
        value: function removeAll(values) {
            values.forEach(this.remove.bind(this));

            return true;
        }

        /**
         * Remove a bucket at the defined key, and delete all values within it.
         * Will return true if the bucket existed and was removed.
         *
         * @param {Number} key
         * @returns {Boolean}
         */
    }, {
        key: 'removeBucket',
        value: function removeBucket(key) {
            if (!this.hasBucket(key)) {
                return false;
            }

            // Decrease sizes
            this.itemSize -= this.getBucket(key).length;
            this.size -= 1;

            return this.items['delete'](key);
        }
    }]);

    return HashTable;
})(_Collection3['default']);

exports['default'] = HashTable;

function hashKey(value) {
    return (0, _helpers.isObject)(value) ? value.hash || value.key || value.id || null : value;
}

/**
 * An implementation of the Knuth variant modulo based hashing algorithm.
 * This function should primarily be used when computing against integers.
 *
 * @link https://www.cs.hmc.edu/~geoff/classes/hmc.cs070.200101/homework10/hashfuncs.html
 *
 * @param {String|Number} value
 * @param {Number} capacity
 * @returns {Number}
 */

function modulo(value, capacity) {
    var key = hashKey(value),
        hash = key;

    if (typeof key === 'string') {
        hash = 0;

        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
    }

    return hash * (hash + 3) % capacity;
}

/**
 * An implementation of the Dan J. Bernstein 2 (djb2) hashing algorithm.
 *
 * @link http://www.cse.yorku.ca/~oz/hash.html
 *
 * @param {String} value
 * @param {Number} capacity
 * @returns {Number}
 */

function djb2(value, capacity) {
    var key = hashKey(value),
        hash = 5381;

    for (var i = 0; i < key.length; i++) {
        hash = (hash << 5) + hash ^ key.charCodeAt(i);
    }

    return Math.abs(hash % capacity);
}

/**
 * An implementation of the SDBM hashing algorithm.
 *
 * @link http://www.cse.yorku.ca/~oz/hash.html
 *
 * @param {String} value
 * @param {Number} capacity
 * @returns {Number}
 */

function sdbm(value, capacity) {
    var key = hashKey(value),
        hash = 0;

    for (var i = 0; i < key.length; i++) {
        hash = key.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
    }

    return Math.abs(hash % capacity);
}

/**
 * An implementation of the Shift-Add-XOR hashing algorithm.
 *
 * @link http://en.literateprograms.org/Hash_function_comparison_%28C,_sh%29#Shift-add-XOR
 *
 * @param {String} value
 * @param {Number} capacity
 * @returns {Number}
 */

function sax(value, capacity) {
    var key = hashKey(value),
        hash = 0;

    for (var i = 0; i < key.length; i++) {
        hash ^= (hash << 5) + (hash >> 2) + key.charCodeAt(i);
    }

    return Math.abs(hash % capacity);
}

/**
 * An implementation of the Fowler/Noll/Vo hashing algorithm.
 *
 * @link http://www.isthe.com/chongo/tech/comp/fnv/
 *
 * @param {String} value
 * @param {Number} capacity
 * @returns {Number}
 */

function fnv(value, capacity) {
    var key = hashKey(value),
        hash = 0;

    for (var i = 0; i < key.length; i++) {
        hash = hash * 16777619 ^ key.charCodeAt(i);
    }

    return Math.abs(hash % capacity);
}

/**
 * An implementation of the Jenkins one-at-a-time hashing algorithm.
 *
 * @link https://en.wikipedia.org/wiki/Jenkins_hash_function
 *
 * @param {String} value
 * @param {Number} capacity
 * @returns {Number}
 */

function oat(value, capacity) {
    var key = hashKey(value),
        hash = 0;

    for (var i = 0; i < key.length; i++) {
        hash = key.charCodeAt(i);
        hash += hash << 10;
        hash ^= hash >> 6;
    }

    hash += hash << 3;
    hash ^= hash >> 11;
    hash += hash << 15;

    return Math.abs(hash % capacity);
}