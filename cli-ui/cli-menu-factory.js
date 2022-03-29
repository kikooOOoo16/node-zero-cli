const ActiveFastMainMenu = require('./cli-menus/active-fast-main-menu');
const InactiveFastMainMenu = require('./cli-menus/inactive-fast-main-menu');
const CurrentFastInfoMenu = require('./cli-menus/current-fast-info-menu');
const NoCurrentActiveFastMenu = require('./cli-menus/no-current-active-fast-menu');
const FastTypeOptionsMenu = require('./cli-menus/fast-types-options-menu');
const AllPreviousFastsInfoMenu = require('./cli-menus/show-all-previous-active-fasts');

const chalk = require('chalk');

cliMenuFactory = (type) => {
    switch (type) {
        case 'NO_ACTIVE_FAST' :
        {
            return (new InactiveFastMainMenu()).menu;
        }
        case 'ACTIVE_FAST' :
        {
            return (new ActiveFastMainMenu()).menu;
        }
        case 'FAST_TYPE_OPTIONS' :
        {
            return (new FastTypeOptionsMenu()).menu;
        }
        case 'CURRENT_FAST' :
        {
            return (new CurrentFastInfoMenu()).menu;
        }
        case 'NO_CURRENT_FAST':
        {
            return (new NoCurrentActiveFastMenu()).menu;
        }
        case 'ALL_PREVIOUS_FASTS': {
            return (new AllPreviousFastsInfoMenu()).menu;
        }

        default :
            return [];
    }
}

const buildMenu = (type) => {
    let cliMenu = cliMenuFactory(type);
    for (let i = 0; i < cliMenu.length; i++) {
        console.log(
            chalk.rgb(128,107,182)
            (cliMenu[i].number === '' ? cliMenu[i].number : (cliMenu[i].number + ' : ')) + cliMenu[i].text);
    }
}

module.exports = buildMenu;
