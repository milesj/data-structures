import DoubleEndedQueue from '../src/DoubleEndedQueue';
import Node from '../src/Node';

describe('DoubleEndedQueue', () => {
    let queue = null;

    beforeEach(() => {
        queue = new DoubleEndedQueue();
    });

    describe('dequeueBack()', () => {
        it('should return null if empty', () => {
            expect(queue.dequeueBack()).toBeNull();
        });

        it('should reduce the index, size, and items', () => {
            queue.enqueueAll([1, 2, 3, 4, 5]);

            expect(queue.index).toBe(5);
            expect(queue.size).toBe(5);
            expect(queue.items).toEqual([
                new Node(1),
                new Node(2),
                new Node(3),
                new Node(4),
                new Node(5)
            ]);

            let value = queue.dequeueBack();

            expect(value).toBe(5);
            expect(queue.index).toBe(4);
            expect(queue.size).toBe(4);
            expect(queue.items).toEqual([
                new Node(1),
                new Node(2),
                new Node(3),
                new Node(4),
            ]);

            queue.dequeue();
            value = queue.dequeueBack();

            expect(value).toBe(4);
            expect(queue.index).toBe(2);
            expect(queue.size).toBe(2);
            expect(queue.items).toEqual([
                new Node(2),
                new Node(3)
            ]);
        });
    });

    describe('dequeueBackAll()', () => {
        it('should return an array of all values', () => {
            queue.enqueueAll([1, 2, 3]);

            expect(queue.size).toBe(3);

            let values = queue.dequeueBackAll();

            expect(queue.size).toBe(0);
            expect(queue.items).toEqual([]);
            expect(values).toEqual([3, 2, 1]);
        });
    });

    describe('enqueueFront()', () => {
        it('should add values to the front of the queue', () => {
            expect(queue.size).toBe(0);
            expect(queue.items).toEqual([]);

            queue.enqueueFront(1);

            expect(queue.size).toBe(1);
            expect(queue.items).toEqual([
                new Node(1)
            ]);

            queue.enqueueFront(2);

            expect(queue.size).toBe(2);
            expect(queue.items).toEqual([
                new Node(2),
                new Node(1)
            ]);

            queue.enqueue(3);

            expect(queue.size).toBe(3);
            expect(queue.items).toEqual([
                new Node(2),
                new Node(1),
                new Node(3)
            ]);
        });

        it('should error if the capacity is met', () => {
            queue.capacity = 1; // Testing only
            queue.enqueueFront(1);

            expect(queue.size).toBe(1);

            expect(() => { queue.enqueueFront(2); }).toThrowError('DoubleEndedQueue is full');
        });
    });

    describe('enqueueFrontAll()', () => {
        it('should add multiple values', () => {
            expect(queue.size).toBe(0);
            expect(queue.items).toEqual([]);

            queue.enqueueFrontAll([1, 2, 3]);

            expect(queue.size).toBe(3);
            expect(queue.items).toEqual([
                new Node(3),
                new Node(2),
                new Node(1)
            ]);
        });
    });

    it('should be usable with strings', () => {
        queue.enqueueAll(['foo', 'bar', 'baz']);

        expect(queue.contains('foo')).toBe(true);
        expect(queue.indexOf('bar')).toBe(1);

        let value = queue.dequeueBack();

        expect(value).toBe('baz');
        expect(queue.front()).toBe('foo');
        expect(queue.back()).toBe('bar');
    });

    it('should be usable with objects', () => {
        let foo = { key: 1, name: 'foo' },
            bar = { key: 2, name: 'bar' },
            baz = { key: 3, name: 'baz' };

        queue.enqueueFrontAll([foo, bar, baz]);

        expect(queue.contains(foo)).toBe(true);
        expect(queue.indexOf(bar)).toBe(1);

        let value = queue.dequeueBack();

        expect(value).toBe(foo);
        expect(queue.front()).toBe(baz);
        expect(queue.back()).toBe(bar);
    });
});
