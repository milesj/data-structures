import Collection from '../src/Collection';
import Node from '../src/Node';

describe('Collection', () => {
    let coll = null;

    beforeEach(() => {
        coll = new Collection();
        coll.items = [
            new Node(1),
            new Node(2),
            new Node(3)
        ];
        coll.size = 3;
    });

    describe('iterate()', () => {
        it('should not iterate if empty', () => {
            coll.empty();

            let array = [];

            for (let value of coll) {
                array.push(value);
            }

            expect(array).toEqual([]);
        });

        it('should iterate over each node', () => {
            let array = [];

            for (let value of coll) {
                array.push(value);
            }

            expect(array).toEqual([1, 2, 3]);
        });
    });

    describe('empty()', () => {
        it('should delete all items', () => {
            expect(coll.isEmpty()).toBe(false);
            expect(coll.size).toBe(3);

            coll.empty();

            expect(coll.isEmpty()).toBe(true);
            expect(coll.size).toBe(0);
        });
    });

    describe('toArray()', () => {
        it('should return all values as an array in order', () => {
            expect(coll.toArray()).toEqual([
                1, 2, 3
            ]);
        });
    });
});
