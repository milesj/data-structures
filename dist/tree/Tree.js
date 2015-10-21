'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Structure2 = require('../Structure');

var _Structure3 = _interopRequireDefault(_Structure2);

var _Comparator = require('../Comparator');

var _Comparator2 = _interopRequireDefault(_Comparator);

var comparatorProp = Symbol('comparator');

/**
 * A `Tree` data structure simulates a hierarchical tree structure, representing as a set of linked nodes,
 * consisting of a root node and sub-trees of children with a parent node.
 *
 * @property {Node|null} root
 * @property {Number} size
 */

var Tree = (function (_Structure) {
  _inherits(Tree, _Structure);

  /**
   * Set the initial root node to null, and defined the `Comparator`.
   *
   * @param {Comparator} [comparator]
   */

  function Tree(comparator) {
    _classCallCheck(this, Tree);

    _get(Object.getPrototypeOf(Tree.prototype), 'constructor', this).call(this);

    this.root = null;
    this.size = 0;
    this[comparatorProp] = comparator instanceof _Comparator2['default'] ? comparator : new _Comparator2['default']();
  }

  /**
   * Returns the `Comparator` instance.
   *
   * @returns {Comparator}
   */

  _createClass(Tree, [{
    key: 'comparator',
    value: function comparator() {
      return this[comparatorProp];
    }

    /**
     * Calculates the number of edges from the root node to the node that matches the defined value.
     * If no node could be found, returns -1.
     *
     * @param {*} value
     * @returns {Number}
     */
  }, {
    key: 'depth',
    value: function depth(value) {
      return -1;
    }

    /**
     * Remove all nodes in the tree.
     *
     * @returns {Tree}
     */
  }, {
    key: 'empty',
    value: function empty() {
      this.root = null;
      this.size = 0;

      return this;
    }

    /**
     * Calculates the number of edges from the target node to the deepest leaf node.
     * If no node could be found, returns -1.
     *
     * @param {*} value
     * @returns {Number}
     */
  }, {
    key: 'height',
    value: function height(value) {
      return -1;
    }

    /**
     * Returns true if the tree is empty.
     *
     * @returns {Boolean}
     */
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.size === 0 || !this.root;
    }

    /**
     * Calculate the max depth (or height) of the tree from the root node to the deepest leaf node.
     *
     * @returns {Number}
     */
  }, {
    key: 'maxDepth',
    value: function maxDepth() {
      return -1;
    }

    /**
     * Alias for `maxDepth()`.
     *
     * @returns {Number}
     */
  }, {
    key: 'maxHeight',
    value: function maxHeight() {
      return this.maxDepth();
    }
  }]);

  return Tree;
})(_Structure3['default']);

exports['default'] = Tree;
module.exports = exports['default'];