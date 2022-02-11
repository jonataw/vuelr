import { App, Component, Directive } from 'vue';
import { createGlobalVuelrClass } from './composables/use-vuelr';
import defaultConfig from './utils/default-config';
import { DeepPartial } from './utils/types';
import version from './version';

export interface VuelrInstance {
  version: string;
  install: (app: App) => void;
}

export type VuelrConfig = typeof defaultConfig;

export interface VuelrCreateOptions {
  components?: {
    name: string;
    alias?: string[];
    dependencies?: { directives: any[]; components: any[] };
  }[];
  config?: DeepPartial<VuelrConfig>;
  theme?: string;
}

function createVuelr(options: VuelrCreateOptions = {}): VuelrInstance {
  const components = options.components || [];
  createGlobalVuelrClass(options);
  const installTargets: App[] = [];
  function registerComponent(
    app: App,
    name: string,
    component: Component
  ): void {
    const registered = app.component(name);
    if (!registered) {
      app.component(name, component);
    }
  }
  function registerDirective(
    app: App,
    name: string,
    directive: Directive
  ): void {
    const registered = app.directive(name);
    if (!registered) {
      app.directive(name, directive);
    }
  }
  function install(app: App): void {
    if (installTargets.includes(app)) return;
    installTargets.push(app);
    components.forEach((component) => {
      const { name, dependencies } = component;
      registerComponent(app, name, component);
      if (dependencies && dependencies.components) {
        dependencies.components.forEach((dependency: any) => {
          registerComponent(app, dependency.name, dependency);
        });
      }
      if (dependencies && dependencies.directives) {
        dependencies.directives.forEach(({ name, directive }: any) => {
          registerDirective(app, name, directive);
        });
      }
    });
  }
  return {
    version,
    install
  };
}

export default createVuelr;
