import Heap from './Heap';

/**
 * A `MinHeap` is a specialized `Heap` in which all nodes are ordered from lowest to highest value.
 */
export default class MinHeap extends Heap {

    /**
     * @inheritdoc
     */
    compare(node, parentNode) {
        return (node && parentNode && node.key <= parentNode.key);
    }

    /**
     * Return the minimum value in the heap but do not remove it, or return null if empty.
     *
     * @returns {*}
     */
    min() {
        return this.top();
    }
}
