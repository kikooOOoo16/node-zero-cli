const DataServiceSingleton = require('../../data/data-service');
const validateDatetimeFormat = require('../cli-input-validators');
const {parseFastStartDate} = require('../datetime-helper');
const buildMenu = require('../cli-menu-factory');
const chalk = require('chalk');

// CLI submenu for new and update fast
const configureFastSession = async (readline, menu) => {
    // Get mainIfActive instance inside async because of scope
    const showMainIfActiveFast = require('./main-menu-fast-component');
    // Get Singleton instance
    const dataService = new DataServiceSingleton().instance;

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
            menu.question(chalk.magenta('Enter the starting date and time for your fast (Example: 22 March 13:00):'), input => {
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
            menu.question(chalk.magenta('Select your fast type: \n'), input => {
                switch(input) {
                    case '1':
                        console.log(chalk.magenta('You selected a 13 hours fast type.'));
                        resolve('13');
                        break;
                    case '2':
                        console.log(chalk.magenta('You selected a 16 hours fast type..'));
                        resolve('16');
                        break;
                    case '3':
                        console.log(chalk.magenta('You selected an 18 hours fast type.'));
                        resolve('18');
                        break;
                    case '4':
                        console.log(chalk.magenta('You selected a 20 hours fast type.'));
                        resolve('20');
                        break;
                    case '5':
                        console.log(chalk.magenta('You selected a 36 hour type.'));
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
    if (inputError) return configureFastSession(readline, menu);

    const fastType = await getFastType()
        .catch(e => {
            if (e) {
                console.error(chalk.red(`${e}`));
                inputError = true;
            }
        });
    // return out of function if input error
    if (inputError) return configureFastSession(readline, menu);

    // Resolve DateTime value
    const parsedFastStartDateTime = parseFastStartDate(fastStartDate);

    // Edit fast data and update state
    dataService.configureFast(parsedFastStartDateTime, fastType);

    // Show active fast main menu
    showMainIfActiveFast(readline, menu);
};

module.exports = configureFastSession;