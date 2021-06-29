# <a href="https://gitee.com/lyt-top/vue-next-admin" target="_blank">vue-next-admin 更新日志</a>

🎉🎉🔥 `vue-next-admin` 基于 vue3.x 、Typescript、vite、Element plus 等，适配手机、平板、pc 的后台开源免费模板库（vue2.x 请切换 vue-prev-admin 分支）

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
