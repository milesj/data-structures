import PriorityQueue, { PriorityQueueNode } from '../../src/queue/PriorityQueue';

describe('PriorityQueue', () => {
    let queue = null;

    beforeEach(() => {
        queue = new PriorityQueue();
    });

    describe('createNode()', () => {
        it('should create a node', () => {
            let node = queue.createNode(1);

            expect(node instanceof PriorityQueueNode).toBe(true);
            expect(node.key).toBe(1);
            expect(node.value).toBe(1);
            expect(node.keyName()).toBe('priority');

            node = queue.createNode({
                priority: 1,
                name: 'foo'
            });

            expect(node.key).toBe(1);
            expect(node.value).toEqual({
                priority: 1,
                name: 'foo'
            });
        });
    });

    describe('dequeue()', () => {
        it('should remove a value and bubble down', () => {
            queue.enqueueAll([35, 26, 34, 15, 24, 33, 4, 12, 1, 23, 21, 2, 5]);

            let value = queue.dequeue();

            expect(value).toBe(1);
            expect(queue.toArray()).toEqual([2, 4, 5, 12, 21, 15, 33, 35, 24, 26, 23, 34]);

            value = queue.dequeue();

            expect(value).toBe(2);
            expect(queue.toArray()).toEqual([4, 12, 5, 24, 21, 15, 33, 35, 34, 26, 23]);
        });
    });

    describe('dequeueAll()', () => {
        it('should remove multiple values', () => {
            queue.enqueueAll([30, 2, 45, 23, 15, 11, 6, 10]);

            expect(queue.toArray()).toEqual([2, 10, 6, 15, 23, 45, 11, 30]);

            let values = queue.dequeueAll();

            expect(values).toEqual([2, 6, 10, 11, 15, 23, 30, 45]);
        });
    });

    describe('enqueue()', () => {
        it('should not set priority on non-objects', () => {
            queue.enqueue(1, 1);

            expect(queue.top()).toBe(1);
        });

        it('should set the priority if defined', () => {
            queue.enqueue({ name: 'foo' }, 3);

            expect(queue.top()).toEqual({
                name: 'foo',
                priority: 3
            });
        });

        it('should not override a preset priority', () => {
            queue.enqueue({
                name: 'foo',
                priority: 2
            }, 3);

            expect(queue.top()).toEqual({
                name: 'foo',
                priority: 2
            });
        });

        it('should automatically set the priority if not defined', () => {
            queue.enqueue({ name: 'foo' });

            expect(queue.top()).toEqual({
                name: 'foo',
                priority: 100
            });
        });

        it('should push a value and bubble up', () => {
            queue
                .enqueue({ name: 'foo' }, 50)
                .enqueue({ name: 'bar' }, 22)
                .enqueue({ name: 'baz' }, 42)
                .enqueue({ name: 'oof' }, 13)
                .enqueue({ name: 'rab' }, 33)
                .enqueue({ name: 'zab' }, 48);

            expect(queue.toArray()).toEqual([
                { name: 'oof', priority: 13 },
                { name: 'bar', priority: 22 },
                { name: 'baz', priority: 42 },
                { name: 'foo', priority: 50 },
                { name: 'rab', priority: 33 },
                { name: 'zab', priority: 48 }
            ]);
            expect(queue.size).toBe(6);
        });
    });

    describe('enqueueAll()', () => {
        it('should push multiple values', () => {
            queue.enqueueAll([
                { name: 'foo', priority: 15 },
                { name: 'bar', priority: 11 },
                { name: 'baz', priority: 12 },
                { name: 'oof', priority: 16 },
                { name: 'rab', priority: 17 },
                { name: 'zab', priority: 14 },
                { name: 'wtf', priority: 13 }
            ]);

            expect(queue.toArray()).toEqual([
                { name: 'bar', priority: 11 },
                { name: 'foo', priority: 15 },
                { name: 'baz', priority: 12 },
                { name: 'oof', priority: 16 },
                { name: 'rab', priority: 17 },
                { name: 'zab', priority: 14 },
                { name: 'wtf', priority: 13 }
            ]);
            expect(queue.size).toBe(7);
        });
    });
});
