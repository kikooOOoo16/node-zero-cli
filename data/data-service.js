const { readFileSync, writeFileSync } = require('fs');
const { calculateElapsedTime, calculateFastEndDateTime, checkIfFastIsCompleted } = require('../cli/datetime-helper');
// const CliSingleton = require('../cli/cli');
const Fast = require('./models/fast');
const chalk = require('chalk');

// Throws TypeError: CliSingleton is not a constructor - no matter if it's in the DataService Constructor or in the DataServiceSingleton bellow.
// const cliInstance = new CliSingleton().instance;

class DataService {
    _fastExpirationTimer;
    _userData;
    _userCurrentFast;

    constructor() {
        try {
            this.loadDataFromJSON();
        } catch (e) {
            // catch error if no data.json file was found and read failed
            console.log(chalk.red(`\nThere was a problem reading the JSON file. ${e}`));
            console.log(chalk.red('Attempting to create a new JSON file...'));
            // create empty object that represents the app's state
            const emptyUserState = {
                userData :{
                    allFastSessions: [],
                    currentFast: {}
                }
            };
            // create new json file with empty state
            this.saveDataToJSON(emptyUserState);
            // attempt to read data and create initial _userData state
            this.loadDataFromJSON();
        }
    }

    get userData() {
        return this._userData;
    }

    get userCurrentFast() {
        return this._userCurrentFast;
    }

    getAllFastSessions() {
        // check if allFastSessions exist
        if (this._userData.allFastSessions) {
            return this._userData.allFastSessions;
        }
        return [];
    }

    // Update or Create Fast
    configureFast = (fastStartDateTime, fastType) => {
        // calculate fast end datetime
        const fastEndDateTime = calculateFastEndDateTime(fastStartDateTime, fastType);

        // check if the end date of the entered fast is in the past and return if it is
        if (checkIfFastIsCompleted(fastEndDateTime)) {
            return console.error(chalk.red(`\nThe end date for the fast has already passed. Change the start date to a more recent date.\n`));
        }

        // create new fast and app state objects
        const newFastObj = new Fast(true, fastStartDateTime, fastEndDateTime, fastType);
        const newState = {
            userData: {
                ...this._userData,
                currentFast: {
                    ...newFastObj
                }
            }
        };
        // Save the new state to the JSON file
        this.saveDataToJSON(newState);

        // Set local user data state to the new state
        this._userData = newState.userData;
        this._userCurrentFast = newFastObj;

        // Set auto end fast when end datetime is reached
        this.setFastExpirationTimer(fastType, fastStartDateTime);

        console.log(chalk.rgb(147,96,176)('Successfully configured the fast.\n'));
    };

    endCurrentFast = (skipCalculateElapsedTime) => {
        let newFastObj;
        let newAllFastSessions;

        // Set skipCalculateElapsedTime as optional param
        skipCalculateElapsedTime = skipCalculateElapsedTime || 0;

        // Create new Fast instance with the updated data immutably, set the elapsedTime to the maximum possible time
        newFastObj = {
            ...this._userCurrentFast,
            _status: false,
            _elapsedTime: `${this._userCurrentFast.type}:00:00`
        };

        // calculate the elapsed time for the fast if needed and save it to the newFastObj
        if (!skipCalculateElapsedTime) {
            newFastObj._elapsedTime = calculateElapsedTime(newFastObj._started);
        }

        // Update all fast sessions array
        if (this._userData.allFastSessions && this._userData.allFastSessions.length > 0) {
            newAllFastSessions = [...this._userData.allFastSessions, newFastObj];
        } else {
            newAllFastSessions = [newFastObj];
        }

        // get old state and replace changes
        let newState = {
            userData: {
                ...this._userData,
                allFastSessions: newAllFastSessions,
                currentFast: {
                    ...newFastObj
                }
            }
        };
        // Save the new state to the JSON file
        this.saveDataToJSON(newState);

        // Set local user data state to the new state
        this._userData = newState.userData;
        this._userCurrentFast = newFastObj;

        // Clear the _fastExpirationTimer;
        this.clearFastExpirationTimer();

        // Notify user of changes
        console.log(chalk.rgb(147,96,176)('\nFast ended successfully.\n'));

        // update UI through CLI Singleton Instance

        cliInstance.switchUiToNoActiveMainMenu();
    };

    loadDataFromJSON = () => {
        // attempt to read data from data.json file
        const data = readFileSync('./data/data.json');
        this._userData = (JSON.parse(data.toString())).userData;

        if (this._userData.currentFast) {
            this._userCurrentFast =
                new Fast(
                    this._userData.currentFast._status,
                    this._userData.currentFast._started,
                    this._userData.currentFast._ending,
                    this._userData.currentFast._type
                );
        }
    }

    saveDataToJSON = (userState) => {
        try {
            writeFileSync('./data/data.json', JSON.stringify(userState), 'utf8');
        } catch (error) {
            console.log(chalk.red(`There was an error while writing to the JSON file. ${error}`));
            process.exit();
        }
    };

    setFastExpirationTimer = (fastType, fastStartDateTime) => {
        // used as param for calculateElapsedTime helper function
        const fastTimeJSDateObj = fastStartDateTime;
        // convert fastType hours into ms
        let msFromHours = fastType * 60 * 60 * 1000;
        // get unix  date timestamp from fast start datetime
        const fastStartDateTimeUnix = Date.parse(fastStartDateTime);

        // if fastStartDateTime > date.now() subtract and add the elapsed time to the msFromHours value
        if (fastStartDateTimeUnix > Date.now()) {
            msFromHours += fastStartDateTimeUnix - Date.now();
        } else // if fastStartTime is grater than date.now the fast has already started
        if (fastStartDateTimeUnix < Date.now()) {
            const elapsedTime = calculateElapsedTime(fastTimeJSDateObj, true);
            // subtract the elapsed time from the fastType hours calculated time
            msFromHours -= elapsedTime;
        }

        // Clear previous expiration timer if it exists
        this.clearFastExpirationTimer();
        // set fast expiration timer
        this._fastExpirationTimer = setTimeout(() => {
            // end current fast
            this.endCurrentFast();
        }, msFromHours);
    };

    // Clear the fast expiration timer if user ends fast or fast time expires
    clearFastExpirationTimer = () => {
        // check if fastExpirationTimer exists
        if (this._fastExpirationTimer) {
            clearTimeout(this._fastExpirationTimer);
        }
    };
}

module.exports = class DataServiceSingleton {

    constructor() {
        if (!DataServiceSingleton._instance) {
            DataServiceSingleton._instance = new DataService();
        }
    }

    get instance() {
        return DataServiceSingleton._instance;
    }
};
