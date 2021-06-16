import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, ModuleTree } from 'vuex';
import { RootStateTypes } from '/@/store/interface/index';

let modules: ModuleTree<object> = {}
const modulesFiles: Record<string, Function> = import.meta.glob('./modules/*.ts')
for (const path in modulesFiles) {
    const moduleName: string = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
    let module: ModuleTree<object> = await modulesFiles[path]()
    modules = { ...modules, [moduleName]:module.default}
}

export const key: InjectionKey<Store<RootStateTypes>> = Symbol();

export const store = createStore<RootStateTypes>({
	modules
});

export function useStore() {
	return baseUseStore(key);
}
