const { showMainIfActiveFast } = require('./cli-ui/cli-ui');
const chalk = require('chalk');

console.log(chalk.rgb(147,96,176)(`
-----------------------------------    
Welcome to the Zero fasting CLI app 
___________________________________
`));

//Start active fast main menu initially
showMainIfActiveFast();
