import Tree from './Tree';
import Node from './Node';

export const IN_ORDER = 'IN_ORDER';
export const PRE_ORDER = 'PRE_ORDER';
export const POST_ORDER = 'POST_ORDER';

export default class BinaryTree extends Tree {

    /**
     * {@inheritdoc}
     */
    createNode(value) {
        let node = new Node(value);
            node.left = null;
            node.right = null;

        return node;
    }

    insert(value) {

    }

    /**
     * Returns true if every node can be numbered from the root to the max height.
     *
     * @return {boolean}
     */
    isComplete() {

    }

    /**
     * Returns true if every node has 2 children and every leaf node is at the same level.
     *
     * @return {boolean}
     */
    isFull() {

    }

    /**
     * Returns true if every node has either 0 children or 2 children.
     *
     * @return {boolean}
     */
    isStrict() {

    }

    remove(value) {

    }

    search(value) {

    }

    traverse(callback, order = IN_ORDER) {

    }

}
