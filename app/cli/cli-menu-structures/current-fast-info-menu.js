const MenuElement = require('../../data/models/cli-menu-element');
const DataServiceSingleton = require('../../data/data-service');
const {formatDatetimeString, calculateElapsedTime} = require('../datetime-helper');
const chalk = require('chalk');


// Get singleton instance
const dataService = new DataServiceSingleton().instance;

module.exports = class CurrentFastMenu {
    _menu = [];

    constructor() {
        // Get Current Fast Data
        const currentFast = dataService.userCurrentFast;

        this._menu[0] = new MenuElement('', chalk.magenta('\nCurrent fast info'));
        this._menu[1] = new MenuElement('', chalk.magenta('-----------------'));
        this._menu[2] = new MenuElement('Status', currentFast.status);
        this._menu[3] = new MenuElement('Started', formatDatetimeString(currentFast.started));
        this._menu[4] = new MenuElement('Ending', formatDatetimeString(currentFast.ending));
        this._menu[5] = new MenuElement('Elapsed Time', `${calculateElapsedTime(currentFast.started)}`);
        this._menu[6] = new MenuElement('Fast type', `${currentFast.type}h \n`);
    }

    get menu() {
        return this._menu;
    }
};