const DataServiceSingleton = require('../data/data-service');
const { parseFastStartDate, buildMenu } = require('./helper');
const { validateDatetimeFormat } = require('./input-validators');

// Get Singleton instance
const dataService = new DataServiceSingleton().instance;

const readline = require('readline');
let menu;

// CLI Main Menu logic if there is an active fast session
const showMainIfActiveFast = () => {

    // Get fast data from JSON (userCurrentFast : Fast)
    const fastData = dataService.userCurrentFast;

    if (!fastData || !fastData.status) {
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
                // pass true in order to determine if a fast is edited or a new one is created
                configureFastSession();
                break;
            case '4':
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
};

// CLI Main Menu logic if there is no active fast
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
                console.log('\nThere is no active fast session.\n');
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
};

// CLI Menu for new and update fast
const configureFastSession = async () => {
    // Clear screen
    // process.stdout.write('\033c');

    // helper variable to break out of function if an input error occurs.
    let inputError = false;

    // Check if there is already a menu/readline buffer active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // Prompt user for fast starting date/time
    const getFastDate = () => {
        return new Promise((resolve, reject) => {
            menu.question('Enter the starting date and time for your fast (Example: 22 March 13:00):', input => {
                // validate string input
                if (validateDatetimeFormat(input)) {
                    resolve(input);
                } else {
                    reject();
                }

            });
        });
    };

    // Prompt user for fast type selection
    const getFastType = () => {
        // build the fast types options menu
        buildMenu('FAST_TYPE_OPTIONS');

        return new Promise((resolve, reject) => {
            menu.question('Select your fast type: \n', input => {
                switch(input) {
                    case '1':
                        console.log('You selected a 13 hours fast type.');
                        resolve('13');
                        break;
                    case '2':
                        console.log('You selected a 16 hours fast type..');
                        resolve('16');
                        break;
                    case '3':
                        console.log('You selected a 18 hours fast type.');
                        resolve('18');
                        break;
                    case '4':
                        console.log('You selected a 20 hours fast type.');
                        resolve('20');
                        break;
                    case '5':
                        console.log('You selected a 36 hour type.');
                        resolve('36');
                        break;
                    default:
                        reject('Invalid input. Enter a number from 1 to 5.');
                }
            });
        });
    };

    const fastStartDate = await getFastDate()
        .catch(() => {
            // user input error, update error boolean
            inputError = true
        });
    // return out of function if input error
    if (inputError) return configureFastSession();

    const fastType = await getFastType()
        .catch(e => {
            if (e) {
                console.error(`${e}`);
                inputError = true;
            }
        });
    // return out of function if input error
    if (inputError) return configureFastSession();

    // Resolve DateTime value
    const parsedFastStartDateTime = parseFastStartDate(fastStartDate);

    // Edit fast data and update state
    dataService.configureFast(parsedFastStartDateTime, fastType);

    // Show active fast main menu
    showMainIfActiveFast();
};

module.exports = {showMainIfActiveFast, showMainIfNoActiveFast, configureFastSession};