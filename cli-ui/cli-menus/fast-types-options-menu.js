const MenuElement = require('../cli-menu-element');

module.exports = class FastTypeOptionsMenu {
    _menu = [];

    constructor() {
        this._menu[0] = new MenuElement(1, '13 Hour fast');
        this._menu[1] = new MenuElement(2, '16 Hour fast');
        this._menu[2] = new MenuElement(3, '18 Hour fast');
        this._menu[3] = new MenuElement(4, '20 Hour fast');
        this._menu[4] = new MenuElement(5, '36 Hour fast');
        this._menu[5] = new MenuElement(6, 'Go back.');

    }

    get menu() {
        return this._menu;
    }
}