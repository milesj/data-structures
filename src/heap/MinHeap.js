import Heap, { MIN } from './Heap';

export default class MinHeap extends Heap {
    constructor(capacity = 0, arity = 2) {
        super(MIN, capacity, arity);
    }

    min() {
        return this.top();
    }
}
