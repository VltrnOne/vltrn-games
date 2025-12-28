import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cname',
      closeBundle() {
        // Copy CNAME to dist for GitHub Pages
        try {
          copyFileSync('CNAME', join('dist', 'CNAME'))
          console.log('✅ CNAME copied to dist/')
        } catch (err) {
          console.warn('⚠️  CNAME not found, skipping copy')
        }
      }
    }
  ],
  base: '/',
  publicDir: 'public',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})

