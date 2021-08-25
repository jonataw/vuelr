import { PluginFunction } from 'vue';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type SFCWithInstall<T> = T & PluginFunction<T>;
