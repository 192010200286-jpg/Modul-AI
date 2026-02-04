import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Ini memungkinkan process.env.API_KEY terbaca di aplikasi client-side
      // Fallback ke string kosong jika env tidak ditemukan untuk mencegah error replace
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});