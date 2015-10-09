import Collection from './Collection';

/**
 * @property {Node|null} root
 */
export default class Tree extends Collection {
    constructor() {
        super();

        this.root = null;
    }

    /**
     * Calculates the depth of the tree from the root node to the target node that matches the defined value.
     *
     * @param {*} value
     * @returns {number}
     */
    depth(value) {
        return 0;
    }

    /**
     * Calculates the height of the tree from the target node to the deepest leaf node.
     *
     * @param {*} value
     * @returns {number}
     */
    height(value) {
        return 0;
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
