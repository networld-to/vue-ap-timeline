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
      external: [
        'vue',
        'axios',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-brands-svg-icons',
        '@fortawesome/free-regular-svg-icons',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        'bootstrap',
      ],
      output: {
        globals: {
          vue: 'Vue',
          bootstrap: 'bootstrap',
          axios: 'axios',
          '@fortawesome/fontawesome-svg-core':
            '@fortawesome/fontawesome-svg-core',
          'fortawesome/free-brands-svg-icons':
            '@fortawesome/fontawesome-svg-core',
          '@fortawesome/free-regular-svg-icons':
            '@fortawesome/free-regular-svg-icons',
          '@fortawesome/free-solid-svg-icons':
            '@fortawesome/free-solid-svg-icons',
          '@fortawesome/vue-fontawesome': '@fortawesome/vue-fontawesome',
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
