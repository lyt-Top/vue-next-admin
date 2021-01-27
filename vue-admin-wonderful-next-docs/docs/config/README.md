# 手把手创建 vue3.x vite 项目

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

- github `config.ts` 配置参考(失效0.x 版本)：[https://github.com/vitejs/vite/blob/master/src/node/config.ts](https://github.com/vitejs/vite/blob/master/src/node/config.ts)
- vite最新文档（英文）：[https://vitejs.dev/index.html](https://vitejs.dev/index.html)

配置 `vite.config.ts`：
```ts
import type { UserConfig } from 'vite'

const viteConfig: UserConfig = {
    server: {
      port: 8080, // 端口号g
      hostname: 'localhost', // 主机名
      open: true // 运行自动打开浏览器
    }
}

export default viteConfig
```

:::tip vite 配置参考
- github：[github/vite/config.ts](https://github.com/vitejs/vite/blob/73196e517643af88a790ab5222d3e6b68dbbf987/packages/vite/src/node/config.ts)
- issues：[https://github.com/vitejs/vite/issues/1467](https://github.com/vitejs/vite/issues/1467)
- plugin-vue：[@vitejs/plugin-vue](@vitejs/plugin-vue)
- plugins：[alias#entries](https://github.com/rollup/plugins/tree/master/packages/alias#entries)
:::


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
`404问题`：[在vite当中使用主题，字体路径的 ~ 无法正常解析，build和dev均报错](https://github.com/element-plus/element-plus/issues/958)临时处理：把字体文件复制到src下了，用相对路径引入。

::: warning 提示
由于 vite 目前（2020.12.17）不支持 [自定义主题 Element Plus](https://element-plus.org/#/zh-CN/component/custom-theme) 文档中的写法，若强行使用打包会出现问题：
:::

```ts
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-plus/lib/theme-chalk/fonts';

@import "~element-plus/packages/theme-chalk/src/index";
```

::: tip 提示
所以采用 CSS3 `:root`（:root 选择器选取文档的根元素） 写法，具体方法我会在顶部导航 `主题` 中进行说明：
:::

```css
/* 定义一个名为 "--main-bg-color" 的属性，然后使用 var() 函数调用该属性： */
:root {
  --main-bg-color: red;
}
 
#div1 {
  background-color: var(--main-bg-color);
}
 
#div2 {
  background-color: var(--main-bg-color);
}
```

改变变量的颜色：

- 1.1、当有内联样式或者 js 设置的值时：`document.documentElement.style.getPropertyValue` 获取到的是实际的值
- 2.2、当只有 :root 选择器或者 html 选择器时，`document.documentElement.style.getPropertyValue` 获取到的值为空

```ts
// 读取变量
document.documentElement.style.getPropertyValue('--main-bg-color').trim();

// 设置变量
document.documentElement.style.setProperty('--main-bg-color', 'blue');

// 删除变量
document.body.style.removeProperty('--main-bg-color');
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
注意 `/@` 写法，一定要以 `/` 开头，否则报 `404`

```ts
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '/@/style/index.css';

createApp(App).use(ElementPlus).mount('#app')
```

#### 4、动态换肤功能
使用 `ColorPicker 颜色选择器`：[https://element-plus.gitee.io/#/zh-CN/component/color-picker](https://element-plus.gitee.io/#/zh-CN/component/color-picker)，实现动态换肤功能

::: tip 提示
请移步顶部导航 `主题` 中查看详细内容
:::

## 安装 vue-router-next
#### 1、cmd 安装

- [vue-router-next 代码仓库（github）](https://github.com/vuejs/vue-router-next)
- [vue-router-next 文档地址](https://next.router.vuejs.org/)

```bash
cnpm install vue-router@4 --save
```

#### 2、页面中使用

- 2.1、页面下新增文件夹 `src/router/index.ts`

index.ts 中写入：

```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('/@/views/layout/index.vue'),
        redirect: '/home',
        meta: {
            title: '首页'
        },
        children: [{
            path: '/home',
            name: 'home',
            component: () => import('/@/views/home/index.vue'),
            meta: {
                title: '首页'
            }
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('/@/views/login/index.vue'),
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes
})

export default router
```

- 2.2、main.ts 中引入 `src/router/index.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '/@/theme/index.scss'
import { locale } from 'element-plus'

createApp(App).use(router).use(ElementPlus, { locale }).mount('#app')
```

- 2.3、页面测试
地址栏输入 2.1 中的路由地址 `http://localhost:8080/#/login`，出现 `login` 中的文字就证明配置成功了。

::: tip 提示
地址栏带 `#号` 与不带 `#号` ，参考：[next.router history-mode.html](https://next.router.vuejs.org/guide/essentials/history-mode.html)

访问路由器和内部的当前路由 setup：[Vue路由器和Composition API](https://next.router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup)
:::