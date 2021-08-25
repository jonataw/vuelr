//shims-vue.d.ts

declare module '*.vue' {
  import Vue, { VueConstructor } from 'vue';
  const component: VueConstructor & {
    install(vue: typeof Vue): void;
  };
  export default component;
}
