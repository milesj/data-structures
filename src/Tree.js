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
     * @returns {Number}
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
     * @returns {Number}
     */
    height(value) {
        return 0;
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
     * Returns true if every node (excluding leaf nodes) has only 1 child.
     *
     * @return {Boolean}
     */
    isSkewed() {

    }

    /**
     * Returns true if every node (excluding leaf nodes) has only 1 child and points to the left.
     *
     * @return {Boolean}
     */
    isSkewedLeft() {

    }

    /**
     * Returns true if every node (excluding leaf nodes) has only 1 child and points to the right.
     *
     * @return {Boolean}
     */
    isSkewedRight() {

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

    /**
     * Calculate the max number of levels in the tree.
     *
     * @returns {Number}
     */
    maxLevel() {
        return -1;
    }
}
