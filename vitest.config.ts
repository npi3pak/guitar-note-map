import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
    plugins: [react()],

    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
        snapshotFormat: {
            printBasicPrototype: false,
        },
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            store: path.resolve(__dirname, './src/store'),
        },
    },
});
