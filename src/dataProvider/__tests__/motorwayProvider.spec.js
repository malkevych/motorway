const {
    connect: motorway,
} = require('../motorway');


describe('Motorway data provider', () => {
    describe('Constract', () => {
        beforeEach(() => {
            this.dataProvider = motorway({
                baseURL: 'http://localhost:8000',
            });
        });

        it('should throw if baseURL is not passed', () => {
            assert.throws(() => {
                motorway({});
            });
            assert.throws(() => {
                motorway();
            });
        });

        it('should have right contract\'s methods', () => {
            assert.exists(this.dataProvider.loadVisitors, 'there is no "loadVisits" method name');
        });
    });
});
