'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Queue2 = require('./Queue');

var _Queue3 = _interopRequireDefault(_Queue2);

/**
 * A `DoubleEndedQueue` is a specialized `Queue` in which values can be inserted or removed from both ends.
 */

var DoubleEndedQueue = (function (_Queue) {
    _inherits(DoubleEndedQueue, _Queue);

    function DoubleEndedQueue() {
        _classCallCheck(this, DoubleEndedQueue);

        _get(Object.getPrototypeOf(DoubleEndedQueue.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(DoubleEndedQueue, [{
        key: 'dequeueBack',

        /**
         * Remove and return the last value in the queue, or return null if empty.
         *
         * @returns {*}
         */
        value: function dequeueBack() {
            if (this.isEmpty()) {
                return null;
            }

            this.index -= 1;
            this.size -= 1;

            return this.items.pop().value;
        }

        /**
         * Remove and return an array of all values in the queue.
         * Will return them in reverse dequeue order.
         *
         * @returns {*[]}
         */
    }, {
        key: 'dequeueBackAll',
        value: function dequeueBackAll() {
            var values = [];

            while (this.index) {
                values.push(this.dequeueBack());
            }

            return values;
        }

        /**
         * Push a value to the front of the queue.
         * Throws an error if the queue is full.
         *
         * @param {*} value
         * @returns {DoubleEndedQueue}
         */
    }, {
        key: 'enqueueFront',
        value: function enqueueFront(value) {
            if (this.isFull()) {
                this.error('{class} is full');
            }

            this.items.unshift(this.createNode(value));
            this.index += 1;
            this.size += 1;

            return this;
        }

        /**
         * Push multiple values to the front of the queue.
         *
         * @param {*} values
         * @returns {DoubleEndedQueue}
         */
    }, {
        key: 'enqueueFrontAll',
        value: function enqueueFrontAll(values) {
            values.forEach(this.enqueueFront.bind(this));

            return this;
        }
    }]);

    return DoubleEndedQueue;
})(_Queue3['default']);

exports['default'] = DoubleEndedQueue;
module.exports = exports['default'];