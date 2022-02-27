import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';

const name = 'vuelr';
const entry = 'index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname, '../src')
    }
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, `../src/${entry}.ts`),
      name
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        'vue/dist/vue.esm-bundler',
        'codemirror',
        'codemirror/mode/vue/vue',
        'codemirror/lib/codemirror.css'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  },
  test: {
    reporters: 'verbose',
    globals: true,
    environment: 'happy-dom'
  }
});
