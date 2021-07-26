import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { TagsViewRoutesState, RootStateTypes } from '/@/store/interface/index';
import { ElMessage } from 'element-plus';
import screenfull from 'screenfull';

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
		setCurrenFullscreen(state: any, data: boolean) {
			state.isCurrenFullscreen = data;
		},
	},
	actions: {
		// 设置 TagsView 路由
		async setTagsViewRoutes({ commit }, data: Array<string>) {
			commit('getTagsViewRoutes', data);
		},
		// 开启卡片全屏
		openCurrenFullscreen({ commit }) {
			if (!screenfull.isEnabled) {
				ElMessage.warning('暂不不支持全屏');
				return false;
			}
			screenfull.toggle();
			const currenFullscreenChange = () => {
				if (screenfull.isFullscreen) commit('setCurrenFullscreen', true);
				else {
					screenfull.off('change', currenFullscreenChange);
					commit('setCurrenFullscreen', false);
				}
			};
			screenfull.on('change', currenFullscreenChange);
			commit('setCurrenFullscreen', true);
		},
	},
};

export default tagsViewRoutesModule;
