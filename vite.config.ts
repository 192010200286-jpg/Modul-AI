import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Mengganti process.env.API_KEY dengan nilai string dari environment variables
      // Penting: Gunakan JSON.stringify agar nilai dimasukkan sebagai string literal, bukan identifier
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});