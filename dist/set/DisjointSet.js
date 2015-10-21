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
 * A `DisjointSet` is a data structure that keeps track of a set of elements partitioned
 * into a number of disjoint (non-overlapping) subsets.
 *
 * @property {Map} cache - Maps values to item indices
 * @property {Map} items - Maps indices to nodes
 */

var DisjointSet = (function (_Collection) {
    _inherits(DisjointSet, _Collection);

    /**
     * Store the capacity and instantiate all maps.
     *
     * @param {Number} capacity
     */

    function DisjointSet() {
        var capacity = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

        _classCallCheck(this, DisjointSet);

        _get(Object.getPrototypeOf(DisjointSet.prototype), 'constructor', this).call(this, capacity);

        this.cache = new Map();
        this.items = new Map();
    }

    /**
     * Don't inherit from `Node` as we don't want its constructor functionality.
     *
     * @property {Number} key
     * @property {*} value
     * @property {Number} parent
     * @property {Number} rank
     */

    /**
     * {@inheritdoc}
     */

    _createClass(DisjointSet, [{
        key: Symbol.iterator,
        value: function value() {
            return this.cache.keys();
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'createNode',
        value: function createNode(value) {
            return new DisjointSetNode(this.size, value);
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'empty',
        value: function empty() {
            this.cache.clear();
            this.items.clear();
            this.size = 0;

            return this;
        }

        /**
         * Find the representative node for the provided value, or return null if not found.
         *
         * @param {*} value
         * @returns {DisjointSetNode}
         */
    }, {
        key: 'find',
        value: function find(value) {
            if (!this.cache.has(value)) {
                return null;
            }

            var index = this.cache.get(value),
                node = this.items.get(index);

            // Return the node if it's the representative
            if (node.parent === index) {
                return node;
            }

            // Use path compression to keep the tree shallow
            var repNode = this.find(this.items.get(node.parent).value);

            // Set the initial nodes parent to the representative
            node.parent = repNode.key;

            return repNode;
        }

        /**
         * Returns an array of groups, or sub-arrays of each value grouped based on their subset.
         *
         * @returns {*[]}
         */
    }, {
        key: 'groups',
        value: function groups() {
            var sets = new Map(),
                repNode = undefined;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.cache.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    repNode = this.find(value);

                    if (sets.has(repNode.key)) {
                        sets.get(repNode.key).push(value);
                    } else {
                        sets.set(repNode.key, [value]);
                    }
                }

                // Do another loop as we want to return an array
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

            var groups = [];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = sets.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var group = _step2.value;

                    groups.push(group);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return groups;
        }

        /**
         * Insert a value into the set.
         *
         * @param {*} value
         * @returns {DisjointSet}
         */
    }, {
        key: 'insert',
        value: function insert(value) {
            if (this.isFull()) {
                this.error('{class} is full');
            }

            var node = this.createNode(value);

            // Keep a reference to the items index
            this.cache.set(value, node.key);

            // Store the item
            this.items.set(node.key, node);

            // Increase the size
            this.size += 1;

            return this;
        }

        /**
         * Insert multiple values into the set.
         *
         * @param {*[]} values
         * @returns {DisjointSet}
         */
    }, {
        key: 'insertAll',
        value: function insertAll(values) {
            values.forEach(this.insert.bind(this));

            return this;
        }

        /**
         * Returns true if both values are connected within the same subset.
         *
         * @param {*} a
         * @param {*} b
         * @returns {Boolean}
         */
    }, {
        key: 'isConnected',
        value: function isConnected(a, b) {
            return this.find(a) === this.find(b);
        }

        /**
         * Returns true if both values are not connected within the same subset.
         *
         * @param {*} a
         * @param {*} b
         * @returns {Boolean}
         */
    }, {
        key: 'isDisjoint',
        value: function isDisjoint(a, b) {
            return !this.isConnected(a, b);
        }

        /**
         * Search for a node that matches the provided value, or return null if not found.
         *
         * @param {*} value
         * @returns {DisjointSetNode}
         */
    }, {
        key: 'search',
        value: function search(value) {
            if (!this.cache.has(value)) {
                return null;
            }

            return this.items.get(this.cache.get(value));
        }

        /**
         * Merge two values into a single subset by joining their trees through a representative node.
         *
         * @param {*} a
         * @param {*} b
         * @returns {DisjointSet}
         */
    }, {
        key: 'union',
        value: function union(a, b) {
            var aRep = this.find(a),
                bRep = this.find(b);

            // One of the values does not exist
            if (!aRep || !bRep) {
                return this;
            }

            // Already in the same set
            if (aRep === bRep) {
                return this;
            }

            // Move A under B
            if (aRep.rank < bRep.rank) {
                aRep.parent = bRep.key;

                // Move B under A
            } else if (aRep.rank > bRep.rank) {
                    bRep.parent = aRep.key;

                    // They match, so move anywhere and increase rank
                } else {
                        bRep.parent = aRep.key;
                        aRep.rank += 1;
                    }

            return this;
        }
    }]);

    return DisjointSet;
})(_Collection3['default']);

exports['default'] = DisjointSet;

var DisjointSetNode = function DisjointSetNode(key, value) {
    _classCallCheck(this, DisjointSetNode);

    this.key = key;
    this.value = value;
    this.parent = key;
    this.rank = 0;
};

exports.DisjointSetNode = DisjointSetNode;