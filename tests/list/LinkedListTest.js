import LinkedList, { LinkedListNode } from '../../src/list/LinkedList';

describe('LinkedList', () => {
    let list = null;

    beforeEach(() => {
        list = new LinkedList();
    });

    describe('iterator()', () => {
        it('should not iterate if empty', () => {
            let array = [];

            for (let value of list) {
                array.push(value);
            }

            expect(array).toEqual([]);
        });

        it('should iterate over each node', () => {
            list.append(1).append(2).append(3);

            let array = [];

            for (let value of list) {
                array.push(value);
            }

            expect(array).toEqual([1, 2, 3]);
        });
    });

    describe('append()', () => {
        it('should set head and tail if empty', () => {
            list.append(1);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
        });

        it('should add nodes to the end', () => {
            list.append(1).append(2).append(3);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(3);
            expect(list.head.next.value).toBe(2);
        });

        it('should increase size', () => {
            expect(list.size).toBe(0);

            list.append(1).append(2).append(3);

            expect(list.size).toBe(3);
        });
    });

    describe('appendAll()', () => {
        it('should add multiple nodes to the end', () => {
            list.appendAll([1, 2, 3]);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(3);
            expect(list.head.next.value).toBe(2);
        });
    });

    describe('contains()', () => {
        it('should return true if the value exists', () => {
            expect(list.contains(2)).toBe(false);

            list.append(1).append(2).append(3);

            expect(list.contains(2)).toBe(true);
        });
    });

    describe('createNode()', () => {
        it('should create a node', () => {
            let node = list.createNode(1);

            expect(node instanceof LinkedListNode).toBe(true);
            expect(node.value).toBe(1);
            expect(node.next).toBeNull();
        });
    });

    describe('empty()', () => {
        it('should delete all nodes', () => {
            expect(list.isEmpty()).toBe(true);

            list.append(1).append(2);

            expect(list.isEmpty()).toBe(false);
            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(2);

            list.empty();

            expect(list.isEmpty()).toBe(true);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });
    });

    describe('first()', () => {
        it('should return null if empty', () => {
            expect(list.first()).toBeNull();
        });

        it('should return the value', () => {
            list.append(1).append(2);

            expect(list.first()).toBe(1);
        });
    });

    describe('indexOf()', () => {
        it('should return -1 if not found', () => {
            expect(list.indexOf(5)).toBe(-1);

            list.append(1);

            expect(list.indexOf(5)).toBe(-1);
        });

        it('should return the index', () => {
            list.append(1).append(2).append(3);

            expect(list.indexOf(1)).toBe(0);
            expect(list.indexOf(3)).toBe(2);
        });

        it('should return the first index of the same value', () => {
            list.append(1).append(2).append(2).append(3);

            expect(list.indexOf(2)).toBe(1);
        });
    });

    describe('insert()', () => {
        it('should error if index below 0', () => {
            expect(() => {
                list.insert(1, -1);
            }).toThrowError('Index out of range');
        });

        it('should error if index is greater than size', () => {
            expect(() => {
                list.insert(1, list.size + 1);
            }).toThrowError('Index out of range');
        });

        it('should set the head if index is 0', () => {
            list.appendAll([1, 2, 3]);

            expect(list.head.value).toBe(1);
            expect(list.size).toBe(3);

            list.insert(0, 0);

            expect(list.head.value).toBe(0);
            expect(list.head.next.value).toBe(1);
            expect(list.size).toBe(4);
        });

        it('should set the tail if index equals current size', () => {
            list.appendAll([1, 2, 3]);

            expect(list.tail.value).toBe(3);
            expect(list.size).toBe(3);

            list.insert(4, 3);

            expect(list.tail.value).toBe(4);
            expect(list.head.next.next.value).toBe(3);
            expect(list.head.next.next.next.value).toBe(4);
            expect(list.size).toBe(4);
        });

        it('should set the value into a random index', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            list.insert('foo', 2);

            expect(list.toArray()).toEqual([
                1, 2, 'foo', 3, 4, 5
            ]);
        });
    });

    describe('last()', () => {
        it('should return null if empty', () => {
            expect(list.last()).toBeNull();
        });

        it('should return the value', () => {
            list.append(1).append(2);

            expect(list.last()).toBe(2);
        });
    });

    describe('lastIndexOf()', () => {
        it('should return -1 if not found', () => {
            expect(list.lastIndexOf(5)).toBe(-1);

            list.append(1);

            expect(list.lastIndexOf(5)).toBe(-1);
        });

        it('should return the index', () => {
            list.append(1).append(2).append(3);

            expect(list.lastIndexOf(1)).toBe(0);
            expect(list.lastIndexOf(3)).toBe(2);
        });

        it('should return the last index of the same value', () => {
            list.append(1).append(2).append(2).append(3);

            expect(list.lastIndexOf(2)).toBe(2);
            expect(list.lastIndexOf(2)).toBe(2);
        });
    });

    describe('prepend()', () => {
        it('should set head and tail if empty', () => {
            list.prepend(1);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
        });

        it('should add nodes to the beginning', () => {
            list.prepend(1).prepend(2).prepend(3);

            expect(list.head.value).toBe(3);
            expect(list.tail.value).toBe(1);
            expect(list.head.next.value).toBe(2);
        });

        it('should increase size', () => {
            expect(list.size).toBe(0);

            list.prepend(1).prepend(2).prepend(3);

            expect(list.size).toBe(3);
        });
    });

    describe('prependAll()', () => {
        it('should add multiple nodes to the beginning', () => {
            list.prependAll([1, 2, 3, 4, 5]);

            expect(list.head.value).toBe(5);
            expect(list.tail.value).toBe(1);
            expect(list.head.next.value).toBe(4);
            expect(list.toArray()).toEqual([
                5, 4, 3, 2, 1
            ]);
        });
    });

    describe('remove()', () => {
        it('should return null if empty', () => {
            expect(list.remove(1)).toBeNull();
        });

        it('should remove the head and reset', () => {
            list.append(1).append(2);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(2);
            expect(list.size).toBe(2);

            let first = list.remove(1);

            expect(first).toBe(1);
            expect(list.head.value).toBe(2);
            expect(list.tail.value).toBe(2);
            expect(list.size).toBe(1);
        });

        it('should remove the tail and reset', () => {
            list.append(1).append(2);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(2);
            expect(list.size).toBe(2);

            let last = list.remove(2);

            expect(last).toBe(2);
            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
            expect(list.size).toBe(1);
        });

        it('should remove the value', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            expect(list.size).toBe(5);

            let value = list.remove(3);

            expect(value).toBe(3);
            expect(list.size).toBe(4);
            expect(list.toArray()).toEqual([
                1, 2, 4, 5
            ]);
        });
    });

    describe('removeAt()', () => {
        it('should return null if empty', () => {
            expect(list.removeAt(0)).toBeNull();
        });

        it('should error if the index is below 0', () => {
            list.append(1);

            expect(() => {
                list.removeAt(-1);
            }).toThrowError('Index out of range');
        });

        it('should error if the index is greater than size', () => {
            list.append(1);

            expect(() => {
                list.removeAt(1);
            }).toThrowError('Index out of range');
        });

        it('should remove the head and reset', () => {
            list.append(1).append(2);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(2);
            expect(list.size).toBe(2);

            let first = list.removeAt(0);

            expect(first).toBe(1);
            expect(list.head.value).toBe(2);
            expect(list.tail.value).toBe(2);
            expect(list.size).toBe(1);
        });

        it('should remove the tail and reset', () => {
            list.append(1).append(2);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(2);
            expect(list.size).toBe(2);

            let last = list.removeAt(1);

            expect(last).toBe(2);
            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
            expect(list.size).toBe(1);
        });

        it('should remove the value', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            expect(list.size).toBe(5);

            let value = list.removeAt(2);

            expect(value).toBe(3);
            expect(list.size).toBe(4);
            expect(list.toArray()).toEqual([
                1, 2, 4, 5
            ]);
        });
    });

    describe('removeFirst()', () => {
        it('should return null if empty', () => {
            expect(list.removeFirst()).toBeNull();
        });

        it('should reset tail if only 1 node', () => {
            list.append(1);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
            expect(list.size).toBe(1);

            let first = list.removeFirst();

            expect(first).toBe(1);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.size).toBe(0);
        });

        it('should remove the head', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            expect(list.head.value).toBe(1);
            expect(list.size).toBe(5);

            let first = list.removeFirst();

            expect(first).toBe(1);
            expect(list.head.value).toBe(2);
            expect(list.size).toBe(4);

            first = list.removeFirst();

            expect(first).toBe(2);
            expect(list.head.value).toBe(3);
            expect(list.size).toBe(3);
        });
    });

    describe('removeLast()', () => {
        it('should return null if empty', () => {
            expect(list.removeLast()).toBeNull();
        });

        it('should reset head if tail and head match', () => {
            list.append(1);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
            expect(list.size).toBe(1);

            let last = list.removeLast();

            expect(last).toBe(1);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.size).toBe(0);
        });

        it('should remove the tail', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            expect(list.tail.value).toBe(5);
            expect(list.size).toBe(5);

            let last = list.removeLast();

            expect(last).toBe(5);
            expect(list.tail.value).toBe(4);
            expect(list.size).toBe(4);

            last = list.removeLast();

            expect(last).toBe(4);
            expect(list.tail.value).toBe(3);
            expect(list.size).toBe(3);
        });
    });

    describe('search()', () => {
        it('should return null if not found', () => {
            list.append(1);

            expect(list.search(2)).toBeNull();
        });

        it('should return the node if match is found', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            let node = list.search(4);

            expect(node instanceof LinkedListNode).toBe(true);
            expect(node.value).toBe(4);
            expect(node.next.value).toBe(5);
        });
    });

    describe('toArray()', () => {
        it('should return all values as an array in order', () => {
            list.append(1).prepend(2).prepend(3).append(4).append(5).prependAll([6, 7]).appendAll([8, 9]);

            expect(list.toArray()).toEqual([
                7, 6, 3, 2, 1, 4, 5, 8, 9
            ]);
        });
    });

    it('should be usable with strings', () => {
        list.appendAll(['foo', 'bar', 'baz']).prepend('wat');

        expect(list.contains('foo')).toBe(true);
        expect(list.indexOf('bar')).toBe(2);
        expect(list.first()).toBe('wat');
        expect(list.last()).toBe('baz');

        let value = list.removeFirst();

        expect(value).toBe('wat');
        expect(list.first()).toBe('foo');

        value = list.removeLast();

        expect(value).toBe('baz');
        expect(list.last()).toBe('bar');

        value = list.removeAt(1);

        expect(value).toBe('bar');
        expect(list.first()).toBe('foo');
        expect(list.last()).toBe('foo');
    });

    it('should be usable with objects', () => {
        let foo = { key: 1, name: 'foo' },
            bar = { key: 2, name: 'bar' },
            baz = { key: 3, name: 'baz' },
            wat = { key: 0, name: 'wat' },
            value = null;

        list.appendAll([foo, bar, baz]).prepend(wat);

        expect(list.contains(foo)).toBe(true);
        expect(list.indexOf(bar)).toBe(2);
        expect(list.first()).toBe(wat);
        expect(list.last()).toBe(baz);

        value = list.removeFirst();

        expect(value).toBe(wat);
        expect(list.first()).toBe(foo);

        value = list.removeLast();

        expect(value).toBe(baz);
        expect(list.last()).toBe(bar);

        value = list.removeAt(1);

        expect(value).toBe(bar);
        expect(list.first()).toBe(foo);
        expect(list.last()).toBe(foo);
    });
});
