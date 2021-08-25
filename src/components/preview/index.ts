import VueSnip from '../../utils/instance';
import _Vue from 'vue';
import VuelrPreview from './preview.vue';

export default (Vue: typeof _Vue): void => {
  VueSnip(Vue);
  Vue.component('VuelrPreview', VuelrPreview);
};

export { VuelrPreview };
