import vue from '@vitejs/plugin-vue'
import type { UserConfig } from 'vite'
import { loadEnv } from './build/utils'

const { VITE_PORT, VITE_PUBLIC_PATH, VITE_OPEN } = loadEnv()

const viteConfig: UserConfig = {
    plugins: [vue()],
    root: process.cwd(),
    alias: [
        {
            find: /^\/@\//,
            replacement: '/src/'
        }
    ],
    base: process.env.NODE_ENV === "production" ? VITE_PUBLIC_PATH : './',
    optimizeDeps: {
        include: ['element-plus/lib/locale/lang/zh-cn']
    },
    server: {
        port: VITE_PORT,
        open: VITE_OPEN
    },
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        sourcemap: false
    }
}

export default viteConfig
