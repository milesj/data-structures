import Structure from '../src/Structure';

describe('Structure', () => {
    describe('error()', () => {
        it('should interpolate params', () => {
            let struct = new Structure();

            expect(() => {
                struct.error('{class} is {emote}', {
                    emote: 'awesome'
                });
            }).toThrowError('Structure is awesome');
        });
    });
});
