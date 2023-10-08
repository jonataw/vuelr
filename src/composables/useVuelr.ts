import { Ref, ref } from 'vue';
import { VuelrCreateOptions } from '..';

let vuelr: Vuelr;

class Vuelr {
  readonly options: Ref<VuelrCreateOptions>;

  constructor(options: VuelrCreateOptions) {
    this.options = ref(options);
  }

  uuid(): string {
    return (
      '__v' + (Math.random().toString(36) + '00000000000000000').slice(2, 9)
    );
  }
}

export function createGlobalVuelrClass(options: VuelrCreateOptions): void {
  vuelr = new Vuelr(options);
}

export function useVuelr() {
  return {
    options: vuelr.options,
    uuid: () => vuelr.uuid(),
  };
}
