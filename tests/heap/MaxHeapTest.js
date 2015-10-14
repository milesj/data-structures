import MaxHeap from '../../src/heap/MaxHeap';

describe('MaxHeap', () => {
    let heap = null;

    beforeEach(() => {
        heap = new MaxHeap();
    });

    /*describe('iterator()', () => {
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

            expect(array).toEqual([15, 11, 9, 6]);
        });
    });

    describe('push()', () => {
        it('should error if the capacity is met', () => {
            heap.capacity = 1; // Testing only
            heap.push(1);

            expect(heap.size).toBe(1);

            expect(() => { heap.push(2); }).toThrowError('MaxHeap is full');
        });

        it('should set the first value to the 0 index if empty', () => {
            heap.push(50);

            expect(heap.items[0].value).toBe(50);
            expect(heap.size).toBe(1);
        });

        it('should push a value and percolate the tree', () => {
            heap.push(50).push(22).push(42).push(13).push(33);

            expect(heap.toArray()).toEqual([50, 33, 42, 13, 22]);
            expect(heap.size).toBe(5);
        });
    });

    describe('pushAll()', () => {
        it('should push multiple values', () => {
            heap.pushAll([17, 1, 4, 6, 15, 4, 3]);

            expect(heap.toArray()).toEqual([17, 15, 4, 1, 6, 4, 3]);
            expect(heap.size).toBe(7);
        });
    });*/
});
