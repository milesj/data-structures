import Heap from './Heap';

/**
 * A `MaxHeap` is a specialized `Heap` in which all nodes are ordered from highest to lowest value.
 */
export default class MaxHeap extends Heap {

    /**
     * {@inheritdoc}
     */
    compare(node, parentNode) {
        return (node && parentNode && node.key >= parentNode.key);
    }

    /**
     * Return the maximum value in the heap but do not remove it, or return null if empty.
     *
     * @returns {*}
     */
    max() {
        return this.top();
    }
}
