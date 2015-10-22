import Structure from '../Structure';
import Node from '../Node';

export const BREADTH_FIRST = 'BREADTH_FIRST';
export const DEPTH_FIRST = 'DEPTH_FIRST';

export default class Graph extends Structure {
    constructor() {
        super();

        this.edgeSize = 0;
        this.vertexSize = 0;
        this.vertices = new Map();
    }

    /**
     * {@inheritdoc}
     */
    createNode(value) {
        return new Vertex(value);
    }

    /**
     * Remove all vertices and edges from the collection.
     *
     * @returns {Graph}
     */
    empty() {
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
    getEdges() {
        return [];
    }

    /**
     * Returns a vertex that matches the passed in value, or null if not found.
     *
     * @param {*} value
     * @returns {Vertex|null}
     */
    getVertex(value) {
        return this.vertices.get(value) || null;
    }

    /**
     * Returns an array of vertices (nodes) currently in the graph.
     *
     * @returns {Vertex[]}
     */
    getVertices() {
        let vertices = [];

        for (let vertex of this.vertices) {
            vertices.push(vertex);
        }

        return vertices;
    }

    /**
     * Returns true if the graph is empty.
     *
     * @returns {Boolean}
     */
    isEmpty() {
        return (this.vertexSize === 0);
    }
}

export class Vertex extends Node {
}

export class Edge {
    constructor(origin, target) {
        this.origin = origin;
        this.target = target;
        this.directed = true;
        this.selfLoop = false;
        this.weight = 0;
    }
}
