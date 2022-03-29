const MenuElement = require('../cli-menu-element');
const DataServiceSingleton = require('../../data/data-service');

// Get singleton instance
const dataService = new DataServiceSingleton().instance;

module.exports = class CurrentFastMenu {
    _menu = [];

    constructor() {
        // Get Current Fast Data
        const currentFast = dataService.userCurrentFast;

        this._menu[0] = new MenuElement('', `Current fast info`);
        this._menu[1] = new MenuElement('', '-----------------');
        this._menu[2] = new MenuElement('Status', currentFast.status);
        this._menu[3] = new MenuElement('Started', currentFast.started);
        this._menu[4] = new MenuElement('Ending', currentFast.ending);
        this._menu[5] = new MenuElement('Elapsed Time', '13:00');
        this._menu[5] = new MenuElement('Fast type', currentFast.type + '\n');
    }

    get menu() {
        return this._menu;
    }
}