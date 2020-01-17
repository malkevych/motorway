const axios = require('axios');
const axiosRetry = require('axios-retry');


module.exports = function axiosNetworkProvider(params) {
    const {
        baseURL,
        retries = 3,
    } = params;
    axiosRetry(axios, { retries });

    const instance = axios.create({
        baseURL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return instance;
};
