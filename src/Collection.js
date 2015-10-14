import Structure from './Structure';

/**
 * A `Collection` is an abstract class that defines a collection of nodes.
 *
 * @abstract
 * @property {Number} capacity
 * @property {Node[]} items
 * @property {Number} size
 */
export default class Collection extends Structure {

    /**
     * Set the capacity limit. If the capacity is 0, there is no limit.
     *
     * @param {Number} [capacity]
     */
    constructor(capacity = 0) {
        super();

        this.capacity = capacity;
        this.items = [];
        this.size = 0;
    }

    /**
     * Iterate over all the items in the collection.
     */
    [Symbol.iterator]() {
        let items = this.items,
            size = this.size,
            i = 0;

        return {
            next() {
                if (i === size) {
                    return { done: true };
                } else {
                    return { value: items[i++].value };
                }
            }
        };
    }

    /**
     * Remove all items from the collection.
     *
     * @returns {Collection}
     */
    empty() {
        this.items = [];
        this.size = 0;

        return this;
    }

    /**
     * Returns true if the collection is empty.
     *
     * @returns {Boolean}
     */
    isEmpty() {
        return (this.size === 0);
    }

    /**
     * Return true if a capacity is set, and the capacity is full.
     *
     * @returns {Boolean}
     */
    isFull() {
        return (this.capacity > 0 && this.size >= this.capacity);
    }

    /**
     * Return the collection as an array of values.
     *
     * @returns {Array}
     */
    toArray() {
        let array = [];

        for (let value of this) {
            array.push(value);
        }

        return array;
    }
}
