import Collection from './Collection';
import Node from './Node';

export default class Stack extends Collection {
    constructor(capacity = 0) {
        super();

        this.top = 0;
        this.capacity = capacity;
    }

    /**
     * Returns true if the collection contains the specified value.
     *
     * @param {*} value
     * @returns {boolean}
     */
    contains(value) {
        return (this.indexOf(value) >= 0);
    }

    /**
     * Create a new Node for this type of list.
     *
     * @param {*} value
     * @returns {Node}
     */
    createNode(value) {
        return new Node(value);
    }

    /**
     * Returns the index of the first occurrence of the specified value in this collection or -1 otherwise.
     *
     * @param {*} value
     * @returns {number}
     */
    indexOf(value) {
        for (var i = 0; i < this.size; i++) {
            if (this.items[i].value === value) {
                return i;
            }
        }

        return -i;
    }

    /**
     * Return true if a capacity is set, and the capacity is full.
     *
     * @returns {boolean}
     */
    isFull() {
        return (this.capacity > 0 && this.size === this.capacity);
    }

    /**
     * Returns the top (last) value in the collection but does not remove it.
     * Throws an error if the collection is empty.
     *
     * @returns {*}
     */
    last() {
        if (this.isEmpty()) {
            throw new Error(this.constructor.name + ' is empty');
        }

        return this.items[this.top - 1].value;
    }

    /**
     * Remove and return the top (last) value in the collection.
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

        while (this.top) {
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
            throw new Error(this.constructor.name + ' is full');
        }

        this.items[this.top] = this.createNode.apply(this, arguments);
        this.top += 1;
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
}
