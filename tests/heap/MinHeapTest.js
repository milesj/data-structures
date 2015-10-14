import MinHeap from '../../src/heap/MinHeap';

describe('MinHeap', () => {
    let heap = null;

    beforeEach(() => {
        heap = new MinHeap();
    });

    describe('iterator()', () => {
        it('should not iterate if empty', () => {
            let array = [];

            for (let value of heap) {
                array.push(value);
            }

            expect(array).toEqual([]);
        });

        it('should iterate over each node', () => {
            heap.push(15).push(6).push(9).push(11);

            let array = [];

            for (let value of heap) {
                array.push(value);
            }

            expect(array).toEqual([6, 11, 9, 15]);
        });
    });

    describe('contains()', () => {
        it('should return true if the value exists', () => {
            expect(heap.contains(2)).toBe(false);

            heap.push(1).push(2).push(3);

            expect(heap.contains(2)).toBe(true);
        });
    });

    describe('empty()', () => {
        it('should delete all nodes', () => {
            expect(heap.isEmpty()).toBe(true);
            expect(heap.size).toBe(0);

            heap.push(1).push(2);

            expect(heap.isEmpty()).toBe(false);
            expect(heap.size).toBe(2);

            heap.empty();

            expect(heap.isEmpty()).toBe(true);
            expect(heap.size).toBe(0);
            expect(heap.items).toEqual([]);
        });
    });

    describe('indexOf()', () => {
        it('should return -1 if not found', () => {
            expect(heap.indexOf(5)).toBe(-1);

            heap.push(1);

            expect(heap.indexOf(5)).toBe(-1);
        });

        it('should return the index', () => {
            heap.push(1).push(2).push(3);

            expect(heap.indexOf(1)).toBe(0);
            expect(heap.indexOf(3)).toBe(2);
        });

        it('should return the first index of the same value', () => {
            heap.push(1).push(2).push(2).push(3);

            expect(heap.indexOf(2)).toBe(1);
        });
    });

    describe('isFull()', () => {
        it('should return false if no capacity set', () => {
            expect(heap.isFull()).toBe(false);

            heap.push(1);

            expect(heap.isFull()).toBe(false);
        });

        it('should return true if a capacity set', () => {
            heap.capacity = 1; // Testing only

            expect(heap.isFull()).toBe(false);

            heap.push(1);

            expect(heap.isFull()).toBe(true);

            heap.pop();

            expect(heap.isFull()).toBe(false);
        });
    });

    describe('min()', () => {
        it('should return null if empty', () => {
            expect(heap.min()).toBeNull();
        });

        it('should return the min value but not remove it', () => {
            heap.pushAll([14, 20, 32]);

            let value = heap.min();

            expect(value).toBe(14);
            expect(heap.size).toBe(3);
        });
    });

    describe('pop()', () => {
        it('should return null if empty', () => {
            expect(heap.pop()).toBeNull();
        });

        it('should reduce size and move the last node to the root', () => {
            heap.push(15).push(10);

            expect(heap.size).toBe(2);

            let value = heap.pop();

            expect(value).toBe(10);
            expect(heap.size).toBe(1);
            expect(heap.items[0].value).toBe(15);
            expect(heap.toArray()).toEqual([15]);
        });

        /**
         * http://pages.cs.wisc.edu/~vernon/cs367/notes/11.PRIORITY-Q.html#remove
         */
        it('should remove a value and bubble down', () => {
            heap.pushAll([35, 26, 34, 15, 24, 33, 4, 12, 1, 23, 21, 2, 5]);

            let value = heap.pop();

            expect(value).toBe(1);
            expect(heap.toArray()).toEqual([2, 4, 5, 12, 21, 15, 33, 35, 24, 26, 23, 34]);

            value = heap.pop();

            expect(value).toBe(2);
            expect(heap.toArray()).toEqual([4, 12, 5, 24, 21, 15, 33, 35, 34, 26, 23]);
        });
    });

    describe('popAll()', () => {
        it('should remove multiple values', () => {
            heap.pushAll([30, 2, 45, 23, 15, 11, 6, 10]);

            expect(heap.toArray()).toEqual([2, 10, 6, 15, 23, 45, 11, 30]);

            let values = heap.popAll();

            expect(values).toEqual([2, 6, 10, 11, 15, 23, 30, 45]);
        });
    });

    describe('push()', () => {
        it('should error if the capacity is met', () => {
            heap.capacity = 1; // Testing only
            heap.push(1);

            expect(heap.size).toBe(1);

            expect(() => { heap.push(2); }).toThrowError('MinHeap is full');
        });

        it('should set the first value to the 0 index if empty', () => {
            heap.push(50);

            expect(heap.items[0].value).toBe(50);
            expect(heap.size).toBe(1);
        });

        it('should push a value and bubble up', () => {
            heap.push(50).push(22).push(42).push(13).push(33).push(48);

            expect(heap.toArray()).toEqual([13, 22, 42, 50, 33, 48]);
            expect(heap.size).toBe(6);
        });
    });

    describe('pushAll()', () => {
        it('should push multiple values', () => {
            heap.pushAll([15, 11, 12, 16, 17, 14, 13]);

            expect(heap.toArray()).toEqual([11, 15, 12, 16, 17, 14, 13]);
            expect(heap.size).toBe(7);
        });
    });

    it('should be usable with objects', () => {
        let foo = { key: 1, name: 'foo' },
            bar = { key: 2, name: 'bar' },
            baz = { key: 3, name: 'baz' };

        heap.pushAll([foo, bar, baz]);

        expect(heap.toArray()).toEqual([foo, bar, baz]);
        expect(heap.contains(bar)).toBe(true);
        expect(heap.indexOf(foo)).toBe(0);
        expect(heap.min()).toBe(foo);

        let value = heap.pop();

        expect(value).toBe(foo);
        expect(heap.min()).toBe(bar);
    });
});
