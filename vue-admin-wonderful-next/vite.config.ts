import type { UserConfig } from 'vite'
import { resolve } from 'path'
import { loadEnv } from './build/utils'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
    '/@/': pathResolve('src'),
}

const { VITE_PORT, VITE_PUBLIC_PATH, VITE_OPEN } = loadEnv()

const root: string = process.cwd()

const viteConfig: UserConfig = {
    root,
    alias,
    outDir: 'dist',
    minify: 'esbuild',
    port: VITE_PORT,
    open: VITE_OPEN,
    base: process.env.NODE_ENV === "production" ? "./" : VITE_PUBLIC_PATH,
}

export default viteConfig
