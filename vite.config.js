import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// The Worker's API (/api/*) and uploaded files (/media/*) come from `npm run dev:worker` on port
// 8787 while `npm start` runs; without it the site shows its built-in texts and photos
const worker = 'http://localhost:8787';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build'
    },
    server: {
        proxy: {
            '/api': worker,
            '/media': worker
        }
    }
});
