import Collection from '../Collection';

/**
 * A `DisjointSet` is a data structure that keeps track of a set of elements partitioned
 * into a number of disjoint (non-overlapping) subsets.
 *
 * @property {Map} cache - Maps values to item indices
 * @property {Map} items - Maps indices to nodes
 */
export default class DisjointSet extends Collection {

    /**
     * Store the capacity and instantiate all maps.
     *
     * @param {Number} capacity
     */
    constructor(capacity = 0) {
        super(capacity);

        this.cache = new Map();
        this.items = new Map();
    }

    /**
     * {@inheritdoc}
     */
    [Symbol.iterator]() {
        return this.cache.keys();
    }

    /**
     * {@inheritdoc}
     */
    createNode(value) {
        return new DisjointSetNode(this.size, value);
    }

    /**
     * {@inheritdoc}
     */
    empty() {
        this.cache.clear();
        this.items.clear();
        this.size = 0;

        return this;
    }

    /**
     * Find the representative node for the provided value, or return null if not found.
     *
     * @param {*} value
     * @returns {DisjointSetNode}
     */
    find(value) {
        if (!this.cache.has(value)) {
            return null;
        }

        let index = this.cache.get(value),
            node = this.items.get(index);

        // Return the node if it's the representative
        if (node.parent === index) {
            return node;
        }

        // Use path compression to keep the tree shallow
        let repNode = this.find(this.items.get(node.parent).value);

        // Set the initial nodes parent to the representative
        node.parent = repNode.key;

        return repNode;
    }

    /**
     * Returns an array of groups, or sub-arrays of each value grouped based on their subset.
     *
     * @returns {*[]}
     */
    groups() {
        let sets = new Map(),
            repNode;

        for (let value of this.cache.keys()) {
            repNode = this.find(value);

            if (sets.has(repNode.key)) {
                sets.get(repNode.key).push(value);

            } else {
                sets.set(repNode.key, [value]);
            }
        }

        // Do another loop as we want to return an array
        let groups = [];

        for (let group of sets.values()) {
            groups.push(group);
        }

        return groups;
    }

    /**
     * Insert a value into the set.
     *
     * @param {*} value
     * @returns {DisjointSet}
     */
    insert(value) {
        if (this.isFull()) {
            this.error('{class} is full');
        }

        let node = this.createNode(value);

        // Keep a reference to the items index
        this.cache.set(value, node.key);

        // Store the item
        this.items.set(node.key, node);

        // Increase the size
        this.size += 1;

        return this;
    }

    /**
     * Insert multiple values into the set.
     *
     * @param {*[]} values
     * @returns {DisjointSet}
     */
    insertAll(values) {
        values.forEach(this.insert.bind(this));

        return this;
    }

    /**
     * Returns true if both values are connected within the same subset.
     *
     * @param {*} a
     * @param {*} b
     * @returns {Boolean}
     */
    isConnected(a, b) {
        return (this.find(a) === this.find(b));
    }

    /**
     * Returns true if both values are not connected within the same subset.
     *
     * @param {*} a
     * @param {*} b
     * @returns {Boolean}
     */
    isDisjoint(a, b) {
        return !this.isConnected(a, b);
    }

    /**
     * Search for a node that matches the provided value, or return null if not found.
     *
     * @param {*} value
     * @returns {DisjointSetNode}
     */
    search(value) {
        if (!this.cache.has(value)) {
            return null;
        }

        return this.items.get(this.cache.get(value));
    }

    /**
     * Merge two values into a single subset by joining their trees through a representative node.
     *
     * @param {*} a
     * @param {*} b
     * @returns {DisjointSet}
     */
    union(a, b) {
        let aRep = this.find(a),
            bRep = this.find(b);

        // One of the values does not exist
        if (!aRep || !bRep) {
            return this;
        }

        // Already in the same set
        if (aRep === bRep) {
            return this;
        }

        // Move A under B
        if (aRep.rank < bRep.rank) {
            aRep.parent = bRep.key;

        // Move B under A
        } else if (aRep.rank > bRep.rank) {
            bRep.parent = aRep.key;

        // They match, so move anywhere and increase rank
        } else {
            bRep.parent = aRep.key;
            aRep.rank += 1;
        }

        return this;
    }
}

/**
 * Don't inherit from `Node` as we don't want its constructor functionality.
 *
 * @property {Number} key
 * @property {*} value
 * @property {Number} parent
 * @property {Number} rank
 */
export class DisjointSetNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.parent = key;
        this.rank = 0;
    }
}
