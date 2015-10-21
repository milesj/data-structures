'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

/**
 * A `Structure` is an abstract class that all data structures extend from.
 *
 * @abstract
 */

var Structure = (function () {
    function Structure() {
        _classCallCheck(this, Structure);
    }

    _createClass(Structure, [{
        key: 'createNode',

        /**
         * Create a new Node and assign a value.
         *
         * @param {*} data
         * @returns {Node}
         */
        value: function createNode(data) {
            return new _Node2['default'](data);
        }

        /**
         * Throw an error with a custom interpolated message.
         *
         * @param {String} message
         * @param {Object} params
         */
    }, {
        key: 'error',
        value: function error(message) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            params['class'] = this.constructor.name;

            Object.keys(params).forEach(function (key) {
                message = message.replace('{' + key + '}', params[key]);
            });

            throw new Error(message);
        }
    }]);

    return Structure;
})();

exports['default'] = Structure;
module.exports = exports['default'];