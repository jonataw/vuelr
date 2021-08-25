import VueSnip from '../../utils/instance';
import _Vue from 'vue';
import Vuelr from './vuelr.vue';
import Editor from '../editor';
import Preview from '../preview';
import Error from '../error';

export default (Vue: typeof _Vue): void => {
  VueSnip(Vue);
  Vue.use(Editor);
  Vue.use(Preview);
  Vue.use(Error);
  Vue.component('Vuelr', Vuelr);
};

export { Vuelr };
