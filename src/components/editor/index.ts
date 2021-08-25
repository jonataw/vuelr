import VueSnip from '../../utils/instance';
import _Vue from 'vue';
import VuelrEditor from './editor.vue';

export default (Vue: typeof _Vue): void => {
  VueSnip(Vue);
  Vue.component('VuelrEditor', VuelrEditor);
};

export { VuelrEditor };
