const Fast = require('./fast');
const chalk = require('chalk');

const { readFileSync, writeFileSync } = require('fs');

class DataService {
    _userData;
    _userCurrentFast;
    constructor() {
        try {
            // attempt to read data from data.json file
            const data = readFileSync('./data/data.json');
            this._userData =  (JSON.parse(data.toString())).userData;

            this._userCurrentFast =
                new Fast(
                    this._userData.currentFast._status,
                    this._userData.currentFast._started,
                    this._userData.currentFast._ending,
                    this._userData.currentFast._type
                );
        } catch (e) {
            // catch error if no data.json file was found and read failed
            console.log(
                chalk.red
                (`\nThere was a problem reading the JSON file. ${e}`)
            );
            console.log(
                chalk.red
                ('Attempting to create a new JSON file...')
            );
            // create empty object that represents the app's state
            const emptyUserState = {
                userData :{
                    allFastSessions: [],
                    currentFast: {}
                }
            }
            // create new json file with empty state
            this.saveDataToJSON(emptyUserState);
        }
    }

    get userData() {
        return this._userData;
    }

    get userCurrentFast() {
        return this._userCurrentFast;
    }

    getAllFastSessions() {
        return this._userData.allFastSessions;
    }

    // Update or Create Fast
    configureFast = (fastStartDateTime, fastType) => {
        // calculate fast end datetime
        const fastEndDateTime = this.calculateFastEndDateTime(fastStartDateTime, fastType);

        const newFastObj = new Fast(true, fastStartDateTime, fastEndDateTime, fastType);
        const newState = {
            userData: {
                ...this._userData,
                currentFast: {
                    ...newFastObj
                }
            }
        }
        // Save the new state to the JSON file
        this.saveDataToJSON(newState);

        // Set local user data state to the new state
        this._userData = newState.userData;
        this._userCurrentFast = newFastObj;

        console.log(
            chalk.rgb(147,96,176)
            (`Successfully configured the fast.\n`));
    }

    endCurrentFast = () => {
        let newFastObj;
        let newAllFastSessions;

        // Create new Fast instance with the updated data immutably
        newFastObj = {...this._userCurrentFast}
        newFastObj._status = false;

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
        }
        // Save the new state to the JSON file
        this.saveDataToJSON(newState);

        // Set local user data state to the new state
        this._userData = newState.userData;
        this._userCurrentFast = newFastObj;

        // Notify user of changes
        console.log(
            chalk.rgb(147,96,176)
            (`\nFast ended successfully.\n`));
    }

    saveDataToJSON = (userState) => {
        try {
            writeFileSync('./data/data.json', JSON.stringify(userState), 'utf8');
        } catch (error) {
            console.log(
                chalk.red
                (`There was an error while writing to the JSON file. ${error}`));
            process.exit();
        }
    }

    calculateFastEndDateTime = (startDateTime, type) => {
        // Convert hours from fast type to unix timestamp
        const hoursToAdd = type*60*60*1000;
        // get unix  date timestamp from start date
        const dateTime = Date.parse(startDateTime);
        // add the two timestamps to calculate end date
        const endDateTime = dateTime + hoursToAdd;
        // convert to JS datetime object and return
        return new Date(endDateTime);
    }
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
}
