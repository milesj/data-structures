
/**
 * A `Comparator` is used for comparing and evaluating expressions within advanced data structures.
 * Only valid for integers and floats.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Comparator = (function () {
    function Comparator() {
        _classCallCheck(this, Comparator);
    }

    /**
     * A `StringComparator` can be used for comparing strings alphabetically.
     */

    _createClass(Comparator, [{
        key: "equals",
        value: function equals(value, base) {
            return value === base;
        }
    }, {
        key: "greaterThan",
        value: function greaterThan(value, base) {
            return value > base;
        }
    }, {
        key: "greaterThanEquals",
        value: function greaterThanEquals(value, base) {
            return value >= base;
        }
    }, {
        key: "lessThan",
        value: function lessThan(value, base) {
            return value < base;
        }
    }, {
        key: "lessThanEquals",
        value: function lessThanEquals(value, base) {
            return value <= base;
        }
    }]);

    return Comparator;
})();

exports["default"] = Comparator;

var StringComparator = (function (_Comparator) {
    _inherits(StringComparator, _Comparator);

    /**
     * An optional locale and set of options can be defined to modify
     * the `Collator` functionality.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     *
     * @param {String} [locale]
     * @param {Object} [options]
     */

    function StringComparator() {
        var locale = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, StringComparator);

        _get(Object.getPrototypeOf(StringComparator.prototype), "constructor", this).call(this);

        // Errors out if the locale is null or undefined
        this.collator = locale ? new Intl.Collator(locale, options) : new Intl.Collator();
    }

    _createClass(StringComparator, [{
        key: "equals",
        value: function equals(value, base) {
            return this.collator.compare(value, base) === 0;
        }
    }, {
        key: "greaterThan",
        value: function greaterThan(value, base) {
            return this.collator.compare(value, base) > 0;
        }
    }, {
        key: "greaterThanEquals",
        value: function greaterThanEquals(value, base) {
            return this.collator.compare(value, base) >= 0;
        }
    }, {
        key: "lessThan",
        value: function lessThan(value, base) {
            return this.collator.compare(value, base) < 0;
        }
    }, {
        key: "lessThanEquals",
        value: function lessThanEquals(value, base) {
            return this.collator.compare(value, base) <= 0;
        }
    }]);

    return StringComparator;
})(Comparator);

exports.StringComparator = StringComparator;