// Parse Initial datetime string input from user when configuring (create/update) a fast
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

// calculate elapsed time for current fast into
const calculateElapsedTime = (startedFast, returnInUni) => {
    // set return uni to optional parameter
    returnInUni = returnInUni || 0;
    // get unix  date timestamp from fast start datetime
    const startedDateTimeUnix = Date.parse(startedFast);

    // add the two timestamps to calculate end date
    const elapsedTimeUnix = Date.now() - startedDateTimeUnix;

    // check to see if fast has started yet if it hasn't return 0
    if (elapsedTimeUnix < 0) {
        return 0;
    }
    // if return uni is set to true return the elapsed time in unix timestamp format
    if (returnInUni) {
        // if less than 0 fast hasn't started yet
        return elapsedTimeUnix < 0 ? 0 : elapsedTimeUnix;
    }

    // convert the unix timestamp to HH:MM:SS format and return
    let seconds = Math.floor((elapsedTimeUnix / 1000) % 60),
        minutes = Math.floor((elapsedTimeUnix / (1000 * 60)) % 60),
        hours = Math.floor((elapsedTimeUnix / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return (`${hours}:${minutes}:${seconds}`);
};

calculateFastEndDateTime = (startDateTime, type) => {
    // Convert hours from fast type to unix timestamp
    const hoursToAdd = type*60*60*1000;
    // get unix  date timestamp from start date
    const dateTimeUnix = Date.parse(startDateTime);
    // add the two timestamps to calculate end date
    const endDateTime = dateTimeUnix + hoursToAdd;
    // convert to JS datetime object and return
    return new Date(endDateTime);
};

checkIfFastIsCompleted = (endDateTime) => {
    // get unix  date timestamp from end date
    const endDateTimeUnix = Date.parse(endDateTime);
    // check if end datetime is in the past
    return endDateTimeUnix < Date.now();
};

// format js datetime string into proper format for menus
const formatDatetimeString = (dateTime) => {
    const parsedDateTime = new Date(dateTime);
    return (`${parsedDateTime.toLocaleDateString('en-GB')} ${parsedDateTime.toLocaleTimeString('en-GB')}`);
};

module.exports = {parseFastStartDate, formatDatetimeString, calculateElapsedTime, calculateFastEndDateTime, checkIfFastIsCompleted};