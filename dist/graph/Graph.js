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

var _Node2 = require('../Node');

var _Node3 = _interopRequireDefault(_Node2);

var BREADTH_FIRST = 'BREADTH_FIRST';
exports.BREADTH_FIRST = BREADTH_FIRST;
var DEPTH_FIRST = 'DEPTH_FIRST';

exports.DEPTH_FIRST = DEPTH_FIRST;

var Graph = (function (_Structure) {
    _inherits(Graph, _Structure);

    function Graph() {
        _classCallCheck(this, Graph);

        _get(Object.getPrototypeOf(Graph.prototype), 'constructor', this).call(this);

        this.edgeSize = 0;
        this.vertexSize = 0;
        this.vertices = new Map();
    }

    /**
     * {@inheritdoc}
     */

    _createClass(Graph, [{
        key: 'createNode',
        value: function createNode(value) {
            return new Vertex(value);
        }

        /**
         * Remove all vertices and edges from the collection.
         *
         * @returns {Graph}
         */
    }, {
        key: 'empty',
        value: function empty() {
            this.edgeSize = 0;
            this.vertexSize = 0;
            this.vertices.clear();

            return this;
        }

        /**
         * Returns an array of edges (with metadata) currently in the graph.
         *
         * @returns {Edge[]}
         */
    }, {
        key: 'getEdges',
        value: function getEdges() {
            return [];
        }

        /**
         * Returns a vertex that matches the passed in value, or null if not found.
         *
         * @param {*} value
         * @returns {Vertex|null}
         */
    }, {
        key: 'getVertex',
        value: function getVertex(value) {
            return this.vertices.get(value) || null;
        }

        /**
         * Returns an array of vertices (nodes) currently in the graph.
         *
         * @returns {Vertex[]}
         */
    }, {
        key: 'getVertices',
        value: function getVertices() {
            var vertices = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.vertices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var vertex = _step.value;

                    vertices.push(vertex);
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

            return vertices;
        }

        /**
         * Returns true if the graph is empty.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.vertexSize === 0;
        }
    }]);

    return Graph;
})(_Structure3['default']);

exports['default'] = Graph;

var Vertex = (function (_Node) {
    _inherits(Vertex, _Node);

    function Vertex() {
        _classCallCheck(this, Vertex);

        _get(Object.getPrototypeOf(Vertex.prototype), 'constructor', this).apply(this, arguments);
    }

    return Vertex;
})(_Node3['default']);

exports.Vertex = Vertex;

var Edge = function Edge(a, b) {
    _classCallCheck(this, Edge);

    this.origin = a;
    this.destination = b;
    this.directed = true;
    this.selfLoop = false;
    this.weight = 0;
};

exports.Edge = Edge;