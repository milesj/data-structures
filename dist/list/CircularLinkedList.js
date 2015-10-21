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

/**
 * A `CircularLinkedList` is a specialized `LinkedList` in which the tail node
 * keeps a next reference to the head node, forming a circular chain.
 */

var CircularLinkedList = (function (_LinkedList) {
    _inherits(CircularLinkedList, _LinkedList);

    function CircularLinkedList() {
        _classCallCheck(this, CircularLinkedList);

        _get(Object.getPrototypeOf(CircularLinkedList.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(CircularLinkedList, [{
        key: Symbol.iterator,

        /**
         * {@inheritdoc}
         */
        value: function value() {
            var head = this.head,
                curNode = head,
                node = null,
                i = 0;

            return {
                next: function next() {
                    if (!curNode || curNode === head && i !== 0) {
                        return { done: true };
                    } else {
                        node = curNode;
                        curNode = curNode.next;
                        i++;

                        return { value: node.value };
                    }
                }
            };
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: '_appendNode',
        value: function _appendNode(node, tailNode) {
            node.next = this.head;

            return _get(Object.getPrototypeOf(CircularLinkedList.prototype), '_appendNode', this).call(this, node, tailNode);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: '_prependNode',
        value: function _prependNode(node, headNode) {
            this.tail.next = node;

            return _get(Object.getPrototypeOf(CircularLinkedList.prototype), '_prependNode', this).call(this, node, headNode);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: '_removeNode',
        value: function _removeNode(node, nextNode, previousNode) {
            if (node === this.head) {
                this.tail.next = nextNode;
            } else if (node === this.tail) {
                previousNode.next = this.head;
            } else {
                _get(Object.getPrototypeOf(CircularLinkedList.prototype), '_removeNode', this).call(this, node, nextNode, previousNode);
            }

            return node;
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: '_setRootNode',
        value: function _setRootNode(node) {
            node.next = node;

            return _get(Object.getPrototypeOf(CircularLinkedList.prototype), '_setRootNode', this).call(this, node);
        }
    }]);

    return CircularLinkedList;
})(_LinkedList3['default']);

exports['default'] = CircularLinkedList;
module.exports = exports['default'];