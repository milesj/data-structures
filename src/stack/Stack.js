import Collection from '../Collection';

/**
 * A `Stack` is a basic data structure that can be represented as a stack or pile of data.
 * Insertion and deletion of items takes place at one end, called top of the stack.
 * This is also known as a last in first out approach (LIFO).
 *
 * @property {Number} index
 */
export default class Stack extends Collection {

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
     * Returns true if the stack contains the specified value.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    contains(value) {
        return (this.indexOf(value) >= 0);
    }

    /**
     * Returns the index of the first occurrence of the specified value in the stack or -1 otherwise.
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
     * Remove and return the top (last) value in the stack, or return null if empty.
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
     * Remove and return an array of all values in the stack.
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
     * Push a value to the top (end) of the stack.
     * Throws an error if the stack is full.
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
     * Push multiple values to the top of the stack.
     *
     * @param {*} values
     * @returns {Stack}
     */
    pushAll(values) {
        values.forEach(this.push.bind(this));

        return this;
    }

    /**
     * Returns the top value in the stack but does not remove it, or returns null if empty.
     *
     * @returns {*}
     */
    top() {
        return this.isEmpty() ? null : this.items[this.index - 1].value;
    }
}
