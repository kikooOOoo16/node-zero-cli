const DataServiceSingleton = require('../../data/data-service');
const CliMenuEnums = require('../cli-menu-enums');
const showMainIfNoActiveFast = require('./main-menu-nofast-component');
const showConfigureFastSubMenu = require('./sub-menu-configure-fast');
const buildMenu = require('../cli-menu-factory');
const {checkIfFastIsCompleted} = require('../datetime-helper');
const chalk = require('chalk');

// CLI Main Menu logic if there is an active fast session
const showMainIfActiveFast = (readline, menu) => {

    // Get Singleton instance
    const dataService = new DataServiceSingleton().instance;

    // Get fast data from JSON (userCurrentFast : Fast)
    const fastData = dataService.userCurrentFast;

    // if there is no fast data switch to the no active fast main menu
    if (!fastData || !fastData.status) {
        // pass along readline and menu instance
        showMainIfNoActiveFast(readline, menu);
        return;
    }

    // Check if active fast ended while app was closed
    if (checkIfFastIsCompleted(fastData.ending)) {
        dataService.endCurrentFast(true);
    }

    // call helper method that outputs the correct menu
    buildMenu(CliMenuEnums.ACTIVE_FAST.value);

    // Check if there is already a menu/readline buffer active. If true, close it.
    if(menu) menu.close();

    //Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // Ask question
    menu.question(chalk.magenta('Please select an option: '), input => {
        switch(input) {
            case '1':
                // Call to JSON singleton for fast status
                buildMenu(CliMenuEnums.CURRENT_FAST.value);
                showMainIfActiveFast(readline, menu);
                break;
            case '2':
                dataService.endCurrentFast();
                // Show inactive fast menu
                showMainIfNoActiveFast(readline, menu);
                break;
            case '3':
                //
                showConfigureFastSubMenu(readline, menu);
                break;
            case '4':
                buildMenu(CliMenuEnums.ALL_PREVIOUS_FASTS.value);
                showMainIfActiveFast(readline, menu);
                break;
            case 'q':
                process.exit();
                break;
            default:
                // show menu again if invalid input
                console.error(chalk.red('\nInvalid option, try again.\n'));
                showMainIfActiveFast(readline, menu);
        }
    });
};

module.exports = showMainIfActiveFast;