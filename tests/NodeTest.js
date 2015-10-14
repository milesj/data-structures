import Node from '../src/Node';

describe('Node', () => {
    it('should error for falsey values', () => {
        let error = 'A non-empty string, number, or object is required for nodes';

        expect(() => new Node('')).toThrowError(error);
        expect(() => new Node(true)).toThrowError(error);
        expect(() => new Node(false)).toThrowError(error);
        expect(() => new Node(null)).toThrowError(error);
        expect(() => new Node([])).toThrowError(error);
        expect(() => new Node([1, 2, 3])).toThrowError(error);
        expect(() => new Node(undefined)).toThrowError(error);

        // Zeros allowed
        expect(() => new Node(0)).not.toThrowError(error);
        expect(() => new Node('0')).not.toThrowError(error);
        expect(() => new Node(0.0)).not.toThrowError(error);
    });

    it('should set the key and value for primitives', () => {
        let node = new Node('foo');

        expect(node.key).toBe('foo');
        expect(node.value).toBe('foo');

        node = new Node(123);

        expect(node.key).toBe(123);
        expect(node.value).toBe(123);
    });

    it('should find a key from an object', () => {
        let node = new Node({ key: 1, name: 'foo' });

        expect(node.key).toBe(1);
        expect(node.value).toEqual({ key: 1, name: 'foo' });

        let obj = { getNodeKey() { return 2; }, name: 'bar' };
        node = new Node(obj);

        expect(node.key).toBe(2);
        expect(node.value).toEqual(obj);
    });

    it('should error for invalid keys', () => {
        expect(() => new Node({ name: 'foo' })).toThrowError('A valid key is required for nodes');
    });
});
