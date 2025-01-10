import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

import { resolve } from 'pathe'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: [
      resolve('src', 'components', '*.test.ts'),
      resolve('src', 'assets', '*.test.ts')
    ],
    maxThreads: 32,
    coverage:{
      reporter:['text', 'json', 'html']
    }
  },
  plugins: [
    vue(),
    dts()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'ES2015',
    lib: {
      entry: resolve(__dirname, 'src/entry.ts'),
      name: 'CookieConsent',
      formats: ['es', 'umd'],
      fileName: (format) => `cookie-consent.${format}.js`
    },
    ssr: false,
    minify: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
