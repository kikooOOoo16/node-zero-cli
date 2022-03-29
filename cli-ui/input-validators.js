const validateDatetimeFormat = (datetime) => {
    const monthsWith31Days = ['january', 'march', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthsWith30Days = ['april', 'june', 'september', 'november'];

    // get current year
    const currentYear = (new Date()).getFullYear();

    // check if current year is leap year
    const isCurrentYearLeapYear = (currentYear % 100 === 0) ? (currentYear % 400 === 0) : (currentYear % 4 === 0);

    // split datetime string into individual parts
    const valuesArr = datetime.split(' ');

    // check if all input data is present
    if (valuesArr.length !== 3) {
        console.error('Please insert all of the required data.')
        return false;
    }

    // separate time hours and minutes
    const timeValues = valuesArr[2].split(':');

    if (timeValues.length !== 2) {
        console.error('Incorrect time format, the correct time format is HH:MM.');
        return false;
    }

    // check if time values are correct
    if (timeValues[0] < 1 || timeValues[0] > 23 || timeValues[1] < 0 || timeValues[1] > 59) {
        console.error('Incorrect time format, the minutes or hour values are out of reach.');
        return false;
    }

    // check if month value is correct
    if (monthsWith31Days.indexOf(valuesArr[1].toLowerCase()) === -1 && monthsWith30Days.indexOf(valuesArr[1].toLowerCase()) === -1 && valuesArr[1].toLowerCase() !== 'february') {
        console.error('Incorrect month input, please enter the full name of the month.')
        return false;
    }

    // check if date is accurate for selected month
    if (valuesArr[0] > 1 && valuesArr[0] <= 31 &&  monthsWith31Days.indexOf(valuesArr[1].toLowerCase()) !== -1) {
        return true;
    } else if (valuesArr[0] >= 1 && valuesArr[0] <= 30 &&  monthsWith30Days.indexOf(valuesArr[1].toLowerCase()) !== -1) {
        return true;
    } else if ((valuesArr[0] >= 1 && valuesArr[0] <= 29) && isCurrentYearLeapYear) {
        return true;
    } else if ((valuesArr[0] >= 1 && valuesArr[0] <= 28) && !isCurrentYearLeapYear) {
        return true;
    } else {
        console.error('Incorrect date input for the selected month.');
        return false;
    }
}

module.exports = { validateDatetimeFormat }