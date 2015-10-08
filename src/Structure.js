export default class Structure {
    error(message, params = {}) {
        params['class'] = this.constructor.name;

        Object.keys(params).forEach(key => {
            message.replace('{' + key + '}', params[key]);
        });

        throw new Error(message);
    }
}
