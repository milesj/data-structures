import Collection from '../Collection';

/**
 * A `Queue` is a basic data structure that can be represented as a line of ordered data.
 * Insertion places a value onto the rear, while deletion removes a value from the front.
 * This is also known as a first in first out approach (FIFO).
 *
 * @property {Number} index
 */
export default class Queue extends Collection {

    /**
     * Set the capacity limit and starting index.
     *
     * @param {Number} [capacity]
     */
    constructor(capacity = 0) {
        super(capacity);

        this.index = 0;
    }

    /**
     * Returns the last value in the queue but does not remove it, or returns null if empty.
     *
     * @returns {*}
     */
    back() {
        return this.isEmpty() ? null : this.items[this.index - 1].value;
    }

    /**
     * Returns true if the queue contains the specified value.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    contains(value) {
        return (this.indexOf(value) >= 0);
    }

    /**
     * Remove and return the first value in the queue, or returns null if empty.
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
     * Remove and return an array of all values in the queue.
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
     * Push a value to the end of the queue.
     * Throws an error if the queue is full.
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
     * Push multiple values to the end of the queue.
     *
     * @param {*} values
     * @returns {Queue}
     */
    enqueueAll(values) {
        values.forEach(this.enqueue.bind(this));

        return this;
    }

    /**
     * Returns the first value in the queue but does not remove it, or returns null if empty.
     *
     * @returns {*}
     */
    front() {
        return this.isEmpty() ? null : this.items[0].value;
    }

    /**
     * Returns the index of the first occurrence of the specified value in this queue or -1 otherwise.
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
}
