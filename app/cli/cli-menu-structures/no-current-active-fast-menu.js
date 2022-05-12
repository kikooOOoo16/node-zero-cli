const MenuElement = require('../../data/models/cli-menu-element');

module.exports = class NoCurrentFastMenu {
    _menu = [];

    constructor() {
        this._menu[0] = new MenuElement('', 'You currently have no active fast.');
        this._menu[1] = new MenuElement('', '----------------------------------');
    }

    get menu() {
        return this._menu;
    }
};