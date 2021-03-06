import Node from './Node';

/**
 * A `Structure` is an abstract class that all data structures extend from.
 *
 * @abstract
 */
export default class Structure {

    /**
     * Create a new Node and assign a value.
     *
     * @param {*} data
     * @returns {Node}
     */
    createNode(data) {
        return new Node(data);
    }

    /**
     * Throw an error with a custom interpolated message.
     *
     * @param {String} message
     * @param {Object} params
     */
    error(message, params = {}) {
        params.class = this.constructor.name;

        let errorMessage = message;

        Object.keys(params).forEach(key => {
            errorMessage = errorMessage.replace('{' + key + '}', params[key]);
        });

        throw new Error(errorMessage);
    }
}
