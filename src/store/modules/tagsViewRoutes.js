import { Session } from '/@/utils/storage';

const tagsViewRoutesModule = {
	namespaced: true,
	state: {
		tagsViewRoutes: [],
		isTagsViewCurrenFull: false,
	},
	mutations: {
		// 设置 TagsView 路由
		getTagsViewRoutes(state, data) {
			state.tagsViewRoutes = data;
		},
		// 设置卡片全屏
		getCurrenFullscreen(state, bool) {
			Session.set('isTagsViewCurrenFull', bool);
			state.isTagsViewCurrenFull = bool;
		},
	},
	actions: {
		// 设置 TagsView 路由
		async setTagsViewRoutes({ commit }, data) {
			commit('getTagsViewRoutes', data);
		},
		// 设置卡片全屏
		setCurrenFullscreen({ commit }, bool) {
			commit('getCurrenFullscreen', bool);
		},
	},
};

export default tagsViewRoutesModule;
