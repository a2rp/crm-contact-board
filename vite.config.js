import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/crm-contact-board/',
  build: {
    sourcemap: false,
  },
  plugins: [react()],
})
