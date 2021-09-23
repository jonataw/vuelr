# Vuelr

Vuelr is a component for editing and previewing Vue components or templates in your browser in realtime.

- [Demo](https://jonataw.github.io/vuelr)
- [Documentation](https://jonataw.github.io/vuelr/get-started/installation.html)

## Documentation

Visit the [documentation](https://jonataw.github.io/vuelr).

## Installation

```sh
# NPM
npm i vuelr codemirror

# Yarn
yarn add vuelr codemirror

# CodeMirror is only needed if you use the default editor.
```

Import Vuelr in your Vue entry file:

```JavaScript
import Vue from 'vue';
import Vuelr from 'vuelr';

// CSS is only needed if you use the default editor, preview and error components.
// If you use your own components, omit the CSS.
// CSS:
import 'vuelr/dist/style/vuelr.css';
// Or Sass:
import 'vuelr/dist/style/vuelr.scss';

Vue.use(Vuelr);

new Vue({
  render: h => h(App)
}).$mount('app');
```

## License

[MIT](https://opensource.org/licenses/MIT)
