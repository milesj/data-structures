'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Graph2 = require('./Graph');

var _Graph3 = _interopRequireDefault(_Graph2);

var AdjacencyMatrix = (function (_Graph) {
    _inherits(AdjacencyMatrix, _Graph);

    function AdjacencyMatrix(capacity) {
        _classCallCheck(this, AdjacencyMatrix);

        _get(Object.getPrototypeOf(AdjacencyMatrix.prototype), 'constructor', this).call(this);

        this.index = 0;
        this.matrix = [];

        // Generate the matrix ahead of time
        if (capacity > 0) {
            for (var i = 0; i < capacity; i++) {
                this.matrix[i] = [].fill(0, 0, capacity - 1);
            }
        }
    }

    /**
     * Connect an origin vertex to a destination vertex with a directed edge by denoting a 1 (or custom weight)
     * in the matrix that correlates to their defined index. A custom edge weight can be defined as the 3rd argument.
     * If either vertex cannot be found, this will be a no operation.
     *
     * @param {*} a
     * @param {*} b
     * @param {Number} weight
     * @param {Boolean} bidi - Mark this edge as undirected
     * @returns {AdjacencyMatrix}
     */

    _createClass(AdjacencyMatrix, [{
        key: 'addEdge',
        value: function addEdge(a, b) {
            var weight = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
            var bidi = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

            var origin = this.getVertex(a),
                dest = this.getVertex(b);

            if (!origin || !dest) {
                return this;
            }

            this.matrix[origin.index][dest.index] = weight;

            // Set bi-directional
            if (bidi) {
                this.matrix[dest.index][origin.index] = weight;
            }

            // Increase edge count
            this.edgeSize += 1;

            return this;
        }

        /**
         * Connect multiple vertices with edges. The value of each item in the array should be an array
         * of arguments to pass to `addEdge()`.
         *
         * @param {[][]} values
         * @returns {AdjacencyMatrix}
         */
    }, {
        key: 'addEdges',
        value: function addEdges(values) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var args = _step.value;

                    this.addEdge.apply(this, args);
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

            return this;
        }

        /**
         * Connect both vertices with an undirected edge.
         *
         * @param {*} a
         * @param {*} b
         * @param {Number} weight
         * @returns {AdjacencyMatrix}
         */
    }, {
        key: 'addUndirectedEdge',
        value: function addUndirectedEdge(a, b) {
            var weight = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            return this.addEdge(a, b, weight, true);
        }

        /**
         * Insert a value into the graph as a vertex, and save a reference to it.
         * Once the vertex has been inserted, add an additional row and column to the matrix.
         *
         * @param {*} value
         * @returns {AdjacencyMatrix}
         */
    }, {
        key: 'addVertex',
        value: function addVertex(value) {
            var vertex = this.createNode(value);

            // Set node index
            vertex.index = this.index++;

            // Increase size
            this.vertexSize += 1;

            // Keep a reference for quick lookup
            this.vertices[value] = vertex;

            // Expand the matrix if necessary
            if (!vertex.index in this.matrix) {
                this.matrix[vertex.index] = [].fill(0, 0, this.index - 1);

                for (var i = 0; i < this.index; i++) {
                    this.matrix[i][vertex.index] = 0;
                }
            }

            return this;
        }

        /**
         * Insert multiple values into the graph.
         *
         * @param {*[]} values
         * @returns {AdjacencyMatrix}
         */
    }, {
        key: 'addVertices',
        value: function addVertices(values) {
            values.forEach(this.addVertex.bind(this));

            return this;
        }

        /**
         * {@inheritdoc}
         */
    }, {
        key: 'getEdges',
        value: function getEdges() {
            var edges = [],
                edge = undefined,
                edgeCache = new Map(),
                vertexCache = new Map();

            // Cache each vertex by index
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.vertices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var vertex = _step2.value;

                    vertexCache.set(vertex.index, vertex);
                }

                // Loop over each vertex
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.vertices[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var vertex = _step3.value;

                    // Loop over each edge
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = this.matrix[vertex.index][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _step4$value = _slicedToArray(_step4.value, 2);

                            var index = _step4$value[0];
                            var weight = _step4$value[1];

                            if (index <= 0) {
                                continue;
                            }

                            // Check cache first
                            edge = edgeCache.get(vertex.index + ':' + index) || edgeCache.get(index + ':' + vertex.index);

                            // Create a new edge
                            if (typeof edge === 'undefined') {
                                edge = new _Graph2.Edge(vertex, vertexCache.get(index));
                                edge.weight = weight;
                                edge.selfLoop = vertex.index === index;

                                // Save the cache
                                edgeCache.set(vertex.index + ':' + index, edge);
                                edges.push(edge);

                                // Edge already exists
                            } else {
                                    edge.directed = false;
                                    edge.weight = Math.max(edge.weight, weight);
                                }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                                _iterator4['return']();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                        _iterator3['return']();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return edges;
        }

        /**
         * Returns true if there is no cycle between vertices.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isAcyclic',
        value: function isAcyclic() {
            return true;
        }

        /**
         * Returns true if there is an edge between all vertices.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isComplete',
        value: function isComplete() {
            return true;
        }

        /**
         * Returns true if there is a path between very pair of vertices.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isConnected',
        value: function isConnected() {
            return true;
        }

        /**
         * Returns true if all the edges are directed.
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isDirected',
        value: function isDirected() {
            return true;
        }

        /**
         * Returns true if there is a relatively few number of edges (E < |V| log |V|).
         *
         * @returns {Boolean}
         */
    }, {
        key: 'isSparse',
        value: function isSparse() {
            return true;
        }

        /**
         * Disconnect the directed edge between the origin vertex and the destination vertex by denoting a 0
         * in the matrix that correlates to their defined index.
         * If either vertex cannot be found, this will be a no operation.
         *
         * @param {*} a
         * @param {*} b
         * @param {Boolean} bidi
         * @returns {AdjacencyMatrix}
         */
    }, {
        key: 'removeEdge',
        value: function removeEdge(a, b) {
            var bidi = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            var origin = this.getVertex(a),
                dest = this.getVertex(b);

            if (!origin || !dest) {
                return this;
            }

            this.matrix[origin.index][dest.index] = 0;

            // Set bi-directional
            if (bidi) {
                this.matrix[dest.index][origin.index] = 0;
            }

            // Decrease edge count
            this.edgeSize -= 1;

            return this;
        }
    }, {
        key: 'log',
        value: function log() {
            var output = '',
                pad = function pad(value, size) {
                return ('    ' + value).slice(-size);
            };

            // Include header

            // Include rows
            for (var i = 0; i < this.matrix.length; i++) {
                output += pad(i, 5) + ' ';

                console.log(i, this.matrix[i]);

                /*for (let c of row) {
                    output += '[ ' + pad(c, 3) + ' ]';
                }*/

                output += '\n';
            }

            console.log(output);
        }

        /**
         * Disconnect multiple edges from vertices. The value of each item in the array should be an array
         * of arguments to pass to `removeEdge()`.
         *
         * @param {[][]} values
         * @returns {AdjacencyMatrix}
         */
    }, {
        key: 'removeEdges',
        value: function removeEdges(values) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = values[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var args = _step5.value;

                    this.removeEdge.apply(this, args);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                        _iterator5['return']();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return this;
        }

        /**
         * Disconnect the edge between two vertices in both directions.
         *
         * @param {*} a
         * @param {*} b
         * @returns {AdjacencyMatrix}
         */
    }, {
        key: 'removeUndirectedEdge',
        value: function removeUndirectedEdge(a, b) {
            return this.removeEdge(a, b, true);
        }

        /**
         * Remove a vertex and its associated edges from the graph that matches the passed in value.
         * Once the vertex has been removed, set all edges to -1 in the matrix.
         * We can't actually remove the rows and columns as it would cause our indices to get out of sync.
         *
         * @param {*} value
         * @returns {Boolean}
         */
    }, {
        key: 'removeVertex',
        value: function removeVertex(value) {
            var vertex = this.getVertex(value);

            if (!vertex) {
                return false;
            }

            // Remove reference
            this.vertices.remove(value);

            // Remove edges by setting all rows and columns to -1
            for (var i = 0, index = vertex.index; i < this.vertexSize; i++) {
                this.matrix[index][i] = -1; // Row
                this.matrix[i][index] = -1; // Column
            }

            // Decrease size
            this.vertexSize -= 1;

            return true;
        }

        /**
         * Remove multiple vertices from the graph.
         *
         * @param {*[]} values
         * @returns {AdjacencyMatrix}
         */
    }, {
        key: 'removeVertices',
        value: function removeVertices(values) {
            values.forEach(this.removeVertex.bind(this));

            return this;
        }
    }, {
        key: 'traverse',
        value: function traverse(callback) {
            var method = arguments.length <= 1 || arguments[1] === undefined ? _Graph2.BREADTH_FIRST : arguments[1];

            if (this.isEmpty()) {
                return this;
            }
        }
    }]);

    return AdjacencyMatrix;
})(_Graph3['default']);

exports['default'] = AdjacencyMatrix;
module.exports = exports['default'];