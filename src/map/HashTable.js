/* eslint no-magic-numbers: 0 */

import Collection from '../Collection';
import { isObject } from '../helpers';

const hasherProp = Symbol('hasher');

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
export default class HashTable extends Collection {

    /**
     * Set the hashing function and the bucket capacity.
     * A capacity is required as we want to even distribute values into buckets.
     *
     * @param {Function} hasher
     * @param {Number} capacity
     */
    constructor(hasher, capacity) {
        super(capacity);

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
     * @inheritdoc
     */
    [Symbol.iterator]() {
        return this.items[Symbol.iterator]();
    }

    /**
     * Returns true if the defined value exists within a bucket.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    contains(value) {
        return (this.getBucket(this.hash(value)).indexOf(value) >= 0);
    }

    /**
     * @inheritdoc
     */
    empty() {
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
    getBucket(key) {
        return this.hasBucket(key) ? this.items.get(key) : [];
    }

    /**
     * Returns true if a bucket exists at the defined key.
     *
     * @param {Number} key
     * @returns {Boolean}
     */
    hasBucket(key) {
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
    hash(value) {
        return this[hasherProp].call(null, value, this.capacity, this.size, this.itemSize);
    }

    /**
     * Returns an array of all keys in the table.
     *
     * @returns {Number[]}
     */
    keys() {
        let keys = [];

        for (let key of this.items.keys()) {
            keys.push(key);
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
    put(value) {
        let key = this.hash(value);

        // Insert into bucket
        if (this.hasBucket(key)) {
            this.getBucket(key).push(value);

        // Too many buckets
        } else if (this.isFull()) {
            this.error('{class} is full; too many buckets');

        // Create the bucket
        } else {
            this.items.set(key, [value]);

            // Increase bucket size
            this.size += 1;
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
    putAll(values) {
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
    remove(value) {
        let key = this.hash(value),
            bucket = this.getBucket(key),
            result = false,
            index = -1;

        if (!bucket.length) {
            return result;
        }

        // Remove the value
        index = bucket.indexOf(value);

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
    removeAll(values) {
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
    removeBucket(key) {
        if (!this.hasBucket(key)) {
            return false;
        }

        // Decrease sizes
        this.itemSize -= this.getBucket(key).length;
        this.size -= 1;

        return this.items.delete(key);
    }
}

/**
 * Attempt to extract a value to use as the hash key.
 * If the value is an object, check within the "hash", "key", and "id" properties.
 * Else, we can assume the value is a string or integer.
 *
 * @param {*} value
 * @returns {String|Number}
 */
export function hashKey(value) {
    return isObject(value) ? value.hash || value.key || value.id || null : value;
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
export function modulo(value, capacity) {
    let key = hashKey(value),
        hash = key;

    if (typeof key === 'string') {
        hash = 0;

        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
    }

    return (hash * (hash + 3)) % capacity;
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
export function djb2(value, capacity) {
    let key = hashKey(value),
        hash = 5381;

    for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) + hash) ^ key.charCodeAt(i);
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
export function sdbm(value, capacity) {
    let key = hashKey(value),
        hash = 0;

    for (let i = 0; i < key.length; i++) {
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
export function sax(value, capacity) {
    let key = hashKey(value),
        hash = 0;

    for (let i = 0; i < key.length; i++) {
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
export function fnv(value, capacity) {
    let key = hashKey(value),
        hash = 0;

    for (let i = 0; i < key.length; i++) {
        hash = (hash * 16777619) ^ key.charCodeAt(i);
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
export function oat(value, capacity) {
    let key = hashKey(value),
        hash = 0;

    for (let i = 0; i < key.length; i++) {
        hash = key.charCodeAt(i);
        hash += (hash << 10);
        hash ^= (hash >> 6);
    }

    hash += (hash << 3);
    hash ^= (hash >> 11);
    hash += (hash << 15);

    return Math.abs(hash % capacity);
}
