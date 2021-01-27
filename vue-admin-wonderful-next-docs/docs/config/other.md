# 其它问题

## 批量更新 package.json

我们想用各个依赖包的最新版本。如果手动去修改 `dependencies、devDependencies` 中各个包的版本号，那就太麻烦了，借助 `npm-check-updates` 工具可以很方便的将 `package.json` 中的依赖包版本号更新为最新版本。

::: tip 提示
以下命令都是在 cmd 中执行：
:::

```bash
# 1、安装
cnpm install -g npm-check-updates

# 2、检查 package.json 中是否有更新
ncu

# 3、更新依赖到最新版本 or 更新全部 ncu -a
ncu -u
```

## 更新(升级) vite 2.0 后遇到的问题

- vite文档（英文）：[https://vitejs.dev/index.html](https://vitejs.dev/index.html)
- vite文档（中文非官方）：[https://vite-design.surge.sh/guide/chinese-doc.html](https://vite-design.surge.sh/guide/chinese-doc.html)

`vue.config.js` 配置改变：
#### 1、之前 1.x：

```ts
import type { UserConfig } from 'vite'
import { resolve } from 'path'
import { loadEnv } from './build/utils'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
    '/@/': pathResolve('src')
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
    optimizeDeps: {
        include: ['element-plus/lib/locale/lang/zh-cn']
    }
}

export default viteConfig
```

#### 2、现在 2.x：`alias、server、build`

:::tip 提示
需要安装 @vitejs/plugin-vue，否则 `.vue` 文件报错。安装命令：`cnpm install @vitejs/plugin-vue --save-dev`
:::

```ts
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
```