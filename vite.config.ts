import vue from '@vitejs/plugin-vue';
import type { UserConfig } from 'vite';
import { loadEnv } from './src/utils/viteBuild.ts';

const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH } = loadEnv();

const viteConfig: UserConfig = {
	plugins: [vue()],
	root: process.cwd(),
	resolve: {
		alias: [
			{
				find: /^\/@\//,
				replacement: '/src/',
			},
		],
	},
	base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',
	optimizeDeps: {
		include: ['element-plus/lib/locale/lang/zh-cn'],
	},
	server: {
		port: VITE_PORT,
		open: VITE_OPEN,
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
		minify: 'esbuild',
		sourcemap: false,
	},
};

export default viteConfig;
