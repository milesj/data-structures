import Collection from './Collection';

export const MAX = 'MAX';
export const MIN = 'MIN';

/**
 * A binary heap with built-in support for both min and max heaps.
 *
 * @property {Number} capacity
 * @property {Number} arity
 * @property {String} type
 */
export default class Heap extends Collection {
    constructor(type, capacity = 0) {
        super();

        if (type !== MIN && type !== MAX) {
            this.error('Invalid heap type');
        }

        this.capacity = capacity;
        this.type = type;
    }

    compare(node, parentNode) {
        if (this.type === MAX) {
            return (parentNode && node.value > parentNode.value);
        }

        return (parentNode && node.value < parentNode.value);
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
     * Return the left child index for the defined index, or -1 if invalid.
     *
     * @param {Number} index
     * @returns {Number}
     */
    leftChildIndex(index) {
        let left = (index * 2 + 1);

        return (left >= this.size) ? -1 : left;
    }

    /**
     * Return the parent index for the defined index, or -1 if invalid.
     *
     * @param {Number} index
     * @returns {Number}
     */
    parentIndex(index) {
        return (index <= 0 || index >= this.size) ? -1 : Math.floor((index - 1) / 2);
    }

    percolate(index) {
        let leftIndex = this.leftChildIndex(index),
            rightIndex = this.rightChildIndex(index),
            top = index;

        if (leftIndex >= 0 && this.compare(this.items[leftIndex], this.items[index])) {
            top = leftIndex;
        }

        if (rightIndex >= 0 && this.compare(this.items[rightIndex], this.items[top])) {
            top = rightIndex;
        }

        if (top !== index) {
            let temp = this.items[index];

            this.items[index] = this.items[top];
            this.items[top] = temp;
        }

        return this;
    }

    /**
     * Remove and return the top (min or max) value in the heap, or return null if empty.
     *
     * @returns {*}
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        }

        let top = this.items[0];

        // Decrease size
        this.size -= 1;

        // Move last element to top
        this.items[0] = this.items[this.size];

        // Re-order
        this.percolate(0);

        return top.value;
    }

    /**
     * Push a value onto the heap and continually percolate values up until they are somewhat ordered.
     *
     * @param {*} value
     * @returns {Heap}
     */
    push(value) {
        if (this.isFull()) {
            this.error('{class} is full');
        }

        let node = this.createNode(value),
            index = this.size,
            tempIndex;

        // Percolate values upwards
        while (index > 0 && this.compare(node, this.items[this.parentIndex(index)])) {
            tempIndex = this.parentIndex(index);

            this.items[index] = this.items[tempIndex];

            index = tempIndex;
        }

        // Set the node
        this.items[index] = node;

        // Increase the size
        this.size += 1;

        return this;
    }

    /**
     * Push multiple values onto the heap.
     *
     * @param {*[]} values
     * @returns {Heap}
     */
    pushAll(values) {
        values.forEach(this.push.bind(this));

        return this;
    }

    /**
     * Return the right child index for the defined index, or -1 if invalid.
     *
     * @param {Number} index
     * @returns {Number}
     */
    rightChildIndex(index) {
        let right = (index * 2 + 2);

        return (right >= this.size) ? -1 : right;
    }

    /**
     * Sort the collection of nodes using the heap sort algorithm.
     *
     * @returns {Heap}
     */
    sort() {
        return this;
    }

    /**
     * Return the top value in the heap but do not remove it, or return null if empty.
     *
     * @returns {*}
     */
    top() {
        return this.isEmpty() ? null : this.items[0].value;
    }
}
