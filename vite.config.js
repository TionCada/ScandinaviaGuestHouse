import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';

export default defineConfig({
    plugins: [react()],
    // react-burgers reads the bare process.env global, which only CRA provided
    define: {
        'process.env': {}
    },
    resolve: {
        alias: {
            process: fileURLToPath(new URL('./src/processShim.js', import.meta.url))
        }
    },
    build: {
        outDir: 'build'
    }
});
