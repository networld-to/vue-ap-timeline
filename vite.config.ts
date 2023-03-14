import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-ap-timeline',
      fileName: (format) => `vue-ap-timeline.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'axios'],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
        },
        exports: 'named',
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: false,
    minify: true,
  },
  plugins: [vue(), dts({ insertTypesEntry: true })],
});
