import Tree from './Tree';
import Node from './Node';
import Queue from './Queue';

export const IN_ORDER = 'IN_ORDER';
export const PRE_ORDER = 'PRE_ORDER';
export const POST_ORDER = 'POST_ORDER';
export const LEVEL_ORDER = 'LEVEL_ORDER';

export default class BinaryTree extends Tree {

    /**
     * Returns true if the tree contains the specified value.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    contains(value) {
        return (this.search(value) !== null);
    }

    /**
     * {@inheritdoc}
     */
    createNode(value) {
        return new BinaryTreeNode(value);
    }

    /**
     * {@inheritdoc}
     */
    depth(value) {
        let depth = 0,
            node = this.root;

        while (node) {
            if (value === node.value) {
                return depth;

            } else if (value > node.value) {
                node = node.right;

            } else if (value < node.value) {
                node = node.left;
            }

            depth++;
        }

        return -1;
    }

    /**
     * Return an array of all leaf nodes.
     *
     * @returns {Node[]}
     */
    getLeafNodes() {
        let nodes = [];

        this.traverse(function(value, node) {
            if (!node.left && !node.right) {
                nodes.push(node);
            }
        });

        return nodes;
    }

    /**
     * Return an array of all nodes at a specific level. If no nodes can be found, an empty array is returned.
     *
     * @param {Number} level
     * @returns {Node[]}
     */
    getNodesAtLevel(level) {
        if (level < 0) {
            this.error('Level out of range');
        }

        let curLevel = 0,
            nextLevel = 1,
            nodes = [],
            i = 0;

        this.traverse(function(value, node) {
            // Go to next level
            if (i === nextLevel) {
                curLevel += 1;
                nextLevel *= 2;
                i = 0;
            }

            // Went too far
            if (curLevel > level) {
                return true; // Exit
            }

            // Within the level
            if (curLevel === level) {
                nodes.push(node);
            }

            // Increase count for this level
            i++;
        });

        return nodes;
    }

    /**
     * {@inheritdoc}
     */
    height(value) {
        let node = this.search(value),
            height = 0;

        if (node === null) {
            return -1;
        }

        // TODO
    }

    /**
     * Insert a value into the respective sub-tree.
     * Will throw an error if a falsey value is provided.
     *
     * @param {*} value
     * @returns {BinaryTree}
     */
    insert(value) {
        if (!value && value !== 0) {
            this.error('A value is required when inserting');
        }

        let node = this.createNode(value);

        // Root has not been set
        if (this.isEmpty()) {
            this.root = node;

        // Insert onto the root node directly
        } else {
            this.root.insert(node);
        }

        // Increase the size
        this.size += 1;

        return this;
    }

    /**
     * Insert multiple values into the tree.
     *
     * @param {*[]} values
     * @returns {BinaryTree}
     */
    insertAll(values) {
        values.forEach(this.insert.bind(this));

        return this;
    }

    /**
     * Returns true if every node can be numbered from the root to the max height.
     *
     * @return {Boolean}
     */
    isComplete() {

    }

    /**
     * Returns true if every node has 2 children and every leaf node is at the same level.
     *
     * @return {Boolean}
     */
    isFull() {

    }

    /**
     * {@inheritdoc}
     */
    isSkewed() {
        let skewed = true;

        this.traverse(function(value, node) {
            if (!node.left && !node.right) {
                // Exclude leaf

            } else if (node.left && node.right) {
                skewed = false;
                return true; // Exit
            }
        });

        return skewed;
    }

    /**
     * {@inheritdoc}
     */
    isSkewedLeft() {
        let skewed = true;

        this.traverse(function(value, node) {
            if (!node.left && !node.right) {
                // Exclude leaf

            } else if (!node.left && node.right) {
                skewed = false;
                return true; // Exit
            }
        });

        return skewed;
    }

    /**
     * {@inheritdoc}
     */
    isSkewedRight() {
        let skewed = true;

        this.traverse(function(value, node) {
            if (!node.left && !node.right) {
                // Exclude leaf

            } else if (node.left && !node.right) {
                skewed = false;
                return true; // Exit
            }
        });

        return skewed;
    }

    /**
     * Returns true if every node has either 0 children or 2 children.
     *
     * @return {Boolean}
     */
    isStrict() {
        let strict = true;

        this.traverse(function(value, node) {
            if (node.left && !node.right || !node.left && node.right) {
                strict = false;
                return true; // Exit
            }
        });

        return strict;
    }

    remove(value) {

    }

    /**
     * Search for a node that matches a specific value by drilling into each sub-tree using divide and conquer.
     * Throws an error if the tree is empty.
     *
     * @param {*} value
     * @returns {Node|null}
     */
    search(value) {
        if (this.isEmpty()) {
            this.error('{class} is empty');
        }

        return this.root.search(value);
    }

    /**
     * Traverse the tree using 1 of 4 possible traversal algorithms: in-order, pre-order, post-order, and level-order.
     * Defaults to level-order traversal.
     *
     * For each node discovered, the callback defined will be executed passing the nodes value and the node itself.
     * Can exit the traversal loop early by returning `true` in the callback.
     *
     * Throws an error if the tree is empty, or if the callback has not been defined correctly.
     *
     * @param {Function} callback
     * @param {String} method
     * @returns {BinaryTree}
     */
    traverse(callback, method = LEVEL_ORDER) {
        if (typeof callback !== 'function') {
            this.error('Traversal callback must be a function');

        } else if (this.isEmpty()) {
            this.error('{class} is empty');
        }

        switch (method) {
            case IN_ORDER:
                this.root.inOrder(callback);
                break;

            case PRE_ORDER:
                this.root.preOrder(callback);
                break;

            case POST_ORDER:
                this.root.postOrder(callback);
                break;

            case LEVEL_ORDER:
                let node,
                    queue = new Queue();

                queue.enqueue(this.root);

                while (!queue.isEmpty()) {
                    node = queue.dequeue();

                    if (callback(node.value, node) === true) {
                        break;
                    }

                    if (node.left) {
                        queue.enqueue(node.left);
                    }

                    if (node.right) {
                        queue.enqueue(node.right);
                    }
                }

                break;

            default:
                this.error('Unknown traversal method');
                break;
        }

        return this;
    }
}

/**
 * @property {BinaryTreeNode|null} left
 * @property {BinaryTreeNode|null} right
 */
export class BinaryTreeNode extends Node {
    constructor() {
        super();

        this.left = null;
        this.right = null;
    }

    /**
     * Recursively traverse nodes using the in-order algorithm.
     *
     * @param {Function} callback
     */
    inOrder(callback) {
        if (this.left) {
            this.left.inOrder(callback);
        }

        if (callback(this.value, this) === true) {
            return;
        }

        if (this.right) {
            this.right.inOrder(callback);
        }
    }

    /**
     * Insert the node in either the left or right sub-tree.
     *
     * @param {Node} node
     */
    insert(node) {

        // Insert into right sub-tree if greater
        if (node.value >= this.value) {
            if (!this.right) {
                this.right = node;
            } else {
                this.right.insert(node);
            }

        // Insert into left sub-tree if lower
        } else {
            if (!this.left) {
                this.left = node;
            } else {
                this.left.insert(node);
            }
        }
    }

    /**
     * Recursively traverse nodes using the post-order algorithm.
     *
     * @param {Function} callback
     */
    postOrder(callback) {
        if (this.left) {
            this.left.postOrder(callback);
        }

        if (this.right) {
            this.right.postOrder(callback);
        }

        callback(this.value, this);
    }

    /**
     * Recursively traverse nodes using the pre-order algorithm.
     *
     * @param {Function} callback
     */
    preOrder(callback) {
        if (callback(this.value, this) === true) {
            return;
        }

        if (this.left) {
            this.left.preOrder(callback);
        }

        if (this.right) {
            this.right.preOrder(callback);
        }
    }

    /**
     * Recursively search for a node that matches the defined value, or return null if none found.
     *
     * @param {*} value
     * @returns {Node|null}
     */
    search(value) {
        if (value === this.value) {
            return this;

        } else if (value > this.value) {
            return this.right.search(value);

        } else if (value < this.value) {
            return this.left.search(value);
        }

        return null;
    }
}
