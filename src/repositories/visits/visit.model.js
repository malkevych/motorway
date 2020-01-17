class Visit {
    constructor({
        id,
        name,
        date,
    }) {
        this.id = id;
        this.name = name;
        this.date = new Date(date);
    }
}

module.exports = Visit;
