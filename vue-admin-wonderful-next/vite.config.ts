import type { UserConfig } from 'vite'
const path = require('path')

const viteConfig: UserConfig = {
    port: 8080,
    hostname: 'localhost',
    open: true,
    alias: {
        '/@/': path.resolve(__dirname, './src'),
        '/@assets/': path.resolve(__dirname, './src/assets'),
        '/@views/': path.resolve(__dirname, './src/views'),
        '/@components/': path.resolve(__dirname, './src/components'),
        '/@utils/': path.resolve(__dirname, './src/utils')
    }
}

export default viteConfig
