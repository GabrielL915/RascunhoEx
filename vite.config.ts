import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/client',
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './routes',
      generatedRouteTree: './routes/routeTree.gen.ts',
    }),
    react(),
  ],
  server: {
    proxy: { '/api': 'http://localhost:3000' },
  },
  build: {
    outDir: '../../dist/client',
    emptyOutDir: true,
  },
})
