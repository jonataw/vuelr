import { App } from 'vue';
import version from './version';

import { Vuelr } from './components';
import { createGlobalVuelrClass } from './composables/use-vuelr';
import defaultConfig from './utils/default-config';
import { DeepPartial } from './utils/types';

export interface VuelrInstance {
  version: string;
  install: (app: App) => void;
}

export type VuelrConfig = typeof defaultConfig;

export interface VuelrCreateOptions {
  config?: DeepPartial<VuelrConfig>;
}

function createVuelr(options: VuelrCreateOptions = {}): VuelrInstance {
  const installTargets: App[] = [];
  createGlobalVuelrClass(options);

  function install(app: App): void {
    if (installTargets.includes(app)) return;
    installTargets.push(app);
    app.component(Vuelr.name, Vuelr);
  }

  return {
    version,
    install
  };
}

export default createVuelr;
