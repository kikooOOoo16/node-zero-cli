const MenuElement = require('../cli-menu-element');
const DataServiceSingleton = require('../../data/data-service');
const chalk = require('chalk');


// Get singleton instance
const dataService = new DataServiceSingleton().instance;

module.exports = class CurrentFastMenu {
    _menu = [];

    constructor() {
        // Get Current Fast Data
        const currentFast = dataService.userCurrentFast;

        this._menu[0] = new MenuElement('', chalk.magenta.bold(`\nCurrent fast info`));
        this._menu[1] = new MenuElement('', chalk.magenta.bold('-----------------'));
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
        // get unix  date timestamp from fast start datetime
        const startedDateTimeUnix = Date.parse(startedFast);
        // add the two timestamps to calculate end date
        const elapsedTimeUnix = Date.now() - startedDateTimeUnix;

        // check to see if fast has started yet if it hasn't return 0
        if (elapsedTimeUnix < 0) {
            return 0;
        }

        // convert to unix timestamp to HH:MM:SS format and return
        let seconds = Math.floor((elapsedTimeUnix / 1000) % 60),
            minutes = Math.floor((elapsedTimeUnix / (1000 * 60)) % 60),
            hours = Math.floor((elapsedTimeUnix / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        return (`${hours}:${minutes}:${seconds}`);
    }

    get menu() {
        return this._menu;
    }
}