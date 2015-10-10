import Structure from './Structure';

/**
 * @property {Node|null} root
 * @property {Number} size
 */
export default class Tree extends Structure {
    constructor() {
        super();

        this.root = null;
        this.size = 0;
    }

    /**
     * Calculates the depth of the tree from the root node to the target node that matches the defined value.
     * If no target node could be found, returns -1.
     *
     * @param {*} value
     * @returns {number}
     */
    depth(value) {
        return 0;
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
     * Calculates the height of the tree from the target node to the deepest leaf node.
     * If no target node could be found, returns -1.
     *
     * @param {*} value
     * @returns {number}
     */
    height(value) {
        return 0;
    }

    /**
     * Returns true if the tree is empty.
     *
     * @returns {boolean}
     */
    isEmpty() {
        return (this.size === 0 || !this.root);
    }

    /**
     * Returns true if every node (excluding leaf nodes) has only 1 child.
     *
     * @return {boolean}
     */
    isSkewed() {

    }

    /**
     * Returns true if every node (excluding leaf nodes) has only 1 child and points to the left.
     *
     * @return {boolean}
     */
    isSkewedLeft() {

    }

    /**
     * Returns true if every node (excluding leaf nodes) has only 1 child and points to the right.
     *
     * @return {boolean}
     */
    isSkewedRight() {

    }

    /**
     * Calculate the max depth (or height) of the tree from the root node to the deepest leaf node.
     *
     * @returns {number}
     */
    maxDepth() {
        return 0;
    }

    /**
     * Alias for `maxDepth()`.
     *
     * @returns {number}
     */
    maxHeight() {
        return this.maxDepth();
    }
}
