'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _LinkedList2 = require('./LinkedList');

var _LinkedList3 = _interopRequireDefault(_LinkedList2);

var _Node2 = require('../Node');

var _Node3 = _interopRequireDefault(_Node2);

/**
 * A `DoublyLinkedList` is a specialized `LinkedList` in which each node keeps a reference to the
 * previous node in the chain.
 */

var DoublyLinkedList = (function (_LinkedList) {
    _inherits(DoublyLinkedList, _LinkedList);

    function DoublyLinkedList() {
        _classCallCheck(this, DoublyLinkedList);

        _get(Object.getPrototypeOf(DoublyLinkedList.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * @property {DoublyLinkedListNode|null} next
     * @property {DoublyLinkedListNode|null} prev
     */

    _createClass(DoublyLinkedList, [{
        key: 'createNode',

        /**
         * {@inheritdoc}
         */
        value: function createNode(data) {
            return new DoublyLinkedListNode(data);
        }

        /**
         * {@inheritdoc}
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

            this._removeNode(tail, null, tail.prev);
            this.tail = tail.prev;

            // Decrease the size
            this.size -= 1;

            return tail.value;
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: '_appendNode',
        value: function _appendNode(node, tailNode) {
            node.prev = tailNode;

            return _get(Object.getPrototypeOf(DoublyLinkedList.prototype), '_appendNode', this).call(this, node, tailNode);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: '_insertNode',
        value: function _insertNode(node, currentNode, previousNode) {
            node.prev = previousNode;
            currentNode.prev = node;

            return _get(Object.getPrototypeOf(DoublyLinkedList.prototype), '_insertNode', this).call(this, node, currentNode, previousNode);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: '_prependNode',
        value: function _prependNode(node, headNode) {
            headNode.prev = node;

            return _get(Object.getPrototypeOf(DoublyLinkedList.prototype), '_prependNode', this).call(this, node, headNode);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: '_removeNode',
        value: function _removeNode(node, nextNode, previousNode) {
            if (nextNode) {
                nextNode.prev = previousNode;
            }

            return _get(Object.getPrototypeOf(DoublyLinkedList.prototype), '_removeNode', this).call(this, node, nextNode, previousNode);
        }
    }]);

    return DoublyLinkedList;
})(_LinkedList3['default']);

exports['default'] = DoublyLinkedList;

var DoublyLinkedListNode = (function (_Node) {
    _inherits(DoublyLinkedListNode, _Node);

    function DoublyLinkedListNode(data) {
        _classCallCheck(this, DoublyLinkedListNode);

        _get(Object.getPrototypeOf(DoublyLinkedListNode.prototype), 'constructor', this).call(this, data);

        this.next = null;
        this.prev = null;
    }

    return DoublyLinkedListNode;
})(_Node3['default']);

exports.DoublyLinkedListNode = DoublyLinkedListNode;