import Collection from './Collection';
import Node from './Node';

/**
 * @property {Node|null} head
 * @property {Node|null} tail
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
     * @returns {boolean}
     */
    contains(value) {
        return (this.indexOf(value) >= 0);
    }

    /**
     * {@inheritdoc}
     */
    createNode(value) {
        let node = new Node(value);
            node.next = null;

        return node;
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
     * Returns the first node in the list or null if it does not exist.
     *
     * @returns {*|null}
     */
    first() {
        return this.head ? this.head.value : null;
    }

    /**
     * Returns the index of the first occurrence of the specified value in this list or -1 otherwise.
     *
     * @param {*} value
     * @returns {number}
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
     * @param {number} index
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
     * Returns the last node in the list or null if it does not exist.
     *
     * @returns {*|null}
     */
    last() {
        return this.tail ? this.tail.value : null;
    }

    /**
     * Returns the index of the last occurrence of the specified value in this list or -1 otherwise.
     *
     * @param {*} value
     * @returns {number}
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
     * @returns {Node|null}
     */
    remove(value) {
        if (this.isEmpty()) {
            this.error('{class} is empty');

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
     * @param {number} index
     * @returns {Node|null}
     */
    removeAt(index) {
        if (this.isEmpty()) {
            this.error('{class} is empty');

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
     * Remove and return the first node in the list.
     *
     * @returns {*}
     */
    removeFirst() {
        if (this.isEmpty()) {
            this.error('{class} is empty');
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
     * Remove and return the last node in the list.
     *
     * @returns {null}
     */
    removeLast() {
        if (this.isEmpty()) {
            this.error('{class} is empty');

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
     * @param {Node} node
     * @param {Node} tailNode - The last node
     * @returns {Node}
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
     * @param {Node} node
     * @param {Node} currentNode - The node at the current index
     * @param {Node} previousNode - The node at the previous index
     * @returns {Node}
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
     * @param {Node} node
     * @param {Node} headNode - The first node
     * @returns {Node}
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
     * @param {Node} node
     * @param {Node} nextNode - The node at the next index
     * @param {Node} previousNode - The node at the previous index
     * @returns {Node}
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
     * @param {Node} node
     * @returns {Node}
     * @private
     */
    _setRootNode(node) {
        this.head = node;
        this.tail = node;

        return node;
    }
}
