module.exports = {
  // date formatting, mm/dd/yyyy
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  // pluralize words when number is more than 1
  format_plural: (word, count) => {
    if (count === 1) {
      return `${word}`;
    } else {
      return `${word}s`;
    }
  },
};
