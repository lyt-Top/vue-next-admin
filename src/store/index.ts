import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { RootStateTypes } from '/@/store/interface/index';
import themeConfig from '/@/store/modules/themeConfig.ts';
import routesList from '/@/store/modules/routesList.ts';
import keepAliveNames from '/@/store/modules/keepAliveNames.ts';
import tagsViewRoutes from '/@/store/modules/tagsViewRoutes.ts';
import userInfos from '/@/store/modules/userInfos.ts';
import requestOldRoutes from '/@/store/modules/requestOldRoutes.ts';

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
