import LinkedList from '../src/LinkedList';

describe('LinkedList', () => {
    let list = null;

    beforeEach(() => {
        list = new LinkedList();
    });

    describe('append()', () => {
        it('should link nodes', () => {
            list.append(1).append(2);

            console.log(list);
        });
    });
});
