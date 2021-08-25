// eslint-disable-next-line @typescript-eslint/no-var-requires
const fse = require('fs-extra');

const distDir = 'dist';
const srcDir = 'src';
const styleDir = 'style';

fse.mkdirp(`${distDir}/${styleDir}`);

fse.copy(`${srcDir}/${styleDir}`, `${distDir}/${styleDir}`);

fse.copy(`${srcDir}/components`, `${distDir}/components`, {
  filter: (n) => {
    // Always copy directories.
    if (fse.lstatSync(n).isDirectory()) {
      return true;
    }
    // Copy all files ending with '.scss'.
    return /.*(.scss)$/.test(n);
  }
});
