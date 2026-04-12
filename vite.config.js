import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    // After build, copy index.html → 404.html so GitHub Pages serves the
    // React app for ALL routes (including /download) instead of a hard 404.
    {
      name: 'copy-index-to-404',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'dist/index.html'),
          resolve(__dirname, 'dist/404.html')
        )
      },
    },
  ],
  // If your GitHub Pages repo lives at https://your-org.github.io/promptflow-studio/
  // change base to '/promptflow-studio/'.
  // If you use a custom domain (e.g. promptflow.studio), keep it as '/'.
  base: '/PromptFlow-Studio/',
})
