import Node from './Node';
import LinkedList from './LinkedList';

export default class CircularLinkedList extends LinkedList {

    /**
     * {@inheritdoc}
     */
    _appendNode(node, tailNode) {
        node.next = this.head;

        return super._appendNode(node, tailNode);
    }

    /**
     * {@inheritdoc}
     */
    _prependNode(node, headNode) {
        this.tail.next = node;

        return super._prependNode(node, headNode);
    }

    /**
     * {@inheritdoc}
     */
    _removeNode(node, nextNode, previousNode) {
        if (node === this.head) {
            this.tail.next = nextNode;

        } else if (node === this.tail) {
            previousNode.next = this.head;

        } else {
            super._removeNode(node, nextNode, previousNode);
        }

        return node;
    }

    /**
     * {@inheritdoc}
     */
    _setRootNode(node) {
        node.next = node;

        return super._setRootNode(node);
    }
}
