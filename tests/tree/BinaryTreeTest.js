import BinaryTree, { BinaryTreeNode, LEVEL_ORDER, IN_ORDER, POST_ORDER, PRE_ORDER } from '../../src/tree/BinaryTree';
import { StringComparator } from '../../src/Comparator';

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
 *
 * @param {BinaryTree} tree
 * @param {Boolean} complete
 * @param {Boolean} full
 * @returns {BinaryTree}
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

/**
 * Convert the list of nodes to an array of values.
 *
 * @param {Node[]} nodes
 * @returns {*[]}
 */
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

    describe('empty()', () => {
        it('should delete all nodes', () => {
            expect(tree.isEmpty()).toBe(true);

            tree.insert(10).insert(5);

            expect(tree.isEmpty()).toBe(false);

            tree.empty();

            expect(tree.isEmpty()).toBe(true);
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
            expect(() => {
                tree.getNodesAtLevel(-1);
            }).toThrowError('Level out of range');
        });

        it('should return an empty array if empty', () => {
            expect(tree.getNodesAtLevel(0)).toEqual([]);
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

    describe('isBST()', () => {
        /**
         *          6
         *         / \
         *        2   8
         *       / \
         *      1  (9)
         */
        it('should return true if the tree is a BST', () => {
            tree.insertAll([6, 2, 8, 1]);

            expect(tree.isBST()).toBe(true);

            // Fake a node
            tree.root.left.right = new BinaryTreeNode(9);

            expect(tree.isBST()).toBe(false);
        });
    });

    describe('isComplete()', () => {
        it('should return true for a single root node', () => {
            tree.insert(10);

            expect(tree.isComplete()).toBe(true);
        });

        it('should return true if the tree is full and points to the left', () => {
            populateTree(tree);

            tree.insert(100); // Skew it

            expect(tree.isComplete()).toBe(false);

            populateTree(tree, true);

            expect(tree.isComplete()).toBe(true);

            populateTree(tree, true, true);

            expect(tree.isComplete()).toBe(true);

            tree.insert(1); // Still on left side

            expect(tree.isComplete()).toBe(true);

            tree.insert(100); // Skew it

            expect(tree.isComplete()).toBe(false);
        });
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
        it('should return true for a single root node', () => {
            tree.insert(10);

            expect(tree.isStrict()).toBe(true);
        });

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

    describe('max()', () => {
        it('should return null if empty', () => {
            expect(tree.max()).toBeNull();
        });

        it('should return the max value node', () => {
            populateTree(tree);

            expect(tree.max().value).toBe(82);

            tree.insert(99);

            expect(tree.max().value).toBe(99);
        });
    });

    describe('maxDepth()', () => {
        it('should return -1 if the tree is empty', () => {
            expect(tree.maxDepth()).toBe(-1);
        });

        it('should return the depth of the whole tree', () => {
            tree.insert(25);

            expect(tree.maxDepth()).toBe(0);

            tree.insert(15);

            expect(tree.maxDepth()).toBe(1);

            tree.insert(12);

            expect(tree.maxDepth()).toBe(2);

            tree.insert(8);

            expect(tree.maxDepth()).toBe(3);
        });
    });

    describe('min()', () => {
        it('should return null if empty', () => {
            expect(tree.min()).toBeNull();
        });

        it('should return the max value node', () => {
            populateTree(tree);

            expect(tree.min().value).toBe(12);

            tree.insert(1);

            expect(tree.min().value).toBe(1);
        });
    });

    describe('remove()', () => {
        /**
         *      1
         *
         *    After:
         *
         *    (null)
         */
        it('should set the root to null if only 1 node in the tree', () => {
            tree.insert(1);

            expect(tree.root.value).toBe(1);
            expect(tree.size).toBe(1);

            let result = tree.remove(1);

            expect(result).toBe(true);
            expect(tree.root).toBeNull();
            expect(tree.size).toBe(0);
        });

        /**
         *      15
         *     /  \
         *   10   20
         *
         *    After:
         *
         *      20
         *     /
         *   10
         */
        it('should set the root to the right child if removing the root', () => {
            tree.insertAll([15, 10, 20]);

            expect(tree.root.value).toBe(15);
            expect(tree.size).toBe(3);

            let result = tree.remove(15);

            expect(result).toBe(true);
            expect(tree.root.value).toBe(20);
            expect(tree.size).toBe(2);
        });

        /**
         *      15
         *     /
         *   10
         *
         *    After:
         *
         *      10
         */
        it('should set the root to the left child if removing the root and no right child', () => {
            tree.insertAll([15, 10]);

            expect(tree.root.value).toBe(15);
            expect(tree.size).toBe(2);

            let result = tree.remove(15);

            expect(result).toBe(true);
            expect(tree.root.value).toBe(10);
            expect(tree.size).toBe(1);
        });

        /**
         *      15
         *     /  \
         *   10   20
         */
        it('should return false if value does not exist', () => {
            expect(tree.remove(5)).toBe(false);

            tree.insertAll([15, 10, 20]);

            expect(tree.remove(5)).toBe(false);
            expect(tree.remove(25)).toBe(false);
        });

        /**
         *      15
         *     /  \
         *   10   20
         *
         *    After:
         *
         *      15
         *        \
         *        20
         */
        it('should set the parent link to null if node has no children', () => {
            tree.insertAll([15, 10, 20]);

            expect(tree.toArray()).toEqual([15, 10, 20]);

            let result = tree.remove(10);

            expect(result).toBe(true);
            expect(tree.toArray()).toEqual([15, 20]);
            expect(tree.root.left).toBeNull();

            result = tree.remove(20);

            expect(result).toBe(true);
            expect(tree.toArray()).toEqual([15]);
            expect(tree.root.isEmpty()).toBe(true);
        });

        /**
         *      15
         *     /  \
         *   10   20
         *          \
         *          25
         *
         *    After:
         *
         *      15
         *     /  \
         *   10   25
         */
        it('should set the parent right link to the child if the node has 1 child', () => {
            tree.insertAll([15, 10, 20, 25]);

            expect(tree.toArray()).toEqual([15, 10, 20, 25]);
            expect(tree.root.right.value).toBe(20);

            let result = tree.remove(20);

            expect(result).toBe(true);
            expect(tree.toArray()).toEqual([15, 10, 25]);
            expect(tree.root.right.value).toBe(25);

            result = tree.remove(25);

            expect(result).toBe(true);
            expect(tree.toArray()).toEqual([15, 10]);
            expect(tree.root.right).toBeNull();
        });

        /**
         *      15
         *     /  \
         *   10   20
         *        /
         *      17
         *
         *    After:
         *
         *      15
         *     /  \
         *   10   17
         */
        it('should set the parent left link to the child if the node has 1 child', () => {
            tree.insertAll([15, 10, 20, 17]);

            expect(tree.toArray()).toEqual([15, 10, 20, 17]);
            expect(tree.root.right.value).toBe(20);

            let result = tree.remove(20);

            expect(result).toBe(true);
            expect(tree.toArray()).toEqual([15, 10, 17]);
            expect(tree.root.right.value).toBe(17);

            result = tree.remove(17);

            expect(result).toBe(true);
            expect(tree.toArray()).toEqual([15, 10]);
            expect(tree.root.right).toBeNull();
        });

        /**
         *         15
         *        /  \
         *      10   20
         *     /    /  \
         *   8    18   25
         *            /  \
         *          21   29
         *
         *       After:
         *
         *         15
         *        /  \
         *      10   21
         *     /    /  \
         *   8    18   25
         *               \
         *               29
         */
        it('should set the parent link to the lowest value if the node has 2 children', () => {
            tree.insertAll([15, 10, 20, 8, 18, 25, 21, 29]);

            expect(tree.toArray()).toEqual([15, 10, 20, 8, 18, 25, 21, 29]);

            let result = tree.remove(20);

            expect(result).toBe(true);
            expect(tree.toArray()).toEqual([15, 10, 21, 8, 18, 25, 29]);
        });
    });

    describe('removeAll()', () => {
        it('should remove multiple values', () => {
            populateTree(tree);

            expect(tree.toArray()).toEqual([50, 35, 63, 23, 56, 82, 12]);

            tree.removeAll([82, 63, 23]);

            expect(tree.toArray()).toEqual([50, 35, 56, 12]);
        });
    });

    describe('size()', () => {
        it('should return the size of tree', () => {
            populateTree(tree);

            expect(tree.size).toBe(7);

            let node = tree.search(35);

            expect(node.size()).toBe(3);

            populateTree(tree, true);

            expect(tree.size).toBe(11);

            node = tree.search(35);

            expect(node.size()).toBe(7);

            populateTree(tree, true, true);

            expect(tree.size).toBe(15);

            node = tree.search(82);

            expect(node.size()).toBe(3);
        });
    });

    describe('search()', () => {
        it('should return null if tree is empty', () => {
            expect(tree.search(1)).toBeNull();
        });

        it('should return null if not found', () => {
            populateTree(tree);

            expect(tree.search(100)).toBeNull();
        });

        it('should return the node if found', () => {
            populateTree(tree);

            let node = tree.search(23);

            expect(node instanceof BinaryTreeNode).toBe(true);
            expect(node.value).toBe(23);
            expect(node.left.value).toBe(12);
            expect(node.right).toBeNull();
        });
    });

    describe('toArray()', () => {
        it('should return an array in order depending on the method', () => {
            populateTree(tree, true);

            expect(tree.toArray(LEVEL_ORDER)).toEqual([50, 35, 63, 23, 44, 56, 82, 12, 29, 38, 47]);
            expect(tree.toArray(IN_ORDER)).toEqual([12, 23, 29, 35, 38, 44, 47, 50, 56, 63, 82]);
            expect(tree.toArray(PRE_ORDER)).toEqual([50, 35, 23, 12, 29, 44, 38, 47, 63, 56, 82]);
            expect(tree.toArray(POST_ORDER)).toEqual([12, 29, 23, 38, 47, 44, 35, 56, 82, 63, 50]);
        });
    });

    it('should be usable with strings', () => {
        tree = new BinaryTree(new StringComparator());
        tree.insertAll(['Miles', 'Alvin', 'Keith', 'Zach', 'Will', 'Ian', 'Chukky', 'Matt', 'Melanie']);

        expect(tree.toArray()).toEqual(['Miles', 'Alvin', 'Zach', 'Keith', 'Will', 'Ian', 'Matt', 'Chukky', 'Melanie']);
        expect(tree.contains('Zach')).toBe(true);
        expect(tree.depth('Keith')).toBe(2);
        expect(tree.height('Alvin')).toBe(3);
        expect(tree.max().value).toBe('Zach');
        expect(tree.min().value).toBe('Alvin');
        expect(tree.search('Chukky').value).toBe('Chukky');
        expect(tree.maxDepth()).toBe(4);

        let result = tree.remove('Keith');

        expect(result).toBe(true);
        expect(tree.toArray()).toEqual(['Miles', 'Alvin', 'Zach', 'Matt', 'Will', 'Ian', 'Melanie', 'Chukky']);
    });

    it('should be usable with objects', () => {
        let o1 = { key: 'm3', name: 'Miles' },
            o2 = { key: 'a', name: 'Alvin' },
            o3 = { key: 'k', name: 'Keith' },
            o4 = { key: 'z', name: 'Zach' },
            o5 = { key: 'w', name: 'Will' },
            o6 = { key: 'i', name: 'Ian' },
            o7 = { key: 'c', name: 'Chukky' },
            o8 = { key: 'm1', name: 'Matt' },
            o9 = { key: 'm2', name: 'Melanie' },
            result = null;

        tree = new BinaryTree(new StringComparator());
        tree.insertAll([o1, o2, o3, o4, o5, o6, o7, o8, o9]);

        expect(tree.toArray()).toEqual(['m3', 'a', 'z', 'k', 'w', 'i', 'm1', 'c', 'm2']);
        expect(tree.contains('z')).toBe(true);
        expect(tree.depth('k')).toBe(2);
        expect(tree.height('a')).toBe(3);
        expect(tree.max().value).toBe(o4);
        expect(tree.min().value).toBe(o2);
        expect(tree.search('c').value).toBe(o7);
        expect(tree.maxDepth()).toBe(4);

        result = tree.remove('k');

        expect(result).toBe(true);
        expect(tree.toArray()).toEqual(['m3', 'a', 'z', 'm1', 'w', 'i', 'm2', 'c']);
    });
});
