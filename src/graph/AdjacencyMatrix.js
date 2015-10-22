import Graph, { Vertex, Edge } from './Graph';

export default class AdjacencyMatrix extends Graph {
    constructor(capacity) {
        super();

        this.index = 0;
        this.matrix = [];

        // Generate the matrix ahead of time
        if (capacity > 0) {
            for (let i = 0; i < capacity; i++) {
                this.matrix[i] = [];

                for (let j = 0; j < capacity; j++) {
                    this.matrix[i][j] = 0;
                }
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
     * @param {Boolean} bidi
     * @returns {AdjacencyMatrix}
     */
    connect(a, b, weight = 1, bidi = false) {
        let origin = this.vertex(a),
            dest = this.vertex(b);

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
     * Connect both vertices with an undirected edge.
     *
     * @param {*} a
     * @param {*} b
     * @param {Number} weight
     * @returns {AdjacencyMatrix}
     */
    connectBoth(a, b, weight = 1) {
        return this.connect(a, b, weight, true);
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
    disconnect(a, b, bidi = false) {
        let origin = this.vertex(a),
            dest = this.vertex(b);

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
     * Disconnect the edge between two vertices in both directions.
     *
     * @param {*} a
     * @param {*} b
     * @returns {AdjacencyMatrix}
     */
    disconnectBoth(a, b) {
        return this.disconnect(a, b, true);
    }

    /**
     * Insert a value into the graph as a vertex, and save a reference to it.
     * Once the vertex has been inserted, add an additional row and column to the matrix.
     *
     * @param {*} value
     * @returns {AdjacencyMatrix}
     */
    insert(value) {
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
     * Remove a vertex and its associated edges from the graph that matches the passed in value.
     * Once the vertex has been removed, set all edges to -1 in the matrix.
     * We can't actually remove the rows and columns as it would cause our indices to get out of sync.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    remove(value) {
        let vertex = this.vertex(value);

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
}
