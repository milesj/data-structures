import Queue from './Queue';

/**
 * A `DoubleEndedQueue` is a specialized `Queue` in which values can be inserted or removed from both ends.
 */
export default class DoubleEndedQueue extends Queue {

    /**
     * Remove and return the last value in the queue, or return null if empty.
     *
     * @returns {*}
     */
    dequeueBack() {
        if (this.isEmpty()) {
            return null;
        }

        this.index -= 1;
        this.size -= 1;

        return this.items.pop().value;
    }

    /**
     * Remove and return an array of all values in the queue.
     * Will return them in reverse dequeue order.
     *
     * @returns {*[]}
     */
    dequeueBackAll() {
        let values = [];

        while (this.index) {
            values.push(this.dequeueBack());
        }

        return values;
    }

    /**
     * Push a value to the front of the queue.
     * Throws an error if the queue is full.
     *
     * @param {*} value
     * @returns {DoubleEndedQueue}
     */
    enqueueFront(value) {
        if (this.isFull()) {
            this.error('{class} is full');
        }

        this.items.unshift(this.createNode(value));
        this.index += 1;
        this.size += 1;

        return this;
    }

    /**
     * Push multiple values to the front of the queue.
     *
     * @param {*} values
     * @returns {DoubleEndedQueue}
     */
    enqueueFrontAll(values) {
        values.forEach(this.enqueueFront.bind(this));

        return this;
    }

}
