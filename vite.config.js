import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

const pathResolve = (dir) => {
	return resolve(__dirname, '.', dir);
};

const alias = {
	'/@': pathResolve('./src/'),
};

const viteConfig = defineConfig((mode) => {
	const env = loadEnv(mode.mode, process.cwd());
	return {
		plugins: [
			vue(),
			vueSetupExtend(),
			AutoImport({
				imports: ['vue', 'vue-router'],
			}),
		],
		root: process.cwd(),
		resolve: { alias },
		base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT,
			open: JSON.parse(env.VITE_OPEN),
			hmr: true,
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
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].[hash].js`,
					chunkFileNames: `assets/[name].[hash].js`,
					assetFileNames: `assets/[name].[hash].[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						echarts: ['echarts'],
					},
				},
			},
		},
		css: { preprocessorOptions: { css: { charset: false } } },
		define: {
			__NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
			__NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
		},
	};
});

export default viteConfig;
