import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		exclude: ['lucide-react'],
	},
	server: {
		host: '0.0.0.0', // Listen on all addresses, including the local network
		port: 5173, // Default Vite port, you can change this if needed
	},
});
