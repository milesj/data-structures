import Graph, { Edge, BREADTH_FIRST, DEPTH_FIRST } from './Graph';

/**
 * An `AdjacencyMatrix` is a type of graph data structure that utilizes arrays of nested arrays to create
 * a grid, where each row and column is a vertex, and each cell denotes an edge.
 *
 * @property {Number} index - The current vertex index in the matrix
 * @property {Array} matrix - The array matrix that denotes edges
 *
 * @link https://ece.uwaterloo.ca/~cmoreno/ece250/2012-03-26--graphs-implementation.pdf
 * @link http://algs4.cs.princeton.edu/42digraph/
 * @link http://doc.sagemath.org/html/en/reference/graphs/sage/graphs/digraph.html
 */
export default class AdjacencyMatrix extends Graph {

    /**
     * If a capacity is defined, the matrix array will be pre-allocated.
     *
     * @param {Number} [capacity]
     */
    constructor(capacity = 0) {
        super();

        this.index = 0;
        this.matrix = [];

        // Generate the matrix ahead of time
        if (capacity > 0) {
            let row = Array(capacity).fill(0);

            for (let i = 0; i < capacity; i++) {
                this.matrix[i] = [].concat(row);
            }
        }
    }

    /**
     * Connect an origin vertex to a target vertex with a directed edge by denoting a 1 (or custom weight)
     * in the matrix that correlates to their defined index. A custom edge weight can be defined as the 3rd argument.
     * If either vertex cannot be found, this will be a no operation.
     *
     * @param {*} a
     * @param {*} b
     * @param {Number} weight
     * @param {Boolean} undirected
     * @returns {AdjacencyMatrix}
     */
    addEdge(a, b, weight = 1, undirected = false) {
        let origin = this.getVertex(a),
            target = this.getVertex(b),
            key = null,
            edge = null;

        if (!origin || !target) {
            return this;
        }

        // Set directed
        this.matrix[origin.index][target.index] = weight;

        // Set undirected
        if (undirected) {
            this.matrix[target.index][origin.index] = weight;
        }

        // Set the edge
        key = this.getEdgeKey(origin.index, target.index, undirected);

        edge = this.edges.get(key) || new Edge(origin, target);
        edge.key = key;
        edge.weight = weight;
        edge.directed = !undirected;
        edge.selfLoop = (a === b);

        this.edges.set(key, edge);

        return this;
    }

    /**
     * Connect multiple vertices with edges. The value of each item in the array should be an array
     * of arguments to pass to `addEdge()`.
     *
     * @param {[][]} values
     * @returns {AdjacencyMatrix}
     */
    addEdges(values) {
        for (let args of values) {
            this.addEdge(...args);
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
    addUndirectedEdge(a, b, weight = 1) {
        return this.addEdge(a, b, weight, true);
    }

    /**
     * Insert a value into the graph as a vertex, and save a reference to it.
     * Once the vertex has been inserted, add an additional row and column to the matrix.
     *
     * @param {*} value
     * @returns {AdjacencyMatrix}
     */
    addVertex(value) {
        if (this.items.has(value)) {
            return this;
        }

        let vertex = this.createNode(value);

        // Set node index and increase
        vertex.index = this.index++;

        // Keep a reference for quick lookup
        this.items.set(value, vertex.index);
        this.vertices.set(vertex.index, vertex);

        // Expand the matrix if necessary
        if (!(vertex.index in this.matrix)) {
            this.matrix[vertex.index] = Array(this.index).fill(0);

            for (let i = 0; i < this.index; i++) {
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
    addVertices(values) {
        values.forEach(this.addVertex.bind(this));

        return this;
    }

    /**
     * Returns true if there is a directed edge between the origin and target vertices.
     * If the third argument is true, it will check if there's an edge in either direction.
     *
     * @param {*} a
     * @param {*} b
     * @param {Boolean} undirected
     * @returns {Boolean}
     */
    hasEdge(a, b, undirected = false) {
        let origin = this.getVertex(a),
            target = this.getVertex(b);

        if (!origin || !target) {
            return false;
        }

        if (undirected) {
            return (this.matrix[origin.index][target.index] >= 1 || this.matrix[target.index][origin.index] >= 1);
        }

        return (this.matrix[origin.index][target.index] >= 1);
    }

    /**
     * Returns true if there is no cycle between vertices.
     *
     * @returns {Boolean}
     */
    isAcyclic() {
        return true;
    }

    /**
     * Returns true if there is an edge between all vertices.
     *
     * @returns {Boolean}
     */
    isComplete() {
        return true;
    }

    /**
     * Returns true if there is a path between very pair of vertices.
     *
     * @returns {Boolean}
     */
    isConnected() {
        return true;
    }

    /**
     * Returns true if all the edges are directed.
     *
     * @returns {Boolean}
     */
    isDirected() {
        return true;
    }

    /**
     * Returns true if there is a relatively few number of edges (E < |V| log |V|).
     *
     * @returns {Boolean}
     */
    isSparse() {
        return true;
    }

    /**
     * Log a visual representation of the graph to the console.
     */
    log() {
        /* eslint no-console: 0, no-magic-numbers: 0 */

        let header = '      ',
            rows = [],
            cols = [],
            pad = (value, size) => ('    ' + value).slice(-size);

        for (let i = 0; i < this.matrix.length; i++) {
            header += pad(i, 2) + '  ';
            cols = [];

            for (let j = 0; j < this.matrix[i].length; j++) {
                cols.push(pad(this.matrix[i][j], 2));
            }

            rows.push(pad(i, 3) + ' [ ' + cols.join(', ') + ' ]');
        }

        rows.unshift(header);

        console.log('\n' + rows.join('\n') + '\n');
    }

    /**
     * Disconnect the directed edge between the origin vertex and the target vertex by denoting a 0
     * in the matrix that correlates to their defined index.
     * If either vertex cannot be found, this will be a no operation.
     *
     * @param {*} a
     * @param {*} b
     * @param {Boolean} undirected
     * @returns {AdjacencyMatrix}
     */
    removeEdge(a, b, undirected = false) {
        let origin = this.getVertex(a),
            target = this.getVertex(b);

        if (!origin || !target) {
            return this;
        }

        // Remove directed
        this.matrix[origin.index][target.index] = 0;

        // Remove undirected
        if (undirected) {
            this.matrix[target.index][origin.index] = 0;
        }

        // Remove edge
        this.edges.delete(this.getEdgeKey(origin.index, target.index, undirected));

        return this;
    }

    /**
     * Disconnect multiple edges from vertices. The value of each item in the array should be an array
     * of arguments to pass to `removeEdge()`.
     *
     * @param {[][]} values
     * @returns {AdjacencyMatrix}
     */
    removeEdges(values) {
        for (let args of values) {
            this.removeEdge(...args);
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
    removeUndirectedEdge(a, b) {
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
    removeVertex(value) {
        let vertex = this.getVertex(value);

        if (!vertex) {
            return false;
        }

        // Remove edges
        for (let i = 0, index = vertex.index; i < this.vertices.size; i++) {
            this.matrix[index][i] = 0; // Row
            this.matrix[i][index] = 0; // Column
        }

        // Remove reference
        this.items.delete(value);
        this.vertices.delete(vertex.index);

        return true;
    }

    /**
     * Remove multiple vertices from the graph.
     *
     * @param {*[]} values
     * @returns {AdjacencyMatrix}
     */
    removeVertices(values) {
        values.forEach(this.removeVertex.bind(this));

        return this;
    }

    /**
     * TODO
     *
     * @param {Function} callback
     * @param {String} method
     * @returns {AdjacencyMatrix}
     */
    traverse(callback, method = BREADTH_FIRST) {
        if (this.isEmpty()) {
            return this;
        }
    }
}
