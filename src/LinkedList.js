import Collection from './Collection';
import Node from './Node';

export default class LinkedList extends Collection {
    constructor() {
        super();

        this.head = null;
        this.tail = null;
    }

    /**
     * Iterate over all the nodes in the linked list.
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
        let node = this.createNode(value);

        // Head has not been set yet
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.size = 1;

            return this;
        }

        // Set the tail node next to the new node
        this.tail.next = node;

        // Set the new node as the new tail
        this.tail = node;

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
     * Create a new Node for this type of list.
     *
     * @param {*} value
     * @returns {Node}
     */
    createNode(value) {
        let node = new Node(value);
            node.next = null;

        return node;
    }

    /**
     * Returns the first node in the list or null if it does not exist.
     *
     * @returns {Node|null}
     */
    head() {
        return this.head;
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
            throw new Error('Index out of range');

        } else if (index === 0) {
            return this.prepend(value);

        } else if (index === this.size) {
            return this.append(value);
        }

        let node = this.createNode(value),
            curNode = this.head,
            prevNode = null,
            i = 0;

        while (curNode) {
            if (index === i) {
                // Set the nodes next
                node.next = curNode;

                // Set the previous nodes next
                prevNode.next = node;

                // Increase the size
                this.size += 1;

                break;
            }

            prevNode = curNode;
            curNode = curNode.next;
            i++;
        }

        return this;
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
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.size = 1;

            return this;
        }

        // Set the previous head as the next of the new node
        node.next = this.head;

        // Set the new node as the new head
        this.head = node;

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
        return this.removeAt(this.indexOf(value));
    }

    /**
     * Remove and return the node at the specific index, or null if not found.
     *
     * @param {number} index
     * @returns {Node|null}
     */
    removeAt(index) {
        if (this.isEmpty() || index < 0 || index >= this.size) {
            throw new Error('Index out of range');

        } else if (index === 0) {
            return this.removeHead();

        } else if (index === this.size - 1) {
            return this.removeTail();
        }

        let curNode = this.head,
            prevNode = null,
            i = 0;

        while (curNode) {
            if (index === i) {
                // Join the previous and next nodes
                prevNode.next = curNode.next;

                // Decrease the size
                this.size -= 1;

                return curNode;
            }

            prevNode = curNode;
            curNode = curNode.next;
            i++;
        }

        return null;
    }

    /**
     * Remove and return the first node in the list, or null if no head.
     *
     * @returns {Node|null}
     */
    removeHead() {
        let head = this.head;

        // Head has not been set
        if (!head) {
            throw new Error('List is empty');
        }

        // Set the head to the next node in line
        this.head = head.next;

        // Decrease the size
        this.size -= 1;

        return head;
    }

    /**
     * Remove and return the last node in the list, or null if no tail.
     *
     * @returns {Node|null}
     */
    removeTail() {
        let tail = this.tail;

        // Tail has not been set
        if (!tail) {
            throw new Error('List is empty');
        }

        // Set the 2nd to last node to null
        let curNode = this.head;

        while (curNode) {
            if (curNode.next) {
                curNode = curNode.next;
            }
        }

        curNode.next = null;

        // Set the new tail
        this.tail = curNode;

        // Decrease the size
        this.size -= 1;

        return tail;
    }

    /**
     * Returns the last node in the list or null if it does not exist.
     *
     * @returns {Node|null}
     */
    tail() {
        return this.tail;
    }
}
