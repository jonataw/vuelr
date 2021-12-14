/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');

require('./post-build/scss');
require('./post-build/web-types');
require('./post-build/hack-add-pure');

console.log(chalk.greenBright.bold('✔️  Vuelr built!'));
