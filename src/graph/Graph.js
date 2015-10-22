import Structure from '../Structure';
import Node from '../Node';

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
     * Search for a vertex that matches the passed in value, or null if not found.
     *
     * @param {*} value
     * @returns {Node|null}
     */
    vertex(value) {
        return this.vertices.get(value) || null;
    }
}

export class Vertex extends Node {
}

export class Edge {
    constructor(a, b) {
        this.origin = a;
        this.destination = b;
        this.directed = true;
        this.weight = 0;
    }
}
