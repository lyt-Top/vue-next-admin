import Vue from 'vue';
import Vuex from 'vuex';
import routesList from '@/store/modules/routesList.js';
import tagsViewRoutes from '@/store/modules/tagsViewRoutes.js';
import keepAliveNames from '@/store/modules/keepAliveNames.js';
import userInfos from '@/store/modules/userInfos.js';
import themeConfig from '@/store/modules/themeConfig.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		routesList,
		tagsViewRoutes,
		keepAliveNames,
		userInfos,
		themeConfig,
	},
});
