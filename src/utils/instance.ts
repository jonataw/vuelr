import _Vue from 'vue';

import defaultConfig from './default-config';
import { deepMerge } from './deep-merge';
import { DeepPartial } from './types';
import { VuelrConfig, VuelrInstance } from '../vuelr.d';

export function createInstance(Vue: typeof _Vue, config?: DeepPartial<VuelrConfig>): VuelrInstance {
  const cfg = deepMerge(defaultConfig, config || {}) as VuelrConfig;
  return Vue.observable({
    config: cfg
  });
}

export default function (Vue: typeof _Vue): void {
  if (!Vue.prototype.$vuelr) {
    Vue.prototype.$vuelr = createInstance(Vue);
  }
}
