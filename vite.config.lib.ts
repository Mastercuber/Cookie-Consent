import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

import { resolve } from 'pathe'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  mode: 'production',
  build: {
    target: 'ES2015',
    lib: {
      entry: resolve(__dirname, 'src', 'components', 'CookieConsent.vue'),
      name: 'CookieConsent',
      formats: ['es', 'cjs'],
      fileName: (format) => `cookie-consent.${format}.js`
    },
    minify: 'esbuild',
    rollupOptions: {
      external: ['vue', 'vue-i18n'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-i18n': 'vueI18n'
        }
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      treeShaking: true,
      minify: true,
      charset: 'utf8',
      sourcemap: false,
      logLevel: 'info',
      color: true,
      incremental: true,
    }
  }
})
