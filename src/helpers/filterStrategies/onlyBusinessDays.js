const {
    WEEK_DAYS,
} = require('~config/constants');


module.exports = ({ date }) => {
    const currentDay = date.getDay();
    return !(currentDay === WEEK_DAYS.Sunday || currentDay === WEEK_DAYS.Saturday);
};
