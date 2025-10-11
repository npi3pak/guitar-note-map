import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePluginRadar } from 'vite-plugin-radar';
import path from 'path';

const isM4L = process.env.VITE_M4L_APP === 'true';

// https://vite.dev/config/
export default defineConfig({
    base: isM4L ? '' : '/guitar-note-map/',
    build: {
        outDir: isM4L ? 'dist_m4l' : 'dist',
        rollupOptions: {
            output: isM4L
                ? {
                      entryFileNames: `[name].js`,
                      chunkFileNames: `[name].js`,
                      assetFileNames: `[name].[ext]`,
                  }
                : undefined,
        },
    },
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
        ...(isM4L
            ? []
            : [
                  VitePluginRadar({
                      // Google Analytics tag injection
                      analytics: {
                          id: 'G-ML16QS62LW',
                      },
                  }),
              ]),
    ],
    server: {
        watch: {
            usePolling: true,
        },
    },
});
