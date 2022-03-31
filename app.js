const CliSingleton = require('./cli/cli');
const chalk = require('chalk');

const cliInstance = new CliSingleton().instance;

console.log(chalk.rgb(147,96,176)(`
-----------------------------------    
Welcome to the Zero fasting CLI app 
___________________________________
`));

//Start the CLI
cliInstance.startUi();
