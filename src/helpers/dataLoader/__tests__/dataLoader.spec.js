const dataLoader = require('../');


describe('DataLoader', () => {
    const visitors2 = {
        data: [
            { id: 1, name: 'Bill Murray', date: '2018-09-02T09:11:00' },
            { id: 2, name: 'John Doe', date: '2018-08-30T03:24:00' },
        ],
        total: 2,
    };

    const visitorsWithoutRepeats = {
        data: [
            { id: 1, name: 'Bill Murray', date: '2018-09-02T09:11:00' },
            { id: 2, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 3, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 4, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 5, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 6, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 7, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 8, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 9, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 10, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 11, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 12, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 13, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 14, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 15, name: 'John Doe', date: '2018-08-30T03:24:00' },
            { id: 16, name: 'John Doe', date: '2018-08-30T03:24:00' },
        ],
        total: 16,
    };

    const visitorsSimulatedInsertionBefore = async ({ page }) => {
        const pages = {
            1: {
                data: [
                    { id: 1, name: 'Bill Murray', date: '2018-09-02T09:11:00' },
                    { id: 2, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 3, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 16,
            },
            2: {
                data: [
                    { id: 3, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 4, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 5, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 17,
            },
            3: {
                data: [
                    { id: 6, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 7, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 8, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 17,
            },
            4: {
                data: [
                    { id: 8, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 9, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 10, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 18,
            },
            5: {
                data: [
                    { id: 11, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 12, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 13, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 18,
            },
            6: {
                data: [
                    { id: 14, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 15, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 16, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 18,
            },
        };
        return pages[page] || {
            data: [],
            total: 16,
        };
    };

    const visitorsSimulatedInsertionAfter = async ({ page }) => {
        const pages = {
            1: {
                data: [
                    { id: 1, name: 'Bill Murray', date: '2018-09-02T09:11:00' },
                    { id: 2, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 3, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 16,
            },
            2: {
                data: [
                    { id: 4, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 5, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 6, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 17,
            },
            3: {
                data: [
                    { id: 62, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 7, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 8, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 17,
            },
            4: {
                data: [
                    { id: 9, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 10, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 11, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 18,
            },
            5: {
                data: [
                    { id: 24, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 12, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 13, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 18,
            },
            6: {
                data: [
                    { id: 14, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 15, name: 'John Doe', date: '2018-08-30T03:24:00' },
                    { id: 16, name: 'John Doe', date: '2018-08-30T03:24:00' },
                ],
                total: 18,
            },
        };
        return pages[page] || {
            data: [],
            total: 16,
        };
    };

    it('should load less than 15 items', async () => {
        const options = {
            maxParallelRequests: 2,
            maxElementsPerPage: 3,
            functionName: 'loadVisitors',
        };
        const mockedDataProvider = ({
            loadVisitors: async () => visitors2,
            authorize: async () => undefined,
        });
        const loader = dataLoader(mockedDataProvider, options);

        await loader.fetchData();
        const data = loader.getData();

        assert.equal(data.length, visitors2.data.length);
    });

    it('should load items by pages', async () => {
        const options = {
            maxParallelRequests: 2,
            maxElementsPerPage: 3,
            functionName: 'loadVisitors',
        };
        const {
            maxElementsPerPage,
        } = options;

        const mockedDataProvider = ({
            loadVisitors: async ({ page }) => {
                const p = page - 1;
                const from = p * maxElementsPerPage;
                const to = (p + 1) * maxElementsPerPage;
                const data = visitorsWithoutRepeats.data.slice(from, to);

                const resp = {
                    ...visitorsWithoutRepeats,
                    ...{
                        data,
                    },
                };
                return resp;
            },
            authorize: async () => undefined,
        });
        const loader = dataLoader(mockedDataProvider, options);

        await loader.fetchData();
        const data = loader.getData();

        assert.equal(data.length, visitorsWithoutRepeats.data.length);
    });

    it('should load items when new items are inserted before', async () => {
        const options = {
            maxParallelRequests: 2,
            maxElementsPerPage: 3,
            functionName: 'loadVisitors',
        };
        const mockedDataProvider = ({
            loadVisitors: visitorsSimulatedInsertionBefore,
            authorize: async () => undefined,
        });

        const loader = dataLoader(mockedDataProvider, options);
        await loader.fetchData();
        const data = loader.getData();

        assert.equal(data.length, 16);
    });

    it('should load items when new items are inserted after', async () => {
        const options = {
            maxParallelRequests: 2,
            maxElementsPerPage: 3,
            functionName: 'loadVisitors',
        };
        const mockedDataProvider = ({
            loadVisitors: visitorsSimulatedInsertionAfter,
            authorize: async () => undefined,
        });
        const loader = dataLoader(mockedDataProvider, options);

        await loader.fetchData();
        const data = loader.getData();

        assert.equal(data.length, 18);
    });

    it('should refresh data when call fetchData second time', async () => {
        const options = {
            maxParallelRequests: 2,
            maxElementsPerPage: 3,
            functionName: 'loadVisitors',
        };
        const mockedDataProvider = ({
            loadVisitors: visitorsSimulatedInsertionAfter,
            authorize: async () => undefined,
        });
        const loader = dataLoader(mockedDataProvider, options);

        await loader.fetchData();
        const data = loader.getData();

        assert.equal(data.length, 18);

        /** replace provider */
        mockedDataProvider.loadVisitors = async () => visitors2;

        await loader.fetchData();
        const dataUpdated = loader.getData();

        assert.equal(dataUpdated.length, 2);
    });
});
