'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.leftChildIndex = leftChildIndex;
exports.parentIndex = parentIndex;
exports.rightChildIndex = rightChildIndex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Collection2 = require('../Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

/**
 * A `Heap` is an abstract binary tree-based data structure (using array indices) that satisfies the heap property:
 * A parent node must have a greater (or lower) value than that of its children.
 *
 * All node keys used for comparisons must be an integer or float.
 *
 * @abstract
 */

var Heap = (function (_Collection) {
    _inherits(Heap, _Collection);

    function Heap() {
        _classCallCheck(this, Heap);

        _get(Object.getPrototypeOf(Heap.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * Return the left child index for the defined index.
     *
     * @param {Number} index
     * @returns {Number}
     */

    _createClass(Heap, [{
        key: 'compare',

        /**
         * Compare the current node against its parent node.
         * If a max heap, the return will be true if the node is larger than the parent.
         * If a min heap, the return will be true if the node is smaller than the parent.
         *
         * @param {Node} node
         * @param {Node} parentNode
         * @returns {Boolean}
         */
        value: function compare(node, parentNode) {
            this.error('{class} compare() must be implemented');
        }

        /**
         * Returns true if the heap contains the specified value.
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
         * Returns the index of the first occurrence of the specified value in this heap or -1 otherwise.
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

        /**
         * Remove and return the top (min or max) value in the heap and continually bubble values down
         * until they satisfy the "heap property", or return null if empty.
         *
         * @returns {*}
         */
    }, {
        key: 'pop',
        value: function pop() {
            if (this.isEmpty()) {
                return null;
            }

            var node = this.items[0];

            // Move last item to the top
            this.items[0] = this.items.pop();

            // Decrease size
            this.size -= 1;

            // Bubble downwards
            var index = 0,
                leftIndex = undefined,
                rightIndex = undefined,
                largestIndex = undefined;

            while (true) {
                leftIndex = leftChildIndex(index);
                rightIndex = rightChildIndex(index);
                largestIndex = index;

                if (leftIndex < this.size && this.compare(this.items[leftIndex], this.items[largestIndex])) {
                    largestIndex = leftIndex;
                }

                if (rightIndex < this.size && this.compare(this.items[rightIndex], this.items[largestIndex])) {
                    largestIndex = rightIndex;
                }

                if (largestIndex !== index) {
                    var temp = this.items[index];

                    this.items[index] = this.items[largestIndex];
                    this.items[largestIndex] = temp;

                    index = largestIndex;
                } else {
                    break;
                }
            }

            return node.value;
        }

        /**
         * Remove and return an array of all values in the heap.
         * Will return them in the pop order.
         *
         * @returns {*[]}
         */
    }, {
        key: 'popAll',
        value: function popAll() {
            var values = [];

            while (this.size) {
                values.push(this.pop());
            }

            return values;
        }

        /**
         * Push a value onto the heap and continually bubble values up until they satisfy the "heap property".
         * Throws an error if the heap is full.
         *
         * @param {*} value
         * @returns {Heap}
         */
    }, {
        key: 'push',
        value: function push(value) {
            if (this.isFull()) {
                this.error('{class} is full');
            }

            var node = this.createNode(value),
                index = this.size,
                indexParent = parentIndex(index);

            // Bubble upwards
            while (index > 0 && this.compare(node, this.items[indexParent])) {
                this.items[index] = this.items[indexParent];

                index = indexParent;
                indexParent = parentIndex(indexParent);
            }

            // Set the node
            this.items[index] = node;

            // Increase size
            this.size += 1;

            return this;
        }

        /**
         * Push multiple values onto the heap.
         *
         * @param {*[]} values
         * @returns {Heap}
         */
    }, {
        key: 'pushAll',
        value: function pushAll(values) {
            values.forEach(this.push.bind(this));

            return this;
        }

        /**
         * Return the top value in the heap but do not remove it, or return null if empty.
         *
         * @returns {*}
         */
    }, {
        key: 'top',
        value: function top() {
            return this.isEmpty() ? null : this.items[0].value;
        }
    }]);

    return Heap;
})(_Collection3['default']);

exports['default'] = Heap;

function leftChildIndex(index) {
    return index * 2 + 1;
}

/**
 * Return the parent index for the defined index.
 *
 * @param {Number} index
 * @returns {Number}
 */

function parentIndex(index) {
    return Math.floor((index - 1) / 2);
}

/**
 * Return the right child index for the defined index.
 *
 * @param {Number} index
 * @returns {Number}
 */

function rightChildIndex(index) {
    return index * 2 + 2;
}