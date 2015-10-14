import Collection from '../Collection';
import Node from '../Node';

/**
 * @property {LinkedListNode|null} head
 * @property {LinkedListNode|null} tail
 */
export default class LinkedList extends Collection {
    constructor() {
        super();

        this.head = null;
        this.tail = null;
    }

    /**
     * {@inheritdoc}
     */
    [Symbol.iterator]() {
        let curNode = this.head,
            node = null;

        return {
            next() {
                if (!curNode) {
                    return { done: true };
                } else {
                    node = curNode;
                    curNode = curNode.next;

                    return { value: node.value };
                }
            }
        };
    }

    /**
     * Append the specified value to the end of the list.
     *
     * @param {*} value
     * @returns {LinkedList}
     */
    append(value) {
        if (this.isEmpty()) {
            return this.prepend(value);
        }

        // Append the node
        this._appendNode(this.createNode(value), this.tail);

        // Increase the size
        this.size += 1;

        return this;
    }

    /**
     * Appends multiple values to the end of the list.
     *
     * @param {*[]} values
     * @returns {LinkedList}
     */
    appendAll(values) {
        values.forEach(this.append.bind(this));

        return this;
    }

    /**
     * Returns true if the list contains the specified value.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    contains(value) {
        return (this.indexOf(value) >= 0);
    }

    /**
     * {@inheritdoc}
     */
    createNode(value) {
        return new LinkedListNode(value);
    }

    /**
     * {@inheritdoc}
     */
    empty() {
        this.head = this.tail = null;
        this.size = 0;

        return this;
    }

    /**
     * Returns the first value in the list but does not remove it, or returns null if empty.
     *
     * @returns {*}
     */
    first() {
        return this.isEmpty() ? null : this.head.value;
    }

    /**
     * Returns the index of the first occurrence of the specified value in this list or -1 otherwise.
     *
     * @param {*} value
     * @returns {Number}
     */
    indexOf(value) {
        let curNode = this.head,
            index = 0;

        while (curNode) {
            if (curNode.value === value) {
                return index;
            }

            curNode = curNode.next;
            index++;
        }

        return -1;
    }

    /**
     * Insert a node at a specified index.
     *
     * @param {*} value
     * @param {Number} index
     * @returns {LinkedList}
     */
    insert(value, index) {
        if (index < 0 || index > this.size) {
            this.error('Index out of range');

        } else if (index === 0) {
            return this.prepend(value);

        } else if (index === this.size) {
            return this.append(value);
        }

        let curNode = this.head,
            prevNode = null,
            i = 0;

        while (curNode) {
            if (index === i) {
                break;
            }

            prevNode = curNode;
            curNode = curNode.next;
            i++;
        }

        // Insert the node
        this._insertNode(this.createNode(value), curNode, prevNode);

        // Increase the size
        this.size += 1;

        return this;
    }

    /**
     * Returns the last value in the list but does not remove it, or returns null if empty.
     *
     * @returns {*}
     */
    last() {
        return this.isEmpty() ? null : this.tail.value;
    }

    /**
     * Returns the index of the last occurrence of the specified value in this list or -1 otherwise.
     *
     * @param {*} value
     * @returns {Number}
     */
    lastIndexOf(value) {
        let curNode = this.head,
            index = -1,
            i = 0;

        while (curNode) {
            if (curNode.value === value) {
                index = i;
            }

            curNode = curNode.next;
            i++;
        }

        return index;
    }

    /**
     * Prepend the specified value to the beginning of the list.
     *
     * @param {*} value
     * @returns {LinkedList}
     */
    prepend(value) {
        let node = this.createNode(value);

        // Head has not been set yet
        if (this.isEmpty()) {
            this._setRootNode(node);

        // Prepend the node
        } else {
            this._prependNode(node, this.head);
        }

        // Increase the size
        this.size += 1;

        return this;
    }

    /**
     * Prepends multiple values to the beginning of the list.
     *
     * @param {*[]} values
     * @returns {LinkedList}
     */
    prependAll(values) {
        values.forEach(this.prepend.bind(this));

        return this;
    }

    /**
     * Remove and return the node with the specified value, or null if not found.
     *
     * @param {*} value
     * @returns {*}
     */
    remove(value) {
        if (this.isEmpty()) {
            return null;

        } else if (this.head.value === value) {
            return this.removeFirst();

        } else if (this.tail.value === value) {
            return this.removeLast();
        }

        let curNode = this.head,
            prevNode = null;

        while (curNode) {
            if (curNode.value === value) {
                this._removeNode(curNode, curNode.next, prevNode);

                // Decrease the size
                this.size -= 1;

                return value;
            }

            prevNode = curNode;
            curNode = curNode.next;
        }

        return null;
    }

    /**
     * Remove and return the node at the specific index, or null if not found.
     *
     * @param {Number} index
     * @returns {*}
     */
    removeAt(index) {
        if (this.isEmpty()) {
            return null;

        } else if (index < 0 || index >= this.size) {
            this.error('Index out of range');

        } else if (index === 0) {
            return this.removeFirst();

        } else if (index === this.size - 1) {
            return this.removeLast();
        }

        let curNode = this.head,
            prevNode = null,
            i = 0;

        while (curNode) {
            if (index === i) {
                this._removeNode(curNode, curNode.next, prevNode);

                // Decrease the size
                this.size -= 1;

                return curNode.value;
            }

            prevNode = curNode;
            curNode = curNode.next;
            i++;
        }

        return null;
    }

    /**
     * Remove and return the first node in the list, or null if empty.
     *
     * @returns {*}
     */
    removeFirst() {
        if (this.isEmpty()) {
            return null;
        }

        let head = this.head;

        // Reset tail if needed
        if (this.head === this.tail) {
            this.tail = null;
        }

        // Remove the head
        this._removeNode(head, head.next, null);
        this.head = head.next;

        // Decrease the size
        this.size -= 1;

        return head.value;
    }

    /**
     * Remove and return the last node in the list, or null if empty.
     *
     * @returns {null}
     */
    removeLast() {
        if (this.isEmpty()) {
            return null;

        } else if (this.tail === this.head) {
            return this.removeFirst();
        }

        let tail = this.tail;

        // Set the 2nd to last node to null
        let prevNode = this.head;

        while (prevNode) {
            if (prevNode.next === this.tail) {
                break;
            } else {
                prevNode = prevNode.next;
            }
        }

        this._removeNode(tail, null, prevNode);
        this.tail = prevNode;

        // Decrease the size
        this.size -= 1;

        return tail.value;
    }

    /**
     * Search for a node that matches the defined value, or null if it could not be found.
     *
     * @param {*} value
     * @returns {LinkedListNode}
     */
    search(value) {
        let curNode = this.head;

        while (curNode) {
            if (curNode.value === value) {
                return curNode;
            }

            curNode = curNode.next;
        }

        return null;
    }

    /**
     * {@inheritdoc}
     */
    toArray() {
        let array = [];

        for (let value of this) {
            array.push(value);
        }

        return array;
    }

    /**
     * Convenience method for appending a node and setting properties.
     *
     * @param {LinkedListNode} node
     * @param {LinkedListNode} tailNode - The last node
     * @returns {LinkedListNode}
     * @private
     */
    _appendNode(node, tailNode) {
        tailNode.next = node;
        this.tail = node;

        return node;
    }

    /**
     * Convenience method for inserting a node and setting properties.
     *
     * @param {LinkedListNode} node
     * @param {LinkedListNode} currentNode - The node at the current index
     * @param {LinkedListNode} previousNode - The node at the previous index
     * @returns {LinkedListNode}
     * @private
     */
    _insertNode(node, currentNode, previousNode) {
        node.next = currentNode;
        previousNode.next = node;

        return node;
    }

    /**
     * Convenience method for prepending a node and setting properties.
     *
     * @param {LinkedListNode} node
     * @param {LinkedListNode} headNode - The first node
     * @returns {LinkedListNode}
     * @private
     */
    _prependNode(node, headNode) {
        node.next = headNode;
        this.head = node;

        return node;
    }

    /**
     * Convenience method for removing a node and setting properties.
     *
     * @param {LinkedListNode} node
     * @param {LinkedListNode} nextNode - The node at the next index
     * @param {LinkedListNode} previousNode - The node at the previous index
     * @returns {LinkedListNode}
     * @private
     */
    _removeNode(node, nextNode, previousNode) {
        if (previousNode) {
            previousNode.next = nextNode;
        }

        return node;
    }

    /**
     * Convenience method for setting a root node if no nodes exist (no head yet).
     *
     * @param {LinkedListNode} node
     * @returns {LinkedListNode}
     * @private
     */
    _setRootNode(node) {
        this.head = node;
        this.tail = node;

        return node;
    }
}

/**
 * @property {LinkedListNode|null} next
 */
export class LinkedListNode extends Node {
    constructor(value) {
        super(value);

        this.next = null;
    }
}
