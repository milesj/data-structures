import Collection from './adt/Collection';

/**
 * @property {Number} index
 * @property {Number} capacity
 */
export default class Queue extends Collection {
    constructor(capacity = 0) {
        super();

        this.index = 0;
        this.capacity = capacity;
    }

    /**
     * Returns the last value in the collection but does not remove it, or returns null if empty.
     *
     * @returns {*}
     */
    back() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items[this.index - 1].value;
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
     * Remove and return the first value in the collection, or returns null if empty.
     *
     * @returns {*}
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        this.index -= 1;
        this.size -= 1;

        return this.items.shift().value;
    }

    /**
     * Remove and return an array of all values in the collection.
     * Will return them in the dequeue order.
     *
     * @returns {*[]}
     */
    dequeueAll() {
        let values = [];

        while (this.index) {
            values.push(this.dequeue());
        }

        return values;
    }

    /**
     * Push a value to the end of the collection.
     * Throws an error if the collection is full.
     *
     * @param {*} value
     * @returns {Queue}
     */
    enqueue(value) {
        if (this.isFull()) {
            this.error('{class} is full');
        }

        this.items[this.index] = this.createNode(value);
        this.index += 1;
        this.size += 1;

        return this;
    }

    /**
     * Push multiple values to the end of the collection.
     *
     * @param {*} values
     * @returns {Queue}
     */
    enqueueAll(values) {
        values.forEach(this.enqueue.bind(this));

        return this;
    }

    /**
     * Returns the first value in the collection but does not remove it.
     * Throws an error if the collection is empty.
     *
     * @returns {*}
     */
    front() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items[0].value;
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
}
