const ActiveFastMainMenu = require('./cli-menus/active-fast-menu');
const InactiveFastMainMenu = require('./cli-menus/inactive-fast-menu');
const CurrentFastInfoMenu = require('./cli-menus/current-fast-info-menu');
const NoCurrentActiveFastMenu = require('./cli-menus/no-current-active-fast-menu');
const FastTypeOptionsMenu = require('./cli-menus/fast-types-options-menu');
const AllPreviousFastsInfoMenu = require('./cli-menus/show-all-previous-active-fasts');

module.exports = CliMenuFactory = (type) => {
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

