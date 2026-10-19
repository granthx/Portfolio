import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 5174,
    allowedHosts: ['.monkeycode-ai.live', 'localhost'],
    watch: {
      ignored: ['**/*.mp4', '**/Best Project vid/**', '**/*.~tmp', '**/*.tmp', '**/Book/**', '**/Insomnic Work/**']
    }
  },
  preview: {
    host: true,
    port: 5174,
    allowedHosts: ['.monkeycode-ai.live', 'localhost']
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
