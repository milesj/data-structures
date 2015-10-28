import Structure from '../Structure';
import Node from '../Node';

export const BREADTH_FIRST = 'BREADTH_FIRST';
export const DEPTH_FIRST = 'DEPTH_FIRST';

/**
 * Represents a vertex node.
 *
 * @param {Number} index - Unique index in the cache
 */
export class Vertex extends Node {
    constructor(value) {
        super(value);

        this.index = 0;
    }
}

/**
 * Represents an edge connection between two vertices.
 *
 * @param {String} key - The key in the edge cache
 * @param {Vertex} origin
 * @param {Vertex} target
 * @param {Boolean} directed - Whether its directed or undirected
 * @param {Boolean} selfLoop
 * @param {Number} weight
 */
export class Edge {
    constructor(origin, target) {
        this.key = '';
        this.origin = origin;
        this.target = target;
        this.directed = true;
        this.selfLoop = false;
        this.weight = 1;
    }
}

/**
 * A `Graph` data structure consists of a finite set of vertices (nodes), together with a set of unordered pairs
 * of these vertices for an undirected graph or a set of ordered pairs for a directed graph, also known as edges.
 *
 * @param {Map} edges - Mapping of edges to vertex index pairs
 * @param {Map} items - Mapping of raw values to their vertex index
 * @param {Map} vertices - Mapping of vertices to their unique numerical index
 */
export default class Graph extends Structure {
    constructor() {
        super();

        this.edges = new Map();
        this.items = new Map();
        this.vertices = new Map();
    }

    /**
     * @inheritdoc
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
        this.edges.clear();
        this.items.clear();
        this.vertices.clear();

        return this;
    }

    /**
     * Return an `Edge` object for the passed in vertex pair. If no edge is found, it will return null.
     *
     * @param {*} a
     * @param {*} b
     * @param {Boolean} undirected
     * @returns {Edge|null}
     */
    getEdge(a, b, undirected = false) {
        let origin = this.getVertex(a),
            target = this.getVertex(b);

        if (!origin || !target) {
            return null;
        }

        return this.edges.get(this.getEdgeKey(origin.index, target.index, undirected)) || null;
    }

    /**
     * Return an undirected `Edge` or null if not found.
     *
     * @param {*} a
     * @param {*} b
     * @returns {Edge|null}
     */
    getUndirectedEdge(a, b) {
        return this.getEdge(a, b, true);
    }

    /**
     * Returns an array of edges (with metadata) currently in the graph.
     *
     * @returns {Edge[]}
     */
    getEdges() {
        let edges = [];

        for (let edge of this.edges.values()) {
            edges.push(edge);
        }

        return edges;
    }

    /**
     * Generate an edge cache key by ordering the indices from smallest to largest.
     *
     * @param {Number} aIndex
     * @param {Number} bIndex
     * @param {Boolean} undirected
     * @returns {String}
     */
    getEdgeKey(aIndex, bIndex, undirected) {
        if (undirected) {
            return (aIndex < bIndex) ? `{${aIndex}:${bIndex}}` : `{${bIndex}:${aIndex}}`;
        }

        return `(${aIndex}:${bIndex})`;
    }

    /**
     * Returns a vertex that matches the passed in value, or null if not found.
     *
     * @param {*} value
     * @returns {Vertex|null}
     */
    getVertex(value) {
        return this.vertices.get(this.items.get(value)) || null;
    }

    /**
     * Returns an array of vertices (nodes) currently in the graph.
     *
     * @returns {Vertex[]}
     */
    getVertices() {
        let vertices = [];

        for (let vertex of this.vertices.values()) {
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
        return (this.vertices.size === 0 && this.edges.size === 0);
    }
}
