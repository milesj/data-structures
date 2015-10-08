import Structure from './Structure';

/**
 * @property {Node[]} items
 * @property {number} size
 */
export default class Collection extends Structure {
    constructor() {
        super();

        this.items = [];
        this.size = 0;
    }

    /**
     * Iterate over all the items in the collection.
     */
    [Symbol.iterator]() {
        let length = this.items.length,
            i = 0;

        return {
            next() {
                if (i === length) {
                    return { done: true };
                } else {
                    return { value: this.items[i].value };
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
     * @returns {boolean}
     */
    isEmpty() {
        return (this.size === 0);
    }

    /**
     * Returns the size of the collection by counting all nodes.
     *
     * @returns {number}
     */
    size() {
        return this.size;
    }
}
