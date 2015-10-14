
/**
 * A `Comparator` is used for comparing and evaluating expressions within advanced data structures.
 * Only valid for integers and floats.
 */
export default class Comparator {
    equals(value, base) {
        return (value === base);
    }

    greaterThan(value, base) {
        return (value > base);
    }

    greaterThanEquals(value, base) {
        return (value >= base);
    }

    lessThan(value, base) {
        return (value < base);
    }

    lessThanEquals(value, base) {
        return (value <= base);
    }
}

/**
 * A `StringComparator` can be used for comparing strings alphabetically.
 */
export class StringComparator extends Comparator {

    /**
     * An optional locale and set of options can be defined to modify
     * the `Collator` functionality.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     *
     * @param {String} [locale]
     * @param {Object} [options]
     */
    constructor(locale = null, options = {}) {
        super();

        // Errors out if the locale is null or undefined
        this.collator = locale ? new Intl.Collator(locale, options) : new Intl.Collator();
    }

    equals(value, base) {
        return (this.collator.compare(value, base) === 0);
    }

    greaterThan(value, base) {
        return (this.collator.compare(value, base) > 0);
    }

    greaterThanEquals(value, base) {
        return (this.collator.compare(value, base) >= 0);
    }

    lessThan(value, base) {
        return (this.collator.compare(value, base) < 0);
    }

    lessThanEquals(value, base) {
        return (this.collator.compare(value, base) <= 0);
    }
}
