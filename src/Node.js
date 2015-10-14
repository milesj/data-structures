const toString = Object.prototype.toString;

export default class Node {
    constructor(value) {
        let type = typeof value,
            keyName = this.keyName();

        // Objects
        if (value && toString.call(value) === '[object Object]') {
            this.value = value;
            this.key = (typeof value.getNodeKey === 'function')
                ? value.getNodeKey.call(value, keyName)
                : value[keyName];

        // Strings, integers
        } else if (value !== '' && type === 'string' || type === 'number') {
            this.value = this.key = value;

        } else {
            throw new Error('A non-empty string, number, or object is required for nodes');
        }

        if (!this.isKeyValid()) {
            throw new Error('A valid key is required for nodes');
        }
    }

    /**
     * Returns true if the key is a valid non-empty value.
     *
     * @returns {Boolean}
     */
    isKeyValid() {
        let key = this.key;

        return (key || key === 0 || key === 0.0);
    }

    /**
     * Returns the name of the "key" or "index" property.
     *
     * @returns {String|Number}
     */
    keyName() {
        return 'key';
    }
}
