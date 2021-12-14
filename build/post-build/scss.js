/* eslint-disable @typescript-eslint/no-var-requires */
const fse = require('fs-extra');

fse.mkdirp('dist/theme');

fse.copy('src/theme', 'dist/theme');

fse.copy('src/components', 'dist/components', {
  filter: (n) => {
    // Always copy directories.
    if (fse.lstatSync(n).isDirectory()) {
      return true;
    }
    // Copy all files ending with '.scss'.
    return /.*(.scss)$/.test(n);
  }
});
