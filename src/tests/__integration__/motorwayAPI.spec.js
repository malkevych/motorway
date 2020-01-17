const dataProvider = require('../../dataProvider');
const {
    visits: {
        connect: connectVisitsRepository,
    },
} = require('../../repositories');
const {
    dataLoader,
    filterStrategies,
} = require('~helpers');


describe.only('Motorway data provider', () => {
    describe('Data Provider', () => {
        beforeEach(() => {
            const options = {
                maxParallelRequests: 5,
                maxElementsPerPage: 15,
                functionName: 'loadVisitors',
            };
            this.provider = dataProvider('motorway');
            this.dataLoader = dataLoader(this.provider, options);
            this.repository = connectVisitsRepository(this.dataLoader);
        });

        it('should load first page with data and total fields', async () => {
            await this.provider.authorize();

            const res = await this.provider.loadVisitors({ page: 1 });

            assert.hasAllKeys(res, ['data', 'total']);
        });

        it('should the result should be array of Visit models', async () => {
            const {
                notToday,
                onlyBusinessDays,
            } = filterStrategies;
            const visits = await this.repository
                .visits()
                .filter(onlyBusinessDays)
                .filter(notToday)
                .fetch();

            assert.isArray(visits);

            if (visits.length) {
                assert.hasAllKeys(visits[0], ['id', 'name', 'date']);
            }
        });
    });
});
