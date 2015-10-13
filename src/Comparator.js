export default class Comparator {
    hash(value) {
        return value;
    }

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

export class StringComparator extends Comparator {
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
