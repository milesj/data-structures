import Structure from '../Structure';

export default class AdjacencyMatrix extends Structure {
    constructor(capacity) {
        super();

        if (!capacity || capacity <= 0) {
            this.error('{class} requires a capacity');
        }

        this.matrix = [];

        for (let i = 0; i < capacity; i++) {
            for (let j = 0; j < capacity; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }
}
