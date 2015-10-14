import Node from './Node';

export default class Structure {

    /**
     * Create a new Node and assign a value.
     *
     * @param {*} value
     * @returns {Node}
     */
    createNode(value) {
        return new Node(value);
    }

    /**
     * Throw an error with a custom interpolated message.
     *
     * @param {String} message
     * @param {Object} params
     */
    error(message, params = {}) {
        params['class'] = this.constructor.name;

        Object.keys(params).forEach(key => {
            message = message.replace('{' + key + '}', params[key]);
        });

        throw new Error(message);
    }
}
