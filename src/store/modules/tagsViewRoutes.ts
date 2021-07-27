import { Module } from 'vuex';
import { ElMessage } from 'element-plus';
import screenfull from 'screenfull';
import { Local } from '/@/utils/storage';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { TagsViewRoutesState, RootStateTypes } from '/@/store/interface/index';

const tagsViewRoutesModule: Module<TagsViewRoutesState, RootStateTypes> = {
	namespaced: true,
	state: {
		tagsViewRoutes: [],
		isCurrenFullscreen: false,
	},
	mutations: {
		// 设置 TagsView 路由
		getTagsViewRoutes(state: any, data: Array<string>) {
			state.tagsViewRoutes = data;
		},
		// 设置卡片全屏
		getCurrenFullscreen(state: any, data: boolean) {
			state.isCurrenFullscreen = data;
		},
	},
	actions: {
		// 设置 TagsView 路由
		async setTagsViewRoutes({ commit }, data: Array<string>) {
			commit('getTagsViewRoutes', data);
		},
		// 设置卡片全屏
		setCurrenFullscreen({ commit }, timeout: number = 0) {
			const screenfulls: any = screenfull;
			if (!screenfulls.isEnabled) {
				ElMessage.warning('暂不不支持全屏');
				return false;
			}
			setTimeout(() => {
				const currenFullscreenChange = () => {
					const layoutViewBgWhite = document.querySelector('.layout-view-bg-white') as HTMLElement;
					if (screenfulls.isFullscreen) {
						commit('getCurrenFullscreen', true);
						// 设置全屏时，设置有 `layout-view-bg-white` 类的高度
						if (layoutViewBgWhite) layoutViewBgWhite.style.height = `calc(100vh - 30px)`;
					} else {
						screenfulls.off('change', currenFullscreenChange);
						commit('getCurrenFullscreen', false);
						if (!layoutViewBgWhite) return false;
						const getThemeConfig = Local.get('themeConfig');
						if (getThemeConfig) {
							let { isTagsview } = getThemeConfig;
							if (isTagsview) layoutViewBgWhite.style.height = `calc(100vh - 114px)`;
							else layoutViewBgWhite.style.height = `calc(100vh - 80px)`;
						}
					}
				};
				screenfulls.on('change', currenFullscreenChange);
				screenfulls.toggle();
			}, timeout);
		},
	},
};

export default tagsViewRoutesModule;
