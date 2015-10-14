import Structure from '../Structure';
import Comparator from '../Comparator';

const comparatorProp = Symbol('comparator');

/**
 * A `Tree` data structure simulates a hierarchical tree structure, representing as a set of linked nodes,
 * consisting of a root node and sub-trees of children with a parent node.
 *
 * @property {Node|null} root
 * @property {Number} size
 */
export default class Tree extends Structure {

    /**
     * Set the initial root node to null, and defined the `Comparator`.
     *
     * @param {Comparator} [comparator]
     */
    constructor(comparator) {
        super();

        this.root = null;
        this.size = 0;
        this[comparatorProp] = (comparator instanceof Comparator) ? comparator : new Comparator();
    }

    /**
     * Returns the `Comparator` instance.
     *
     * @returns {Comparator}
     */
    comparator() {
        return this[comparatorProp];
    }

    /**
     * Calculates the number of edges from the root node to the node that matches the defined value.
     * If no node could be found, returns -1.
     *
     * @param {*} value
     * @returns {Number}
     */
    depth(value) {
        return -1;
    }

    /**
     * Remove all nodes in the tree.
     *
     * @returns {Tree}
     */
    empty() {
        this.root = null;
        this.size = 0;

        return this;
    }

    /**
     * Calculates the number of edges from the target node to the deepest leaf node.
     * If no node could be found, returns -1.
     *
     * @param {*} value
     * @returns {Number}
     */
    height(value) {
        return -1;
    }

    /**
     * Returns true if the tree is empty.
     *
     * @returns {Boolean}
     */
    isEmpty() {
        return (this.size === 0 || !this.root);
    }

    /**
     * Calculate the max depth (or height) of the tree from the root node to the deepest leaf node.
     *
     * @returns {Number}
     */
    maxDepth() {
        return -1;
    }

    /**
     * Alias for `maxDepth()`.
     *
     * @returns {Number}
     */
    maxHeight() {
        return this.maxDepth();
    }
}
