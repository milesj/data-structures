import AdjacencyMatrix from '../../src/graph/AdjacencyMatrix';

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

            graph.addVertex('C').addVertex('D').addVertex('D');

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
});
