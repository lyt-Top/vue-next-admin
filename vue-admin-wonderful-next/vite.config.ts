import type { UserConfig } from 'vite';
import { resolve } from 'path';

const root: string = process.cwd();

function pathResolve(dir: string) {
    return resolve(__dirname, '.', dir);
}

const alias: Record<string, string> = {
    '/@/': pathResolve('src'),
};

const viteConfig: UserConfig = {
    port: 8080,
    hostname: 'localhost',
    open: false,
    root,
    alias,
    // transforms: [
    //     globbyTransform({
    //       root: root,
    //       alias: alias
    //     })
    //   ],
}

export default viteConfig
