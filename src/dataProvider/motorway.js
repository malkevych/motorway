const axiosNetworkProvider = require('~utils/axiosNetworkProvider');


class MotorwayProvider {
    constructor({
        baseURL,
    } = {}) {
        if (!baseURL) throw Error('baseURL was not specified');

        this.provider = axiosNetworkProvider({
            baseURL,
        });
        this.accessToken = null;
    }

    /** Getters */

    get hasAccessToken() {
        return !!this.accessToken;
    }

    /** Methods */

    async gainAccessToken() {
        const {
            data: {
                token,
            },
        } = await this.provider.get('/api/login');
        this.accessToken = token;
    }

    async loadVisitors({
        page = 1,
    }) {
        const params = {
            page,
            token: this.accessToken,
        };
        const {
            data,
        } = await this.provider.get('/api/visits', { params });
        return data;
    }
}

const accessTokenWrap = (fn, provider) => {
    return async (...rest) => {
        if (!provider.hasAccessToken) {
            await provider.gainAccessToken();
        }
        return fn.call(provider, ...rest);
    };
};

const connect = (...args) => {
    const instance = new MotorwayProvider(...args);
    return {
        authorize: () => instance.gainAccessToken.call(instance, null),
        loadVisitors: accessTokenWrap(instance.loadVisitors, instance),
    };
};

module.exports = {
    connect,
};
