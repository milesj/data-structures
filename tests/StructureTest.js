import Structure from '../src/adt/Structure';
import Node from '../src/Node';

describe('Structure', () => {
    describe('createNode()', () => {
        it('should create a Node', () => {
            let struct = new Structure(),
                node = struct.createNode(1);

            expect(node instanceof Node).toBe(true);
            expect(node.value).toBe(1);
        });
    });

    describe('error()', () => {
        it('should interpolate params', () => {
            let struct = new Structure();

            expect(() => {
                struct.error('{class} is {emote}', {
                    emote: 'awesome'
                });
            }).toThrowError('Structure is awesome');
        });
    });
});
