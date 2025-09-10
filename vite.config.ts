import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
        },
    },
    plugins: [react(), tailwindcss()],
    server: {
        watch: {
            usePolling: true, // заставляет Vite следить через polling
        },
    },
});
