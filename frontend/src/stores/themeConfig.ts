/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 21:13:31
 * @FilePath: \frontend\src\stores\themeConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-21 10:36:08
 * @FilePath: \tsplatform\frontend\src\stores\themeConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';
import { ThemeConfigStates, ThemeConfigState } from './interface';

/**
 * 布局配置
 * 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I567R1，感谢@lanbao123
 * 2020.05.28 by lyt 优化。开发时配置不生效问题
 * 修改配置时：
 * 1、需要每次都清理 `window.localStorage` 浏览器永久缓存
 * 2、或者点击布局配置最底部 `一键恢复默认` 按钮即可看到效果
 */
export const useThemeConfig = defineStore('themeConfig', {
	state: (): ThemeConfigStates => ({
		themeConfig: {
			//密码加密盐
			"passwordKey": `4vRk^ga52xVP$B2vYK$%r8a8hctLgbU9`,
			"isDrawer": false,
			"primary": "#409eff",
			"isIsDark": false,
			"topBar": "#ffffff",
			"topBarColor": "#606266",
			"isTopBarColorGradual": false,
			"menuBar": "#545c64",
			"menuBarColor": "#eaeaea",
			"isMenuBarColorGradual": false,
			"columnsMenuBar": "#545c64",
			"columnsMenuBarColor": "#e6e6e6",
			"isColumnsMenuBarColorGradual": false,
			"isColumnsMenuHoverPreload": false,
			"isCollapse": false,
			"isUniqueOpened": true,
			"isFixedHeader": false,
			"isFixedHeaderChange": false,
			"isClassicSplitMenu": false,
			"isLockScreen": false,
			"lockScreenTime": 30,
			"isShowLogo": true,
			"isShowLogoChange": false,
			"isBreadcrumb": true,
			"isTagsview": true,
			"isBreadcrumbIcon": true,
			"isTagsviewIcon": true,
			"isCacheTagsView": false,
			"isSortableTagsView": true,
			"isShareTagsView": false,
			"isFooter": true,
			"isGrayscale": false,
			"isInvert": false,
			"isWartermark": false,
			"wartermarkText": "vue-next-admin",
			"tagsStyle": "tags-style-five",
			"animation": "opacitys",
			"columnsAsideStyle": "columns-round",
			"columnsAsideLayout": "columns-vertical",
			"layout": "defaults",
			"isRequestRoutes": true,
			"globalTitle": "甜蜜蜜开放平台",
			"globalViceTitle": "甜蜜蜜开放平台",
			"globalViceTitleMsg": "专注、免费、开源、维护、解疑",
			"globalI18n": "zh-cn",
			"globalComponentSize": "large"
		}
	}),
	actions: {
		setThemeConfig(data: ThemeConfigState) {
			this.themeConfig = data;
		},
	},
});
