import LinkedList from './LinkedList';
import Node from '../Node';

export default class CircularLinkedList extends LinkedList {

    /**
     * {@inheritdoc}
     */
    [Symbol.iterator]() {
        let head = this.head,
            curNode = head,
            node = null,
            i = 0;

        return {
            next() {
                if (!curNode || curNode === head && i !== 0) {
                    return { done: true };
                } else {
                    node = curNode;
                    curNode = curNode.next;
                    i++;

                    return { value: node.value };
                }
            }
        };
    }

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
