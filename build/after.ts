import chalk from 'chalk';
import { appendFileSync, readFileSync, writeFileSync } from 'fs';

console.log(chalk.greenBright.bold('✔️  Vuelr built!'));

// Read file node_modules/vue/dist/vue.esm-bundler as text.
const bundler = readFileSync(
  'node_modules/vue/dist/vue.esm-bundler.js',
  'utf8',
);

// Add vue.esm-bundler content to dist/vuelr.mjs.
appendFileSync('dist/vuelr.mjs', bundler);

// Read file dist/vuelr.mjs as text.
let output = readFileSync('dist/vuelr.mjs', 'utf-8');

// Replace
// import { createApp } from "vue/dist/vue.esm-bundler";
// with
// import { createApp } from '@vue/runtime-dom';
output = output.replace(
  `import { createApp } from "vue/dist/vue.esm-bundler";`,
  `import { createApp } from '@vue/runtime-dom';`,
);

// Write file dist/vuelr.mjs with replaced content.
writeFileSync('dist/vuelr.mjs', output, 'utf-8');
