import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePluginRadar } from 'vite-plugin-radar';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    base: '/guitar-note-map/',
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            store: path.resolve(__dirname, './src/store'),
        },
    },
    plugins: [
        react(),
        tailwindcss(),
        VitePluginRadar({
            // Google Analytics tag injection
            analytics: {
                id: 'G-ML16QS62LW',
            },
        }),
    ],
    server: {
        watch: {
            usePolling: true,
        },
    },
});
