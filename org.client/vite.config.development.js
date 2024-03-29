import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: {
            key: 'C:/Utveckling/SSL/localhost/localhost-key.pem',
            cert: 'C:/Utveckling/SSL/localhost/localhost.pem',
        }
    },
    plugins: [react()],
})
