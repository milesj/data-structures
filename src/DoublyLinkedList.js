import LinkedList from './LinkedList';
import Node from './Node';

export default class DoublyLinkedList extends LinkedList {

    /**
     * {@inheritdoc}
     */
    createNode(value) {
        return new DoublyLinkedListNode(value);
    }

    /**
     * {@inheritdoc}
     */
    removeLast() {
        if (this.isEmpty()) {
            return null;

        } else if (this.tail === this.head) {
            return this.removeFirst();
        }

        let tail = this.tail;

        this._removeNode(tail, null, tail.prev);
        this.tail = tail.prev;

        // Decrease the size
        this.size -= 1;

        return tail.value;
    }

    /**
     * {@inheritdoc}
     */
    _appendNode(node, tailNode) {
        node.prev = tailNode;

        return super._appendNode(node, tailNode);
    }

    /**
     * {@inheritdoc}
     */
    _insertNode(node, currentNode, previousNode) {
        node.prev = previousNode;
        currentNode.prev = node;

        return super._insertNode(node, currentNode, previousNode);
    }

    /**
     * {@inheritdoc}
     */
    _prependNode(node, headNode) {
        headNode.prev = node;

        return super._prependNode(node, headNode);
    }

    /**
     * {@inheritdoc}
     */
    _removeNode(node, nextNode, previousNode) {
        if (nextNode) {
            nextNode.prev = previousNode;
        }

        return super._removeNode(node, nextNode, previousNode);
    }
}

/**
 * @property {DoublyLinkedListNode|null} next
 * @property {DoublyLinkedListNode|null} prev
 */
export class DoublyLinkedListNode extends Node {
    constructor(value) {
        super(value);

        this.next = null;
        this.prev = null;
    }
}
