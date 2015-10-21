'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Tree2 = require('./Tree');

var _Tree3 = _interopRequireDefault(_Tree2);

var _Node2 = require('../Node');

var _Node3 = _interopRequireDefault(_Node2);

var _queueQueue = require('../queue/Queue');

var _queueQueue2 = _interopRequireDefault(_queueQueue);

var IN_ORDER = 'IN_ORDER';
exports.IN_ORDER = IN_ORDER;
var PRE_ORDER = 'PRE_ORDER';
exports.PRE_ORDER = PRE_ORDER;
var POST_ORDER = 'POST_ORDER';
exports.POST_ORDER = POST_ORDER;
var LEVEL_ORDER = 'LEVEL_ORDER';

exports.LEVEL_ORDER = LEVEL_ORDER;
/**
 * A `BinaryTree` is a specialized `Tree` in which every node has at most 2 children, a left and right child.
 * This structure also satisfies the binary search tree implementation.
 *
 * When dealing with a `BinaryTree`, all class methods make use of the nodes "key" for comparisons, not the value,
 * which in some cases, could be an object of values.
 */

var BinaryTree = (function (_Tree) {
    _inherits(BinaryTree, _Tree);

    function BinaryTree() {
        _classCallCheck(this, BinaryTree);

        _get(Object.getPrototypeOf(BinaryTree.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * @property {BinaryTreeNode|null} left
     * @property {BinaryTreeNode|null} right
     */

    _createClass(BinaryTree, [{
        key: 'contains',

        /**
         * Returns true if the tree contains the specified value.
         *
         * @param {*} value
         * @returns {Boolean}
         */
        value: function contains(value) {
            return this.search(value) !== null;
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'createNode',
        value: function createNode(data) {
            return new BinaryTreeNode(data);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'depth',
        value: function depth(value) {
            return this.isEmpty() ? -1 : this.root.depth(value, this.comparator());
        }

        /**
         * Return an array of all internal nodes (non-leafs).
         *
         * @returns {BinaryTreeNode[]}
         */
    }, {
        key: 'getInternalNodes',
        value: function getInternalNodes() {
            var nodes = [];

            this.traverse(function (value, node) {
                if (!node.isEmpty()) {
                    nodes.push(node);
                }
            });

            return nodes;
        }

        /**
         * Return an array of all leaf nodes.
         *
         * @returns {BinaryTreeNode[]}
         */
    }, {
        key: 'getLeafNodes',
        value: function getLeafNodes() {
            var nodes = [];

            this.traverse(function (value, node) {
                if (node.isEmpty()) {
                    nodes.push(node);
                }
            });

            return nodes;
        }

        /**
         * Return an array of all nodes at a specific level. If no nodes can be found, an empty array is returned.
         *
         * @param {Number} level
         * @returns {BinaryTreeNode[]}
         */
    }, {
        key: 'getNodesAtLevel',
        value: function getNodesAtLevel(level) {
            if (level < 0) {
                this.error('Level out of range');
            } else if (this.isEmpty()) {
                return [];
            }

            var queue = new _queueQueue2['default']();

            this.root.drill(level, 0, queue);

            return queue.toArray();
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'height',
        value: function height(value) {
            var node = this.search(value);

            return node ? node.height() : -1;
        }

        /**
         * Insert a value into the respective sub-tree. If the value is greater, insert into the right tree,
         * else if the value is lower, insert into the left tree.
         *
         * @param {*} value
         * @returns {BinaryTree}
         */
    }, {
        key: 'insert',
        value: function insert(value) {
            var node = this.createNode(value);

            // Root has not been set
            if (this.isEmpty()) {
                this.root = node;

                // Insert onto the root node directly
            } else {
                    this.root.insert(node, this.comparator());
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
    }, {
        key: 'insertAll',
        value: function insertAll(values) {
            values.forEach(this.insert.bind(this));

            return this;
        }

        /**
         * Returns true if the tree is a valid binary search tree.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isBST',
        value: function isBST() {
            if (this.isEmpty()) {
                return true;
            }

            var root = this.root,
                maxLeft = root.left ? root.max(root.left) : root.key,
                minRight = root.right ? root.min(root.right) : root.key + root.key,
                comparator = this.comparator();

            return comparator.lessThanEquals(maxLeft.key, root.key) && comparator.greaterThan(minRight.key, root.key);
        }

        /**
         * Returns true if every level is full (excluding the last), and the last points to the left.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isComplete',
        value: function isComplete() {
            var complete = true,
                flag = false;

            this.traverse(function (value, node) {
                if (node.left || node.right) {
                    if (flag === true) {
                        complete = false;
                        return true; // Exit
                    }
                } else {
                        flag = true;
                    }
            });

            return complete;
        }

        /**
         * Returns true if every node has 2 children (excluding leaf nodes).
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isFull',
        value: function isFull() {
            var full = true;

            this.traverse(function (value, node) {
                if (node.isEmpty()) {
                    // Exclude leaf

                } else if (!node.isFull()) {
                        full = false;
                        return true; // Exit
                    }
            });

            return full;
        }

        /**
         * Returns true if every node (excluding leaf nodes) has only 1 child.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isSkewed',
        value: function isSkewed() {
            if (this.size === 1) {
                return false;
            }

            var skewed = true;

            this.traverse(function (value, node) {
                if (node.isEmpty()) {
                    // Exclude leaf

                } else if (node.isFull()) {
                        skewed = false;
                        return true; // Exit
                    }
            });

            return skewed;
        }

        /**
         * Returns true if every node (excluding leaf nodes) has only 1 child and points to the left.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isSkewedLeft',
        value: function isSkewedLeft() {
            if (this.size === 1) {
                return false;
            }

            var skewed = true;

            this.traverse(function (value, node) {
                if (node.isEmpty()) {
                    // Exclude leaf

                } else if (node.isSkewedRight()) {
                        skewed = false;
                        return true; // Exit
                    }
            });

            return skewed;
        }

        /**
         * Returns true if every node (excluding leaf nodes) has only 1 child and points to the right.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isSkewedRight',
        value: function isSkewedRight() {
            if (this.size === 1) {
                return false;
            }

            var skewed = true;

            this.traverse(function (value, node) {
                if (node.isEmpty()) {
                    // Exclude leaf

                } else if (node.isSkewedLeft()) {
                        skewed = false;
                        return true; // Exit
                    }
            });

            return skewed;
        }

        /**
         * Returns true if every node has either 0 children or 2 children.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isStrict',
        value: function isStrict() {
            var strict = true;

            this.traverse(function (value, node) {
                if (node.isSkewedLeft() || node.isSkewedRight()) {
                    strict = false;
                    return true; // Exit
                }
            });

            return strict;
        }

        /**
         * Log a visual representation of the tree to the console.
         */
    }, {
        key: 'log',
        value: function log() {
            var root = this.root;

            if (root) {
                if (root.right) {
                    root.right.log(true);
                }

                console.log(root.key);

                if (root.left) {
                    root.left.log(false);
                }
            }

            console.log();
        }

        /**
         * Returns the maximum value node in the tree, or null if empty.
         *
         * @returns {BinaryTreeNode|null}
         */
    }, {
        key: 'max',
        value: function max() {
            return this.isEmpty() ? null : this.root.max(this.root);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'maxDepth',
        value: function maxDepth() {
            return this.isEmpty() ? -1 : this.root.height();
        }

        /**
         * Returns the minimum value node in the tree, or null if empty.
         *
         * @returns {BinaryTreeNode|null}
         */
    }, {
        key: 'min',
        value: function min() {
            return this.isEmpty() ? null : this.root.min(this.root);
        }

        /**
         * Remove a node from the tree that matches the specified value and reorganize all descendant nodes.
         * Returns true if a node was found, or false otherwise.
         *
         * Depending on the node, one of hte three following remove methods would be used.
         *
         *  - If the node has no children, the parent link would be set to null.
         *  - If the node has one child, the parent link would be set to the child.
         *  - If the node has two children, the smallest value in the right tree will be moved
         *      to the nodes current position.
         *
         * @param {*} value
         * @returns {Boolean}
         */
    }, {
        key: 'remove',
        value: function remove(value) {
            if (this.isEmpty()) {
                return false;
            }

            var result = false;

            // Remove the root node
            if (this.root.key === value) {
                var tempRoot = this.createNode(value);
                tempRoot.left = this.root;

                result = this.root.remove(value, tempRoot, this.comparator());

                this.root = tempRoot.left;

                // Remove a child
            } else {
                    result = this.root.remove(value, null, this.comparator());
                }

            // Decrease the size
            this.size -= 1;

            return result;
        }

        /**
         * Remove multiple values from the tree.
         *
         * @param {*[]} values
         * @returns {BinaryTree}
         */
    }, {
        key: 'removeAll',
        value: function removeAll(values) {
            values.forEach(this.remove.bind(this));

            return this;
        }

        /**
         * Search for a node that matches a specific value by drilling into each sub-tree using divide and conquer.
         *
         * @param {*} value
         * @returns {BinaryTreeNode|null}
         */
    }, {
        key: 'search',
        value: function search(value) {
            return this.isEmpty() ? null : this.root.search(value, this.comparator());
        }

        /**
         * Return the tree as an array of values.
         *
         * @returns {*[]}
         */
    }, {
        key: 'toArray',
        value: function toArray() {
            var method = arguments.length <= 0 || arguments[0] === undefined ? LEVEL_ORDER : arguments[0];

            var array = [];

            this.traverse(function (value) {
                array.push(value);
            }, method);

            return array;
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
    }, {
        key: 'traverse',
        value: function traverse(callback) {
            var method = arguments.length <= 1 || arguments[1] === undefined ? LEVEL_ORDER : arguments[1];

            if (this.isEmpty()) {
                return this;
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
                    var node = undefined,
                        queue = new _queueQueue2['default']();

                    queue.enqueue(this.root);

                    while (!queue.isEmpty()) {
                        node = queue.dequeue();

                        if (callback(node.key, node) === true) {
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
    }]);

    return BinaryTree;
})(_Tree3['default']);

exports['default'] = BinaryTree;

var BinaryTreeNode = (function (_Node) {
    _inherits(BinaryTreeNode, _Node);

    function BinaryTreeNode(data) {
        _classCallCheck(this, BinaryTreeNode);

        _get(Object.getPrototypeOf(BinaryTreeNode.prototype), 'constructor', this).call(this, data);

        this.left = null;
        this.right = null;
    }

    /**
     * Return the depth of this node to the child node that matches the value.
     *
     * @param {*} value
     * @param {Comparator} comparator
     * @returns {Number}
     */

    _createClass(BinaryTreeNode, [{
        key: 'depth',
        value: function depth(value, comparator) {
            var depth = -1;

            if (comparator.equals(value, this.key)) {
                return 0;
            } else if (comparator.greaterThan(value, this.key)) {
                if (this.right) {
                    depth = this.right.depth(value, comparator);
                } else {
                    return -1;
                }
            } else if (comparator.lessThan(value, this.key)) {
                if (this.left) {
                    depth = this.left.depth(value, comparator);
                } else {
                    return -1;
                }
            }

            // Allow missing values to bubble up
            if (depth === -1) {
                return -1;
            }

            return depth + 1;
        }

        /**
         * Drill down into the tree and attempt to find all nodes at a specific level.
         * If a level is found, push the node onto the queue.
         *
         * @param {Number} targetLevel
         * @param {Number} curLevel
         * @param {Queue} queue
         */
    }, {
        key: 'drill',
        value: function drill(targetLevel, curLevel, queue) {
            if (curLevel === targetLevel) {
                queue.enqueue(this);
                return;
            }

            if (this.left) {
                this.left.drill(targetLevel, curLevel + 1, queue);
            }

            if (this.right) {
                this.right.drill(targetLevel, curLevel + 1, queue);
            }
        }

        /**
         * Return the height of this node to the deepest child node.
         *
         * @returns {Number}
         */
    }, {
        key: 'height',
        value: function height() {
            var leftHeight = this.left ? this.left.height() : -1,
                rightHeight = this.right ? this.right.height() : -1;

            return Math.max(leftHeight, rightHeight) + 1;
        }

        /**
         * Recursively traverse nodes using the in-order algorithm.
         *
         * @param {Function} callback
         */
    }, {
        key: 'inOrder',
        value: function inOrder(callback) {
            if (typeof callback !== 'function') {
                this.error('Traversal callback must be a function');
            }

            if (this.left) {
                this.left.inOrder(callback);
            }

            if (callback(this.key, this) === true) {
                return;
            }

            if (this.right) {
                this.right.inOrder(callback);
            }
        }

        /**
         * Insert the node in either the left or right sub-tree.
         *
         * @param {BinaryTreeNode} node
         * @param {Comparator} comparator
         */
    }, {
        key: 'insert',
        value: function insert(node, comparator) {
            if (!node instanceof BinaryTreeNode) {
                this.error('Insertion requires a valid node');
            }

            // Insert into right sub-tree if greater
            if (comparator.greaterThan(node.key, this.key)) {
                if (!this.right) {
                    this.right = node;
                } else {
                    this.right.insert(node, comparator);
                }

                // Insert into left sub-tree if lower
            } else {
                    if (!this.left) {
                        this.left = node;
                    } else {
                        this.left.insert(node, comparator);
                    }
                }
        }

        /**
         * Returns true if the node has 0 children.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return !this.left && !this.right;
        }

        /**
         * Returns true if the node has 2 children.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isFull',
        value: function isFull() {
            return this.left && this.right;
        }

        /**
         * Returns true if the node has only a left child.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isSkewedLeft',
        value: function isSkewedLeft() {
            return this.left && !this.right;
        }

        /**
         * Returns true if the node has only a right child.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isSkewedRight',
        value: function isSkewedRight() {
            return !this.left && this.right;
        }

        /**
         * Log a visual representation of the tree to the console.
         *
         * @param {Boolean} isRight
         * @param {String} indent
         */
    }, {
        key: 'log',
        value: function log(isRight) {
            var indent = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (this.right) {
                this.right.log(true, indent + (isRight ? '        ' : ' |      '));
            }

            console.log(indent + (isRight ? ' /' : ' \\') + '----- ' + this.key);

            if (this.left) {
                this.left.log(false, indent + (isRight ? ' |      ' : '        '));
            }
        }

        /**
         * Returns the node with the highest value found in the descendant tree.
         *
         * @param {BinaryTreeNode} node
         * @returns {BinaryTreeNode}
         */
    }, {
        key: 'max',
        value: function max(node) {
            return node.right ? this.max(node.right) : node;
        }

        /**
         * Returns the node with the lowest value found in the descendant tree.
         *
         * @param {BinaryTreeNode} node
         * @returns {BinaryTreeNode}
         */
    }, {
        key: 'min',
        value: function min(node) {
            return node.left ? this.min(node.left) : node;
        }

        /**
         * Recursively traverse nodes using the post-order algorithm.
         *
         * @param {Function} callback
         */
    }, {
        key: 'postOrder',
        value: function postOrder(callback) {
            if (typeof callback !== 'function') {
                this.error('Traversal callback must be a function');
            }

            if (this.left) {
                this.left.postOrder(callback);
            }

            if (this.right) {
                this.right.postOrder(callback);
            }

            callback(this.key, this);
        }

        /**
         * Recursively traverse nodes using the pre-order algorithm.
         *
         * @param {Function} callback
         */
    }, {
        key: 'preOrder',
        value: function preOrder(callback) {
            if (typeof callback !== 'function') {
                this.error('Traversal callback must be a function');
            }

            if (callback(this.key, this) === true) {
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
         * Remove the value from the node or the descendant tree.
         *
         * @param {*} value - The value to remove
         * @param {BinaryTreeNode} parentNode - The parent node to modify
         * @param {Comparator} comparator
         * @returns {Boolean}
         */
    }, {
        key: 'remove',
        value: function remove(value, parentNode, comparator) {
            if (comparator.equals(value, this.key)) {
                if (this.isFull()) {
                    var newNode = this.min(this.right);

                    this.key = newNode.key;
                    this.value = newNode.value;
                    this.right.remove(this.key, this, comparator);
                } else if (parentNode.left === this) {
                    parentNode.left = this.left || this.right || null;
                } else if (parentNode.right === this) {
                    parentNode.right = this.left || this.right || null;
                }

                return true;

                // Search right tree
            } else if (comparator.greaterThan(value, this.key)) {
                    if (this.right) {
                        return this.right.remove(value, this, comparator);
                    } else {
                        return false;
                    }

                    // Search left tree
                } else {
                        if (this.left) {
                            return this.left.remove(value, this, comparator);
                        } else {
                            return false;
                        }
                    }
        }

        /**
         * Recursively search for a node that matches the defined value, or return null if none found.
         *
         * @param {*} value
         * @param {Comparator} comparator
         * @returns {BinaryTreeNode|null}
         */
    }, {
        key: 'search',
        value: function search(value, comparator) {
            if (comparator.equals(value, this.key)) {
                return this;
            } else if (comparator.greaterThan(value, this.key)) {
                if (this.right) {
                    return this.right.search(value, comparator);
                } else {
                    return null;
                }
            } else {
                if (this.left) {
                    return this.left.search(value, comparator);
                } else {
                    return null;
                }
            }
        }

        /**
         * Returns a count of all descendant child nodes including itself.
         *
         * @returns {Number}
         */
    }, {
        key: 'size',
        value: function size() {
            var size = 1;

            if (this.left) {
                size += this.left.size();
            }

            if (this.right) {
                size += this.right.size();
            }

            return size;
        }
    }]);

    return BinaryTreeNode;
})(_Node3['default']);

exports.BinaryTreeNode = BinaryTreeNode;