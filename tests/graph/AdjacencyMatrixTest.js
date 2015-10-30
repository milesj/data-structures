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
            expect(graph.edges.size).toBe(0);

            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');

            expect(graph.edges.size).toBe(1);
        });

        it('should increase size for undirected edges', () => {
            expect(graph.edges.size).toBe(0);

            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B', 1, true);

            expect(graph.edges.size).toBe(1);
        });

        it('should set individual edges for directed', () => {
            graph.addVertices(['A', 'B', 'C', 'E']);
            graph.addEdge('A', 'B');
            graph.addEdge('C', 'E');

            expect(graph.edges.has('(0:1)')).toBe(true);
            expect(graph.edges.has('(2:3)')).toBe(true);

            let abEdge = graph.edges.get('(0:1)'),
                ceEdge = graph.edges.get('(2:3)');

            expect(abEdge.origin).toBe(graph.vertices.get(0));
            expect(abEdge.target).toBe(graph.vertices.get(1));
            expect(abEdge.directed).toBe(true);

            expect(ceEdge.origin).toBe(graph.vertices.get(2));
            expect(ceEdge.target).toBe(graph.vertices.get(3));
            expect(ceEdge.directed).toBe(true);
        });

        it('should set a self loop', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'A');

            expect(graph.edges.get('(0:0)').selfLoop).toBe(true);
        });

        it('should set a weight', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');
            graph.addEdge('C', 'A', 6);

            expect(graph.edges.get('(0:1)').weight).toBe(1);
            expect(graph.edges.get('(2:0)').weight).toBe(6);
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
            expect(graph.vertices.size).toBe(0);
            expect(graph.items.has('A')).toBe(false);

            graph.addVertex('A');

            expect(graph.vertices.size).toBe(1);
            expect(graph.vertices.has(graph.items.get('A')));
            expect(graph.items.has('A')).toBe(true);
        });

        it('should set an index on each vertex', () => {
            expect(graph.index).toBe(0);

            graph.addVertex('A').addVertex('B');

            expect(graph.index).toBe(2);
            expect(graph.vertices.get(graph.items.get('A')).index).toBe(0);
            expect(graph.vertices.get(graph.items.get('B')).index).toBe(1);
        });

        it('should not allow dupes', () => {
            expect(graph.vertices.size).toBe(0);

            graph.addVertex('A').addVertex('A');

            expect(graph.vertices.size).toBe(1);
        });

        it('should increase size', () => {
            expect(graph.vertices.size).toBe(0);

            graph.addVertex('A').addVertex('B');

            expect(graph.vertices.size).toBe(2);
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
            expect(graph.vertices.size).toBe(0);
            expect(graph.items.has('A')).toBe(false);
            expect(graph.items.has('B')).toBe(false);

            graph.addVertices(['A', 'B']);

            expect(graph.vertices.size).toBe(2);
            expect(graph.items.has('A')).toBe(true);
            expect(graph.items.has('B')).toBe(true);
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

            expect(graph.edges.size).toBe(1);
            expect(graph.vertices.size).toBe(3);
            expect(graph.vertices.size).toBe(3);
            expect(graph.isEmpty()).toBe(false);

            graph.empty();

            expect(graph.edges.size).toBe(0);
            expect(graph.vertices.size).toBe(0);
            expect(graph.vertices.size).toBe(0);
            expect(graph.isEmpty()).toBe(true);
        });
    });

    describe('getEdge()', () => {
        it('should return null if no vertex found', () => {
            expect(graph.getEdge('A', 'B')).toBeNull();
        });

        it('should return null if no edge exists', () => {
            graph.addVertices(['A', 'B']);

            expect(graph.getEdge('A', 'B')).toBeNull();
        });

        it('should return the edge object', () => {
            graph.addVertices(['A', 'B']);
            graph.addEdge('A', 'B');

            let edge = graph.getEdge('A', 'B');

            expect(edge.origin).toEqual(graph.getVertex('A'));
            expect(edge.target).toEqual(graph.getVertex('B'));
            expect(edge.directed).toBe(true);
        });
    });

    describe('getUndirectedEdge()', () => {
        it('should return the edge object', () => {
            graph.addVertices(['A', 'B']);
            graph.addUndirectedEdge('A', 'B');

            let edge = graph.getUndirectedEdge('A', 'B');

            expect(edge.origin).toEqual(graph.getVertex('A'));
            expect(edge.target).toEqual(graph.getVertex('B'));
            expect(edge.directed).toBe(false);
        });

        it('should return the undirected edge instead of directed edge', () => {
            graph.addVertices(['A', 'B', 'C', 'D']);
            graph.addEdge('C', 'A');
            graph.addUndirectedEdge('C', 'A');

            let uEdge = graph.getUndirectedEdge('C', 'A'),
                dEdge = graph.getEdge('C', 'A');

            expect(uEdge.directed).toBe(false);
            expect(dEdge.directed).toBe(true);
        });
    });

    describe('getEdgeKey()', () => {
        it('should return the index pairs as is for directed', () => {
            expect(graph.getEdgeKey(5, 10)).toBe('(5:10)');
        });

        it('should return the index pairs sorted for undirected', () => {
            expect(graph.getEdgeKey(5, 10, true)).toBe('{5:10}');
            expect(graph.getEdgeKey(10, 5, true)).toBe('{5:10}');
        });
    });

    describe('getEdges()', () => {
        it('should return an empty array if no edges', () => {
            expect(graph.getEdges()).toEqual([]);
        });

        it('should return an array of all edges', () => {
            graph.addVertices(['A', 'B', 'C', 'D', 'E', 'F']);
            graph.addEdge('B', 'C');
            graph.addEdge('F', 'A', 3);
            graph.addUndirectedEdge('D', 'E');

            let e1 = new Edge(graph.getVertex('B'), graph.getVertex('C')),
                e2 = new Edge(graph.getVertex('F'), graph.getVertex('A')),
                e3 = new Edge(graph.getVertex('D'), graph.getVertex('E'));

            e1.key = '(1:2)';
            e2.key = '(5:0)';
            e3.key = '{3:4}';

            e2.weight = 3;
            e3.directed = false;

            expect(graph.getEdges()).toEqual([
                e1,
                e2,
                e3
            ]);
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

    describe('hasEdge()', () => {
        it('should return false if a vertex does not exist', () => {
            graph.addVertex('A');

            expect(graph.hasEdge('A', 'B')).toBe(false);
        });

        it('should return true for a directed edge', () => {
            graph.addVertices(['A', 'B', 'C']);

            expect(graph.hasEdge('A', 'B')).toBe(false);

            graph.addEdge('A', 'B');

            expect(graph.hasEdge('A', 'B')).toBe(true);
        });

        it('should return true for either direction', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addEdge('A', 'B');

            expect(graph.hasEdge('A', 'B')).toBe(true);
            expect(graph.hasEdge('B', 'A')).toBe(false);
            expect(graph.hasEdge('B', 'A', true)).toBe(true);
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

            expect(graph.edges.size).toBe(2);
            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 1]
            ]);

            graph.removeEdge('C', 'C');

            expect(graph.edges.size).toBe(1);
            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);

            graph.removeEdge('A', 'B');

            expect(graph.edges.size).toBe(0);
        });

        it('should decrease size for undirected edges', () => {
            graph.addVertices(['A', 'B', 'C']);
            graph.addUndirectedEdge('A', 'B');
            graph.addUndirectedEdge('C', 'A');

            expect(graph.edges.size).toBe(2);
            expect(graph.matrix).toEqual([
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 0]
            ]);

            graph.removeEdge('A', 'C', true); // Reversed

            expect(graph.edges.size).toBe(1);
            expect(graph.matrix).toEqual([
                [0, 1, 0],
                [1, 0, 0],
                [0, 0, 0]
            ]);
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

            expect(graph.edges.size).toBe(2);
            expect(graph.matrix).toEqual([
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 0]
            ]);

            graph.removeUndirectedEdge('A', 'B');
            graph.removeUndirectedEdge('A', 'C');

            expect(graph.edges.size).toBe(0);
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
            expect(graph.items.has('A')).toBe(false);

            graph.addVertex('A');

            expect(graph.items.has('A')).toBe(true);

            let result = graph.removeVertex('A');

            expect(result).toBe(true);
            expect(graph.items.has('A')).toBe(false);
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

            expect(graph.vertices.size).toBe(3);

            graph.removeVertex('B');

            expect(graph.vertices.size).toBe(2);
        });
    });

    describe('removeVertices()', () => {
        it('should remove multiple vertices', () => {
            graph.addVertices(['A', 'B', 'C', 'D', 'E']);

            expect(graph.vertices.size).toBe(5);

            graph.removeVertices(['A', 'C', 'F']);

            expect(graph.vertices.size).toBe(3);
        });
    });
});
