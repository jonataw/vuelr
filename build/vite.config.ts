import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { defineConfig } from 'vite';

/**
 * @see https://vitejs.dev/config
 */
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    minify: false,
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, '../src/index.ts'),
      name: 'Vuelr',

      // Always use vuelr.mjs. We only have one format anyway.
      fileName: () => 'vuelr.mjs',
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into the library.
      external: ['vue', 'vue/dist/vue.esm-bundler'],
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
