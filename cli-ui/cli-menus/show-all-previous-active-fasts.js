const MenuElement = require('../cli-menu-element');
const DataServiceSingleton = require('../../data/data-service');

// Get singleton instance
const dataService = new DataServiceSingleton().instance;

module.exports = class AllPreviousFastsMenu {
    _menu = [];

    constructor() {
        // get all previous fasts data
        const allPreviousFasts = dataService.getAllFastSessions();

        if (allPreviousFasts && allPreviousFasts.length > 0) {
            for (let i = 0; i < allPreviousFasts.length; i++) {
                this._menu[( i * 6)] = new MenuElement('', '--------------------------');
                this._menu[1+ ( i * 6)] = new MenuElement('Status', allPreviousFasts[i]._status);
                this._menu[2 + (i * 6)] = new MenuElement('Started', this.formatDatetimeString(allPreviousFasts[i]._started));
                this._menu[3 + (i * 6)] = new MenuElement('Ended', this.formatDatetimeString(allPreviousFasts[i]._ending));
                this._menu[4 + (i * 6)] = new MenuElement('Type', `${allPreviousFasts[i]._type}h`);
                this._menu[5 + (i * 6)] = new MenuElement('', '--------------------------')
            }
        } else {
            this._menu[0] = new MenuElement('', '\nThere are no previously saved fast sessions.\n');
        }
    }

    formatDatetimeString = (dateTime) => {
        const parsedDateTime = new Date(dateTime);
        return (`${parsedDateTime.toLocaleDateString('en-GB')} ${parsedDateTime.toLocaleTimeString('en-GB')}`);
    }

    get menu() {
        return this._menu;
    }
}