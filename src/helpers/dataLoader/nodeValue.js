class NodeValue {
    constructor(page, data, total) {
        this.page = page;
        this.data = data;
        this.total = total;
        this.ids = new Set();
    }

    /** Getters */

    get isFinished() {
        return !!this.data;
    }

    /** Methods */

    setResponse(total, data) {
        this.data = data;
        this.total = total;
        data.forEach(({ id }) => {
            this.ids.add(id);
        });
    }

    hasIdsIntersections(nodeValue) {
        const {
            ids,
        } = nodeValue;
        for (let i = 0; i < ids.length; i += 1) {
            if (this.ids.has(ids[i])) {
                return true;
            }
        }
        return false;
    }
}

module.exports = NodeValue;
