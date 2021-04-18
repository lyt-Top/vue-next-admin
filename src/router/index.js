import Vue from 'vue';
import store from '../store';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getSession, clearSession } from '@/utils/storage';
import { PrevLoading } from '@/utils/loading.js';
import { getMenuAdmin, getMenuTest } from '@/api/menu';

// 解决 `element ui` 导航栏重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

// 安装 VueRouter 插件
Vue.use(VueRouter);

// 定义静态路由
const staticRoutes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: '找不到此页面',
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('@/views/error/401.vue'),
		meta: {
			title: '没有权限',
		},
	},
];

// 加载静态路由
const createRouter = () =>
	new VueRouter({
		scrollBehavior: () => ({ y: 0 }),
		routes: staticRoutes,
	});

// 创建路由
const router = createRouter();

// 加载 loading
PrevLoading.start();

// 多级嵌套数组处理成一维数组
export function formatFlatteningRoutes(arr) {
	if (arr.length < 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

// 处理 tagsViewList 数据，默认路由全部缓存
// isKeepAlive 处理 `name` 值，进行路由缓存
export function formatTwoStageRoutes(arr) {
	if (arr.length < 0) return false;
	const newArr = [];
	const cacheList = [];
	arr.forEach((v) => {
		newArr.push({ ...v });
		cacheList.push(v.name);
		store.dispatch('keepAliveNames/setCacheKeepAlive', cacheList);
	});
	return newArr;
}

// 判断路由 auth 中是否包含当前登录用户权限字段
export function hasAuth(auths, route) {
	if (route.meta && route.meta.auth) return auths.some((auth) => route.meta.auth.includes(auth));
	else return true;
}

// 递归过滤有权限的路由
export function setFilterMenuFun(routes, auth) {
	const menu = [];
	routes.forEach((route) => {
		const item = { ...route };
		if (hasAuth(auth, item)) {
			if (item.children) item.children = setFilterMenuFun(item.children, auth);
			menu.push(item);
		}
	});
	return menu;
}

// 缓存多级嵌套数组处理后的一维数组(tagsView、菜单搜索中使用：未过滤隐藏的(isHide))
export function setCacheTagsViewRoutes(arr) {
	// 先处理有权限的路由，否则 tagsView、菜单搜索中无权限的路由也将显示
	let authsRoutes = setFilterMenuFun(arr, store.state.userInfos.userInfos.authPageList);
	// 添加到 vuex setTagsViewRoutes 中
	store.dispatch('tagsViewRoutes/setTagsViewRoutes', formatTwoStageRoutes(formatFlatteningRoutes(authsRoutes)));
}

// 递归处理多余的 layout : <router-view>，让需要访问的组件保持在第一层 layout 层。
// 因为 `keep-alive` 只能缓存二级路由
// 默认初始化时就执行
export function keepAliveSplice(to) {
	if (to.matched && to.matched.length > 2) {
		to.matched.map((v, k) => {
			if (v.components.default instanceof Function) {
				v.components.default().then((components) => {
					if (components.default.name === 'parent') {
						to.matched.splice(k, 1);
						router.push({ path: to.path, query: to.query });
						keepAliveSplice(to);
					}
				});
			} else {
				if (v.components.default.name === 'parent') {
					to.matched.splice(k, 1);
					keepAliveSplice(to);
				}
			}
		});
	}
}

// 处理后端返回的 `component` 路径，拼装实现懒加载
export function loadView(path) {
	return () => import(`@/views/${path}`);
}

// 递归处理每一项 `component` 中的路径
export function dynamicRouter(view) {
	if (view.component) view.component = loadView(view.component);
	if (view.children) view.children.map((item) => dynamicRouter(item));
	return view;
}

// 添加动态路由，`{ path: '*', redirect: '/404' }` 防止页面刷新，静态路由丢失问题
// next({ ...to, replace: true }) 动态路由 addRoute 完毕后才放行，防止刷新时 NProgress 进度条加载2次
// 文档地址：https://router.vuejs.org/zh/api/#router-addroutes
export function adminUser(router, to, next) {
	getMenuAdmin()
		.then((res) => {
			resetRouter();
			// 读取用户信息，获取对应权限进行判断
			store.dispatch('userInfos/setUserInfos');
			store.dispatch('routesList/setRoutesList', setFilterMenuFun(res.data.children, store.state.userInfos.userInfos.authPageList));
			res.data.children = store.state.routesList.routesList;
			[dynamicRouter(res.data), { path: '*', redirect: '/404' }].forEach((route) => {
				router.addRoute({ ...route });
			});
			setCacheTagsViewRoutes(JSON.parse(JSON.stringify(res.data.children)));
			next({ ...to, replace: true });
		})
		.catch(() => {});
}

// 添加动态路由，`{ path: '*', redirect: '/404' }` 防止页面刷新，静态路由丢失问题
export function testUser(router, to, next) {
	getMenuTest()
		.then((res) => {
			resetRouter();
			// 读取用户信息，获取对应权限进行判断
			store.dispatch('userInfos/setUserInfos');
			store.dispatch('routesList/setRoutesList', setFilterMenuFun(res.data.children, store.state.userInfos.userInfos.authPageList));
			res.data.children = store.state.routesList.routesList;
			[dynamicRouter(res.data), { path: '*', redirect: '/404' }].forEach((route) => {
				router.addRoute({ ...route });
			});
			setCacheTagsViewRoutes(JSON.parse(JSON.stringify(res.data.children)));
			next({ ...to, replace: true });
		})
		.catch(() => {});
}

// 重置路由
export function resetRouter() {
	router.matcher = createRouter().matcher;
}

// 路由加载前
router.beforeEach((to, from, next) => {
	NProgress.configure({ showSpinner: false });
	if (to.meta.title) NProgress.start();
	keepAliveSplice(to);
	let token = getSession('token');
	if (to.path === '/login' && !token) {
		next();
		NProgress.done();
	} else {
		if (!token) {
			next('/login');
			clearSession();
			NProgress.done();
		} else if (token && to.path === '/login') {
			next('/home');
			NProgress.done();
		} else {
			// 动态加载后端返回路由路由(模拟数据)
			if (!getSession('userInfo')) return false;
			if (Object.keys(store.state.routesList.routesList).length <= 0) {
				if (getSession('userInfo').userName === 'admin') adminUser(router, to, next);
				else if (getSession('userInfo').userName === 'test') testUser(router, to, next);
			} else {
				next();
			}
		}
	}
});

// 路由加载后
router.afterEach(() => {
	NProgress.done();
	PrevLoading.done();
});

// 导出路由
export default router;
