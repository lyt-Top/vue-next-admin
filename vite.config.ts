import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import type { UserConfig } from 'vite';

const pathResolve = (dir: string) => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'/@': pathResolve('./src/'),
};

const viteConfig: UserConfig = {
	plugins: [vue()],
	root: process.cwd(),
	resolve: { alias },
	base: './',
	server: {
		host: '0.0.0.0',
		port: 8888,
		open: false,
		proxy: {
			'/gitee': {
				target: 'https://gitee.com',
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/gitee/, ''),
			},
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].[hash].js`,
				chunkFileNames: `assets/[name].[hash].js`,
				assetFileNames: `assets/[name].[hash].[ext]`,
				compact: true,
				manualChunks: {
					vue: ['vue', 'vue-router'],
				},
			},
		},
	},
};

export default viteConfig;
