import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { TagsViewRoutesState, RootStateTypes } from '/@/store/interface/index';
import { Session } from '/@/utils/storage';

const tagsViewRoutesModule: Module<TagsViewRoutesState, RootStateTypes> = {
	namespaced: true,
	state: {
		tagsViewRoutes: [],
		isTagsViewCurrenFull: false,
	},
	mutations: {
		// 设置 TagsView 路由
		getTagsViewRoutes(state: any, data: Array<string>) {
			state.tagsViewRoutes = data;
		},
		// 设置卡片全屏
		getCurrenFullscreen(state: any, bool: boolean) {
			Session.set('isTagsViewCurrenFull', bool);
			state.isTagsViewCurrenFull = bool;
		},
	},
	actions: {
		// 设置 TagsView 路由
		async setTagsViewRoutes({ commit }, data: Array<string>) {
			commit('getTagsViewRoutes', data);
		},
		// 设置卡片全屏
		setCurrenFullscreen({ commit }, bool: Boolean) {
			commit('getCurrenFullscreen', bool);
		},
	},
};

export default tagsViewRoutesModule;
