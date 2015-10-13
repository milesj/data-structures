import Collection from './adt/Collection';

/**
 * @property {Number} index
 * @property {Number} capacity
 */
export default class Stack extends Collection {
    constructor(capacity = 0) {
        super();

        this.index = 0;
        this.capacity = capacity;
    }

    /**
     * Returns true if the collection contains the specified value.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    contains(value) {
        return (this.indexOf(value) >= 0);
    }

    /**
     * Returns the index of the first occurrence of the specified value in this collection or -1 otherwise.
     *
     * @param {*} value
     * @returns {Number}
     */
    indexOf(value) {
        for (var i = 0; i < this.size; i++) {
            if (this.items[i].value === value) {
                return i;
            }
        }

        return -1;
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
     * Remove and return the top (last) value in the collection, or return null if empty.
     *
     * @returns {*}
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        }

        this.index -= 1;
        this.size -= 1;

        return this.items.pop().value;
    }

    /**
     * Remove and return an array of all values in the collection.
     * Will return them in the pop order.
     *
     * @returns {*[]}
     */
    popAll() {
        let values = [];

        while (this.index) {
            values.push(this.pop());
        }

        return values;
    }

    /**
     * Push a value to the top (end) of the collection.
     * Throws an error if the collection is full.
     *
     * @param {*} value
     * @returns {Stack}
     */
    push(value) {
        if (this.isFull()) {
            this.error('{class} is full');
        }

        this.items[this.index] = this.createNode(value);
        this.index += 1;
        this.size += 1;

        return this;
    }

    /**
     * Push multiple values to the top of the collection.
     *
     * @param {*} values
     * @returns {Stack}
     */
    pushAll(values) {
        values.forEach(this.push.bind(this));

        return this;
    }

    /**
     * Returns the top (last) value in the collection but does not remove it, or returns null if empty.
     *
     * @returns {*}
     */
    top() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items[this.index - 1].value;
    }
}
