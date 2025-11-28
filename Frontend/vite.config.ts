import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
export default defineConfig({
	plugins: [vue(), vueJsx(), vueDevTools()],
	resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
	server: {
		proxy: {
			'/auth': { target: 'http://localhost:3001', changeOrigin: true },
			'/catalog': { target: 'http://localhost:3001', changeOrigin: true },
			'/shopping': { target: 'http://localhost:3001', changeOrigin: true },
			'/orders': { target: 'http://localhost:3001', changeOrigin: true },
			'/user': { target: 'http://localhost:3001', changeOrigin: true }
		}
	}
})