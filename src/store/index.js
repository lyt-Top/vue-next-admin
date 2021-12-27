import { createStore } from 'vuex';

// Vite supports importing multiple modules from the file system using the special import.meta.glob function
// see https://cn.vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager('./modules/*.js');
const pathList = [];

for (const path in modulesFiles) {
	pathList.push(path);
}

const modules = pathList.reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1');
	const value = modulesFiles[modulePath];
	modules[moduleName] = value.default;
	return modules;
}, {});

export const store = createStore({ modules });
