const {
    connect: motorwayConnect,
} = require('./motorway');

const {
    MOTORWAY_BASE_URL,
} = process.env;


module.exports = (type, options = {}) => {
    const {
        motorwayBaseURL = MOTORWAY_BASE_URL,
    } = options;

    switch (type) {
        case 'motorway':
            return motorwayConnect({
                baseURL: motorwayBaseURL,
            });
        default:
            throw Error('There is no such data provider, pls check type param');
    }
};
