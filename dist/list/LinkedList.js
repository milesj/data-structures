'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Collection2 = require('../Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

var _Node2 = require('../Node');

var _Node3 = _interopRequireDefault(_Node2);

/**
 * A `LinkedList` is a data structure consisting of a group of nodes, linked through references,
 * which together represent a sequence.
 *
 * @property {LinkedListNode|null} head
 * @property {LinkedListNode|null} tail
 */

var LinkedList = (function (_Collection) {
    _inherits(LinkedList, _Collection);

    /**
     * Set the initial head and tail to null.
     */

    function LinkedList() {
        _classCallCheck(this, LinkedList);

        _get(Object.getPrototypeOf(LinkedList.prototype), 'constructor', this).call(this);

        this.head = null;
        this.tail = null;
    }

    /**
     * @property {LinkedListNode|null} next
     */

    /**
     * {@inheritdoc}
     */

    _createClass(LinkedList, [{
        key: Symbol.iterator,
        value: function value() {
            var curNode = this.head,
                node = null;

            return {
                next: function next() {
                    if (!curNode) {
                        return { done: true };
                    } else {
                        node = curNode;
                        curNode = curNode.next;

                        return { value: node.value };
                    }
                }
            };
        }

        /**
         * Append the specified value to the end of the list.
         *
         * @param {*} value
         * @returns {LinkedList}
         */
    }, {
        key: 'append',
        value: function append(value) {
            if (this.isEmpty()) {
                return this.prepend(value);
            }

            // Append the node
            this._appendNode(this.createNode(value), this.tail);

            // Increase the size
            this.size += 1;

            return this;
        }

        /**
         * Appends multiple values to the end of the list.
         *
         * @param {*[]} values
         * @returns {LinkedList}
         */
    }, {
        key: 'appendAll',
        value: function appendAll(values) {
            values.forEach(this.append.bind(this));

            return this;
        }

        /**
         * Returns true if the list contains the specified value.
         *
         * @param {*} value
         * @returns {Boolean}
         */
    }, {
        key: 'contains',
        value: function contains(value) {
            return this.indexOf(value) >= 0;
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'createNode',
        value: function createNode(value) {
            return new LinkedListNode(value);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'empty',
        value: function empty() {
            this.head = this.tail = null;
            this.size = 0;

            return this;
        }

        /**
         * Returns the first value in the list but does not remove it, or returns null if empty.
         *
         * @returns {*}
         */
    }, {
        key: 'first',
        value: function first() {
            return this.isEmpty() ? null : this.head.value;
        }

        /**
         * Returns the index of the first occurrence of the specified value in this list or -1 otherwise.
         *
         * @param {*} value
         * @returns {Number}
         */
    }, {
        key: 'indexOf',
        value: function indexOf(value) {
            var curNode = this.head,
                index = 0;

            while (curNode) {
                if (curNode.value === value) {
                    return index;
                }

                curNode = curNode.next;
                index++;
            }

            return -1;
        }

        /**
         * Insert a node at a specified index.
         *
         * @param {*} value
         * @param {Number} index
         * @returns {LinkedList}
         */
    }, {
        key: 'insert',
        value: function insert(value, index) {
            if (index < 0 || index > this.size) {
                this.error('Index out of range');
            } else if (index === 0) {
                return this.prepend(value);
            } else if (index === this.size) {
                return this.append(value);
            }

            var curNode = this.head,
                prevNode = null,
                i = 0;

            while (curNode) {
                if (index === i) {
                    break;
                }

                prevNode = curNode;
                curNode = curNode.next;
                i++;
            }

            // Insert the node
            this._insertNode(this.createNode(value), curNode, prevNode);

            // Increase the size
            this.size += 1;

            return this;
        }

        /**
         * Returns the last value in the list but does not remove it, or returns null if empty.
         *
         * @returns {*}
         */
    }, {
        key: 'last',
        value: function last() {
            return this.isEmpty() ? null : this.tail.value;
        }

        /**
         * Returns the index of the last occurrence of the specified value in this list or -1 otherwise.
         *
         * @param {*} value
         * @returns {Number}
         */
    }, {
        key: 'lastIndexOf',
        value: function lastIndexOf(value) {
            var curNode = this.head,
                index = -1,
                i = 0;

            while (curNode) {
                if (curNode.value === value) {
                    index = i;
                }

                curNode = curNode.next;
                i++;
            }

            return index;
        }

        /**
         * Prepend the specified value to the beginning of the list.
         *
         * @param {*} value
         * @returns {LinkedList}
         */
    }, {
        key: 'prepend',
        value: function prepend(value) {
            var node = this.createNode(value);

            // Head has not been set yet
            if (this.isEmpty()) {
                this._setRootNode(node);

                // Prepend the node
            } else {
                    this._prependNode(node, this.head);
                }

            // Increase the size
            this.size += 1;

            return this;
        }

        /**
         * Prepends multiple values to the beginning of the list.
         *
         * @param {*[]} values
         * @returns {LinkedList}
         */
    }, {
        key: 'prependAll',
        value: function prependAll(values) {
            values.forEach(this.prepend.bind(this));

            return this;
        }

        /**
         * Remove and return the node with the specified value, or null if not found.
         *
         * @param {*} value
         * @returns {*}
         */
    }, {
        key: 'remove',
        value: function remove(value) {
            if (this.isEmpty()) {
                return null;
            } else if (this.head.value === value) {
                return this.removeFirst();
            } else if (this.tail.value === value) {
                return this.removeLast();
            }

            var curNode = this.head,
                prevNode = null;

            while (curNode) {
                if (curNode.value === value) {
                    this._removeNode(curNode, curNode.next, prevNode);

                    // Decrease the size
                    this.size -= 1;

                    return value;
                }

                prevNode = curNode;
                curNode = curNode.next;
            }

            return null;
        }

        /**
         * Remove and return the node at the specific index, or null if not found.
         *
         * @param {Number} index
         * @returns {*}
         */
    }, {
        key: 'removeAt',
        value: function removeAt(index) {
            if (this.isEmpty()) {
                return null;
            } else if (index < 0 || index >= this.size) {
                this.error('Index out of range');
            } else if (index === 0) {
                return this.removeFirst();
            } else if (index === this.size - 1) {
                return this.removeLast();
            }

            var curNode = this.head,
                prevNode = null,
                i = 0;

            while (curNode) {
                if (index === i) {
                    this._removeNode(curNode, curNode.next, prevNode);

                    // Decrease the size
                    this.size -= 1;

                    return curNode.value;
                }

                prevNode = curNode;
                curNode = curNode.next;
                i++;
            }

            return null;
        }

        /**
         * Remove and return the first node in the list, or null if empty.
         *
         * @returns {*}
         */
    }, {
        key: 'removeFirst',
        value: function removeFirst() {
            if (this.isEmpty()) {
                return null;
            }

            var head = this.head;

            // Reset tail if needed
            if (this.head === this.tail) {
                this.tail = null;
            }

            // Remove the head
            this._removeNode(head, head.next, null);
            this.head = head.next;

            // Decrease the size
            this.size -= 1;

            return head.value;
        }

        /**
         * Remove and return the last node in the list, or null if empty.
         *
         * @returns {null}
         */
    }, {
        key: 'removeLast',
        value: function removeLast() {
            if (this.isEmpty()) {
                return null;
            } else if (this.tail === this.head) {
                return this.removeFirst();
            }

            var tail = this.tail;

            // Set the 2nd to last node to null
            var prevNode = this.head;

            while (prevNode) {
                if (prevNode.next === this.tail) {
                    break;
                } else {
                    prevNode = prevNode.next;
                }
            }

            this._removeNode(tail, null, prevNode);
            this.tail = prevNode;

            // Decrease the size
            this.size -= 1;

            return tail.value;
        }

        /**
         * Search for a node that matches the defined value, or null if it could not be found.
         *
         * @param {*} value
         * @returns {LinkedListNode}
         */
    }, {
        key: 'search',
        value: function search(value) {
            var curNode = this.head;

            while (curNode) {
                if (curNode.value === value) {
                    return curNode;
                }

                curNode = curNode.next;
            }

            return null;
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'toArray',
        value: function toArray() {
            var array = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    array.push(value);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return array;
        }

        /**
         * Convenience method for appending a node and setting properties.
         *
         * @param {LinkedListNode} node
         * @param {LinkedListNode} tailNode - The last node
         * @returns {LinkedListNode}
         * @private
         */
    }, {
        key: '_appendNode',
        value: function _appendNode(node, tailNode) {
            tailNode.next = node;
            this.tail = node;

            return node;
        }

        /**
         * Convenience method for inserting a node and setting properties.
         *
         * @param {LinkedListNode} node
         * @param {LinkedListNode} currentNode - The node at the current index
         * @param {LinkedListNode} previousNode - The node at the previous index
         * @returns {LinkedListNode}
         * @private
         */
    }, {
        key: '_insertNode',
        value: function _insertNode(node, currentNode, previousNode) {
            node.next = currentNode;
            previousNode.next = node;

            return node;
        }

        /**
         * Convenience method for prepending a node and setting properties.
         *
         * @param {LinkedListNode} node
         * @param {LinkedListNode} headNode - The first node
         * @returns {LinkedListNode}
         * @private
         */
    }, {
        key: '_prependNode',
        value: function _prependNode(node, headNode) {
            node.next = headNode;
            this.head = node;

            return node;
        }

        /**
         * Convenience method for removing a node and setting properties.
         *
         * @param {LinkedListNode} node
         * @param {LinkedListNode} nextNode - The node at the next index
         * @param {LinkedListNode} previousNode - The node at the previous index
         * @returns {LinkedListNode}
         * @private
         */
    }, {
        key: '_removeNode',
        value: function _removeNode(node, nextNode, previousNode) {
            if (previousNode) {
                previousNode.next = nextNode;
            }

            return node;
        }

        /**
         * Convenience method for setting a root node if no nodes exist (no head yet).
         *
         * @param {LinkedListNode} node
         * @returns {LinkedListNode}
         * @private
         */
    }, {
        key: '_setRootNode',
        value: function _setRootNode(node) {
            this.head = node;
            this.tail = node;

            return node;
        }
    }]);

    return LinkedList;
})(_Collection3['default']);

exports['default'] = LinkedList;

var LinkedListNode = (function (_Node) {
    _inherits(LinkedListNode, _Node);

    function LinkedListNode(data) {
        _classCallCheck(this, LinkedListNode);

        _get(Object.getPrototypeOf(LinkedListNode.prototype), 'constructor', this).call(this, data);

        this.next = null;
    }

    return LinkedListNode;
})(_Node3['default']);

exports.LinkedListNode = LinkedListNode;