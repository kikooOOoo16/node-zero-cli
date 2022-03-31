const CliMenuEnums = require('../cli-menu-enums');
const showConfigureFastSubMenu = require('./sub-menu-configure-fast');
const buildMenu = require('../cli-menu-factory');
const chalk = require('chalk');

// CLI Main Menu logic if there is no active fast
const showMainIfNoActiveFast = (readline, menu) => {
    // Log the menu
    buildMenu(CliMenuEnums.NO_ACTIVE_FAST.value);

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
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
                console.log(chalk.magenta('\nThere is no active fast session.\n'));
                showMainIfNoActiveFast(readline, menu);
                break;
            case '2':
                showConfigureFastSubMenu(readline, menu);
                break;
            case '3':
                console.log('\n');
                buildMenu(CliMenuEnums.ALL_PREVIOUS_FASTS.value);
                showMainIfNoActiveFast(readline, menu);
                break;
            case 'q':
                process.exit();
                break;
            default:
                // show menu again if invalid input
                console.error(chalk.red('\nInvalid option, try again.\n'));
                showMainIfNoActiveFast(readline, menu);
        }
    });
};

module.exports = showMainIfNoActiveFast;