import Comparator, { StringComparator } from '../src/Comparator';

describe('Comparator', () => {
    it('should compare numeric values', () => {
        let comp = new Comparator();

        expect(comp.equals(1, 1)).toBe(true);
        expect(comp.greaterThan(10, 5)).toBe(true);
        expect(comp.greaterThanEquals(5, 5)).toBe(true);
        expect(comp.lessThan(5, 10)).toBe(true);
        expect(comp.lessThanEquals(10, 10)).toBe(true);
    });
});

describe('StringComparator', () => {
    it('should compare string values', () => {
        let comp = new StringComparator();

        expect(comp.equals('cat', 'cat')).toBe(true);
        expect(comp.greaterThan('dog', 'cat')).toBe(true);
        expect(comp.greaterThanEquals('cat', 'cat')).toBe(true);
        expect(comp.lessThan('aardvark', 'cat')).toBe(true);
        expect(comp.lessThanEquals('cat', 'cat')).toBe(true);
    });
});
