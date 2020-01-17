const async = require('async');

module.exports = ({
    options,
    dataProvider,
}) => {
    const {
        maxParallelRequests = 5,
        functionName,
    } = options;

    if (!functionName) throw Error('Function name was not provided to loader');

    const eveluationTask = (task, callback) => {
        const {
            node,
        } = task;
        const nodeValue = node.data;

        dataProvider[functionName]({ page: nodeValue.page })
            .then(({ total, data }) => {
                nodeValue.setResponse(total, data);
                callback();
            })
            .catch((e) => {
                console.error('Some error ', e);
                callback(e);
            });
    };

    return {
        queue: async.queue(eveluationTask, maxParallelRequests),
    };
};
