const DoublyLinkedList = require('~utils/doublyLinkedList');
const NodeValue = require('./nodeValue');
const loadingQueue = require('./loadingQueue');


const startLoading = async ({
    queue,
    requests,
    options = {},
    dataProvider,
}) => {
    const {
        maxParallelRequests = 5,
        maxElementsPerPage = 15,
    } = options;

    const shouldInsertAfter = (node) => {
        // if there is no elements more
        if (node.data.data.length < maxElementsPerPage) return false;

        const nextNode = node.next;

        // if there are elements to load
        if (!nextNode) return true;

        // if right node is not finished
        if (!nextNode.data.isFinished) return false;

        // if there were no changes
        if (nextNode.data.total === node.data.total) return false;

        // if next node has sub items of our node
        if (node.data.hasIdsIntersections(nextNode.data)) return false;

        return shouldInsertAfter(nextNode);
    };

    const createTask = ({ page, insertAfterIndex } = {}) => {
        const nodeValue = new NodeValue(page);
        let node = null;
        if (!insertAfterIndex) node = requests.add(nodeValue);
        else node = requests.insertAfter(nodeValue, insertAfterIndex);

        queue.push({ node }, (err) => {
            if (err) return;
            const currentIndex = requests.indexOfData(nodeValue);
            if (shouldInsertAfter(node)) {
                createTask({
                    page: page + 1,
                    insertAfterIndex: currentIndex,
                });
            }
        });
    };

    await dataProvider.authorize();

    for (let i = 1; i <= maxParallelRequests; i += 1) {
        createTask({ page: i });
    }
};

const dataLoader = (
    dataProvider,
    options = {},
) => {
    let isFetched = false;
    let requests = null;

    const fetchData = async () => new Promise((resolve, reject) => {
        /** to refresh data after secont call fetchData function */
        requests = new DoublyLinkedList();
        const {
            queue,
        } = loadingQueue({
            options,
            dataProvider,
        });

        queue.error((err) => {
            reject(err);
        });

        queue.drain(() => {
            isFetched = true;
            resolve();
        });

        startLoading({
            queue,
            requests,
            options,
            dataProvider,
        }).catch(reject);
    });

    const getData = () => {
        if (!isFetched) throw Error('Call "fetchData" before');

        const normalized = [];
        const ids = new Set();
        let node = requests.head();
        while (node) {
            const {
                data,
            } = node.data;
            for (let i = 0; i < data.length; i += 1) {
                const el = data[i];
                if (!ids.has(el.id)) {
                    ids.add(el.id);
                    normalized.push(el);
                }
            }
            node = node.next;
        }
        return normalized;
    };

    return {
        fetchData,
        getData,
    };
};


module.exports = dataLoader;
