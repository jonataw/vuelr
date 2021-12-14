import { Ref, ref } from 'vue';
import { VuelrCreateOptions, VuelrConfig } from '../create-vuelr';
import { deepMerge } from '../utils/deep-merge';
import defaultConfig from '../utils/default-config';

class Vuelr {
  constructor(options: VuelrCreateOptions) {
    this.config = ref(
      deepMerge(defaultConfig, options.config || {}) as VuelrConfig
    );
    this.uuidSequence = ref(0);
  }
  readonly config: Ref<VuelrConfig>;

  uuidSequence: Ref<number>;

  get isServer() {
    return typeof document === 'undefined';
  }

  uuid(): number {
    this.uuidSequence.value++;
    return this.uuidSequence.value;
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
