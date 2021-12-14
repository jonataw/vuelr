/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs-extra');

const dir = path.join(__dirname, '..', '..', 'src', 'components');
const dist = path.join(__dirname, '..', '..', 'dist');

const kebabify = (str) =>
  str.replace(/[A-Z]/g, (letter, index) => {
    return index == 0 ? letter.toLowerCase() : '-' + letter.toLowerCase();
  });

function findFiles(dir) {
  const metas = [];

  const find = (dir) => {
    fs.readdirSync(dir).forEach((filename) => {
      const abPath = path.join(dir, filename);
      if (fs.statSync(abPath).isDirectory()) {
        return find(abPath);
      } else {
        if (filename === 'meta.json') {
          metas.push(require(abPath));
        }
      }
    });
  };

  find(dir);
  return metas;
}

/**
 * Creates vetur-tags.json.
 *
 * "<component-name>": {
 *   "description": "<description>",
 *   "attributes": [
 *     "<prop-1>",
 *     "<prop-2>"
 *   ]
 * }
 *
 * @param metas
 */
function createVeturTags(metas) {
  const filename = 'vetur-tags.json';
  const tags = {};
  metas.forEach(({ name, description, props }) => {
    const obj = {
      description: description,
      attributes: props.map(({ name }) => name),
    };
    tags[name] = obj;
    tags[kebabify(name)] = obj; // Lowercase component alias.
  });

  fs.writeFileSync(`${dist}/${filename}`, JSON.stringify(tags, null, 2));
}

fs.writeFileSync(`${dist}/web-types.json`, '{}');
fs.writeFileSync(`${dist}/web-attributes.json`, '{}');

const metas = findFiles(dir);
createVeturTags(metas);
