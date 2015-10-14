import CircularLinkedList from '../../src/list/CircularLinkedList';
import { LinkedListNode } from '../../src/list/LinkedList';

describe('CircularLinkedList', () => {
    let list = null;

    beforeEach(() => {
        list = new CircularLinkedList();
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
        it('should link head and tail if only 1 node', () => {
            list.append(1);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
            expect(list.head.next).toEqual(list.tail);
            expect(list.tail.next).toEqual(list.head);
        });

        it('should link the new node to the head', () => {
            list.append(1).append(2).append(3);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(3);
            expect(list.tail.next.value).toEqual(1);
        });
    });

    describe('prepend()', () => {
        it('should link head and tail if only 1 node', () => {
            list.prepend(1);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
            expect(list.head.next).toEqual(list.tail);
            expect(list.tail.next).toEqual(list.head);
        });

        it('should link the tail to the new node', () => {
            list.prepend(1).prepend(2).prepend(3);

            expect(list.head.value).toBe(3);
            expect(list.tail.value).toBe(1);
            expect(list.tail.next.value).toEqual(3);
        });
    });

    describe('remove()', () => {
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
        it('should link the tail to the next node', () => {
            list.append(1).append(2).append(3);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(3);
            expect(list.tail.next.value).toEqual(1);
            expect(list.size).toBe(3);

            let first = list.removeFirst();

            expect(first).toBe(1);
            expect(list.head.value).toBe(2);
            expect(list.tail.value).toBe(3);
            expect(list.tail.next.value).toEqual(2);
            expect(list.size).toBe(2);
        });
    });

    describe('removeLast()', () => {
        it('should link the previous node to the head', () => {
            list.append(1).append(2).append(3);

            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(3);
            expect(list.tail.next.value).toEqual(1);
            expect(list.size).toBe(3);

            let last = list.removeLast();

            expect(last).toBe(3);
            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(2);
            expect(list.tail.next.value).toEqual(1);
            expect(list.size).toBe(2);
        });
    });

    describe('search()', () => {
        it('should return the node if match is found', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            let node = list.search(5);

            expect(node instanceof LinkedListNode).toBe(true);
            expect(node.value).toBe(5);
            expect(node.next.value).toBe(1);
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
});
