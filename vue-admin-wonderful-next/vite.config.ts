import type { UserConfig } from 'vite';
import path from 'path';

const viteConfig: UserConfig = {
    sourcemap: false,
    base: '../',
    port: 8080,
    hostname: 'localhost',
    open: false,
    alias: {
        '/@/': path.resolve(__dirname, './src')
    },
}

export default viteConfig
