
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // We cast process to any to access cwd() in the build environment safely.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Prioritize API_KEY from environment, fallback to VITE_ prefixed version
  const apiKey = env.API_KEY || env.VITE_API_KEY || '';
  
  return {
    plugins: [react()],
    define: {
      // Injects the API key into the client-side code as process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild'
    }
  };
});
