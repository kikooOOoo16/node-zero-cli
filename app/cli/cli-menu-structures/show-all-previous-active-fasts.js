const MenuElement = require('../../data/models/cli-menu-element');
const DataServiceSingleton = require('../../data/data-service');
const {formatDatetimeString} = require('../datetime-helper');
const chalk = require('chalk');


// Get singleton instance
const dataService = new DataServiceSingleton().instance;

module.exports = class AllPreviousFastsMenu {
    _menu = [];

    constructor() {
        // get all previous fasts data
        const allPreviousFasts = dataService.getAllFastSessions();

        if (allPreviousFasts && allPreviousFasts.length > 0) {
            for (let i = 0; i < allPreviousFasts.length; i++) {
                this._menu[( i * 7)] = new MenuElement('', chalk.magenta('--------------------------'));
                this._menu[1+ ( i * 7)] = new MenuElement('Status', allPreviousFasts[i]._status);
                this._menu[2 + (i * 7)] = new MenuElement('Started', formatDatetimeString(allPreviousFasts[i]._started));
                this._menu[3 + (i * 7)] = new MenuElement('Ended', formatDatetimeString(allPreviousFasts[i]._ending));
                this._menu[4 + (i * 7)] = new MenuElement('Type', `${allPreviousFasts[i]._type}h`);
                this._menu[5 + (i * 7)] = new MenuElement('Time fasted', allPreviousFasts[i]._elapsedTime);
                this._menu[6 + (i * 7)] = new MenuElement('', chalk.magenta('--------------------------'));
            }
        } else {
            this._menu[0] = new MenuElement('', chalk.magenta('\nThere are no previously saved fast sessions.\n'));
        }
    }

    get menu() {
        return this._menu;
    }
};