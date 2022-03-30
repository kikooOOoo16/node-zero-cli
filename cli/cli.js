const activeFastMainMenu = require('./cli-components/main-menu-fast-component');
const noActiveFastMainMenu = require('./cli-components/main-menu-nofast-component');


class CliUi {

    constructor() {
        // readline instance and menu helper variable for swapping readline instances
        this.readline = require('readline');
        // supposed to be uninitialized
        this.menu;
    }

    startUi = () => {
        // Start witch CLI Main Menu logic if there is an active fast session
        activeFastMainMenu(this.readline, this.menu);
    }

    switchUiToNoActiveMainMenu = () => {
        noActiveFastMainMenu(this.readline, this.menu);
    }

}

module.exports = class CliSingleton {

    constructor() {
        if (!CliSingleton._instance) {
            CliSingleton._instance = new CliUi();
        }
    }

    get instance() {
        return CliSingleton._instance;
    }
}
