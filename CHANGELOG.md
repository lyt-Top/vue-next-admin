# <a href="https://gitee.com/lyt-top/vue-next-admin" target="_blank">vue-next-admin 更新日志</a>

🎉🎉🔥 `vue-next-admin` 基于 vue3.x 、Typescript、vite、Element plus 等，适配手机、平板、pc 的后台开源免费模板库（vue2.x 请切换 vue-prev-admin 分支）

## 2.4.32

💔💔💔 图片不显示问题（README.md、演示中使用的图片，[vue-next-admin-images](https://gitee.com/lyt-top/vue-next-admin-images)），通过网站 [https://www.hd-r.cn/](https://www.hd-r.cn/) 转在线链接，如若侵权请联系作者 qq：1105290566

`2023.03.26`

- 🌟 更新 依赖更新最新版本
- 🐞 修复 [关于开发环境 sourceMap 的问题](https://gitee.com/lyt-top/vue-next-admin/issues/I6DNDQ)，感谢[@XiaoSongJiang](https://gitee.com/XiaoSongJiang)
- 🐞 修复 打包提示 `[@vue/compiler-sfc] ::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.`，不能使用 `:deep {}`，而应使用 `:deep() {}`
- 🎨 合并 [feat: 一级菜单重定向为空，分栏模式下，点击一次菜单时现在会切换子菜单列表，而不是打开空白页](https://gitee.com/lyt-top/vue-next-admin/commit/a91f84e3a1a86d8d303a5b46171622913d9d0737)，感谢[@写意](https://gitee.com/xjj_0906)
- 🎯 优化 经典布局分割菜单只有一项子级时，收起左侧导航菜单
- 🎯 优化 watch 监听范围
- 🎯 优化 打包：分包（manualChunks）、gzip 压缩、cdn 加速 `默认关闭 .env 中开启`（可查看文章[vue-next-admin vue3 + vite 打包 gzip 压缩、cdn 加速](https://blog.csdn.net/qq_34450741/article/details/129766676)）

## 2.4.31

`2023.03.10`

- 🌟 更新 依赖更新最新版本
- 🐞 修复 顶栏背景渐变设置不生效
- 🐞 修复 顶栏背景渐变、菜单背景渐变时，深色主题不生效
- 🐞 修复 顶栏搜索框移动端显示问题
- 🎯 优化 `main.ts`，相关 issues [#I6KNFH](https://gitee.com/lyt-top/vue-next-admin/issues/I6KNFH)、[#I6JRH6](https://gitee.com/lyt-top/vue-next-admin/issues/I6JRH6)
- 🎯 优化 菜单横向模式显示（horizontal）
- 🎯 优化 分栏布局，[希望分栏布局做一下优化，在没有二级菜单的时候，直接全屏展示一级菜单链接](https://gitee.com/lyt-top/vue-next-admin/issues/I6HW7H)，感谢[@jiuping](https://gitee.com/jiuping)，`tagsview` 点击时处理 `收起/展开` 菜单

## 2.4.3

`2023.02.22`

🚩🚩🚩 感谢 [驰骋工作流引擎-表单引擎-低代码开发平台](http://www.ccflow.org/) 赞助商的赞助。驰骋公司为社会提供流程引擎+表单引擎+低代码开发平台一体的开源软件解决方案，欢迎广大开发者前去体验！

- 🌟 更新 依赖更新最新版本
- 🎉 新增 赞助商组件（`/src/layout/sponsors`），[项目目录结构查看](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/)
- 🐞 修复 [过滤筛选组件展开点击不了](https://gitee.com/lyt-top/vue-next-admin/issues/I688WG)
- 🐞 修复 [设置锁屏时间时直接白屏了不能恢复，除非删除主题配置才会重新加载](https://gitee.com/lyt-top/vue-next-admin/issues/I6AF8P)，感谢[@baizunxian](https://gitee.com/xb_xiaobai)
- 🐞 修复 `分栏布局` 地址栏输入不存在的路由报错问题
- 🎨 合并 [!44 tagsViewName 正则匹配错误，匹配到含 en 单词](https://gitee.com/lyt-top/vue-next-admin/pulls/44/files)，感谢[@tony 星](https://gitee.com/tony_tong_xin)
- 🎨 合并 [!45 fix 地址栏出现 false 问题](https://gitee.com/lyt-top/vue-next-admin/pulls/45)，感谢[@随心](https://gitee.com/jiangqiang1996)
- 🎯 优化 `/src/utils/storage` 下 `key` 编写成 `${__NEXT_NAME__}:${key}`，防止部署多套系统到同一域名不同目录时，变量共用的问题（`__NEXT_NAME__`为 `package.json` 中的 `name`）
- 🎯 优化 watermark 单词拼写错误

## 2.4.21

`2022.12.12`

- 🌟 更新 依赖更新最新版本
- 🎉 新增 菜单背景高亮颜色可自定义，通过 `布局配置 -> 菜单设置 -> 菜单高亮背景色` 进行设置
- 🐞 修复 `分栏布局` 二级导航菜单内容多时，无法滚动问题，感谢群友@静雨轩主人
- 🐞 修复 [!42 修复 工作流无法添加新节点问题](https://gitee.com/lyt-top/vue-next-admin/pulls/42)，感谢[@beta](https://gitee.com/beta_dz)
- 🎯 优化 `/make/tableDemo` 表头很多时，无法滚动问题，感谢群友@糊涂涂涂

## 2.4.2

`2022.12.09`

- 🌟 更新 依赖更新最新版本
- 🎉 新增 国际化自动导入文件功能，只需在 `/src/i18n/pages` 下新建文件夹定义即可
- 🎉 新增 `/make/tableDemo` 中 [搜索框展开，收缩功能，高级筛选组件 有计划做吗](https://gitee.com/lyt-top/vue-next-admin/issues/I6511L)
- 🐞 修复 [!40 开启 TagsView 缓存后，刷新后所有的路由都变成组件缓存了](https://gitee.com/lyt-top/vue-next-admin/pulls/40)，感谢[@mrjimin](https://gitee.com/mrjimin)
- 🐞 修复 [!41 修复 get 请求传递嵌套对象或数组时无法正常编码问题](https://gitee.com/lyt-top/vue-next-admin/pulls/41)，感谢[@随心](https://gitee.com/jiangqiang1996)
- 🐞 修复 组件 wangEditor 回显值的问题
- 🐞 修复 `/fun/echartsMap`（地理坐标/地图）、`visualizingDemo2`（数据可视化演示 2） 演示报错问题
- 🎯 优化 版本升级提示
- 🎯 优化 无权限登录时增加提示信息，[BUG：因前端加载路由(initFrontEndControlRoutes)中当前用户角色为一个陌生角色, 导致 router.beforeEach 会死循环 浏览器崩溃](https://gitee.com/lyt-top/vue-next-admin/issues/I64HVO)，感谢[@canroc](https://gitee.com/canroc)、[@随心](https://gitee.com/jiangqiang1996)
- 🌈 重构 `/views/system` 新增修改组件合并。[可以把新增修改组件合并成一个吧](https://gitee.com/lyt-top/vue-next-admin/issues/I64WES)
- 🌈 重构 图标选择器，[图标选择器没办法筛选，只能筛选 ali 的](https://gitee.com/lyt-top/vue-next-admin/issues/I64HZD)，感谢[@随心](https://gitee.com/jiangqiang1996)

## 2.4.1

`2022.11.30`

- 🎉 新增 版本升级提示
- 🐞 修复 [先打开 F12 再登录进去，然后改变浏览器大小 js 报错](https://gitee.com/lyt-top/vue-next-admin/issues/I63ZZT)，感谢[@Quber](https://gitee.com/quber)

## 2.4.0

`2022.11.29`

⚡⚡⚡ 此版为破坏性更新，应群友建议 `script lang="ts"` 改 `script lang="ts" setup 语法糖`。

- 🌟 更新 依赖更新最新版本
- 🎉 新增 表格封装演示，路径：`组件封装 -> 表格封装演示`
- 🎉 新增 master 分支 script lang="ts" 改成 script lang="ts" setup 语法糖，将同步基础分支
- 🐞 修复 [v2.3.0 版本报错问题处理](https://gitee.com/lyt-top/vue-next-admin/issues/I623RP)
- 🐞 修复 [el-backtop 滚动高度不触发（固定了 header）](https://gitee.com/lyt-top/vue-next-admin/issues/I63N0D)，感谢[@dejavuuuuu](https://gitee.com/zc19951010)
- 🎯 优化 完善 ts 类型，删除根目录 `plugins.d.ts、shim.d.ts、source.d.ts`，移入到 `/src/types/global.d.ts`
- 🎯 优化 代码 `watch` 移动到 `生命周期钩子` 最后，文字注释等

## 2.3.0

`2022.11.16`

- 🌟 更新 依赖更新最新版本
- 🎉 新增 新版登录页
- 🎉 新增 tagsview 鼠标中键 `关闭当前 tagsview`
- 🎉 新增 `分栏菜单鼠标悬停预加载`。[分栏模式如何去掉鼠标悬浮父级菜单，分栏菜单自动加载的功能啊](https://gitee.com/lyt-top/vue-next-admin/issues/I5RUY7)。操作路径：`布局配置 -> 分栏设置`
- 🐞 修复 [vue-i18n](https://vue-i18n.intlify.dev/api/general.html#createi18n) 报错，[!39 修复 i18n 兼容性问题](https://toscode.gitee.com/lyt-top/vue-next-admin/pulls/39/files)，感谢[@随心](https://toscode.gitee.com/jiangqiang1996)
- 🐞 修复 顶栏搜索功能点击蒙蔽弹窗不关闭
- 🐞 修复 [!38 fix: bug refreshRouterViewKey 值为 null 导致路由缓存第一次无效](https://toscode.gitee.com/lyt-top/vue-next-admin/pulls/38/files)，感谢[@P)](https://toscode.gitee.com/foxp8y)
- 🐞 修复 `路由参数 -> 普通路由/动态路由` 国际化演示时，`tagsView` 和 `浏览器标题` 显示异常。[演示中：路由参数界面 -> 动态路由，国际化显示时面包屑、浏览器标题有 bug](https://gitee.com/lyt-top/vue-next-admin/issues/I5JRJG)
- 🐞 修复 `路由参数 -> 普通路由/动态路由` 动态设置 `tagsViewName` 时，`tagsView 右键菜单刷新` 功能失效（也就是路由后面有参数时，query、params）。[普通或动态路由新建页面后点击 tagview 刷新无效](https://gitee.com/lyt-top/vue-next-admin/issues/I5K3YO)，感谢[@dejavuuuuu](https://gitee.com/zc19951010)
- 🐞 修复 [表单（el-form）中，字体图标偏移问题](https://gitee.com/lyt-top/vue-next-admin/issues/I5K1PM)
- 🐞 修复 路由 `router.addRoute` 时，一直提示 `No match found for location with path 'xxx'`
- 🎯 优化 全局 `getCurrentInstance` 替换成 [`provide/inject`](https://cn.vuejs.org/api/application.html#app-provide) 或通过 `ref` 处理
- 🎯 优化 引入组件方式 `(import xxx from xxx)` 改成 `defineAsyncComponent(() => import(xxx))`
- 🎯 优化 页面高度 100% 问题，重写布局配置 `界面设置 -> 固定 Header` 多余的 `el-scrollbar` 逻辑、重写各界面需 `计算属性 computed` 设置动态高度问题（改为 css `flex` 设置自适应高度，具体查看文档：[设置可视区高度 100%](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/otherIssues/#%E8%AE%BE%E7%BD%AE%E5%8F%AF%E8%A7%86%E5%8C%BA%E9%AB%98%E5%BA%A6-100)。[!31 修复页面样式无法通过百分比设置的问题](https://toscode.gitee.com/lyt-top/vue-next-admin/pulls/31)，感谢[@LostDeer](https://toscode.gitee.com/lyt-top/vue-next-admin/pulls/31/files)。`（改动较大，删除多余代码）`
- 🎯 优化 [wangeditor](https://www.wangeditor.com/) 组件，`@wangeditor/editor-for-vue`。可自行修改，组件位置：`/src/components/editor`。相关 Issues：[wangeditor 编辑器多个菜单不能回弹](https://gitee.com/lyt-top/vue-next-admin/issues/I5M5H7)
- 🌈 重构 外链、内嵌 iframe 逻辑 + 美化，iframe 支持缓存

## 2.2.0

`2022.07.10`

⚡⚡⚡ [/sec/stores/userInfo.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/stores/userInfo.ts) 下添加了 `getApiUserInfo` 接口模拟数据 `setTimeout` 为 3 秒

- 🌟 更新 依赖更新最新版本
- 🐞 修复 [主界面重新授权按钮点击卡死不跳转登录界面#I5C3JS](https://gitee.com/lyt-top/vue-next-admin/issues/I5C3JS)，感谢[@Hero-Typ](https://gitee.com/tian_yu_peng)
- 🐞 修复 编译警告[#I5CVSB](https://gitee.com/lyt-top/vue-next-admin/issues/I5CVSB)，全局替换成 `:deep(attr)`，感谢[@Linvas](https://gitee.com/linvas)。参考文档：[vue3 sfc-style](https://v3.cn.vuejs.org/api/sfc-style.html#style-scoped)。`node_modules\print-js\dist\print.js` 需 `print-js` 作者适配或去除 `package.json` 中的 `"print-js": "^1.6.0"`
- 🐞 修复 [vue-next-admin-template-js 版本前端控制路由：userInfo.js 请求用户信息接口报错，加载不到路由 可以写个定时器模拟一下接口 一样的报错#I5F1HP](https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP)，感谢[@白开水](https://gitee.com/libin951223)

## 2.1.1

`2022.05.27`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 深色模式下，`<el-button text></el-button>` 时，`:active` 样式
- 🎯 优化 [页面缓存在刷新之后失效 #I58U75](https://gitee.com/lyt-top/vue-next-admin/issues/I58U75))，感谢[@ls0428](https://gitee.com/ls0428)
- 🎯 优化 [SvgIcon 对下载的 Svg 图像设置颜色无效 #I59ND0](https://gitee.com/lyt-top/vue-next-admin/issues/I59ND0))，感谢[@elus_z](https://gitee.com/elus_z)
- 🎯 优化 `/src/utils/toolsValidate.ts` 工具类
- 🐞 修复 [布局切换，TagsView 显示的 tab 会多一个出来 #I58WGM](https://gitee.com/lyt-top/vue-next-admin/issues/I58WGM)，感谢[@lg_boy](https://gitee.com/lg_boy)
- 🐞 修复 [如果设置顶部面包屑导航开启图标 isBreadcrumbIcon=true 后，样式有点问题 如果不开启就是正常的 #I58VB8](https://gitee.com/lyt-top/vue-next-admin/issues/I58VB8)
- 🐞 修复 地址栏路由地址输入错误时，返回首页后，再次输入路由地址错误时，不跳转 404 问题
- 🐞 修复 [2.1.0 版本的图标选择组件多次点击后功能失效 #I590TH](https://gitee.com/lyt-top/vue-next-admin/issues/I590TH)，感谢[@quber](https://gitee.com/quber)

## 2.1.0

`2022.04.18`

⚡⚡⚡ 此版本为破环性更新，优化内容如下：（谨慎更新！谨慎更新！！谨慎更新！！！）。因为 `vuex` 替换成 `pinia`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 部分界面图片不显示问题（更换 gitee 在线图片地址源）
- 🎯 优化 各界面方法引入与逻辑之间添加一行空行，方便区分内容
- 🎯 优化 图标选择器 [#I4YAHB](https://gitee.com/lyt-top/vue-next-admin/issues/I4YAHB)，感谢[@真有你的](https://gitee.com/sunliusen)
- 🎯 优化 图标选择器 icon type 类型为 all 时，类型 ali、ele、awe 回显问题
- 🎯 优化 去掉开发环境 i18n 控制台警告，页面代码：[i18n/index.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/i18n/index.ts)
- 🎯 优化 `NextLoading.start()` 方法，防止第一次进入界面时出现短暂空白
- 🎯 优化 地址栏有参数退出登录，再次登录不跳之前界面问题 `src/layout/navBars/breadcrumb/user.vue`
- 🎯 优化 `SvgIcon` 组件，防止 `开启 Tagsview 图标` 时，`tagsView 右键菜单关闭` 报错问题，工作流不可连线、全屏时关闭按钮消失问题
- 🎯 优化 [如果 url 中有中文等特殊字符，第一次切换该 tab 时 keep-alive 失效#I55JS7](https://gitee.com/lyt-top/vue-next-admin/issues/I55JS7),感谢[yuyong1566](https://gitee.com/yuyong1566)
- 🎯 优化 [wangEditor](https://www.wangeditor.com/) 更新到 v5，[vue3 版本线上示例中 wangeditor 富文本编辑器 demo 实例,无法换行#I5565B](https://gitee.com/lyt-top/vue-next-admin/issues/I5565B)，感谢@[jenchih](https://gitee.com/jenchih)
- 🎯 优化 [在关闭 tagview 时，高度刷新时会会变化，出现滚动条](https://gitee.com/lyt-top/vue-next-admin/issues/I55FHM)，感谢[张松](https://gitee.com/zs310071113)
- 🎯 优化 [路由参数](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/common)演示
- 🎉 新增 [vuex](https://vuex.vuejs.org/) 替换成 [pinia](https://pinia.vuejs.org/getting-started.html)
- 🎉 新增 tagsView 支持自定义 tagsView 名称（文章详情时有用），前往体验：[路由参数/普通路由](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/common)。新增 tagsView 支持自定义名称国际化，感谢[@q7but](https://gitee.com/q7but)、[!22 add 添加自定义 tagVIewName 拓展,支持国际化](https://gitee.com/lyt-top/vue-next-admin/pulls/22/files)、感谢[@tony_tong_xin](https://gitee.com/tony_tong_xin)
- 🐞 修复 适配 `"element-plus": "^2.1.9"，2.2.0` 版本
- 🐞 修复 [导航栏横向布局后，一级菜单显示问题#I4Z3M3](https://gitee.com/lyt-top/vue-next-admin/issues/I4Z3M3)
- 🐞 修复 横向布局三级及以上导航菜单高亮、导航高度不统一问题
- 🐞 修复 分栏模式下,选中的菜单是 primary 样式,鼠标移入字也变成 primary 色了，感谢群友@孤夜-流殇
- 🐞 修复 [vuex 里面改了颜色 但是不生效 #I4WFMA](https://gitee.com/lyt-top/vue-next-admin/issues/I4WFMA)
- 🐞 修复 全局主题 primary 清空颜色后报错，[#I4X0LG](https://gitee.com/lyt-top/vue-next-admin/issues/I4X0LG)，感谢[面向 BUG 编程](https://gitee.com/fhtfy)
- 🐞 修复 [.eslintrc.js 文件 rules 标签名错误 #I53IPK](https://gitee.com/lyt-top/vue-next-admin/issues/I53IPK)，感谢[yuyong1566](https://gitee.com/yuyong1566)
- 🐞 修复 `开启 Tagsview 图标` 时，`tagsView 右键菜单关闭` 报错问题
- 🐞 修复 `router.push` 路径找不到时报错问题，`404、401 界面` 已移入到 `main` 主布局里（之前全屏）
- 🐞 修复 [全局修改组件大小失效了](https://gitee.com/lyt-top/vue-next-admin/issues/I551RP)，感谢[lg_boy](https://gitee.com/lg_boy)
- 🐞 修复 [修改一下配置时，需要每次都清理 `window.localStorage` 浏览器永久缓存，配置才会生效，问题解决#I567R1](https://gitee.com/lyt-top/vue-next-admin/issues/I567R1),感谢[@lanbao123](https://gitee.com/lanbao123)
- 🐞 修复 [标记为需要缓存的 tab 页后，再次从左侧菜单打开，还是显示被缓存的页面内容#I4UY3G](https://gitee.com/lyt-top/vue-next-admin/issues/I4UY3G)，感谢@axcc1234、特别感谢群友@华仔
- 🌈 重构 路由（`/src/router/index.ts`）解决 No match found for location with path "xxx"(前端控制，后端控制未解决) 问题

## 2.0.2

`2022.03.04`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 Alert 提示添加边框
- 🎯 优化 功能 / 数字滚动 演示界面
- 🐞 修复 全局主题按钮颜色 :active 问题
- 🐞 修复 Dropdown 下拉菜单样式问题
- 🐞 修复 SvgIcon 图标组件动态切换时报警告问题，[SvgIcon 改变 name 时可能导致图像不显示](https://gitee.com/lyt-top/vue-next-admin/issues/I4VGE0)，感谢@axcc1234

## 2.0.1

`2022.02.25`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 svgIcon 图标组件
- 🎯 优化 vite.config.ts 打包，感谢群友@YourObjec
- 🐞 修复 tagViews 开启图标不显示问题（风格 5），感谢群友@坏人
- 🐞 修复 [Element Plus 1.2.0-beta.6 以后的版本 el-table 在移动端无法左右滑动](https://gitee.com/lyt-top/vue-next-admin/issues/I4UPTP)，感谢@YGDada

## 2.0.0

`2022.02.21`

⚡⚡⚡ 此版本为破环性更新，优化内容如下：（谨慎更新！谨慎更新！！谨慎更新！！！）。演示界面建议直接覆盖文件。如需使用之前版本，请前往[gitee 发行版](https://gitee.com/lyt-top/vue-next-admin/releases) 进行对应版本下载。基础版会基于 `master` 分支进行修改

- 🌟 更新 依赖更新最新版本
- 🌟 更新 登录页、首页
- 💔 移除 vue-web-screen-shot
- 💔 移除 城市多级联动，完整 json 数据请去 [vue-next-admin-images/menu](https://gitee.com/lyt-top/vue-next-admin-images/tree/master/menu) 仓库查看
- 💔 移除 功能/echartsTree 树图
- 💔 移除 其它设置/Tagsview 风格 2、Tagsview 风格 3
- 💔 移除 功能/验证器
- 🚧 调整 src/api 编写方式
- 🚧 调整 自定义封装公用组件演示，更好的维护
- 🎉 新增 Volar 支持，vs code 配置参考 [Vue Language Features (Volar)](https://lyt-top.gitee.io/vue-next-admin-doc-preview/home/vscode/)
- 🎉 新增 `SvgIcon` 支持本地 svg 图标使用
- 🎉 新增 表单表格验证演示
- 🎯 优化 全局主题（移除 success、info、warning、danger）
- 🎯 优化 工作流（开源）
- 🎯 优化 element plus svg 图标，`elementXXX` 改成 `ele-XXX`
- 🌈 重构 深色模式
- 🌹 合并 [处理 parent 的 h100 由于外层有 min-height 导致失效的问题](https://gitee.com/lyt-top/vue-next-admin/pulls/20)，感谢@MaxNull、@21030442-mao
- 🐞 修复 element plus 升级 `^1.3.0-beta.5` 后 组件 size 大小问题（大改：涉及布局、演示界面）
- 🐞 修复 vs code 使用 Vue Language Features (Volar) 插件 代码报红问题（可以把公用的 ts 类型定义封装起来公用）

## 1.2.2

`2021.12.21`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 iframes 滚动条问题
- 🎯 优化 部署后每次都要强制刷新清浏览器缓存问题
- 🎉 新增 工具类百分比验证演示
- 🐞 修复 [tag-view 标签右键会超出浏览器 #I4KN78](https://gitee.com/lyt-top/vue-next-admin/issues/I4KN78)

## 1.2.1

`2021.12.12`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 cropper 裁剪时卡顿问题 [#I4M2VQ](https://gitee.com/lyt-top/vue-next-admin/issues/I4M2VQ)
- 🎯 优化 Wangeditor 富文本编辑器的问题 [#I4LPC1](https://gitee.com/lyt-top/vue-next-admin/issues/I4LPC1)、[#I4LM7I](https://gitee.com/lyt-top/vue-next-admin/issues/I4LM7I)
- 🐞 修复 浏览器标题问题
- 🐞 修复 element plus svg 图标引入
- 🐞 修复 工作流不可以拖线连接问题

## 1.2.0

`2021.11.28`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 深色模式
- 🎯 优化 `/@/utils` 文件夹，合并删除单一内容
- 🎯 优化 系统设置：菜单管理（新增、修改）、角色管理（新增菜单权限）、用户管理、部门管理、字典管理
- 🎯 优化 登录界面逻辑、权限管理逻辑
- 🎯 优化 同步 [vue-next-admin-images](https://gitee.com/lyt-top/vue-next-admin-images/tree/master/menu) 后端控制菜单模拟数据
- 🎉 新增 适配 Font Icon 向 SVG Icon 迁移（改动大，"element-plus": "^1.2.0-beta.4" 谨慎更新）
- 🐞 修复 热更新问题，感谢@甜蜜蜜
- 🐞 修复 页面/element 字体图标演示
- 🐞 修复 功能/图标选择器演示，新增高级功能 [issues #I4GJXQ](https://gitee.com/lyt-top/vue-next-admin/issues/I4GJXQ)

## 1.1.2

`2021.10.17`

- 🌟 更新 依赖更新最新版本
- 🐞 修复 开启全屏时，刷新界面被还原成未全屏的状态
- 🎯 优化 tagsView 右键菜单关闭逻辑
- 🎯 优化 wangeditor 富文本编辑器（增加双向绑定）
- 🎉 新增 工作流（暂不开源）
- 🎉 新增 基础版 ts（不带国际化），切换 `vue-next-admin-template` 分支

## 1.1.1

`2021.09.25`

- 🌟 更新 依赖更新最新版本（`"element-plus": "^1.1.0-beta.13"` 版本运行错误，`^1.1.0-beta.16`修复横向菜单卡死问题）
- 🐞 修复 Dialog 弹窗位置错误、Drawer 抽屉内边距、el-menu 菜单收起时背景色问题
- 🎯 优化 锁屏界面自动锁屏(s/秒)必须设置至少 1 秒
- 🎉 新增 分栏布局，鼠标移入当前项时，显示当前项菜单内容
- 🎉 新增 工作流（未完成）

## 1.1.0

`2021.09.10`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 小屏模式下登录页二维码遮挡标题问题
- 🎉 新增 图片验证器
- 🎉 新增 动态复杂表单
- 🎉 新增 工作流（未完成）
- 🎉 新增 深色主题(伪深色，样式变动大，谨慎更新)

## 1.0.18

`2021.08.29`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 权限组件去掉顶级 div（`/src/components/auth`）
- 🎉 新增 布局配置添加恢复默认按钮
- 🐞 修复 升级 <a href="https://element-plus.gitee.io/#/zh-CN/component/changelog" target="_blank">element plus 1.1.0-beta.7</a>后项目无法启动、el-menu 菜单
- 🐞 修复 表格固定列时的层级、设置了相对定位时，遮挡左侧导航菜单问题

## 1.0.17

`2021.08.22`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 去除设置布局切换，重置主题样式（initSetLayoutChange），切换布局需手动设置样式，设置的样式自动同步各布局
- 🎯 优化 Dropdown 下拉菜单用户账号靠边时换行问题
- 🎯 优化 左侧导航菜单，共用菜单树，防止 `布局配置` 设置 `菜单 / 顶栏` 时，样式丢失等问题
- 🐞 修复 固定 header 后没有回到顶部的 bug，拉取项目后运行不起来的 bug。<a href="https://gitee.com/lyt-top/vue-next-admin/pulls/14" target="_blank">!14</a>，感谢<a href="https://gitee.com/wjs0509" target="_blank">@wjs0509</a>
- 🐞 修复 tagView 右键全屏后，浏览器窗口大小发生任何变化都会导致左边菜单显示出来，并且可点击打开对应页面。<a href="https://gitee.com/lyt-top/vue-next-admin/issues/I46E6T" target="_blank">I46E6T</a>
- 🐞 修复 默认设置 `菜单 / 顶栏` 样式不生效问题（/@/src/store/modules/themeConfig.ts）

## 1.0.16

`2021.08.14`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 菜单高亮（详情且详情设置了 meta.isHide 时，顶级菜单高亮），感谢群友@YourObject
- 🎯 优化 详情路径写法：如父级（/pages/filtering），那么详情为（/pages/filtering/details?id=1）。这样写可实现（详情时，父级菜单高亮），否则写成（/pages/filteringDetails?id=1）顶级菜单将不会高亮。可参考：`页面/过滤筛选组件`，点击当前图片进行测试
- 🎯 优化 tagsView 右键菜单全屏时，打开的界面高度问题
- 🎯 优化 图表批量 resize 问题
- 🐞 修复 菜单收起时（设置全局主题：primary 且有二级菜单时），文字高亮颜色不对
- 🐞 修复 国际化 <a href="https://gitee.com/lyt-top/vue-next-admin/issues/I43NPE" target="_blank">#I43NPE</a>。可参考：`页面/过滤筛选组件`，点击顶部语言切换，进行底部分页国际化查看

## 1.0.15

`2021.08.06`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 tagsView 右键菜单点击时的字段名（id 已修改成 contextMenuClickId）与路由中返回的 id 名冲突问题，感谢群友@伯牙已遇钟子期
- 🎉 新增 多个 form 表单验证界面演示

## 1.0.14

`2021.07.29`

- 🌟 更新 依赖更新最新版本（vue、vuex、vue-router）,出现问题，请手动降级。版本查看：<a href="https://www.npmjs.com/" target="_blank">vnpm</a>
- 🎯 优化 数据可视化图表演示加载卡顿问题、优化有图表的演示界面
- 🎯 优化 路由参数演示界面
- 🎯 优化 tagsView 操作演示界面，由于存在相同路由多标签，必须要传全部参数值（query 或者 params）
- 🎉 新增 开启 TagsView 共用，开启时：（多个路由菜单共用一个详情组件（参数为后点击的覆盖前面点击的），tagsView 中只会出现一个（不支持同时出现多个 tagsView 标签））。关闭时：（多个路由菜单共用一个详情组件，参数不同，会同时出现多个 tagsView 标签）
- 🐞 修复 tagsView 共用（单标签）时，右键菜单功能点击，参数不对的问题（第 2n+个参数未覆盖第一个参数值）
- 🐞 修复 多 tagsView 标签（参数不同）、单个 tagsView 标签公用（参数不同）所带来的刷新功能、横向自动滚动等问题
- 🐞 修复 处理全屏若干问题，<a href="https://gitee.com/lyt-top/vue-next-admin/pulls/12" target="_blank">pr!12</a>，感谢群友@另一个前端

## 1.0.13

`2021.07.25`

- 🌟 更新 依赖更新最新版本
- 🎉 新增 数据可视化演示界面（/visualizingDemo1、/visualizingDemo2）
- 🎉 新增 登录页扫码登录

## 1.0.12

`2021.07.16`

- 🌟 更新 依赖更新最新版本
- 🎉 新增 数据可视化演示空界面（待完善）
- 🎯 优化 tagsView 动态路由（xxx/:id/:name）时的右键菜单刷新、关闭其它时参数丢失问题（2021.07.15 优化）
- 🐞 修复 路由带参数时，复制路径到登录页，跳转后参数消失的问题
- 🐞 修复 设置多个外链，点击后，页面内容停留在上一个内容（内容未改变）、国际化处理、打开新窗口 sessionStorage 共享等

## 1.0.11

`2021.07.14`

- 🌟 更新 依赖更新最新版本
- 🎉 新增 路由参数、图片懒加载界面演示
- ⚠️ 警告 Form 表单 `binding value must be a string or number`，解决：加上 `label-position="top"` 不报警告（等待官方修复）
- 🎯 优化 锁屏界面动画效果、首页图表显示
- 🎯 优化 tagsView 右键菜单 `关闭` 功能逻辑
- 🐞 修复 开启 TagsView 拖拽报错及小于 `1000px` 时自动设置禁止拖拽（<a href="https://gitee.com/lyt-top/vue-next-admin/issues/I3ZRRI" target="_blank">#I3ZRRI</a>）
- 🐞 修复 `iframe 内嵌、外链` 高度问题，使用 computed 进行计算
- 🐞 修复 默认布局开启 `侧边栏 Logo` 与关闭 `菜单水平折叠`，切换到横向布局时，菜单看不见的问题
- 🐞 修复 切换不同布局时，再去开启 `经典布局分割菜单` 功能不生效问题
- 🐞 修复 浏览器窗口标题中/英文切换不实时生效的问题
- 🐞 修复 切换布局时，某些功能不可以使用。部分界面不需要取消事件监听(proxy.mittBus.off('xxx'))
- 🐞 修复 动态路由带参数，router-link 跳转问题（<a href="hhttps://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G" target="_blank">#I3YX6G</a>）
- 🐞 修复 横向菜单有二级菜单时，点击子级菜单不高亮问题
- 🐞 修复 功能 tagsView 操作演示不生效

## 1.0.10

`2021.07.07`

- 🌟 更新 依赖更新最新版本（字体图标无问题）
- 🎯 优化 内嵌 iframe、外链，解决 tagsView 刷新问题

## 1.0.9

`2021.07.02`

- 🌟 更新 依赖更新最新版本
- 🎯 优化 图标选择器设置宽度、v-model 等问题
- 🎯 优化 滚动通知栏在手机上的体验
- 🎯 优化 系统管理/新增菜单（编辑菜单），使用 `图标选择器` 进行模拟
- 🎯 优化 字体图标(自动载入) 逻辑
- 🐞 修复 screenfull 全屏时，按键盘 esc 键图标不改变问题，感谢群友@伯牙已遇钟子期

## 1.0.8

`2021.06.29`

- 🌟 更新 依赖更新最新版本
- 🎉 新增 表单中英文切换演示
- 🎯 优化 登录页查看密码 icon 图标
- 🎯 优化 图标选择器
- 🎯 优化 拖动指令
- 🐞 修复 form 表单在页面小于 576px 时的排版问题

## 1.0.7

`2021.06.24`

- 🌟 更新 依赖更新最新版本
- 🎉 新增 拖动指令及其演示界面
- 🎯 优化 锁屏界面，解锁提示
- 🎯 优化 登录页在手机上显示的效果

## 1.0.6

`2021.06.23`

- 🎯 优化 去掉内嵌 iframe 内边距（padding）
- 🎯 优化 城市多级联动组件
- 🎯 优化 Tree 树形控件改成表格组件
- 🐞 修复 Cascader 级联选择器高度问题

## 1.0.5

`2021.06.22`

- 🌟 更新 vite 降级为@vite2.3.7，降级方法 `cnpm install vite@2.3.7`，防止 element plus 字体图标消失
- 🐞 修复 开启后端控制路由（isRequestRoutes = true）时，内嵌 iframe、外链不可使用的问题

## 1.0.4

`2021.06.19`

- 🌟 更新 依赖更新最新版本（"vite": "^2.3.7"）热更新无问题
- 🎉 新增 深克隆工具，方便开发，感谢<a href="https://gitee.com/kangert" target="_blank">@kangert</a>(<a href="https://gitee.com/lyt-top/vue-next-admin/pulls/6" target="_blank">#6</a>)
- 🎯 优化 vuex 模块自动导入。感谢<a href="https://gitee.com/kangert" target="_blank">@kangert</a>(<a href="https://gitee.com/lyt-top/vue-next-admin/pulls/4" target="_blank">#4</a>)，感谢群友@web 小学生-第五君
- 🎯 优化 类型定义提高编码体验，修复不能将类型“string | undefined”分配给类型“string”的问题。感谢<a href="https://gitee.com/kangert" target="_blank">@kangert</a>(<a href="https://gitee.com/lyt-top/vue-next-admin/pulls/5" target="_blank">#5</a>)
- 🎯 优化 `layout` 文件夹移动到与 `views` 文件夹同级（改动较大，`/@/views/layout` 变成 `/@/layout`）
- 🎯 优化 页面有 `console.log` 时 `eslint` 不生效问题
- 🎯 优化 页面、ts 中 `any` 类型问题（改动较大）
- 🎯 优化 登录页在手机上显示的效果
- 🎯 优化 多行注释信息，鼠标放到方法名即可查看，更加直观的知道方法参数等。引入方法时需去掉以 `.ts` 结尾的后缀（改动较大）
- 🎯 优化 移除 `utils/storage.ts` 下的旧写法（改动较大）
- 🎯 优化 拆分 `router` 下内容，路由、前端、后端控制分开写，方便理解
- 🐞 修复 鼠标移入顶部用户信息栏 `开/关全屏` 文字反向问题
- 🐞 修复 热更新时，NextLoading（界面 loading） 不消失问题 `window.nextLoading === undefined`
- 🐞 修复 vuex 中不可以使用 `/@/api/xxx` 下的接口调用问题

## 1.0.3

`2021.06.02`

- ❄️ 删除 G6 思维导图界面
- 🌟 更新 手动更新 vue、vue-router、vuex 到最近最多人使用的版本，出现不可预测的问题请降低版本。版本查看：<a href="https://www.npmjs.com/package/vue" target="_blank">vue 版本查看</a>
- 🐞 修复 开启后端控制路由 `isRequestRoutes` 在非首页刷新页面后，回到首页的问题，感谢群友@伯牙已遇钟子期

## 1.0.2

`2021.06.01`

- 🌟 更新 依赖更新最新版本
- 🐞 修复 菜单搜索中文不可以搜索的问题，感谢群友@逍遥天意

## 1.0.1

`2021.05.31`

- 🎉 新增 更新日志文件 `CHANGELOG.md`，以后每次更新都会在这里显示对应内容
- 🌟 更新 依赖更新最新版本
- 🐞 修复 分栏、经典布局路由设置 `meta.isHide` 为 `true` 时报错问题，感谢群友@29、@芭芭拉
- 🐞 修复 经典布局点击 `tagsView` 左侧菜单数据不变问题
