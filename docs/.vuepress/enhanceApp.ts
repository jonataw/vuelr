/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import Vuelr from '../../src/vuelr';
import '../../src/style/vuelr.scss';
import './styles/override.scss';

export default ({
  Vue // the version of Vue being used in the VuePress app
}: // options, // the options for the root Vue instance
// router, // the router instance for the app
// siteData // site metadata
{
  Vue: any;
}) => {
  // ...apply enhancements for the site.
  Vue.use(Vuelr, {
    codemirror: {}
  });
};
