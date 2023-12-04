import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: { port: 6400 },
  plugins: [react()],
})
