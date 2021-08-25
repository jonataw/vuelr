import VueSnip from '../../utils/instance';
import _Vue from 'vue';
import VuelrError from './error.vue';

export default (Vue: typeof _Vue): void => {
  VueSnip(Vue);
  Vue.component('VuelrError', VuelrError);
};

export { VuelrError };
