import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const kmePath = path.join('..', 'src', 'main', 'resources', 'panel')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/panel/',
  build: {
    outDir: kmePath
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
