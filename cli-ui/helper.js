const parseFastStartDate = (dateTimeString) => {
    // get current year
    const currentYear = (new Date()).getFullYear();

    // parse input string to valid datetime format
    dateTimeString = dateTimeString.split(' ');
    dateTimeString
        .splice(2, 0, currentYear)
        .join(' ');

    // get unix  date timestamp
    const dateTime = Date.parse(dateTimeString);

    // return format is the following 2022-03-22T12:00:00.000Z
    return new Date(dateTime);
};

module.exports = parseFastStartDate;