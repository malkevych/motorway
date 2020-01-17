const isToday = require('~utils/isToday');

module.exports = ({ date }) => {
    return !isToday(date);
};
