const axios = require('axios');


module.exports = function axiosNetworkProvider(params) {
    const {
        baseURL,
    } = params;
    const instance = axios.create({
        baseURL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    /**
     * TODO: Retry if error 
     */
    // this.$axios.interceptors.response.use(null, (error) => {
    //     if (error.config && error.response && error.response.status === 401) {
    //        
    //     }
    //     return Promise.reject(error);
    //   });

    return instance;
};
