import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      // Allow serving files from one level up to the project root.
      allow: ['../'],
    },
  },
  plugins: [vueJsx()],
  resolve: {
    alias: {
      '~': resolve(__dirname, '..', '..', 'src'),
    },
  },
});
