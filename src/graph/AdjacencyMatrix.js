import Graph, { Vertex, Edge } from './Graph';

export const BREADTH_FIRST = 'BREADTH_FIRST';
export const DEPTH_FIRST = 'DEPTH_FIRST';

export default class AdjacencyMatrix extends Graph {
    constructor(capacity) {
        super();

        this.index = 0;
        this.matrix = [];

        // Generate the matrix ahead of time
        if (capacity > 0) {
            for (let i = 0; i < capacity; i++) {
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
    addEdge(a, b, weight = 1, bidi = false) {
        let origin = this.getVertex(a),
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
    addEdges(values) {
        for (let args of values) {
            this.addEdge.apply(this, args);
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
        let vertex = this.createNode(value);

        // Set node index
        vertex.index = this.index++;

        // Increase size
        this.vertexSize += 1;

        // Keep a reference for quick lookup
        this.vertices[value] = vertex;

        // Expand the matrix if necessary
        if (!vertex.index in this.matrix) {
            this.matrix[vertex.index] = [].fill(0, 0, this.index - 1);

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
     * {@inheritdoc}
     */
    getEdges() {
        let edges = [],
            edge,
            edgeCache = new Map(),
            vertexCache = new Map();

        // Cache each vertex by index
        for (let vertex of this.vertices) {
            vertexCache.set(vertex.index, vertex);
        }

        // Loop over each vertex
        for (let vertex of this.vertices) {

            // Loop over each edge
            for (let [index, weight] of this.matrix[vertex.index]) {
                if (index <= 0) {
                    continue;
                }

                // Check cache first
                edge = edgeCache.get(vertex.index + ':' + index) || edgeCache.get(index + ':' + vertex.index);

                // Create a new edge
                if (typeof edge === 'undefined') {
                    edge = new Edge(vertex, vertexCache.get(index));
                    edge.weight = weight;
                    edge.selfLoop = (vertex.index === index);

                    // Save the cache
                    edgeCache.set(vertex.index + ':' + index, edge);
                    edges.push(edge);

                // Edge already exists
                } else {
                    edge.directed = false;
                    edge.weight = Math.max(edge.weight, weight);
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
     * Disconnect the directed edge between the origin vertex and the destination vertex by denoting a 0
     * in the matrix that correlates to their defined index.
     * If either vertex cannot be found, this will be a no operation.
     *
     * @param {*} a
     * @param {*} b
     * @param {Boolean} bidi
     * @returns {AdjacencyMatrix}
     */
    removeEdge(a, b, bidi = false) {
        let origin = this.getVertex(a),
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

    /**
     * Disconnect multiple edges from vertices. The value of each item in the array should be an array
     * of arguments to pass to `removeEdge()`.
     *
     * @param {[][]} values
     * @returns {AdjacencyMatrix}
     */
    removeEdges(values) {
        for (let args of values) {
            this.removeEdge.apply(this, args);
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

        // Remove reference
        this.vertices.remove(value);

        // Remove edges by setting all rows and columns to -1
        for (let i = 0, index = vertex.index; i < this.vertexSize; i++) {
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
    removeVertices(values) {
        values.forEach(this.removeVertex.bind(this));

        return this;
    }

    traverse(callback, method = BREADTH_FIRST) {
        if (this.isEmpty()) {
            return this;
        }
    }
}
