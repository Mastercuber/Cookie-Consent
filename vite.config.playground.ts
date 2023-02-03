import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import { resolve } from 'path'
// @ts-ignore
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueTypeImports()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'ES2015',
    lib: {
      name: 'CookieConsent',
      entry: resolve(__dirname, 'index.html'),
      formats: ['es']
    },
    ssr: false,
    minify: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue'
        }
      }
      /*output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }*/
    }
  }
})
