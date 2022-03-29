const Fast = require('./fast');

const { readFileSync, writeFileSync } = require('fs');

class DataService {
    _userData;
    _userCurrentFast;
    constructor() {
        try {
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
            console.log(`There was a problem reading the JSON file. ${e}`);
            process.exit();
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
    configureFast(fastStartDateTime, fastType) {
        // calculate fast end datetime
        const fastEndDateTime = this.calculateFastEndDateTime(fastStartDateTime, fastType);

        let newFastObj = new Fast(true, fastStartDateTime, fastEndDateTime, fastType);
        let newState = {
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

        console.log(`Successfully configured the fast.\n`);
    }

    endCurrentFast() {
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
        console.log(`\nFast ended successfully.\n`);
    }

    saveDataToJSON = (userState) => {
        try {
            writeFileSync('./data/data.json', JSON.stringify(userState), 'utf8');
        } catch (error) {
            console.log(`There was an error while writing to the JSON file. ${error}`);
            process.exit();
        }
    }

    calculateFastEndDateTime = (startDateTime, type) => {
        // Convert hours from fast type to unix timestamp
        let hoursToAdd = type*60*60*1000;
        // get unix  date timestamp from start date
        const dateTime = Date.parse(startDateTime);
        // add the two timestamps to calculate end date
        let endDateTime = dateTime + hoursToAdd;
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
