const validFastProperties = ['_status', '_started', '_ending', '_type', '_elapsedTime'];
const chalk = require('chalk');

checkIfStateIsValid = (appState) => {
    let checkPassed = true;
    // check if current fast exists and if it does if its a valid Fast object
    if (appState.currentFast && !Object.keys(appState.currentFast).length < 1) {
        if (!checkIfValidFastObj(appState.currentFast)) {
            console.log(chalk.red('\nERROR: Current fast data corrupted.'));
            checkPassed = false;
        }
    }
    // check if allFastSessions array exists and if it does if its fast records are valid Fast objects
    if (appState.allFastSessions && !appState.allFastSessions.length < 1) {
        appState.allFastSessions.forEach(endedFast => {
            if (!checkIfValidFastObj(endedFast)) {
                console.log(chalk.red('ERROR: The Fast session\'s history data is corrupted.'));
                checkPassed = false;
            }
        })
    }
    return checkPassed;
}

const checkIfValidFastObj = (fastInstance) => {
    if (Object.keys(fastInstance).length !== 5) {
        console.log(chalk.red('\nERROR: There are missing properties in some of your fast instances.'))
        return false;
    }
    for (const prop in fastInstance) {
        if (validFastProperties.indexOf(prop) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = checkIfStateIsValid;