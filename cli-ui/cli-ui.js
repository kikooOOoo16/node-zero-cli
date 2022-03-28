const CliMenuFactory = require('./cli-menu-factory');
const dataService = require('../data/data-service');
const Fast = require('../data/fast');


let readline = require('readline');
let menu;

const buildMenu = (type) => {
    let cliMenu = CliMenuFactory(type);
    for (let i = 0; i < cliMenu.length; i++) {
        console.log(`${cliMenu[i].number === '' ? cliMenu[i].number : cliMenu[i].number + ':'} ${cliMenu[i].text}`);
    }
}

// CLI Menu if there is an active fast session
const showMainIfActiveFast = () => {
    // Clear screen
    // process.stdout.write('\033c');

    // Get fast data from JSON
    const userData = dataService.userData;
    const {_status, _started, _ending, _type} = userData.currentFast;
    const fastData = new Fast(_status, _started, _ending, _type);

    if (!fastData.status) {
        showMainIfNoActiveFast();
        return;
    }

    // Log the menu
    buildMenu('ACTIVE_FAST');

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    //Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // Ask question
    menu.question('Please select an option: ', input => {
        switch(input) {
            case '1':
                // Call to JSON singleton for fast status
                buildMenu('CURRENT_FAST');
                showMainIfActiveFast();
                break;
            case '2':
                dataService.endCurrentFast();
                // Show inactive fast menu
                showMainIfNoActiveFast();
                break;
            case '3':
                configureFastSession();
                break;
            case '4':
                console.log('\n');
                buildMenu('ALL_PREVIOUS_FASTS');
                showMainIfActiveFast();
                break;
            case 'q':
                process.exit();
                break;
            default:
                console.log('\nInvalid option, try again.\n');
                showMainIfActiveFast(); /* show menu again if input does not match */
        }
    });
}

// CLI For main menu if there is no active fast
const showMainIfNoActiveFast = () => {
    // Clear screen
    // process.stdout.write('\033c');

    // Log the menu
    buildMenu('NO_ACTIVE_FAST');

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // Ask question
    menu.question('Please select an option: ', input => {
        switch(input) {
            case '1':
                // Call to JSON singleton for fast status
                console.log(`\nThere is no active fast session.\n`);
                showMainIfNoActiveFast();
                break;
            case '2':
                configureFastSession();
                break;
            case '3':
                console.log('\n');
                buildMenu('ALL_PREVIOUS_FASTS');
                showMainIfNoActiveFast();
                break;
            case 'q':
                process.exit();
                break;
            default:
                console.log('\nInvalid option, try again.\n');
                showMainIfNoActiveFast();
            /* show menu again if input does not match */
        }
    });
}

// CLI Menu for new and update fast
const configureFastSession = async () => {
    // Clear screen
    process.stdout.write('\033c');

    buildMenu('FAST_TYPE_OPTIONS');

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // Ask question
    new Promise(resolve => {
        menu.question('Select to which type you want to update your current fast? \n', input => {
            switch(input) {
                case '1':
                    console.log('You updated your fast to a 13 hour type.');
                    showMainIfActiveFast();
                    break;
                case '2':
                    console.log('You updated your fast to a 16 hour type.');
                    showMainIfActiveFast();
                    break;
                case '3':
                    console.log('You updated your fast to a 18 hour type.');
                    showMainIfActiveFast();
                    break;
                case '4':
                    console.log('You updated your fast to a 20 hour type.');
                    showMainIfActiveFast();
                    break;
                case '5':
                    console.log('You updated your fast to a 36 hour type.');
                    showMainIfActiveFast();
                    break;
                case '6':
                    resolve();
                    break;
                default: console.log('\nPlease select a valid option.\n') /* show menu again if input does not match */;
            }
        });
    }).then(() => showMainIfActiveFast());
}

module.exports = {showMainIfActiveFast, showMainIfNoActiveFast, configureFastSession}