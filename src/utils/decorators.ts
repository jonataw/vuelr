import Vue, { PropOptions, WatchOptions } from 'vue';
import Component, { createDecorator, mixins } from 'vue-class-component';
import { Constructor } from 'vue/types/options';
export { Component, Vue, mixins as Mixins };

/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
const reflectMetadataIsSupported =
  typeof Reflect !== 'undefined' &&
  typeof (Reflect as any).getMetadata !== 'undefined';

export function applyMetadata(
  options: PropOptions | Constructor[] | Constructor,
  target: Vue,
  key: string
): void {
  if (reflectMetadataIsSupported) {
    if (
      !Array.isArray(options) &&
      typeof options !== 'function' &&
      !options['type'] &&
      typeof options.type === 'undefined'
    ) {
      const type = (Reflect as any).getMetadata('design:type', target, key);
      if (type !== Object) {
        options.type = type;
      }
    }
  }
}

/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export function Prop(options: PropOptions | Constructor[] | Constructor = {}) {
  return (target: Vue, key: string): void => {
    applyMetadata(options, target, key);
    createDecorator((componentOptions, k) => {
      (componentOptions.props || ((componentOptions.props = {}) as any))[k] =
        options;
    })(target, key);
  };
}

/**
 * decorator of a watch function
 * @param path the path or the expression to observe
 * @param watchOptions
 */
export function Watch(path: string, watchOptions: WatchOptions = {}) {
  return createDecorator((componentOptions, handler) => {
    const watch: any = componentOptions.watch || Object.create(null);
    if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
      watch[path] = [watch[path]];
    } else if (typeof watch[path] === 'undefined') {
      watch[path] = [];
    }

    watch[path].push({ handler, ...watchOptions });
  });
}
