import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0', // Allow access from all network interfaces
        port: 5173,
        strictPort: false,
        hmr: {
            host: 'horse.mfatihas.cloud', // Can be changed to your custom DNS if needed
        }
    }
});
