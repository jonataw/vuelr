import chalk from 'chalk';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

import pkg from '../package.json' assert { type: 'json' };

const { version } = pkg;

console.log(chalk.greenBright.bold('📦 Building Vuelr...'));
console.log(chalk.whiteBright.bold(`Version -> ${version}`));

writeFileSync(resolve('src', 'version.ts'), `export default '${version}';\n`);
