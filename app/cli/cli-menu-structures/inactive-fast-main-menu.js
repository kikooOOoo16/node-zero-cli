const MenuElement = require('../../data/models/cli-menu-element');

module.exports = class InactiveFastMenu {
    _menu = [];

    constructor() {
        this._menu[0] = new MenuElement(1, 'Check current fast.');
        this._menu[1] = new MenuElement(2, 'Start a new fast.');
        this._menu[2] = new MenuElement(3, 'List all previous fasts.');
        this._menu[3] = new MenuElement('q', 'Quit.');
    }

    get menu() {
        return this._menu;
    }
};