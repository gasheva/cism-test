import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/_variables.scss"; @import "@/assets/scss/_mixins.scss";`
      }
    }
  },
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/user": {
        target: "http://68.183.212.124:3000/",
        changeOrigin: true,
        secure: false,
      },
    },
    host: true,
    strictPort: true,
    port: 5173,
  }
})
