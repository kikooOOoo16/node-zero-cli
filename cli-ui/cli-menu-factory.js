const {ActiveFastMenu, InactiveFastMenu, CurrentFastMenu, NoCurrentFastMenu, FastTypeOptionsMenu, AllPreviousFastsMenu} = require('./cli-menus');

module.exports = CliMenuFactory = (type) => {
    switch (type) {
        case 'NO_ACTIVE_FAST' :
        {
            return (new InactiveFastMenu()).menu;
        }
        case 'ACTIVE_FAST' :
        {
            return (new ActiveFastMenu()).menu;
        }
        case 'FAST_TYPE_OPTIONS' :
        {
            return (new FastTypeOptionsMenu()).menu;
        }
        case 'CURRENT_FAST' :
        {
            return (new CurrentFastMenu()).menu;
        }
        case 'NO_CURRENT_FAST':
        {
            return (new NoCurrentFastMenu()).menu;
        }
        case 'ALL_PREVIOUS_FASTS': {
            return (new AllPreviousFastsMenu()).menu;
        }

        default :
            return [];
    }
}

