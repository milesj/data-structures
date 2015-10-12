import BinaryTree, { BinaryTreeNode, LEVEL_ORDER, IN_ORDER, POST_ORDER, PRE_ORDER } from '../src/BinaryTree';

/**
 *                Full:                   Level     Depth     Height     Count     Size
 *                 50                       0         0         3          1         1
 *            /          \
 *         35              63               1         1         2          2         3
 *      /     \         /     \
 *    23      44      56      82            2         2         1          4         7
 *   /  \    /  \    /  \    /  \
 *  12  29  38  47  51  60  78  99          3         3         0          8         15
 *
 *              Complete:
 *                 50
 *            /          \
 *          35            63
 *       /      \        /  \
 *     23       44     56    82
 *    /  \     /  \
 *  12   29  38    47
 *
 *              Initial:
 *           50
 *          /  \
 *        35    63
 *       /     /  \
 *     23    56    82
 *    /
 *  12
 */
function populateTree(tree, complete = false, full = false) {
    tree.empty();
    tree.insertAll([50, 63, 35, 23, 82, 56, 12]);

    if (complete) {
        tree.insertAll([44, 29, 38, 47]);
    }

    if (full) {
        tree.insertAll([51, 78, 60, 99]);
    }

    return tree;
}

function nodesToArray(nodes) {
    let array = [];

    nodes.forEach(node => array.push(node.value));

    return array;
}

describe('BinaryTree', () => {
    let tree = null;

    beforeEach(() => {
        tree = new BinaryTree();
    });

    describe('contains()', () => {
        it('should return true if the value exists', () => {
            expect(tree.contains(2)).toBe(false);

            tree.insert(10).insert(2);

            expect(tree.contains(2)).toBe(true);
        });
    });

    describe('createNode()', () => {
        it('should create a node', () => {
            let node = tree.createNode(1);

            expect(node instanceof BinaryTreeNode).toBe(true);
            expect(node.value).toBe(1);
            expect(node.left).toBeNull();
            expect(node.right).toBeNull();
        });
    });

    describe('depth()', () => {
        it('should return -1 if the tree is empty()', () => {
            expect(tree.depth(50)).toBe(-1);
        });

        it('should return -1 if the value does not exist', () => {
            populateTree(tree);

            expect(tree.depth(100)).toBe(-1);
        });

        it('should return 0 if the root node points to itself', () => {
            populateTree(tree);

            expect(tree.depth(50)).toBe(0);
        });

        it('should return the depth from the root node to the target node', () => {
            populateTree(tree, true, true);

            expect(tree.depth(12)).toBe(3);
            expect(tree.depth(56)).toBe(2);
            expect(tree.depth(35)).toBe(1);
        });
    });

    describe('getInternalNodes', () => {
        it('should return all the internal nodes', () => {
            populateTree(tree);

            expect(nodesToArray(tree.getInternalNodes())).toEqual([50, 35, 63, 23]);

            populateTree(tree, true);

            expect(nodesToArray(tree.getInternalNodes())).toEqual([50, 35, 63, 23, 44]);

            populateTree(tree, true, true);

            expect(nodesToArray(tree.getInternalNodes())).toEqual([50, 35, 63, 23, 44, 56, 82]);
        });
    });

    describe('getLeafNodes', () => {
        it('should return all the leaf nodes', () => {
            populateTree(tree);

            expect(nodesToArray(tree.getLeafNodes())).toEqual([56, 82, 12]);

            populateTree(tree, true);

            expect(nodesToArray(tree.getLeafNodes())).toEqual([56, 82, 12, 29, 38, 47]);

            populateTree(tree, true, true);

            expect(nodesToArray(tree.getLeafNodes())).toEqual([12, 29, 38, 47, 51, 60, 78, 99]);
        });
    });

    describe('getNodesAtLevel()', () => {
        it('should error for an invalid level', () => {
            expect(() => { tree.getNodesAtLevel(-1); }).toThrowError('Level out of range');
        });

        it('should error if the tree is empty', () => {
            expect(() => { tree.getNodesAtLevel(0); }).toThrowError('BinaryTree is empty');
        });

        it('should return all nodes at a specific level', () => {
            populateTree(tree);

            expect(nodesToArray(tree.getNodesAtLevel(0))).toEqual([50]);
            expect(nodesToArray(tree.getNodesAtLevel(1))).toEqual([35, 63]);
            expect(nodesToArray(tree.getNodesAtLevel(2))).toEqual([23, 56, 82]);
            expect(nodesToArray(tree.getNodesAtLevel(3))).toEqual([12]);

            populateTree(tree, true);

            expect(nodesToArray(tree.getNodesAtLevel(2))).toEqual([23, 44, 56, 82]);
            expect(nodesToArray(tree.getNodesAtLevel(3))).toEqual([12, 29, 38, 47]);

            populateTree(tree, true, true);

            expect(nodesToArray(tree.getNodesAtLevel(3))).toEqual([12, 29, 38, 47, 51, 60, 78, 99]);
        });
    });

    describe('height()', () => {
        it('should return -1 if the tree is empty()', () => {
            expect(tree.height(50)).toBe(-1);
        });

        it('should return -1 if the value does not exist', () => {
            populateTree(tree);

            expect(tree.height(100)).toBe(-1);
        });

        it('should return the height of the node to the deepest node', () => {
            populateTree(tree, true, true);

            expect(tree.height(50)).toBe(3);
            expect(tree.height(35)).toBe(2);
            expect(tree.height(56)).toBe(1);
            expect(tree.height(99)).toBe(0);
        });
    });

    describe('insert()', () => {
        it('should error if a falsey value is used', () => {
            expect(() => { tree.insert(null); }).toThrowError('A value is required when inserting');
        });

        it('should not error if 0 is used', () => {
            expect(() => { tree.insert(0); }).not.toThrowError('A value is required when inserting');
        });

        it('should set the root node if not set', () => {
            expect(tree.root).toBeNull();
            expect(tree.size).toBe(0);

            tree.insert(0);

            expect(tree.root.value).toBe(0);
            expect(tree.size).toBe(1);
        });

        /**
         *              5
         *             / \
         *           3    8
         *         /  \    \
         *       1     4    10
         */
        it('should insert values in the correct sub-trees', () => {
            tree.insert(5).insert(3).insert(8).insert(1).insert(4).insert(10);

            expect(tree.size).toBe(6);
            expect(tree.root.left.value).toBe(3);
            expect(tree.root.right.value).toBe(8);

            expect(tree.toArray()).toEqual([5, 3, 8, 1, 4, 10]);
        });
    });

    describe('insertAll()', () => {
        it('should insert multiple values', () => {
            tree.insertAll([5, 3, 8, 1, 4, 10]);

            expect(tree.toArray()).toEqual([5, 3, 8, 1, 4, 10]);
            expect(tree.toArray(IN_ORDER)).toEqual([1, 3, 4, 5, 8, 10]);
            expect(tree.toArray(PRE_ORDER)).toEqual([5, 3, 1, 4, 8, 10]);
            expect(tree.toArray(POST_ORDER)).toEqual([1, 4, 3, 10, 8, 5]);
        });
    });

    describe('isComplete()', () => {
        // TODO
    });

    describe('isFull()', () => {
        it('should return true if all nodes have 2 children', () => {
            populateTree(tree);

            expect(tree.isFull()).toBe(false);

            populateTree(tree, true);

            expect(tree.isFull()).toBe(true);

            populateTree(tree, true, true);

            expect(tree.isFull()).toBe(true);

            tree.insert(1);

            expect(tree.isFull()).toBe(false);

            tree.insert(15);

            expect(tree.isFull()).toBe(true);
        });
    });

    describe('isSkewed()', () => {
        /**
         *          15
         *            \
         *            35
         *           /
         *          22
         *         /  \
         *       (20) 31
         */
        it('should return true if all nodes have 1 child', () => {
            tree.insert(15);

            expect(tree.isSkewed()).toBe(false);

            tree.insert(35).insert(22);

            expect(tree.isSkewed()).toBe(true);

            tree.insert(31);

            expect(tree.isSkewed()).toBe(true);

            tree.insert(20);

            expect(tree.isSkewed()).toBe(false);
        });
    });

    describe('isSkewedLeft()', () => {
        /**
         *          15
         *         /
         *        11
         *       /  \
         *      7   (13)
         *     / \    \
         *    2  (8) (14)
         */
        it('should return true if all nodes have 1 child and point to the left', () => {
            tree.insert(15);

            expect(tree.isSkewedLeft()).toBe(false);

            tree.insert(11).insert(7);

            expect(tree.isSkewedLeft()).toBe(true);

            tree.insert(2);

            expect(tree.isSkewedLeft()).toBe(true);

            tree.insert(8);

            expect(tree.isSkewedLeft()).toBe(true); // Excludes leafs

            tree.insert(13).insert(14);

            expect(tree.isSkewedLeft()).toBe(false);
        });
    });

    describe('isSkewedRight()', () => {
        /**
         *       15
         *         \
         *         21
         *        /  \
         *     (17)  24
         *     /    /  \
         *  (16)  (23)  33
         */
        it('should return true if all nodes have 1 child and point to the right', () => {
            tree.insert(15);

            expect(tree.isSkewedRight()).toBe(false);

            tree.insert(21).insert(24);

            expect(tree.isSkewedRight()).toBe(true);

            tree.insert(33);

            expect(tree.isSkewedRight()).toBe(true);

            tree.insert(23);

            expect(tree.isSkewedRight()).toBe(true); // Excludes leafs

            tree.insert(17).insert(16);

            expect(tree.isSkewedRight()).toBe(false);
        });
    });

    describe('isStrict()', () => {
        /**
         *                25
         *             /      \
         *           15       33
         *          /  \     /  \
         *        12   19  27   37
         *       /
         *     (1)
         */
        it('should return true if all nodes have 0 or 2 children', () => {
            tree.insert(25);

            expect(tree.isStrict()).toBe(true);

            tree.insert(15).insert(33);

            expect(tree.isStrict()).toBe(true);

            tree.insertAll([12, 19, 27]);

            expect(tree.isStrict()).toBe(false);

            tree.insert(37);

            expect(tree.isStrict()).toBe(true);

            tree.insert(1);

            expect(tree.isStrict()).toBe(false);
        });
    });
});
