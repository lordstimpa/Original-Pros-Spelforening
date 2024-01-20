import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/',
    define: {
        'process.env.API_URL': 'https://orgspelforening.azurewebsites.net',
    },
    plugins: [react()],
});