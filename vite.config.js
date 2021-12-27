import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { resolve } from 'path';
import { loadEnv } from './src/utils/viteBuild';

const pathResolve = (dir) => {
	return resolve(__dirname, '.', dir);
};

const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH } = loadEnv();

const alias = {
	'/@': pathResolve('./src/'),
};

const viteConfig = {
	plugins: [
		vue(),
		vueSetupExtend(),
		AutoImport({
			imports: ['vue', 'vue-router', 'vuex'],
		}),
	],
	root: process.cwd(),
	resolve: { alias },
	base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',
	server: {
		host: '0.0.0.0',
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
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].${new Date().getTime()}.js`,
				chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
				assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
			},
		},
	},
	css: {
		postcss: {
			plugins: [
				{
					postcssPlugin: 'internal:charset-removal',
					AtRule: {
						charset: (atRule) => {
							if (atRule.name === 'charset') {
								atRule.remove();
							}
						},
					},
				},
			],
		},
	},
};

export default defineConfig(viteConfig);
