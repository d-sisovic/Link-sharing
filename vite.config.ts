import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Link-sharing/",
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setup.ts'
  }
})
