# Installation

To use Vuelr in your project, run the following command in your project folder:

<SourceCode lang="sh">
```sh
# NPM
npm i vuelr

# Yarn
yarn add vuelr
```
</SourceCode>

Import Vuelr in your Vue entry file:

<SourceCode lang="javascript">
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
</SourceCode>

## Nuxt

Vuelr also works with [Nuxt](https://nuxtjs.org). Import Vuelr by creating a `vuelr.js/ts` file in your [plugins](https://nuxtjs.org/guide/plugins) folder:

<SourceCode lang="javascript">
```JavaScript
import Vue from 'vue';
import Vuelr from 'vuelr';

Vue.use(Vuelr);
```
</SourceCode>

Then add `vuelr` to the plugins list in your `nuxt.config.js`:

<SourceCode lang="javascript">

```JavaScript{3}
export default {
  plugins: [
    '~/plugins/vuelr'
  ]
}
```
</SourceCode>

