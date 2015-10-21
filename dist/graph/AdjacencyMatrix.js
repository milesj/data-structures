'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Structure2 = require('../Structure');

var _Structure3 = _interopRequireDefault(_Structure2);

var AdjacencyMatrix = (function (_Structure) {
    _inherits(AdjacencyMatrix, _Structure);

    function AdjacencyMatrix(capacity) {
        _classCallCheck(this, AdjacencyMatrix);

        _get(Object.getPrototypeOf(AdjacencyMatrix.prototype), 'constructor', this).call(this);

        if (!capacity || capacity <= 0) {
            this.error('{class} requires a capacity');
        }

        this.matrix = [];

        for (var i = 0; i < capacity; i++) {
            for (var j = 0; j < capacity; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    return AdjacencyMatrix;
})(_Structure3['default']);

exports['default'] = AdjacencyMatrix;
module.exports = exports['default'];