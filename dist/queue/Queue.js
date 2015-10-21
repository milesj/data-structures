'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Collection2 = require('../Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

/**
 * A `Queue` is a basic data structure that can be represented as a line of ordered data.
 * Insertion places a value onto the rear, while deletion removes a value from the front.
 * This is also known as a first in first out approach (FIFO).
 *
 * @property {Number} index
 */

var Queue = (function (_Collection) {
    _inherits(Queue, _Collection);

    /**
     * Set the capacity limit and starting index.
     *
     * @param {Number} [capacity]
     */

    function Queue() {
        var capacity = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

        _classCallCheck(this, Queue);

        _get(Object.getPrototypeOf(Queue.prototype), 'constructor', this).call(this, capacity);

        this.index = 0;
    }

    /**
     * Returns the last value in the queue but does not remove it, or returns null if empty.
     *
     * @returns {*}
     */

    _createClass(Queue, [{
        key: 'back',
        value: function back() {
            return this.isEmpty() ? null : this.items[this.index - 1].value;
        }

        /**
         * Returns true if the queue contains the specified value.
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
         * Remove and return the first value in the queue, or returns null if empty.
         *
         * @returns {*}
         */
    }, {
        key: 'dequeue',
        value: function dequeue() {
            if (this.isEmpty()) {
                return null;
            }

            this.index -= 1;
            this.size -= 1;

            return this.items.shift().value;
        }

        /**
         * Remove and return an array of all values in the queue.
         * Will return them in the dequeue order.
         *
         * @returns {*[]}
         */
    }, {
        key: 'dequeueAll',
        value: function dequeueAll() {
            var values = [];

            while (this.index) {
                values.push(this.dequeue());
            }

            return values;
        }

        /**
         * Push a value to the end of the queue.
         * Throws an error if the queue is full.
         *
         * @param {*} value
         * @returns {Queue}
         */
    }, {
        key: 'enqueue',
        value: function enqueue(value) {
            if (this.isFull()) {
                this.error('{class} is full');
            }

            this.items[this.index] = this.createNode(value);
            this.index += 1;
            this.size += 1;

            return this;
        }

        /**
         * Push multiple values to the end of the queue.
         *
         * @param {*} values
         * @returns {Queue}
         */
    }, {
        key: 'enqueueAll',
        value: function enqueueAll(values) {
            values.forEach(this.enqueue.bind(this));

            return this;
        }

        /**
         * Returns the first value in the queue but does not remove it, or returns null if empty.
         *
         * @returns {*}
         */
    }, {
        key: 'front',
        value: function front() {
            return this.isEmpty() ? null : this.items[0].value;
        }

        /**
         * Returns the index of the first occurrence of the specified value in this queue or -1 otherwise.
         *
         * @param {*} value
         * @returns {Number}
         */
    }, {
        key: 'indexOf',
        value: function indexOf(value) {
            for (var i = 0; i < this.size; i++) {
                if (this.items[i].value === value) {
                    return i;
                }
            }

            return -1;
        }
    }]);

    return Queue;
})(_Collection3['default']);

exports['default'] = Queue;
module.exports = exports['default'];