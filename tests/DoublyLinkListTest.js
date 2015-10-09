import DoublyLinkedList from '../src/DoublyLinkedList';
import Node from '../src/Node';

describe('DoublyLinkedList', () => {
    let list = null;

    beforeEach(() => {
        list = new DoublyLinkedList();
    });

    describe('append()', () => {
        it('should set the prev on each node', () => {
            list.appendAll([1, 2, 3]);

            expect(list.head.value).toBe(1);
            expect(list.head.next.value).toBe(2);
            expect(list.head.prev).toBeNull();

            expect(list.head.next.value).toBe(2);
            expect(list.head.next.next.value).toBe(3);
            expect(list.head.next.prev.value).toBe(1);

            expect(list.tail.value).toBe(3);
            expect(list.tail.next).toBeNull();
            expect(list.tail.prev.value).toBe(2);
        });
    });

    describe('createNode()', () => {
        it('should create a Node', () => {
            let node = list.createNode(1);

            expect(node instanceof Node).toBe(true);
            expect(node.value).toBe(1);
            expect(node.next).toBeNull();
            expect(node.prev).toBeNull();
        });
    });

    describe('insert()', () => {
        it('should link the previous node to the new node', () => {
            list.appendAll([1, 2, 3]).insert(5, 1);

            let firstIndex = list.head.next,
                secondIndex = list.head.next.next;

            expect(firstIndex.value).toBe(5);
            expect(firstIndex.next.value).toBe(2);
            expect(firstIndex.prev.value).toBe(1);

            expect(secondIndex.value).toBe(2);
            expect(secondIndex.next.value).toBe(3);
            expect(secondIndex.prev.value).toBe(5);
        });
    });

    describe('prepend()', () => {
        it('should set the prev on each node', () => {
            list.prependAll([1, 2, 3]);

            expect(list.head.value).toBe(3);
            expect(list.head.next.value).toBe(2);
            expect(list.head.prev).toBeNull();

            expect(list.head.next.value).toBe(2);
            expect(list.head.next.next.value).toBe(1);
            expect(list.head.next.prev.value).toBe(3);

            expect(list.tail.value).toBe(1);
            expect(list.tail.next).toBeNull();
            expect(list.tail.prev.value).toBe(2);
        });
    });

    describe('remove()', () => {
        it('should remove the value', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            expect(list.size).toBe(5);

            let value = list.remove(3);

            expect(value).toBe(3);
            expect(list.size).toBe(4);

            expect(list.head.next.value).toBe(2);
            expect(list.head.next.next.value).toBe(4);
            expect(list.head.next.next.prev.value).toBe(2);
        });
    });

    describe('removeAt()', () => {
        it('should remove the value', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            expect(list.size).toBe(5);

            let value = list.removeAt(2);

            expect(value).toBe(3);
            expect(list.size).toBe(4);

            expect(list.head.next.value).toBe(2);
            expect(list.head.next.next.value).toBe(4);
            expect(list.head.next.next.prev.value).toBe(2);
        });
    });

    describe('removeFirst()', () => {
        it('should set the head prev to null', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            expect(list.head.value).toBe(1);
            expect(list.head.prev).toBeNull();
            expect(list.size).toBe(5);

            let first = list.removeFirst();

            expect(first).toBe(1);
            expect(list.head.value).toBe(2);
            expect(list.head.prev).toBeNull();
            expect(list.size).toBe(4);

            first = list.removeFirst();

            expect(first).toBe(2);
            expect(list.head.value).toBe(3);
            expect(list.head.prev).toBeNull();
            expect(list.size).toBe(3);
        });
    });

    describe('removeLast()', () => {
        it('should set the tail prev to the previous node', () => {
            list.appendAll([1, 2, 3, 4, 5]);

            expect(list.tail.value).toBe(5);
            expect(list.tail.prev.value).toBe(4);
            expect(list.size).toBe(5);

            let last = list.removeLast();

            expect(last).toBe(5);
            expect(list.tail.value).toBe(4);
            expect(list.tail.prev.value).toBe(3);
            expect(list.size).toBe(4);

            last = list.removeLast();

            expect(last).toBe(4);
            expect(list.tail.value).toBe(3);
            expect(list.tail.prev.value).toBe(2);
            expect(list.size).toBe(3);
        });
    });
});
