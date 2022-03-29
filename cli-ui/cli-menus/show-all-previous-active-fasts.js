const MenuElement = require('../cli-menu-element');
const DataServiceSingleton = require('../../data/data-service');

// Get singleton instance
const dataService = new DataServiceSingleton().instance;

module.exports = class AllPreviousFastsMenu {
    _menu = [];

    constructor() {
        // get all previous fasts data
        const allPreviousFasts = dataService.getAllFastSessions();

        console.log(`All saved user fasts 
\n -------------------`);

        if (allPreviousFasts && allPreviousFasts.length > 0) {
            for (let i = 0; i < allPreviousFasts.length; i++) {
                this._menu[( i * 5)] = new MenuElement('Status', allPreviousFasts[i]._status);
                this._menu[1 + (i * 5)] = new MenuElement('Started', allPreviousFasts[i]._started);
                this._menu[2 + (i * 5)] = new MenuElement('Ended',allPreviousFasts[i]._ending);
                this._menu[3 + (i * 5)] = new MenuElement('Type',allPreviousFasts[i]._type);
                this._menu[4 + (i * 5)] = new MenuElement('', '--------------------------')
            }
        } else {
            this._menu[0] = new MenuElement('', 'There are no previously saved fast sessions.');
        }
    }

    get menu() {
        return this._menu;
    }
}