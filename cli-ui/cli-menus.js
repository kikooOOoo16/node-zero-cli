const MenuElement = require('./cli-menu-element');
const dataService = require('../data/data-service');

class InactiveFastMenu {
    _menu = [];

    constructor() {
        this._menu[0] = new MenuElement(1, 'Check the fast status.');
        this._menu[1] = new MenuElement(2, 'Start a fast.');
        this._menu[2] = new MenuElement(3, 'List all fasts.');
        this._menu[3] = new MenuElement('q', 'Quit.');
    }

    get menu() {
        return this._menu;
    }
}

class ActiveFastMenu {
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

class CurrentFastMenu {
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

class NoCurrentFastMenu {
    _menu = [];

    constructor() {
        this._menu[0] = new MenuElement('', 'You have no active fast.');
        this._menu[1] = new MenuElement('', '------------------------');
    }

    get menu() {
        return this._menu;
    }
}

class FastTypeOptionsMenu {
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

class AllPreviousFastsMenu {
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

module.exports = {ActiveFastMenu, InactiveFastMenu, CurrentFastMenu, NoCurrentFastMenu, FastTypeOptionsMenu, AllPreviousFastsMenu}