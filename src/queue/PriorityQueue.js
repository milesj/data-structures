import MinHeap from '../heap/MinHeap';
import Node from '../Node';
import { isObject } from '../helpers';

/**
 * A `PriorityQueue` is a queue like data structure that processes items in order based on a priority level.
 * The lower the priority level number, the faster it will be processed -- for example, 1 has the highest priority.
 * The implementation uses `MinHeap` as its underlying architecture, and not a regular `Queue`.
 *
 * When pushing an object onto the queue, a "priority" property must be defined.
 * If one does not exist, it will automatically be set.
 */
export default class PriorityQueue extends MinHeap {

    /**
     * {@inheritdoc}
     */
    createNode(data) {
        return new PriorityQueueNode(data);
    }

    /**
     * Alias for `pop()`.
     *
     * @returns {*}
     */
    dequeue() {
        return this.pop();
    }

    /**
     * Alias for `popAll()`.
     *
     * @returns {*[]}
     */
    dequeueAll() {
        return this.popAll();
    }

    /**
     * Alias for `push()`.
     *
     * @param {*} value
     * @param {Number} [priority]
     * @returns {Heap}
     */
    enqueue(value, priority) {
        return this.push(value, priority);
    }

    /**
     * Alias for `pushAll()`.
     *
     * @param {*[]} values
     * @returns {Heap}
     */
    enqueueAll(values) {
        return this.pushAll(values);
    }

    /**
     * {@inheritdoc}
     *
     * An optional priority can be defined as the second argument, which will be appended to the
     * value if it is an object, and if the object does not already contain a priority.
     *
     * @param {*} value
     * @param {Number} [priority]
     * @returns {Heap}
     */
    push(value, priority) {
        if (isObject(value) && typeof value.priority === 'undefined') {
            value.priority = priority || 100 + this.size;
        }

        return super.push(value);
    }
}

/**
 * Change the node's key name to "priority" instead of "key".
 */
export class PriorityQueueNode extends Node {

    /**
     * {@inheritdoc}
     */
    keyName() {
        return 'priority';
    }
}
