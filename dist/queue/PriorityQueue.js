'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _heapMinHeap = require('../heap/MinHeap');

var _heapMinHeap2 = _interopRequireDefault(_heapMinHeap);

var _Node2 = require('../Node');

var _Node3 = _interopRequireDefault(_Node2);

var _helpers = require('../helpers');

/**
 * A `PriorityQueue` is a queue like data structure that processes items in order based on a priority level.
 * The lower the priority level number, the faster it will be processed -- for example, 1 has the highest priority.
 * The implementation uses `MinHeap` as its underlying architecture, and not a regular `Queue`.
 *
 * When pushing an object onto the queue, a "priority" property must be defined.
 * If one does not exist, it will automatically be set.
 */

var PriorityQueue = (function (_MinHeap) {
    _inherits(PriorityQueue, _MinHeap);

    function PriorityQueue() {
        _classCallCheck(this, PriorityQueue);

        _get(Object.getPrototypeOf(PriorityQueue.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * Change the node's key name to "priority" instead of "key".
     */

    _createClass(PriorityQueue, [{
        key: 'createNode',

        /**
         * {@inheritdoc}
         */
        value: function createNode(data) {
            return new PriorityQueueNode(data);
        }

        /**
         * Alias for `pop()`.
         *
         * @returns {*}
         */
    }, {
        key: 'dequeue',
        value: function dequeue() {
            return this.pop();
        }

        /**
         * Alias for `popAll()`.
         *
         * @returns {*[]}
         */
    }, {
        key: 'dequeueAll',
        value: function dequeueAll() {
            return this.popAll();
        }

        /**
         * Alias for `push()`.
         *
         * @param {*} value
         * @param {Number} [priority]
         * @returns {Heap}
         */
    }, {
        key: 'enqueue',
        value: function enqueue(value, priority) {
            return this.push(value, priority);
        }

        /**
         * Alias for `pushAll()`.
         *
         * @param {*[]} values
         * @returns {Heap}
         */
    }, {
        key: 'enqueueAll',
        value: function enqueueAll(values) {
            return this.pushAll(values);
        }

        /**
         * {@inheritdoc}
         *
         * An optional priority can be defined as the second argument, which will be appended to the
         * value if it is an object, and if the object does not already contain a priority.
         *
         * @param {*} value
         * @param {Number} [priority]
         * @returns {Heap}
         */
    }, {
        key: 'push',
        value: function push(value, priority) {
            if ((0, _helpers.isObject)(value) && typeof value.priority === 'undefined') {
                value.priority = priority || 100 + this.size;
            }

            return _get(Object.getPrototypeOf(PriorityQueue.prototype), 'push', this).call(this, value);
        }
    }]);

    return PriorityQueue;
})(_heapMinHeap2['default']);

exports['default'] = PriorityQueue;

var PriorityQueueNode = (function (_Node) {
    _inherits(PriorityQueueNode, _Node);

    function PriorityQueueNode() {
        _classCallCheck(this, PriorityQueueNode);

        _get(Object.getPrototypeOf(PriorityQueueNode.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PriorityQueueNode, [{
        key: 'keyName',

        /**
         * {@inheritdoc}
         */
        value: function keyName() {
            return 'priority';
        }
    }]);

    return PriorityQueueNode;
})(_Node3['default']);

exports.PriorityQueueNode = PriorityQueueNode;