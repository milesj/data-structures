import Queue from './Queue';

export default class DoubleEndedQueue extends Queue {

    /**
     * Remove and return the last value in the collection.
     * Throws an error if the collection is empty.
     *
     * @returns {*}
     */
    dequeueBack() {
        if (this.isEmpty()) {
            this.error('{class} is empty');
        }

        this.index -= 1;
        this.size -= 1;

        return this.items.pop().value;
    }

    /**
     * Remove and return an array of all values in the collection.
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
     * Push a value to the front of the collection.
     * Throws an error if the collection is full.
     *
     * @param {*} value
     * @returns {Queue}
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
     * Push multiple values to the front of the collection.
     *
     * @param {*} values
     * @returns {Queue}
     */
    enqueueFrontAll(values) {
        values.forEach(this.enqueueFront.bind(this));

        return this;
    }

}
