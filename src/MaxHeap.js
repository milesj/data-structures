import Heap, { MAX } from './adt/Heap';

export default class MaxHeap extends Heap {
    constructor(capacity = 0, arity = 2) {
        super(MAX, capacity, arity);
    }

    max() {
        return this.top();
    }
}
