const repository = require('../');
const {
    filterStrategies,
    groupVisits
} = require('~helpers');


describe('Repository', () => {
    const mockedVisitors = [
        { id: 1, name: 'Bill Murray', date: '2018-09-02T09:11:00' }, // Sunday
        { id: 2, name: 'John Doe', date: '2018-09-03T09:11:00' }, // Monday
        { id: 3, name: 'John Doe', date: '2018-09-04T09:11:00' }, // Tuesday
        { id: 4, name: 'John Doe', date: '2018-09-05T09:11:00' }, // Wednesday
        { id: 5, name: 'John Doe', date: '2018-09-06T09:11:00' }, // Thursday
        { id: 6, name: 'John Doe', date: '2018-09-07T09:11:00' }, // Friday
        { id: 7, name: 'John Doe', date: '2018-09-08T09:11:00' }, // Saturday
        { id: 8, name: 'You =)', date: new Date().toISOString() }, // Today
    ];

    describe('Combined days', () => {
        before(() => {
            const {
                connect: connectRepository,
            } = repository;
            const dataLoader = ({
                fetchData: async () => undefined,
                getData: () => mockedVisitors,
            });
            this.repo = connectRepository(dataLoader);
        });

        it('should not create repo without DataProvider', () => {
            const {
                connect: connectRepository,
            } = repository;

            assert.throws(() => connectRepository());
        });

        it('should return all visitors', async () => {
            const visitors = await this.repo.visits().fetch();

            assert.exists(visitors);
            assert.equal(visitors.length, mockedVisitors.length);
        });

        it('should thorow if filter function was not provided', async () => {
            const loadThorows = () => this.repo.visits().filter();

            assert.throws(loadThorows);
        });

        it('should filter visitors by notToday and only business days', async () => {
            const {
                notToday,
                onlyBusinessDays,
            } = filterStrategies;
            const visitors = await this.repo.visits()
                .filter(notToday)
                .filter(onlyBusinessDays)
                .fetch();

            assert.equal(visitors.length, 5);
        });

        it('should Joe visit 5 times', async () => {
            const {
                notToday,
                onlyBusinessDays,
            } = filterStrategies;

            const visits = await this.repo.visits()
                .filter(notToday)
                .filter(onlyBusinessDays)
                .fetch();
            const grouped = visits.reduce(...groupVisits);

            assert.equal(grouped.get('John Doe'), 5);
        });
    });

    describe('Only bussiness days', () => {
        const mockedOnlyWekendVisitors = [
            { id: 1, name: 'Bill Murray', date: '2018-09-02T09:11:00' }, // Sunday
            { id: 2, name: 'John Doe', date: '2018-09-08T09:11:00' }, // Saturday
        ];

        before(() => {
            const {
                connect: connectRepository,
            } = repository;
            const dataLoader = ({
                fetchData: async () => undefined,
                getData: () => mockedVisitors,
            });
            this.repo = connectRepository(dataLoader);
        });

        it('should return filtered visitors by buissiness days', async () => {
            const {
                onlyBusinessDays,
            } = filterStrategies;

            const visitors = await this.repo.visits().filter(onlyBusinessDays).fetch();

            assert.exists(visitors);
            assert.isAtMost(visitors.length, mockedVisitors.length - 1);
        });

        it('should return zero visitors', async () => {
            const {
                connect: connectRepository,
            } = repository;
            const dataLoader = ({
                fetchData: async () => undefined,
                getData: () => mockedOnlyWekendVisitors,
            });
            const repo = connectRepository(dataLoader);
            const {
                onlyBusinessDays,
            } = filterStrategies;

            const visitors = await repo.visits().filter(onlyBusinessDays).fetch();

            assert.exists(visitors);
            assert.equal(visitors.length, 0);
        });
    });

    describe('Only bussiness days', () => {
        const mockedOnlyTodayVisitors = [
            { id: 1, name: 'Bill Murray', date: new Date().toISOString() }, // Sunday
            { id: 2, name: 'John Doe', date: new Date().toISOString() }, // Saturday
        ];

        before(() => {
            const {
                connect: connectRepository,
            } = repository;
            const dataLoader = ({
                fetchData: async () => undefined,
                getData: () => mockedVisitors,
            });
            this.repo = connectRepository(dataLoader);
        });

        it('should return filtered visitors by not today', async () => {
            const {
                notToday,
            } = filterStrategies;

            const visitors = await this.repo.visits().filter(notToday).fetch();

            assert.exists(visitors);
            assert.equal(visitors.length, mockedVisitors.length - 1);
        });

        it('should return zero visitors', async () => {
            const {
                connect: connectRepository,
            } = repository;
            const dataLoader = ({
                fetchData: async () => undefined,
                getData: () => mockedOnlyTodayVisitors,
            });
            const repo = connectRepository(dataLoader);
            const {
                notToday,
            } = filterStrategies;

            const visitors = await repo.visits().filter(notToday).fetch();

            assert.exists(visitors);
            assert.equal(visitors.length, 0);
        });
    });
});
