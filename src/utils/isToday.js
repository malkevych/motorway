module.exports = (anotherDate) => {
    const today = new Date();
    return anotherDate.getDate() === today.getDate()
      && anotherDate.getMonth() === today.getMonth()
      && anotherDate.getFullYear() === today.getFullYear();
};
