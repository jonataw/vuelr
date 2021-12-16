import { Ref, ref } from 'vue';
import { VuelrCreateOptions, VuelrConfig } from '../create-vuelr';
import { deepMerge } from '../utils/deep-merge';
import defaultConfig from '../utils/default-config';

class Vuelr {
  constructor(options: VuelrCreateOptions) {
    this.config = ref(
      deepMerge(defaultConfig, options.config || {}) as VuelrConfig
    );
  }
  readonly config: Ref<VuelrConfig>;

  uuid(): string {
    return '__v' + (Math.random().toString(36) + '00000000000000000').slice(2, 9);
  }
}

let vuelr: Vuelr;
export function createGlobalVuelrClass(options: VuelrCreateOptions): void {
  vuelr = new Vuelr(options);
}

export function useVuelr() {
  return {
    config: vuelr.config,
    uuid: () => vuelr.uuid()
  };
}
