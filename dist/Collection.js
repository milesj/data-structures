'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Structure2 = require('./Structure');

var _Structure3 = _interopRequireDefault(_Structure2);

/**
 * A `Collection` is an abstract class that defines a collection of nodes.
 *
 * @abstract
 * @property {Number} capacity
 * @property {Node[]} items
 * @property {Number} size
 */

var Collection = (function (_Structure) {
    _inherits(Collection, _Structure);

    /**
     * Set the capacity limit. If the capacity is 0, there is no limit.
     *
     * @param {Number} [capacity]
     */

    function Collection() {
        var capacity = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

        _classCallCheck(this, Collection);

        _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).call(this);

        this.capacity = capacity;
        this.items = [];
        this.size = 0;
    }

    /**
     * Iterate over all the items in the collection.
     */

    _createClass(Collection, [{
        key: Symbol.iterator,
        value: function value() {
            var items = this.items,
                size = this.size,
                i = 0;

            return {
                next: function next() {
                    if (i === size) {
                        return { done: true };
                    } else {
                        return { value: items[i++].value };
                    }
                }
            };
        }

        /**
         * Remove all items from the collection.
         *
         * @returns {Collection}
         */
    }, {
        key: 'empty',
        value: function empty() {
            this.items = [];
            this.size = 0;

            return this;
        }

        /**
         * Returns true if the collection is empty.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size === 0;
        }

        /**
         * Return true if a capacity is set, and the capacity is full.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isFull',
        value: function isFull() {
            return this.capacity > 0 && this.size >= this.capacity;
        }

        /**
         * Return the collection as an array of values.
         *
         * @returns {Array}
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
    }]);

    return Collection;
})(_Structure3['default']);

exports['default'] = Collection;
module.exports = exports['default'];