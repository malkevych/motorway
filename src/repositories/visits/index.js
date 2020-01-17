const Visit = require('./visit.model');

const repository = (dataLoader) => {
    const {
        fetchData,
        getData,
    } = dataLoader;

    function visits() {
        const filters = [];
        const methods = {
            filter(fn) {
                if (!fn) throw Error('Filter function was not provided');
                filters.push(fn);
                return this;
            },
            async fetch() {
                await fetchData();
                const data = getData().map((el) => new Visit(el));
                if (!filters.length) {
                    return data;
                }
                return filters.reduce((acum, curr) => acum.filter(curr), data);
            },
        };
        return Object.assign(visits, methods);
    }

    return {
        visits,
    };
};

const connect = (dataProvider) => {
    if (!dataProvider) throw Error('Data provider was not provided');
    return repository(dataProvider);
};

module.exports = ({
    connect,
});
