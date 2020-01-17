const {
    connect: motorwayConnect,
} = require('./motorway');

const {
    MOTORWAY_BASE_URL,
} = process.env;


module.exports = (type, options = {}) => {
    const {
        motorwayBaseURL = MOTORWAY_BASE_URL,
        retries,
    } = options;

    switch (type) {
        case 'motorway':
            return motorwayConnect({
                baseURL: motorwayBaseURL,
                retries,
            });
        default:
            throw Error('There is no such data provider, pls check type param');
    }
};
