// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ✅ Corrige caminho base para o GitHub Pages
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Login-Register/", // 👈 EXATAMENTE o nome do repositório no GitHub
})
