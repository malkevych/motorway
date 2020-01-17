require('dotenv').config();
const {
    visits: {
        connect: visitsRepository,
    },
} = require('./repositories');
const dataProvider = require('./dataProvider');
const {
    dataLoader,
    filterStrategies,
    groupVisits,
} = require('./helpers');

const providerOptions = {
    retries: 3,
};
const options = {
    maxParallelRequests: 5,
    maxElementsPerPage: 15,
    functionName: 'loadVisitors',
};
const {
    onlyBusinessDays,
    notToday,
} = filterStrategies;


const main = async () => {
    const provider = dataProvider('motorway', providerOptions);
    const loader = dataLoader(provider, options);
    const repository = visitsRepository(loader);

    try {
        const visits = await repository
            .visits()
            .filter(onlyBusinessDays)
            .filter(notToday)
            .fetch();
        const grouped = visits.reduce(...groupVisits);
        console.table(grouped);
    } catch (e) {
        console.error('Error: ', e);
    }
};

main();
