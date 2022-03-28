const MenuElement = require('../cli-menu-element');

module.exports = class NoCurrentFastMenu {
    _menu = [];

    constructor() {
        this._menu[0] = new MenuElement('', 'You have no active fast.');
        this._menu[1] = new MenuElement('', '------------------------');
    }

    get menu() {
        return this._menu;
    }
}