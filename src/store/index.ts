import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { RootStateTypes } from '/@/store/interface/index';
import themeConfig from '/@/store/modules/themeConfig.ts';
import routesList from '/@/store/modules/routesList.ts';
import keepAliveNames from '/@/store/modules/keepAliveNames.ts';
import tagsViewRoutes from '/@/store/modules/tagsViewRoutes.ts';
import userInfos from '/@/store/modules/userInfos.ts';
import requestOldRoutes from '/@/store/modules/requestOldRoutes.ts';

// const modulesFiles: Record<string, Function> = import.meta.glob('./modules/*.ts');

// npm run build
// https://github.com/vitejs/vite/issues/3035
// Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2019", "firefox78", "safari13.1")
// let modules: ModuleTree<object> = {};
// for (const path in modulesFiles) {
// 	const moduleName: string = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
// 	let module: ModuleTree<object> = await modulesFiles[path]();
// 	modules = { ...modules, [moduleName]: module.default };
// }

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
