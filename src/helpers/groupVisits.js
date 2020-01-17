module.exports = [(acum, curr) => {
    const {
        name,
    } = curr;
    const visits = (acum.get(name) || 0) + 1;
    acum.set(name, visits);
    return acum;
}, new Map()];
