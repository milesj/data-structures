import AdjacencyMatrix from '../../src/graph/AdjacencyMatrix';
import { Vertex, Edge } from '../../src/graph/Graph';

describe('AdjacencyMatrix', () => {
    let graph = null;

    beforeEach(() => {
        graph = new AdjacencyMatrix();
    });

    describe('constructor()', () => {
        it('should use an empty array by default', () => {
            expect(graph.matrix).toEqual([]);
        });

        it('should create a matrix based on the capacity', () => {
            graph = new AdjacencyMatrix(10);

            expect(graph.matrix.length).toBe(10);
            expect(graph.matrix[0].length).toBe(10);
            expect(graph.matrix[9].length).toBe(10);
            expect(graph.matrix[0][0]).toBe(0);
            expect(graph.matrix[9][9]).toBe(0);
        });
    });

    describe('addEdge()', () => {
        it('should do nothing if the vertex does not exist', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'Z');

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should add a directed edge', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should add an undirected edge', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B', 1, true);

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [1, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should allow custom weights', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B', 5, true);
            graph.addEdge('C', 'B', 10);

            expect(graph.matrix).toEqual([
                [0, 5, 0],
                [5, 0, 0],
                [0, 10, 0]
            ]);
        });

        it('should increase size for directed edges', () => {
            expect(graph.edgeSize).toBe(0);

            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');

            expect(graph.edgeSize).toBe(1);
        });

        it('should increase size for undirected edges', () => {
            expect(graph.edgeSize).toBe(0);

            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B', 1, true);

            expect(graph.edgeSize).toBe(1);
        });

        it('should not increase size of an edge exists', () => {
            expect(graph.edgeSize).toBe(0);

            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('B', 'A');
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'B', 1, true);

            expect(graph.edgeSize).toBe(1);
        });
    });

    describe('addEdges()', () => {
        it('should add multiple edges', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdges([
                ['A', 'B'],
                ['C', 'B']
            ]);

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 1, 0]
            ]);
        });

        it('should allow custom weights and undirected edges', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdges([
                ['A', 'B', 1, true],
                ['C', 'B', 6]
            ]);

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [1, 0, 0],
                [0, 6, 0]
            ]);
        });
    });

    describe('addUndirectedEdge()', () => {
        it('should add an undirected edge', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [1, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should allow custom weights', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B', 9);

            expect(graph.matrix).toEqual([
                [0, 9, 0],
                [9, 0, 0],
                [0, 0, 0]
            ]);
        });
    });

    describe('addVertex()', () => {
        it('should map a value to a vertex', () => {
            expect(graph.vertexSize).toBe(0);
            expect(graph.vertices.has('A')).toBe(false);

            graph.addVertex('A');

            expect(graph.vertexSize).toBe(1);
            expect(graph.vertices.has('A')).toBe(true);
        });

        it('should set an index on each vertex', () => {
            expect(graph.index).toBe(0);

            graph.addVertex('A').addVertex('B');

            expect(graph.index).toBe(2);
            expect(graph.vertices.get('A').index).toBe(0);
            expect(graph.vertices.get('B').index).toBe(1);
        });

        it('should not allow dupes', () => {
            expect(graph.vertexSize).toBe(0);

            graph.addVertex('A').addVertex('A');

            expect(graph.vertexSize).toBe(1);
        });

        it('should increase size', () => {
            expect(graph.vertexSize).toBe(0);

            graph.addVertex('A').addVertex('B');

            expect(graph.vertexSize).toBe(2);
        });

        it('should expand the matrix for each vertex', () => {
            expect(graph.matrix).toEqual([]);

            graph.addVertex('A');

            expect(graph.matrix).toEqual([
                [0]
            ]);

            graph.addVertex('B');

            expect(graph.matrix).toEqual([
                [0, 0],
                [0, 0]
            ]);

            graph.addVertex('C').addVertex('D').addVertex('E');

            expect(graph.matrix).toEqual([
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]);
        });

        it('should expect the matrix past the capacity', () => {
            graph = new AdjacencyMatrix(3);

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);

            graph.addVertex('A');

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);

            graph.addVertex('B');

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);

            graph.addVertex('C');

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);

            graph.addVertex('D');

            expect(graph.matrix).toEqual([
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]);
        });
    });

    describe('addVertices()', () => {
        it('should add multiple vertices', () => {
            expect(graph.vertexSize).toBe(0);
            expect(graph.vertices.has('A')).toBe(false);
            expect(graph.vertices.has('B')).toBe(false);

            graph.addVertices(['A', 'B']);

            expect(graph.vertexSize).toBe(2);
            expect(graph.vertices.has('A')).toBe(true);
            expect(graph.vertices.has('B')).toBe(true);
        });
    });

    describe('createNode()', () => {
        it('should create a vertex', () => {
            let node = graph.createNode('A');

            expect(node instanceof Vertex).toBe(true);
        });
    });

    describe('empty()', () => {
        it('should delete all nodes', () => {
            expect(graph.isEmpty()).toBe(true);

            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B');

            expect(graph.edgeSize).toBe(1);
            expect(graph.vertexSize).toBe(3);
            expect(graph.vertices.size).toBe(3);
            expect(graph.isEmpty()).toBe(false);

            graph.empty();

            expect(graph.edgeSize).toBe(0);
            expect(graph.vertexSize).toBe(0);
            expect(graph.vertices.size).toBe(0);
            expect(graph.isEmpty()).toBe(true);
        });
    });

    describe('getVertex()', () => {
        it('should return null if not found', () => {
            expect(graph.getVertex('A')).toBeNull();
        });

        it('should return the vertex node', () => {
            graph.addVertices(['A', 'B']);

            let vertex = new Vertex('B');
                vertex.index = 1;

            expect(graph.getVertex('B')).toEqual(vertex);
        });
    });

    describe('getVertices()', () => {
        it('should return an array of vertex nodes', () => {
            graph.addVertices(['C', 'B', 'A']);

            let a = new Vertex('A'),
                b = new Vertex('B'),
                c = new Vertex('C');

            a.index = 2;
            b.index = 1;
            c.index = 0;

            expect(graph.getVertices()).toEqual([c, b, a]);
        });
    });

    describe('removeEdge()', () => {
        it('should remove a directed edge', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);

            graph.removeEdge('A', 'B');

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should remove an directed edge', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [1, 0, 0],
                [0, 0, 0]
            ]);

            graph.removeEdge('A', 'B', true);

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should do nothing if the vertex does not exist', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');
            graph.removeEdge('A', 'Z');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should do nothing it the vertices are reversed', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);

            graph.removeEdge('B', 'A');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should decrease size for directed edges', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');
            graph.addEdge('C', 'C');

            expect(graph.edgeSize).toBe(2);
            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 1]
            ]);

            graph.removeEdge('C', 'C');

            expect(graph.edgeSize).toBe(1);
            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);

            graph.removeEdge('A', 'B');

            expect(graph.edgeSize).toBe(0);
        });

        it('should decrease size for undirected edges', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B');
            graph.addUndirectedEdge('C', 'A');

            expect(graph.edgeSize).toBe(2);
            expect(graph.matrix).toEqual([
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 0]
            ]);

            graph.removeEdge('A', 'C', true); // Reversed

            expect(graph.edgeSize).toBe(1);
            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [1, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should not increase size of an edge exists', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B');
            graph.addUndirectedEdge('C', 'A');

            expect(graph.edgeSize).toBe(2);
            expect(graph.matrix).toEqual([
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 0]
            ]);

            graph.removeEdge('A', 'B');

            expect(graph.edgeSize).toBe(2);
            expect(graph.matrix).toEqual([
                [0, 0, 1],
                [1, 0, 0],
                [1, 0, 0]
            ]);

            graph.removeEdge('B', 'A');

            expect(graph.edgeSize).toBe(1);
        });
    });

    describe('removeEdges()', () => {
        it('should remove multiple edges', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');
            graph.addEdge('B', 'B');
            graph.addEdge('C', 'A');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 1, 0],
                [1, 0, 0]
            ]);

            graph.removeEdges([
                ['A', 'B'],
                ['C', 'C'], // Nothing
                ['B', 'B']
            ]);

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [1, 0, 0]
            ]);
        });

        it('should allow undirected to be removed', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');
            graph.addUndirectedEdge('C', 'A');

            expect(graph.matrix).toEqual([
                [0, 1, 1],
                [0, 0, 0],
                [1, 0, 0]
            ]);

            graph.removeEdges([
                ['A', 'B'],
                ['A', 'C', true]
            ]);

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });
    });

    describe('removeUndirectedEdge()', () => {
        it('should remove an undirected edge', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B');
            graph.addUndirectedEdge('C', 'A');

            expect(graph.edgeSize).toBe(2);
            expect(graph.matrix).toEqual([
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 0]
            ]);

            graph.removeUndirectedEdge('A', 'B');
            graph.removeUndirectedEdge('A', 'C');

            expect(graph.edgeSize).toBe(0);
            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });
    });

    describe('removeVertex()', () => {
        it('should return false if the vertex doesnt exist', () => {
            expect(graph.removeVertex('A')).toBe(false);
        });

        it('should remove the reference', () => {
            expect(graph.vertices.has('A')).toBe(false);

            graph.addVertex('A');

            expect(graph.vertices.has('A')).toBe(true);

            let result = graph.removeVertex('A');

            expect(result).toBe(true);
            expect(graph.vertices.has('A')).toBe(false);
        });

        it('should remove edges', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B');
            graph.addEdge('B', 'C');

            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [1, 0, 1],
                [0, 0, 0]
            ]);

            graph.removeVertex('B');

            expect(graph.matrix).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

        it('should decrease the size', () => {
            graph.addVertices(['A', 'B', 'C']);

            expect(graph.vertexSize).toBe(3);

            graph.removeVertex('B');

            expect(graph.vertexSize).toBe(2);
        });
    });

    describe('removeVertices()', () => {
        it('should remove multiple vertices', () => {
            graph.addVertices(['A', 'B', 'C', 'D', 'E']);

            expect(graph.vertexSize).toBe(5);

            graph.removeVertices(['A', 'C', 'F']);

            expect(graph.vertexSize).toBe(3);
        });
    });
});
