import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import themeConfig from '/@/store/modules/themeConfig';
import routesList from '/@/store/modules/routesList';
import keepAliveNames from '/@/store/modules/keepAliveNames';
import tagsViewRoutes from '/@/store/modules/tagsViewRoutes';
import userInfos from '/@/store/modules/userInfos';
import requestOldRoutes from '/@/store/modules/requestOldRoutes';

export const key: InjectionKey<Store<RootStateTypes>> = Symbol();

export const store = createStore<RootStateTypes>({
	modules: {
		themeConfig,
		routesList,
		keepAliveNames,
		tagsViewRoutes,
		userInfos,
		requestOldRoutes,
	},
});

export function useStore() {
	return baseUseStore(key);
}
