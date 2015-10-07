import Stack from './Stack';

export default class Queue extends Stack {

    /**
     * Remove and return the first (front) value in the collection.
     * Throws an error if the collection is empty.
     *
     * @returns {*}
     */
    pop() {
        if (this.isEmpty()) {
            throw new Error(this.constructor.name + ' is empty');
        }

        this.top -= 1;
        this.size -= 1;

        return this.items.shift().value;
    }

    /**
     * Returns the first value in the collection but does not remove it.
     * Throws an error if the collection is empty.
     *
     * @returns {*}
     */
    first() {
        if (this.isEmpty()) {
            throw new Error(this.constructor.name + ' is empty');
        }

        return this.items[0].value;
    }
}
