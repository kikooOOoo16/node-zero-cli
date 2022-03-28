// The DataServiceSingleton is cached after the first use because of module caching making this a Singleton
const Fast = require('./fast');

const { readFileSync, writeFileSync } = require('fs');

class DataServiceSingleton {
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

}

module.exports = new DataServiceSingleton();