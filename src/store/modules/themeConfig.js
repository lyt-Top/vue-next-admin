/**
 * 2020.05.28 by lyt 优化
 * 修改一下配置时，需要每次都清理 `window.localStorage` 浏览器永久缓存，配置才会生效
 */
const themeConfigModule = {
	namespaced: true,
	state: {
		themeConfig: {
			// 是否开启布局配置抽屉
			isDrawer: false,

			/**
			 * 全局主题
			 */
			// 默认 primary 主题颜色
			primary: '#409eff',
			// 是否开启深色模式
			isIsDark: false,

			/**
			 * 菜单 / 顶栏
			 * 请注意：
			 * 需要同时修改 `/@/theme/common/var.scss` 对应的值，
			 * 不提供像 vue-next-admin 一样的实现
			 */
			// 默认顶栏导航背景颜色
			topBar: '#ffffff',
			// 默认顶栏导航字体颜色
			topBarColor: '#606266',
			// 默认菜单导航背景颜色
			menuBar: '#545c64',
			// 默认菜单导航字体颜色
			menuBarColor: '#eaeaea',
			// 默认分栏菜单背景颜色
			columnsMenuBar: '#545c64',
			// 默认分栏菜单字体颜色
			columnsMenuBarColor: '#e6e6e6',

			/**
			 * 界面设置
			 */
			// 是否开启菜单水平折叠效果
			isCollapse: false,
			// 是否开启菜单手风琴效果
			isUniqueOpened: false,
			// 是否开启固定 Header
			isFixedHeader: false,

			/**
			 * 界面显示
			 */
			// 是否开启侧边栏 Logo
			isShowLogo: false,
			// 是否开启 Breadcrumb
			isBreadcrumb: true,
			// 是否开启 Breadcrumb 图标
			isBreadcrumbIcon: false,
			// 是否开启 Tagsview
			isTagsview: true,
			// 是否开启 Tagsview 图标
			isTagsviewIcon: false,
			// 是否开启 TagsView 缓存
			isCacheTagsView: false,
			// 是否开启 Footer 底部版权信息
			isFooter: false,
			// 是否开启灰色模式
			isGrayscale: false,
			// 是否开启色弱模式
			isInvert: false,

			/**
			 * 其它设置
			 */
			// 默认 Tagsview 风格，可选 1、 tags-style-one，自行扩展：
			// 1、需修改 @/layout/navBars/topBar/setings.vue `getThemeConfig.tagsStyle` el-option
			// 2、需修改 @/layout/navBars/tagsView/tagsView.vue 代码最底部注释部分 css 样式
			tagsStyle: 'tags-style-one',
			// 主页面切换动画：可选值"<slide-right|slide-left|opacitys>"，默认 slide-right
			animation: 'slide-right',
			// 分栏高亮风格：可选值"<columns-round|columns-card>"，默认 columns-round
			columnsAsideStyle: 'columns-round',
			// 分栏布局风格：可选值"<columns-horizontal|columns-vertical>"，默认 columns-horizontal
			columnsAsideLayout: 'columns-vertical',

			/**
			 * 布局切换
			 * 注意：为了演示，切换布局时，颜色会被还原成默认，代码位置：/@/layout/navBars/topBar/setings.vue
			 * 中的 `initSetLayoutChange(设置布局切换，重置主题样式)` 方法
			 */
			// 布局切换：可选值"<defaults|classic|transverse|columns>"，默认 defaults
			layout: 'defaults',

			/**
			 * 全局网站标题 / 副标题
			 */
			// 网站主标题（菜单导航、浏览器当前网页标题）
			globalTitle: 'vue-prev-admin',
			// 网站副标题（登录页顶部文字）
			globalViceTitle: 'SMALL@小柒',
			// 网站描述（登录页顶部文字）
			globalViceDes: 'vue2.x后台管理系统免费开源模板',
			// 默认初始语言，可选值"<zh-cn|en|zh-tw>"，默认 zh-cn
			globalI18n: 'zh-cn',
			// 默认全局组件大小，可选值"<|medium|small|mini>"，默认 ''
			globalComponentSize: '',
		},
	},
	mutations: {
		// 设置布局配置
		getThemeConfig(state, data) {
			state.themeConfig = data;
		},
	},
	actions: {
		// 设置布局配置
		setThemeConfig({ commit }, data) {
			commit('getThemeConfig', data);
		},
	},
};

export default themeConfigModule;
