const MenuElement = require('../cli-menu-element');
const dataService = require('../../data/data-service');

module.exports = class AllPreviousFastsMenu {
    _menu = [];

    constructor() {
        // get all previous fasts data
        const allPreviousFasts = dataService.getAllFastSessions();

        if (allPreviousFasts && allPreviousFasts.length > 0) {
            for (let i = 0; i < allPreviousFasts.length; i++) {
                this._menu[( i * 4)] = new MenuElement('Status', allPreviousFasts[i]._status);
                this._menu[1 + (i * 4)] = new MenuElement('Started', allPreviousFasts[i]._started);
                this._menu[2 + (i * 4)] = new MenuElement('Ended',allPreviousFasts[i]._ending);
                this._menu[3 + (i * 4)] = new MenuElement('Type',allPreviousFasts[i]._type);
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