import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: import.meta.dirname + '/src/index.ts',
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
      ],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          '@fortawesome/fontawesome-svg-core':
            '@fortawesome/fontawesome-svg-core',
          '@fortawesome/free-brands-svg-icons':
            '@fortawesome/free-brands-svg-icons',
          '@fortawesome/free-regular-svg-icons':
            '@fortawesome/free-regular-svg-icons',
          '@fortawesome/free-solid-svg-icons':
            '@fortawesome/free-solid-svg-icons',
          '@fortawesome/vue-fontawesome': '@fortawesome/vue-fontawesome',
        },
        exports: 'named',
      },
    },
    sourcemap: false,
    minify: true,
  },
  plugins: [vue(), dts({ insertTypesEntry: true })],
});
