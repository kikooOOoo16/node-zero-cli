const MenuElement = require('../cli-menu-element');
const DataServiceSingleton = require('../../data/data-service');

// Get singleton instance
const dataService = new DataServiceSingleton().instance;

module.exports = class CurrentFastMenu {
    _menu = [];

    constructor() {
        // Get Current Fast Data
        const currentFast = dataService.userCurrentFast;

        this._menu[0] = new MenuElement('', `\nCurrent fast info`);
        this._menu[1] = new MenuElement('', '-----------------');
        this._menu[2] = new MenuElement('Status', currentFast.status);
        this._menu[3] = new MenuElement('Started', this.formatDatetimeString(currentFast.started));
        this._menu[4] = new MenuElement('Ending', this.formatDatetimeString(currentFast.ending));
        this._menu[5] = new MenuElement('Elapsed Time', `${this.calculateElapsedTime(currentFast.started)}`);
        this._menu[6] = new MenuElement('Fast type', `${currentFast.type}h \n`);
    }

    formatDatetimeString = (dateTime) => {
        const parsedDateTime = new Date(dateTime);
        return (`${parsedDateTime.toLocaleDateString('en-GB')} ${parsedDateTime.toLocaleTimeString('en-GB')}`);
    }

    calculateElapsedTime = (startedFast) => {
        // get unix  date timestamp from start and end date
        const startedDateTimeUnix = Date.parse(startedFast);
        // add the two timestamps to calculate end date
        let elapsedTimeUnix = Date.now() - (startedDateTimeUnix + 60*60*1000); // add an hour to start date

        // check to see if fast has started yet if it hasn't return 0
        if (elapsedTimeUnix < 0) {
            return 0;
        }

        // convert to JS datetime object and return correct string
        const elapsedTimeDateTime = new Date(elapsedTimeUnix);

        return (`${elapsedTimeDateTime.toLocaleTimeString('en-GB')}`);
    }

    get menu() {
        return this._menu;
    }
}