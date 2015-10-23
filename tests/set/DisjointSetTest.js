import DisjointSet, { DisjointSetNode } from '../../src/set/DisjointSet';

describe('DisjointSet', () => {
    let set = null;

    beforeEach(() => {
        set = new DisjointSet();
    });

    describe('iterator()', () => {
        it('should not iterate if empty', () => {
            let array = [];

            for (let value of set) {
                array.push(value);
            }

            expect(array).toEqual([]);
        });

        it('should iterate over each node', () => {
            set.insert(1).insert(2).insert(3);

            let array = [];

            for (let value of set) {
                array.push(value);
            }

            expect(array).toEqual([1, 2, 3]);
        });
    });

    describe('createNode()', () => {
        it('should create a node', () => {
            let node = set.createNode('foo');

            expect(node instanceof DisjointSetNode).toBe(true);
            expect(node.key).toBe(0);
            expect(node.value).toBe('foo');
            expect(node.parent).toBe(0);
            expect(node.rank).toBe(0);
        });
    });

    describe('empty()', () => {
        it('should delete all nodes', () => {
            expect(set.isEmpty()).toBe(true);

            set.insert(1);

            expect(set.isEmpty()).toBe(false);

            set.empty();

            expect(set.isEmpty()).toBe(true);
        });
    });

    describe('find()', () => {
        it('should return null if not found', () => {
            expect(set.find('a')).toBeNull();
        });

        it('should return itself if the representative', () => {
            set.insert('a');

            let node = set.find('a');

            expect(node.key).toBe(0);
            expect(node.value).toBe('a');
            expect(node.parent).toBe(0);
        });

        it('should return the representative if a child', () => {
            set.insertAll(['a', 'b', 'c']);
            set.union('b', 'a').union('a', 'c');

            let node = set.find('b');

            expect(node.key).toBe(1);
            expect(node.value).toBe('b');
            expect(node.parent).toBe(1);
        });
    });

    describe('insert()', () => {
        it('should error if the capacity is met', () => {
            set.capacity = 1; // Testing only
            set.insert(1);

            expect(set.size).toBe(1);

            expect(() => {
                set.insert(2);
            }).toThrowError('DisjointSet is full');
        });

        it('should set a value into the cache and assign an index', () => {
            expect(set.cache.has('foo')).toBe(false);

            set.insert('foo');

            expect(set.cache.has('foo')).toBe(true);
            expect(set.cache.get('foo')).toBe(0);

            set.insert('bar');

            expect(set.cache.get('bar')).toBe(1);
        });

        it('should map the index to a node', () => {
            set.insert('foo').insert('bar');

            expect(set.cache.get('bar')).toBe(1);

            let node = set.items.get(1);

            expect(node instanceof DisjointSetNode).toBe(true);
            expect(node.key).toBe(1);
            expect(node.value).toBe('bar');
            expect(node.parent).toBe(1);
            expect(node.rank).toBe(0);
        });

        it('should increase the size', () => {
            expect(set.size).toBe(0);

            set.insert('foo').insert('bar');

            expect(set.size).toBe(2);
        });
    });

    describe('isConnected(), isDisjoint()', () => {
        it('should just work', () => {
            set.insertAll(['a', 'b', 'c']);

            expect(set.isConnected('a', 'c')).toBe(false);
            expect(set.isDisjoint('a', 'c')).toBe(true);

            set.union('a', 'b');

            expect(set.isConnected('a', 'c')).toBe(false);
            expect(set.isDisjoint('a', 'c')).toBe(true);

            set.union('b', 'c');

            expect(set.isConnected('a', 'c')).toBe(true);
            expect(set.isDisjoint('a', 'c')).toBe(false);
        });
    });

    describe('search()', () => {
        it('should return null if not found', () => {
            expect(set.search('a')).toBeNull();
        });

        it('should return the node', () => {
            set.insertAll(['a', 'b', 'c']);
            set.union('b', 'a').union('a', 'c');

            let node = set.search('c');

            expect(node.key).toBe(2);
            expect(node.value).toBe('c');
            expect(node.parent).toBe(1);
        });
    });

    describe('union(), groups()', () => {
        it('should merge into groups', () => {
            set.insertAll(['a', 'b', 'c', 'd', 'e', 'f']);

            expect(set.groups()).toEqual([
                ['a'], ['b'], ['c'], ['d'], ['e'], ['f']
            ]);

            set.union('a', 'b');

            expect(set.groups()).toEqual([
                ['a', 'b'], ['c'], ['d'], ['e'], ['f']
            ]);

            set.union('f', 'e');

            expect(set.groups()).toEqual([
                ['a', 'b'], ['c'], ['d'], ['e', 'f']
            ]);

            set.union('c', 'b');

            expect(set.groups()).toEqual([
                ['a', 'b', 'c'], ['d'], ['e', 'f']
            ]);

            set.union('a', 'f');

            expect(set.groups()).toEqual([
                ['a', 'b', 'c', 'e', 'f'], ['d']
            ]);
        });

        it('should do nothing when not found', () => {
            set.insertAll([1, 2, 3]);
            set.union(1, 5);

            expect(set.groups()).toEqual([
                [1], [2], [3]
            ]);
        });

        it('should do nothing when in the same set', () => {
            set.insertAll([1, 2, 3]);
            set.union(1, 3);

            expect(set.groups()).toEqual([
                [1, 3], [2]
            ]);

            set.union(1, 1);

            expect(set.groups()).toEqual([
                [1, 3], [2]
            ]);
        });
    });

    it('should work with objects', () => {
        let a = { name: 'a' },
            b = { name: 'b' },
            c = { name: 'c' },
            d = { name: 'd' },
            e = { name: 'e' },
            node = null;

        set.insertAll([a, b, c, d, e]);

        expect(set.groups()).toEqual([
            [a], [b], [c], [d], [e]
        ]);

        set.union(a, c).union(c, e);

        expect(set.groups()).toEqual([
            [a, c, e], [b], [d]
        ]);

        node = set.find(e);

        expect(node.value).toBe(a);
        expect(node.parent).toBe(0);

        node = set.search(e);

        expect(node.value).toBe(e);
        expect(node.parent).toBe(0);
    });
});
