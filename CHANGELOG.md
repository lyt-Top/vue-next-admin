# <a href="https://gitee.com/lyt-top/vue-next-admin" target="_blank">vue-next-admin 更新日志</a>

🎉🎉🔥 `vue-next-admin` 基于 vue3.x 、Typescript、vite、Element plus 等，适配手机、平板、pc 的后台开源免费模板库（vue2.x 请切换 vue-prev-admin 分支）

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
