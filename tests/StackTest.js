import Stack from '../src/Stack';
import Node from '../src/Node';

describe('Stack', () => {
    let stack = null;

    beforeEach(() => {
        stack = new Stack();
    });

    describe('iterator()', () => {
        it('should not iterate if empty', () => {
            let array = [];

            for (let value of stack) {
                array.push(value);
            }

            expect(array).toEqual([]);
        });

        it('should iterate over each node', () => {
            stack.push(1).push(2).push(3);

            let array = [];

            for (let value of stack) {
                array.push(value);
            }

            expect(array).toEqual([1, 2, 3]);
        });
    });

    describe('contains()', () => {
        it('should return true if the value exists', () => {
            expect(stack.contains(2)).toBe(false);

            stack.push(1).push(2).push(3);

            expect(stack.contains(2)).toBe(true);
        });
    });

    describe('empty()', () => {
        it('should delete all nodes', () => {
            expect(stack.isEmpty()).toBe(true);
            expect(stack.size).toBe(0);

            stack.push(1).push(2);

            expect(stack.isEmpty()).toBe(false);
            expect(stack.size).toBe(2);

            stack.empty();

            expect(stack.isEmpty()).toBe(true);
            expect(stack.size).toBe(0);
            expect(stack.items).toEqual([]);
        });
    });

    describe('indexOf()', () => {
        it('should return -1 if not found', () => {
            expect(stack.indexOf(5)).toBe(-1);

            stack.push(1);

            expect(stack.indexOf(5)).toBe(-1);
        });

        it('should return the index', () => {
            stack.push(1).push(2).push(3);

            expect(stack.indexOf(1)).toBe(0);
            expect(stack.indexOf(3)).toBe(2);
        });

        it('should return the first index of the same value', () => {
            stack.push(1).push(2).push(2).push(3);

            expect(stack.indexOf(2)).toBe(1);
        });
    });

    describe('isFull()', () => {
        it('should return false if no capacity set', () => {
            expect(stack.isFull()).toBe(false);

            stack.push(1);

            expect(stack.isFull()).toBe(false);
        });

        it('should return true if a capacity set', () => {
            stack.capacity = 1; // Testing only

            expect(stack.isFull()).toBe(false);

            stack.push(1);

            expect(stack.isFull()).toBe(true);

            stack.pop();

            expect(stack.isFull()).toBe(false);
        });
    });

    describe('pop()', () => {
        it('should return null if stack is empty', () => {
            expect(stack.pop()).toBeNull();
        });

        it('should reduce the index, size, and items', () => {
            stack.pushAll([1, 2, 3]);

            expect(stack.index).toBe(3);
            expect(stack.size).toBe(3);
            expect(stack.items).toEqual([
                new Node(1),
                new Node(2),
                new Node(3)
            ]);

            let value = stack.pop();

            expect(value).toBe(3);
            expect(stack.index).toBe(2);
            expect(stack.size).toBe(2);
            expect(stack.items).toEqual([
                new Node(1),
                new Node(2)
            ]);

            value = stack.pop();

            expect(value).toBe(2);
            expect(stack.index).toBe(1);
            expect(stack.size).toBe(1);
            expect(stack.items).toEqual([
                new Node(1)
            ]);
        });
    });

    describe('popAll()', () => {
        it('should return an array of all values', () => {
            stack.pushAll([1, 2, 3]);

            expect(stack.size).toBe(3);

            let values = stack.popAll();

            expect(stack.size).toBe(0);
            expect(stack.items).toEqual([]);
            expect(values).toEqual([3, 2, 1]);
        });
    });

    describe('push()', () => {
        it('should add values to the end of the stack', () => {
            expect(stack.size).toBe(0);
            expect(stack.items).toEqual([]);

            stack.push(1);

            expect(stack.size).toBe(1);
            expect(stack.items).toEqual([
                new Node(1)
            ]);

            stack.push(2);

            expect(stack.size).toBe(2);
            expect(stack.items).toEqual([
                new Node(1),
                new Node(2)
            ]);
        });

        it('should error if the capacity is met', () => {
            stack.capacity = 1; // Testing only
            stack.push(1);

            expect(stack.size).toBe(1);

            expect(() => { stack.push(2); }).toThrowError('Stack is full');
        });
    });

    describe('pushAll()', () => {
        it('should add multiple values', () => {
            expect(stack.size).toBe(0);
            expect(stack.items).toEqual([]);

            stack.pushAll([1, 2, 3]);

            expect(stack.size).toBe(3);
            expect(stack.items).toEqual([
                new Node(1),
                new Node(2),
                new Node(3)
            ]);
        });
    });

    describe('toArray()', () => {
        it('should return all values as an array in order', () => {
            stack.push(1).push(2).push(3);
            stack.pop();
            stack.pushAll([4, 5, 6]);
            stack.pop();
            stack.pop();
            stack.push(7);

            expect(stack.toArray()).toEqual([
                1, 2, 4, 7
            ]);
        });
    });

    describe('top()', () => {
        it('should return null if empty', () => {
            expect(stack.top()).toBeNull();
        });

        it('should return the value of the top element but not remove it', () => {
            stack.pushAll([1, 2, 3]);

            expect(stack.top()).toBe(3);
            expect(stack.size).toBe(3);

            stack.pop();

            expect(stack.top()).toBe(2);
            expect(stack.size).toBe(2);
        });
    });
});
