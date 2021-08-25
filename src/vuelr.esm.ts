import _Vue from 'vue';
import { VuelrConfig } from './vuelr.d';
import { DeepPartial } from './utils/types';

import Vuelr from './components/vuelr';
import { createInstance } from './utils/instance';

// install function executed by Vue.use()
export default function (
  Vue: typeof _Vue,
  options: DeepPartial<VuelrConfig>
): void {
  Vue.prototype.$vuelr = createInstance(Vue, options);
  Vue.use(Vuelr);
}

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components';
