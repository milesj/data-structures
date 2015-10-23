/* eslint no-unused-vars: 0 */

import HashTable, { modulo, djb2, sdbm, sax, fnv, oat } from '../../src/map/HashTable';

/**
 * Populate the hash table with test data.
 *
 * @param {HashTable} map
 */
function populateMap(map) {
    map.putAll([
        'Miles', 'Alvin', 'Will', 'Zach', 'Melanie', 'Jon', 'Ian', 'Chukky', 'Keith', 'Matt',
        'Colin', 'Hector', 'Bruce', 'Kenny', 'Sylvia', 'Randy', 'Finn', 'Chad', 'Kasha', '' // Empty!
    ]);
}

/**
 * Return the contents of each bucket as a map.
 *
 * @param {HashTable} map
 * @returns {{}}
 */
function bucketContents(map) {
    let buckets = {};

    map.keys().forEach(key => {
        buckets[key] = map.getBucket(key);
    });

    return buckets;
}

describe('HashTable', () => {
    let map = null;

    beforeEach(() => {
        map = new HashTable(modulo, 3);
    });

    describe('iterate()', () => {
        it('should not iterate if empty', () => {
            let array = [];

            for (let value of map) {
                array.push(value);
            }

            expect(array).toEqual([]);
        });

        it('should iterate over each node', () => {
            map.put(1337).put(666);

            let array = [];

            for (let value of map) {
                array.push(value);
            }

            expect(array).toEqual([
                [1, [1337]],
                [0, [666]]
            ]);
        });
    });

    describe('constructor()', () => {
        it('should error if no hashing function', () => {
            expect(() => {
                let table = new HashTable();
            }).toThrowError('HashTable requires a valid hashing function');
        });

        it('should error if hashing function is not a function', () => {
            expect(() => {
                let table = new HashTable(123);
            }).toThrowError('HashTable requires a valid hashing function');
        });

        it('should error if no capacity', () => {
            expect(() => {
                let table = new HashTable(modulo);
            }).toThrowError('HashTable requires a bucket capacity');
        });

        it('should error if capacity is <= 0', () => {
            expect(() => {
                let table = new HashTable(modulo, 0);
            }).toThrowError('HashTable requires a bucket capacity');
        });
    });

    describe('contains()', () => {
        it('should return true if the value exists', () => {
            expect(map.contains(2)).toBe(false);

            map.put(1).put(2).put(3);

            expect(map.contains(2)).toBe(true);
        });
    });

    describe('empty()', () => {
        it('should delete all buckets', () => {
            expect(map.isEmpty()).toBe(true);
            expect(map.size).toBe(0);
            expect(map.itemSize).toBe(0);

            map.put(1).put(2);

            expect(map.isEmpty()).toBe(false);
            expect(map.size).toBe(1);
            expect(map.itemSize).toBe(2);

            map.empty();

            expect(map.isEmpty()).toBe(true);
            expect(map.size).toBe(0);
            expect(map.itemSize).toBe(0);
            expect(map.items.size).toEqual(0);
        });
    });

    describe('getBucket()', () => {
        it('should return an empty array if the bucket doesnt exist', () => {
            expect(map.getBucket(1)).toEqual([]);
        });

        it('should return all values in the bucket', () => {
            map.put(1).put(2);

            expect(map.getBucket(1)).toEqual([1, 2]);
        });
    });

    describe('hasBucket()', () => {
        it('should return false if the bucket doesnt exist', () => {
            expect(map.hasBucket(1)).toBe(false);
        });

        it('should return true if the bucket does exist', () => {
            map.put(1);

            expect(map.hasBucket(1)).toBe(true);
        });

        it('should return true if the bucket exists but is empty', () => {
            map.put(1).remove(1);

            expect(map.getBucket(1).length).toBe(0);
            expect(map.hasBucket(1)).toBe(true);
        });
    });

    describe('hash()', () => {
        it('should pass all counts to the function', () => {
            map = new HashTable(function(value, capacity, bucketSize, itemSize) {
                return [value, capacity, bucketSize, itemSize];
            }, 1);

            expect(map.hash('foo')).toEqual(['foo', 1, 0, 0]);
        });
    });

    describe('keys()', () => {
        it('should return an empty array if no buckets', () => {
            expect(map.keys()).toEqual([]);
        });

        it('should return an array of all keys', () => {
            map.put(666).put(1337);

            expect(map.keys()).toEqual([0, 1]);
        });
    });

    describe('put()', () => {
        it('should create the bucket if it does not exist', () => {
            expect(map.hasBucket(1)).toBe(false);
            expect(map.getBucket(1)).toEqual([]);

            map.put(1);

            expect(map.hasBucket(1)).toBe(true);
            expect(map.getBucket(1)).toEqual([1]);
        });

        it('should increase sizes', () => {
            expect(map.size).toBe(0);
            expect(map.itemSize).toEqual(0);

            map.put(1);

            expect(map.size).toBe(1);
            expect(map.itemSize).toEqual(1);

            map.put(2);

            expect(map.size).toBe(1);
            expect(map.itemSize).toEqual(2);
        });

        it('should error if capacity is met', () => {
            map = new HashTable(value => value % 7, 1);
            map.put(512);

            expect(() => {
                map.put(894);
            }).toThrowError('HashTable is full; too many buckets');
        });

        it('should append to a bucket if it exists', () => {
            expect(map.getBucket(1)).toEqual([]);

            map.put(1);

            expect(map.getBucket(1)).toEqual([1]);

            map.put(2);

            expect(map.getBucket(1)).toEqual([1, 2]);
        });
    });

    describe('putAll()', () => {
        it('should put multiple values', () => {
            map.putAll([1, 2, 3]);

            expect(map.size).toBe(2);
            expect(map.itemSize).toBe(3);
            expect(map.getBucket(0)).toEqual([3]);
            expect(map.getBucket(1)).toEqual([1, 2]);
        });
    });

    describe('remove()', () => {
        it('should return false if the bucket doesnt exist', () => {
            expect(map.remove(123)).toBe(false);
        });

        it('should remove the value from the buckets array', () => {
            map.put(1).put(2);

            expect(map.getBucket(1)).toEqual([1, 2]);
            expect(map.itemSize).toBe(2);

            let result = map.remove(1);

            expect(result).toBe(true);
            expect(map.getBucket(1)).toEqual([2]);
            expect(map.itemSize).toBe(1);
        });
    });

    describe('removeAll()', () => {
        it('should remove multiple values', () => {
            map.putAll([1, 2]);

            expect(map.getBucket(1)).toEqual([1, 2]);
            expect(map.itemSize).toBe(2);

            map.removeAll([1, 2]);

            expect(map.getBucket(1)).toEqual([]);
            expect(map.itemSize).toBe(0);
        });
    });

    describe('removeBucket()', () => {
        it('should return false if the bucket doesnt exist', () => {
            expect(map.removeBucket(1)).toBe(false);
        });

        it('should remove the bucket', () => {
            map.put(1);

            expect(map.hasBucket(1)).toBe(true);
            expect(map.keys()).toEqual([1]);

            let result = map.removeBucket(1);

            expect(result).toBe(true);
            expect(map.hasBucket(1)).toBe(false);
            expect(map.keys()).toEqual([]);
        });

        it('should decrease sizes', () => {
            map.putAll([1, 2, 3]);

            expect(map.size).toEqual(2);
            expect(map.itemSize).toBe(3);

            map.removeBucket(1);

            expect(map.size).toEqual(1);
            expect(map.itemSize).toBe(1);
        });
    });
});

describe('modulo()', () => {
    it('should distribute values', () => {
        let map = new HashTable(modulo, 5);

        populateMap(map);

        expect(bucketContents(map)).toEqual({
            0: ['Zach', 'Jon', 'Ian', 'Bruce', 'Kenny', 'Sylvia', 'Randy', 'Finn', ''],
            3: ['Will', 'Melanie', 'Chukky', 'Hector', 'Chad', 'Kasha'],
            4: ['Miles', 'Alvin', 'Keith', 'Matt', 'Colin']
        });
    });
});

describe('djb2()', () => {
    it('should distribute values', () => {
        let map = new HashTable(djb2, 5);

        populateMap(map);

        expect(bucketContents(map)).toEqual({
            0: ['Keith', 'Kenny', 'Randy', 'Finn', 'Chad'],
            1: ['Zach', 'Melanie', 'Kasha', ''],
            2: ['Bruce', 'Sylvia'],
            3: ['Miles', 'Will', 'Jon', 'Ian', 'Chukky'],
            4: ['Alvin', 'Matt', 'Colin', 'Hector']
        });
    });
});

describe('sdbm()', () => {
    it('should distribute values', () => {
        let map = new HashTable(sdbm, 5);

        populateMap(map);

        expect(bucketContents(map)).toEqual({
            0: ['Alvin', 'Melanie', 'Chukky', ''],
            2: ['Will', 'Zach', 'Matt', 'Bruce', 'Kenny', 'Sylvia'],
            3: ['Miles', 'Ian', 'Randy', 'Finn'],
            4: ['Jon', 'Keith', 'Colin', 'Hector', 'Chad', 'Kasha']
        });
    });
});

describe('sax()', () => {
    it('should distribute values', () => {
        let map = new HashTable(sax, 5);

        populateMap(map);

        expect(bucketContents(map)).toEqual({
            0: ['Miles', 'Zach', 'Ian', 'Colin', 'Kenny', ''],
            1: ['Chad'],
            2: ['Alvin', 'Melanie', 'Chukky', 'Keith', 'Matt', 'Bruce', 'Randy', 'Finn', 'Kasha'],
            3: ['Hector'],
            4: ['Will', 'Jon', 'Sylvia']
        });
    });
});

describe('fnv()', () => {
    it('should distribute values', () => {
        let map = new HashTable(fnv, 5);

        populateMap(map);

        expect(bucketContents(map)).toEqual({
            0: ['Miles', 'Will', ''],
            2: ['Alvin', 'Ian', 'Kenny', 'Sylvia', 'Randy', 'Kasha'],
            3: ['Zach', 'Melanie', 'Chukky', 'Keith', 'Matt', 'Colin', 'Hector', 'Finn'],
            4: ['Jon', 'Bruce', 'Chad']
        });
    });
});

describe('oat()', () => {
    it('should distribute values', () => {
        let map = new HashTable(oat, 5);

        populateMap(map);

        expect(bucketContents(map)).toEqual({
            0: ['Will', 'Chukky', 'Hector', 'Kenny', 'Randy', ''],
            1: ['Miles', 'Chad'],
            2: ['Alvin', 'Zach', 'Jon', 'Ian', 'Keith', 'Colin', 'Finn'],
            3: ['Matt'],
            4: ['Melanie', 'Bruce', 'Sylvia', 'Kasha']
        });
    });
});
