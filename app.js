const { showMainIfActiveFast } = require('./cli-ui/cli-ui');

console.log(`
-----------------------------------    
Welcome to the Zero fasting CLI app 
___________________________________
`);

//Start active fast main menu initially
showMainIfActiveFast();

// const inputDateTime = '22 Jan 22:00'
//
// const parseFastStartDate = (dateTimeString) => {
//     // get current year
//     const currentYear = (new Date()).getFullYear();
//
//     // parse input string to valid datetime format
//     dateTimeString = dateTimeString.split(' ');
//     dateTimeString
//         .splice(2, 0, currentYear)
//         .join(' ');
//
//     // get unix  date timestamp
//     const dateTime = Date.parse(dateTimeString);
//
//     console.log('\n');
//     console.log(dateTime);
//
//     let hoursToAdd = 6*60*60*1000;
//
//     let addedDateTime = dateTime + hoursToAdd;
//
//     console.log(`Added datetime ${addedDateTime}`);
//     addedDateTime = new Date(addedDateTime);
//
//     console.log(`${addedDateTime.getDate()} ${addedDateTime.getMonth()} ${addedDateTime.getFullYear()} ${addedDateTime.getHours()}:${addedDateTime.getMinutes()}`);
//
//     let parsedDateTime = new Date(dateTime);
//
//     console.log(`${parsedDateTime.getDate()} ${parsedDateTime.getMonth()} ${parsedDateTime.getFullYear()} ${parsedDateTime.getHours()}:${parsedDateTime.getMinutes()}`);
//
//     return new Date(dateTime);
//     // return format is the following 2022-03-22T12:00:00.000Z
// };

// parseFastStartDate(inputDateTime);