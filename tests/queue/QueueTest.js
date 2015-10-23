import Queue from '../../src/queue/Queue';
import Node from '../../src/Node';

describe('Queue', () => {
    let queue = null;

    beforeEach(() => {
        queue = new Queue();
    });

    describe('iterator()', () => {
        it('should not iterate if empty', () => {
            let array = [];

            for (let value of queue) {
                array.push(value);
            }

            expect(array).toEqual([]);
        });

        it('should iterate over each node', () => {
            queue.enqueue(1).enqueue(2).enqueue(3);

            let array = [];

            for (let value of queue) {
                array.push(value);
            }

            expect(array).toEqual([1, 2, 3]);
        });
    });

    describe('back()', () => {
        it('should return null if empty', () => {
            expect(queue.back()).toBeNull();
        });

        it('should return the value of the last element but not remove it', () => {
            queue.enqueueAll([1, 2, 3]);

            expect(queue.back()).toBe(3);
            expect(queue.size).toBe(3);

            queue.dequeue();

            expect(queue.back()).toBe(3);
            expect(queue.size).toBe(2);
        });
    });

    describe('contains()', () => {
        it('should return true if the value exists', () => {
            expect(queue.contains(2)).toBe(false);

            queue.enqueue(1).enqueue(2).enqueue(3);

            expect(queue.contains(2)).toBe(true);
        });
    });

    describe('empty()', () => {
        it('should delete all nodes', () => {
            expect(queue.isEmpty()).toBe(true);
            expect(queue.size).toBe(0);

            queue.enqueue(1).enqueue(2);

            expect(queue.isEmpty()).toBe(false);
            expect(queue.size).toBe(2);

            queue.empty();

            expect(queue.isEmpty()).toBe(true);
            expect(queue.size).toBe(0);
            expect(queue.items).toEqual([]);
        });
    });

    describe('dequeue()', () => {
        it('should return null if empty', () => {
            expect(queue.dequeue()).toBeNull();
        });

        it('should reduce the index, size, and items', () => {
            queue.enqueueAll([1, 2, 3]);

            expect(queue.index).toBe(3);
            expect(queue.size).toBe(3);
            expect(queue.items).toEqual([
                new Node(1),
                new Node(2),
                new Node(3)
            ]);

            let value = queue.dequeue();

            expect(value).toBe(1);
            expect(queue.index).toBe(2);
            expect(queue.size).toBe(2);
            expect(queue.items).toEqual([
                new Node(2),
                new Node(3)
            ]);

            value = queue.dequeue();

            expect(value).toBe(2);
            expect(queue.index).toBe(1);
            expect(queue.size).toBe(1);
            expect(queue.items).toEqual([
                new Node(3)
            ]);
        });
    });

    describe('dequeueAll()', () => {
        it('should return an array of all values', () => {
            queue.enqueueAll([1, 2, 3]);

            expect(queue.size).toBe(3);

            let values = queue.dequeueAll();

            expect(queue.size).toBe(0);
            expect(queue.items).toEqual([]);
            expect(values).toEqual([1, 2, 3]);
        });
    });

    describe('enqueue()', () => {
        it('should add values to the end of the queue', () => {
            expect(queue.size).toBe(0);
            expect(queue.items).toEqual([]);

            queue.enqueue(1);

            expect(queue.size).toBe(1);
            expect(queue.items).toEqual([
                new Node(1)
            ]);

            queue.enqueue(2);

            expect(queue.size).toBe(2);
            expect(queue.items).toEqual([
                new Node(1),
                new Node(2)
            ]);
        });

        it('should error if the capacity is met', () => {
            queue.capacity = 1; // Testing only
            queue.enqueue(1);

            expect(queue.size).toBe(1);

            expect(() => {
                queue.enqueue(2);
            }).toThrowError('Queue is full');
        });
    });

    describe('enqueueAll()', () => {
        it('should add multiple values', () => {
            expect(queue.size).toBe(0);
            expect(queue.items).toEqual([]);

            queue.enqueueAll([1, 2, 3]);

            expect(queue.size).toBe(3);
            expect(queue.items).toEqual([
                new Node(1),
                new Node(2),
                new Node(3)
            ]);
        });
    });

    describe('front()', () => {
        it('should return null if empty', () => {
            expect(queue.front()).toBeNull();
        });

        it('should return the value of the first element but not remove it', () => {
            queue.enqueueAll([1, 2, 3]);

            expect(queue.front()).toBe(1);
            expect(queue.size).toBe(3);

            queue.dequeue();

            expect(queue.front()).toBe(2);
            expect(queue.size).toBe(2);
        });
    });

    describe('indexOf()', () => {
        it('should return -1 if not found', () => {
            expect(queue.indexOf(5)).toBe(-1);

            queue.enqueue(1);

            expect(queue.indexOf(5)).toBe(-1);
        });

        it('should return the index', () => {
            queue.enqueue(1).enqueue(2).enqueue(3);

            expect(queue.indexOf(1)).toBe(0);
            expect(queue.indexOf(3)).toBe(2);
        });

        it('should return the first index of the same value', () => {
            queue.enqueueAll([1, 2, 2, 3]);

            expect(queue.indexOf(2)).toBe(1);
        });
    });

    describe('isFull()', () => {
        it('should return false if no capacity set', () => {
            expect(queue.isFull()).toBe(false);

            queue.enqueue(1);

            expect(queue.isFull()).toBe(false);
        });

        it('should return true if a capacity set', () => {
            queue.capacity = 1; // Testing only

            expect(queue.isFull()).toBe(false);

            queue.enqueue(1);

            expect(queue.isFull()).toBe(true);

            queue.dequeue();

            expect(queue.isFull()).toBe(false);
        });
    });

    describe('toArray()', () => {
        it('should return all values as an array in order', () => {
            queue.enqueue(1).enqueue(2).enqueue(3);
            queue.dequeue();
            queue.enqueueAll([4, 5, 6]);
            queue.dequeue();
            queue.dequeue();
            queue.enqueue(7);

            expect(queue.toArray()).toEqual([
                4, 5, 6, 7
            ]);
        });
    });

    it('should be usable with strings', () => {
        queue.enqueueAll(['foo', 'bar', 'baz']);

        expect(queue.contains('foo')).toBe(true);
        expect(queue.indexOf('bar')).toBe(1);

        let value = queue.dequeue();

        expect(value).toBe('foo');
        expect(queue.front()).toBe('bar');
        expect(queue.back()).toBe('baz');
    });

    it('should be usable with objects', () => {
        let foo = { key: 1, name: 'foo' },
            bar = { key: 2, name: 'bar' },
            baz = { key: 3, name: 'baz' },
            value = null;

        queue.enqueueAll([foo, bar, baz]);

        expect(queue.contains(foo)).toBe(true);
        expect(queue.indexOf(bar)).toBe(1);

        value = queue.dequeue();

        expect(value).toBe(foo);
        expect(queue.front()).toBe(bar);
        expect(queue.back()).toBe(baz);
    });
});
