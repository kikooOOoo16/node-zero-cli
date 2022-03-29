const MenuElement = require('../cli-menu-element');

module.exports = class ActiveFastMenu {
    _menu = [];

    constructor() {
        this._menu[0] = new MenuElement(1, 'Check the fast status.');
        this._menu[1] = new MenuElement(2, 'End an active fast.');
        this._menu[2] = new MenuElement(3, 'Update an active fast.');
        this._menu[3] = new MenuElement(4, 'List all fasts.');
        this._menu[4] = new MenuElement('q', 'Quit.');

    }

    get menu() {
        return this._menu;
    }
}