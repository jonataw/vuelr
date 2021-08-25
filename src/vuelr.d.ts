import { PluginFunction, PluginObject } from 'vue';
import { DeepPartial } from './utils/types';

export interface VuelrComponent<T> {
  name: string;
  config: T;
}

// #region vuelrconfig
export interface VuelrConfig {
  /**
   * Output extra logs.
   */
  debug: boolean;

  /**
   * Options to pass to CodeMirror.
   * @see https://codemirror.net/doc/manual.html#config
   */
  codemirror: Record<string, any>;
}
// #endregion vuelrconfig

export interface VuelrInstance {
  readonly config: VuelrConfig;
}

// Prototype augments
declare module 'vue/types/vue' {
  interface Vue {
    $vuelr: VuelrInstance;
  }
}

export interface LPlugin extends PluginObject<DeepPartial<VuelrConfig>> {
  install: PluginFunction<DeepPartial<VuelrConfig>>;
}

export declare const Vuelr: LPlugin;
export default Vuelr;
