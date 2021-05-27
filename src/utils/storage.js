// 1. localStorage
// 设置永久缓存
export function setLocal(key, val) {
	window.localStorage.setItem(key, JSON.stringify(val));
}
// 获取永久缓存
export function getLocal(key) {
	let json = window.localStorage.getItem(key);
	return JSON.parse(json);
}
// 移除永久缓存
export function removeLocal(key) {
	window.localStorage.removeItem(key);
}
// 移除全部永久缓存
export function clearLocal() {
	window.localStorage.clear();
}

// 2. sessionStorage
// 设置临时缓存
export function setSession(key, val) {
	window.sessionStorage.setItem(key, JSON.stringify(val));
}
// 获取临时缓存
export function getSession(key) {
	let json = window.sessionStorage.getItem(key);
	return JSON.parse(json);
}
// 移除临时缓存
export function removeSession(key) {
	window.sessionStorage.removeItem(key);
}
// 移除全部临时缓存
export function clearSession() {
	window.sessionStorage.clear();
}

// 新写法，简单易记，建议使用
// 1、window.localStorage   浏览器永久缓存
export const Local = {
	// 设置永久缓存
	set(key, val) {
		window.localStorage.setItem(key, JSON.stringify(val));
	},
	// 获取永久缓存
	get(key) {
		let json = window.localStorage.getItem(key);
		return JSON.parse(json);
	},
	// 移除永久缓存
	remove(key) {
		window.localStorage.removeItem(key);
	},
	// 移除全部永久缓存
	clear() {
		window.localStorage.clear();
	},
};

// 2、window.sessionStorage 浏览器临时缓存
export const Session = {
	// 设置临时缓存
	set(key, val) {
		window.sessionStorage.setItem(key, JSON.stringify(val));
	},
	// 获取临时缓存
	get(key) {
		let json = window.sessionStorage.getItem(key);
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key) {
		window.sessionStorage.removeItem(key);
	},
	// 移除全部临时缓存
	clear() {
		window.sessionStorage.clear();
	},
};
