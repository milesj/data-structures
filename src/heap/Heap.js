import Collection from '../Collection';

/**
 * Return the left child index for the defined index.
 *
 * @param {Number} index
 * @returns {Number}
 */
export function leftChildIndex(index) {
    return (index * 2 + 1);
}

/**
 * Return the parent index for the defined index.
 *
 * @param {Number} index
 * @returns {Number}
 */
export function parentIndex(index) {
    return Math.floor((index - 1) / 2);
}

/**
 * Return the right child index for the defined index.
 *
 * @param {Number} index
 * @returns {Number}
 */
export function rightChildIndex(index) {
    return (index * 2 + 2);
}

/**
 * A `Heap` is an abstract binary tree-based data structure (using array indices) that satisfies the heap property:
 * A parent node must have a greater (or lower) value than that of its children.
 *
 * All node keys used for comparisons must be an integer or float.
 *
 * @abstract
 */
export default class Heap extends Collection {

    /**
     * Compare the current node against its parent node.
     * If a max heap, the return will be true if the node is larger than the parent.
     * If a min heap, the return will be true if the node is smaller than the parent.
     *
     * @param {Node} node
     * @param {Node} parentNode
     */
    compare(node, parentNode) {
        this.error('{class} compare() must be implemented');
    }

    /**
     * Returns true if the heap contains the specified value.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    contains(value) {
        return (this.indexOf(value) >= 0);
    }

    /**
     * Returns the index of the first occurrence of the specified value in this heap or -1 otherwise.
     *
     * @param {*} value
     * @returns {Number}
     */
    indexOf(value) {
        for (let i = 0; i < this.size; i++) {
            if (this.items[i].value === value) {
                return i;
            }
        }

        /* eslint no-magic-numbers: 0 */
        return -1;
    }

    /**
     * Remove and return the top (min or max) value in the heap and continually bubble values down
     * until they satisfy the "heap property", or return null if empty.
     *
     * @returns {*}
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        }

        let node = this.items[0],
            index = 0,
            leftIndex = 0,
            rightIndex = 0,
            largestIndex = 0;

        // Move last item to the top
        this.items[0] = this.items.pop();

        // Decrease size
        this.size -= 1;

        // Bubble downwards
        while (true) {
            leftIndex = leftChildIndex(index);
            rightIndex = rightChildIndex(index);
            largestIndex = index;

            if (leftIndex < this.size && this.compare(this.items[leftIndex], this.items[largestIndex])) {
                largestIndex = leftIndex;
            }

            if (rightIndex < this.size && this.compare(this.items[rightIndex], this.items[largestIndex])) {
                largestIndex = rightIndex;
            }

            if (largestIndex === index) {
                break;
            }

            let temp = this.items[index];

            this.items[index] = this.items[largestIndex];
            this.items[largestIndex] = temp;

            index = largestIndex;
        }

        return node.value;
    }

    /**
     * Remove and return an array of all values in the heap.
     * Will return them in the pop order.
     *
     * @returns {*[]}
     */
    popAll() {
        let values = [];

        while (this.size) {
            values.push(this.pop());
        }

        return values;
    }

    /**
     * Push a value onto the heap and continually bubble values up until they satisfy the "heap property".
     * Throws an error if the heap is full.
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
            indexParent = parentIndex(index);

        // Bubble upwards
        while (index > 0 && this.compare(node, this.items[indexParent])) {
            this.items[index] = this.items[indexParent];

            index = indexParent;
            indexParent = parentIndex(indexParent);
        }

        // Set the node
        this.items[index] = node;

        // Increase size
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
     * Return the top value in the heap but do not remove it, or return null if empty.
     *
     * @returns {*}
     */
    top() {
        return this.isEmpty() ? null : this.items[0].value;
    }
}
