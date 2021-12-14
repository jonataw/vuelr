const fs = require('fs');
const path = require('path');

/**
 * @see https://github.com/vuejs/vue-next/issues/2860
 */

const file = path.resolve(__dirname, '..', '..', 'dist', 'vuelr.es.js');

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(
    /defineComponent\({/g,
    '/* @__PURE__ */ defineComponent({'
  );

  fs.writeFile(file, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
