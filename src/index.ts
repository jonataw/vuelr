import { App } from 'vue';
import { Vuelr } from './components/Vuelr/Vuelr';
import { createGlobalVuelrClass } from './composables/useVuelr';
import version from './version';

export interface VuelrInstance {
  version: string;
  install: (app: App<Element>) => void;
}

export interface VuelrCreateOptions {
  debug?: boolean;
}

export function createVuelr(
  options: VuelrCreateOptions = { debug: false },
): VuelrInstance {
  const installTargets: App<Element>[] = [];
  createGlobalVuelrClass(options);

  function install(app: App<Element>): void {
    if (installTargets.includes(app)) return;
    installTargets.push(app);
    app.component(Vuelr.name, Vuelr);
  }

  return {
    version,
    install,
  };
}

export { default as version } from './version';
export { Vuelr };

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Vuelr: (typeof import('./components/Vuelr/Vuelr'))['Vuelr'];
  }
}
