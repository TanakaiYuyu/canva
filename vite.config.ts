import typescript from '@rollup/plugin-typescript'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    typescript(),
    react(),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  ssr: {
    noExternal: ['@telemetryos/sdk', '@telemetryos/sdk/react', '@telemetryos/root-sdk'],
  },
})
