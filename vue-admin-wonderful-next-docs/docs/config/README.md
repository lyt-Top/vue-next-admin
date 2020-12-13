# 创建 vue3.x vite 项目

## 安装 vite

```bash
# 全局安装 vite
npm install create-vite-app -g

# 创建项目，xxx 为项目名称
create-vite-app xxx

# 进入目录
cd xxx

# 安装依赖
npm install

# 运行
npm run dev
```


## 配置 vite 
在项目根目录中创建一个 `vite.config.js` 或 `vite.config.ts` 文件（与vue.config.js一样）。如果在当前工作目录中找到 `Vite`，它将自动使用它。

官网 `config.ts` 配置参考：[https://github.com/vitejs/vite/blob/master/src/node/config.ts](https://github.com/vitejs/vite/blob/master/src/node/config.ts)

配置 `vite.config.ts`：
```ts
import type { UserConfig } from 'vite'

const viteConfig: UserConfig = {
    port: 8080, // 端口号
    hostname: 'localhost', // 主机名
    open: true // 运行自动打开浏览器
}

export default viteConfig
```


## 安装 typescript
#### 1、安装

```bash
# 安装
cnpm install typescript --save-dev

# 初始化 tsconfig.json，注意初始化时与安装 typescript 同级（项目根目录）
npx tsc --init
```

npm 安装依赖 `dependencies` 和 `devDependencies` 的区别：
- `dependencies`：是需要发布到生产环境的
- `devDependencies`：里面的插件只用于开发环境，不用于生产环境

npm 安装方式：
- `dependencies`：npm install 依赖名称  --save
- `devDependencies`：npm install 依赖名称  --save-dev

其它说明：
- `dependencies`：插件不管你引不引入都会打包到文件中去
- `devDependencies`：若文件中 import 引入 devDependencies 中插件，依然会把当前引入的插件打包到文件中，不引入则不打包

#### 2、改成 `.ts` 后缀
将 `main.js` 修改为 `main.ts`，同时将 `index.html` 里面的引用也修改为 `main.ts`，然后在 `script` 里添加 `lang="ts"`

index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

app.vue
```html
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

```

#### 3、出现问题：找不到模块 `./App.vue` 或其相应的类型声明
打开 main.ts 会发现 `import App from App.vue` 会报错: 找不到模块 `./App.vue` 或其相应的类型声明，这是因为现在 ts 还没有识别 vue 文件，需要进行下面的配置：

在项目根目录添加 `shim.d.ts` 文件：

```js
declare module "*.vue" {
    import { Component } from "vue"
    const component: Component
    export default component
}
```

#### 4、出现问题：安装了 `Vetur` 的话，出现 `[vue/no-multiple-template-root]The template root requires exactly one element.eslint-plugin-vue` 的警告

处理方法：关闭了 `Vetur`，Vetur认为这是 Vue 2项目，因为它位于VS Code工作区中。

::: warning 提示
参考顶部 `vsCode` 链接中，打开 `首选项 - 设置 - settings.json`
:::

```json
"vetur.validation.template": false,
"vetur.validation.script": false,
"vetur.validation.style": false,
```


## 安装 element-plus
`element-plus` 官网：[https://element-plus.gitee.io/#/zh-CN](https://element-plus.gitee.io/#/zh-CN)

#### 1、npm 安装

```bash
npm install element-plus --save
```

#### 2、CDN

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-plus/lib/index.full.js"></script>
```

#### 3、引入 Element Plus

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```


## 安装 sass sass-loader
::: tip 提示
安装完成不用配置，经过本地测试，可以直接使用。
:::

```bash
cnpm install sass sass-loader --save-dev
```


## 自定义 Element Plus 主题
Element Plus 的 theme-chalk 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 Element Plus 的样式变量。新建一个样式文件，例如 `element-variables.scss`，写入以下内容：

#### 1、element-variables.scss
注意没有 `~` 符号，`@import '~element-plus/packages/theme-chalk/src/index';`

```scss
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: 'element-plus/lib/theme-chalk/fonts';
@import 'element-plus/packages/theme-chalk/src/index';
```

#### 2、配置目录别名 `@`，方便引用
在 `vite.config.ts` 中，根据需求自己定义。注意写法 `/@assets/`，键必须以 `/` 斜线开始和结束：

```ts
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
```

#### 3、页面中使用
注意 `/@assets` 写法，一定要以 `/` 开头，否则报 `404`

```ts
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus';
import '/@assets/style/base/index.scss';

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

#### 4、动态换肤功能
使用 `ColorPicker 颜色选择器`：[https://element-plus.gitee.io/#/zh-CN/component/color-picker](https://element-plus.gitee.io/#/zh-CN/component/color-picker)，实现动态换肤功能