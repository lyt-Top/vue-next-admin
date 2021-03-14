import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { store } from '/@/store/index.ts';
import { getSession, clearSession } from '/@/utils/storage.ts';
import { getMenuAdmin, getMenuTest } from '/@/api/menu/index.ts';

// 定义动态路由
export const dynamicRoutes = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/views/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('/@/views/home/index.vue'),
				meta: {
					title: '首页',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					auth: ['admin', 'test'],
					icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system',
				name: 'system',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				redirect: '/system/menu',
				meta: {
					title: '系统设置',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['admin'],
					icon: 'iconfont icon-xitongshezhi',
				},
				children: [
					{
						path: '/system/menu',
						name: 'systemMenu',
						component: () => import('/@/views/system/menu/index.vue'),
						meta: {
							title: '菜单管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin'],
							icon: 'iconfont icon-caidan',
						},
					},
					{
						path: '/system/user',
						name: 'systemUser',
						component: () => import('/@/views/system/user/index.vue'),
						meta: {
							title: '用户管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin'],
							icon: 'iconfont icon-icon-',
						},
					},
				],
			},
			{
				path: '/limits',
				name: 'limits',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				redirect: '/limits/frontEnd',
				meta: {
					title: '权限管理',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['admin', 'test'],
					icon: 'iconfont icon-quanxian',
				},
				children: [
					{
						path: '/limits/frontEnd',
						name: 'limitsFrontEnd',
						component: () => import('/@/views/layout/routerView/parent.vue'),
						redirect: '/limits/frontEnd/page',
						meta: {
							title: '前端控制',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
						},
						children: [
							{
								path: '/limits/frontEnd/page',
								name: 'limitsFrontEndPage',
								component: () => import('/@/views/limits/frontEnd/page/index.vue'),
								meta: {
									title: '页面权限',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									auth: ['admin', 'test'],
								},
							},
							{
								path: '/limits/frontEnd/btn',
								name: 'limitsFrontEndBtn',
								component: () => import('/@/views/limits/frontEnd/btn/index.vue'),
								meta: {
									title: '按钮权限',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									auth: ['admin', 'test'],
								},
							},
						],
					},
					{
						path: '/limits/backEnd',
						name: 'limitsBackEnd',
						component: () => import('/@/views/layout/routerView/parent.vue'),
						meta: {
							title: '后端控制',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
						},
						children: [
							{
								path: '/limits/backEnd/page',
								name: 'limitsBackEndEndPage',
								component: () => import('/@/views/limits/backEnd/page/index.vue'),
								meta: {
									title: '页面权限',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									auth: ['admin', 'test'],
								},
							},
						],
					},
				],
			},
			{
				path: '/menu',
				name: 'menu',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				redirect: '/menu/menu1',
				meta: {
					title: '菜单嵌套',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['admin', 'test'],
					icon: 'iconfont icon-caidan',
				},
				children: [
					{
						path: '/menu/menu1',
						name: 'menu1',
						component: () => import('/@/views/layout/routerView/parent.vue'),
						redirect: '/menu/menu1/menu11',
						meta: {
							title: '菜单1',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-caidan',
						},
						children: [
							{
								path: '/menu/menu1/menu11',
								name: 'menu11',
								component: () => import('/@/views/menu/menu1/menu11/index.vue'),
								meta: {
									title: '菜单11',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									auth: ['admin', 'test'],
									icon: 'iconfont icon-caidan',
								},
							},
							{
								path: '/menu/menu1/menu12',
								name: 'menu12',
								component: () => import('/@/views/layout/routerView/parent.vue'),
								redirect: '/menu/menu1/menu12/menu121',
								meta: {
									title: '菜单12',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									auth: ['admin', 'test'],
									icon: 'iconfont icon-caidan',
								},
								children: [
									{
										path: '/menu/menu1/menu12/menu121',
										name: 'menu121',
										component: () => import('/@/views/menu/menu1/menu12/menu121/index.vue'),
										meta: {
											title: '菜单121',
											isLink: '',
											isHide: false,
											isKeepAlive: true,
											isAffix: false,
											isIframe: false,
											auth: ['admin', 'test'],
											icon: 'iconfont icon-caidan',
										},
									},
									{
										path: '/menu/menu1/menu12/menu122',
										name: 'menu122',
										component: () => import('/@/views/menu/menu1/menu12/menu122/index.vue'),
										meta: {
											title: '菜单122',
											isLink: '',
											isHide: false,
											isKeepAlive: true,
											isAffix: false,
											isIframe: false,
											auth: ['admin', 'test'],
											icon: 'iconfont icon-caidan',
										},
									},
								],
							},
							{
								path: '/menu/menu1/menu13',
								name: 'menu13',
								component: () => import('/@/views/menu/menu1/menu13/index.vue'),
								meta: {
									title: '菜单13',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									auth: ['admin', 'test'],
									icon: 'iconfont icon-caidan',
								},
							},
						],
					},
					{
						path: '/menu/menu2',
						name: 'menu2',
						component: () => import('/@/views/menu/menu2/index.vue'),
						meta: {
							title: '菜单2',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-caidan',
						},
					},
				],
			},
			{
				path: '/fun',
				name: 'funIndex',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				redirect: '/fun/tagsView',
				meta: {
					title: '功能',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['admin', 'test'],
					icon: 'iconfont icon-crew_feature',
				},
				children: [
					{
						path: '/fun/tagsView',
						name: 'funTagsView',
						component: () => import('/@/views/fun/tagsView/index.vue'),
						meta: {
							title: 'tagsView 操作',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'el-icon-thumb',
						},
					},
					{
						path: '/fun/countup',
						name: 'countup',
						component: () => import('/@/views/fun/countup/index.vue'),
						meta: {
							title: 'countup 数字滚动',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'el-icon-odometer',
						},
					},
					{
						path: '/fun/echartsTree',
						name: 'echartsTree',
						component: () => import('/@/views/fun/tree/index.vue'),
						meta: {
							title: 'echartsTree 树图',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'el-icon-connection',
						},
					},
					{
						path: '/fun/selector',
						name: 'selector',
						component: () => import('/@/views/fun/selector/index.vue'),
						meta: {
							title: '图标选择器',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-xuanzeqi',
						},
					},
					{
						path: '/fun/wangEditor',
						name: 'wangEditor',
						component: () => import('/@/views/fun/wangEditor/index.vue'),
						meta: {
							title: 'wangEditor 编辑器',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-fuwenbenkuang',
						},
					},
					{
						path: '/fun/cropper',
						name: 'cropper',
						component: () => import('/@/views/fun/cropper/index.vue'),
						meta: {
							title: 'cropper 图片裁剪',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-caijian',
						},
					},
					{
						path: '/fun/mindMap',
						name: 'mindMap',
						component: () => import('/@/views/fun/mindMap/index.vue'),
						meta: {
							title: 'G6 思维导图',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-siweidaotu',
						},
					},
					{
						path: '/fun/qrcode',
						name: 'qrcode',
						component: () => import('/@/views/fun/qrcode/index.vue'),
						meta: {
							title: 'qrcode 二维码生成',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-ico',
						},
					},
					{
						path: '/fun/echartsMap',
						name: 'echartsMap',
						component: () => import('/@/views/fun/echartsMap/index.vue'),
						meta: {
							title: '地理坐标/地图',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-ditu',
						},
					},
				],
			},
			{
				path: '/pages',
				name: 'pagesIndex',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				redirect: '/pages/filtering',
				meta: {
					title: '页面',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['admin', 'test'],
					icon: 'iconfont icon-fuzhiyemian',
				},
				children: [
					{
						path: '/pages/filtering',
						name: 'filtering',
						component: () => import('/@/views/pages/filtering/index.vue'),
						meta: {
							title: '过滤筛选组件',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'el-icon-sell',
						},
					},
					{
						path: '/pages/iocnfont',
						name: 'iocnfont',
						component: () => import('/@/views/pages/iocnfont/index.vue'),
						meta: {
							title: 'iconfont 字体图标',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'el-icon-present',
						},
					},
					{
						path: '/pages/element',
						name: 'element',
						component: () => import('/@/views/pages/element/index.vue'),
						meta: {
							title: 'element 字体图标',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'el-icon-platform-eleme',
						},
					},
					{
						path: '/pages/awesome',
						name: 'awesome',
						component: () => import('/@/views/pages/awesome/index.vue'),
						meta: {
							title: 'awesome 字体图标',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'el-icon-set-up',
						},
					},
					{
						path: '/pages/cityLinkage',
						name: 'cityLinkage',
						component: () => import('/@/views/pages/cityLinkage/index.vue'),
						meta: {
							title: '城市多级联动',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-jiliandongxuanzeqi',
						},
					},
					{
						path: '/pages/formAdapt',
						name: 'formAdapt',
						component: () => import('/@/views/pages/formAdapt/index.vue'),
						meta: {
							title: '表单自适应',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-biaodan',
						},
					},
					{
						path: '/pages/listAdapt',
						name: 'listAdapt',
						component: () => import('/@/views/pages/listAdapt/index.vue'),
						meta: {
							title: '列表自适应',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['admin', 'test'],
							icon: 'iconfont icon-chazhaobiaodanliebiao',
						},
					},
				],
			},
			{
				path: '/chart',
				name: 'chartIndex',
				component: () => import('/@/views/chart/index.vue'),
				meta: {
					title: '大数据图表',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['admin', 'test'],
					icon: 'iconfont icon-ico_shuju',
				},
			},
			{
				path: '/personal',
				name: 'personal',
				component: () => import('/@/views/personal/index.vue'),
				meta: {
					title: '个人中心',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['admin', 'test'],
					icon: 'iconfont icon-gerenzhongxin',
				},
			},
			{
				path: '/tools',
				name: 'tools',
				component: () => import('/@/views/tools/index.vue'),
				meta: {
					title: '工具类集合',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['admin', 'test'],
					icon: 'iconfont icon-gongju',
				},
			},
			{
				path: '/link',
				name: 'layoutLinkView',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				meta: {
					title: '外链',
					isLink: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					auth: ['admin'],
					icon: 'iconfont icon-caozuo-wailian',
				},
			},
			{
				path: '/iframes',
				name: 'layoutIfameView',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				meta: {
					title: '内嵌 iframe',
					isLink: 'https://gitee.com/lyt-top/vue-admin-wonderful',
					isHide: false,
					isKeepAlive: false,
					isAffix: true,
					isIframe: true,
					auth: ['admin'],
					icon: 'iconfont icon-neiqianshujuchucun',
				},
			},
		],
	},
];

// 定义静态路由
const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登陆',
		},
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: '找不到此页面',
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: '没有权限',
		},
	},
];

// 定义404界面
const pathMatch = {
	path: '/:path(.*)*',
	redirect: '/404',
};

// 获取目录下的 .vue 全部文件，参考 vite：import.meta.glob
const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,tsx}');

// 添加静态路由
const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
});

// 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
export function getBackEndControlRoutes(callback: any) {
	const token = getSession('token');
	if (!token) return false;
	store.dispatch('userInfos/setUserInfos');
	const auth = store.state.userInfos.userInfos.authPageList[0]; // 模拟 admin 与 test
	if (auth === 'admin') {
		getMenuAdmin()
			.then((res: any) => {
				callback(res);
			})
			.catch(() => {});
	} else {
		getMenuTest()
			.then((res: any) => {
				callback(res);
			})
			.catch(() => {});
	}
}

// 后端控制路由，模拟执行路由数据初始化
export function setBackEndControlRoutesFun(res: any, callback?: any) {
	initBackEndControlRoutesFun(res);
	window.location.href = window.location.href; // 防止页面刷新时，出现空白或404
	callback(res);
}

// 后端控制路由，动态添加菜单时（刷新菜单）
export function setBackEndControlRefreshRoutes() {
	getBackEndControlRoutes((res: any) => {
		initBackEndControlRoutesFun(res);
	});
}

// 后端控制路由，模拟执行路由数据初始化
const initBackEndControlRoutesFun = (res: any) => {
	const oldRoutes = JSON.parse(JSON.stringify(res.data));
	store.dispatch('requestOldRoutes/setBackEndControlRoutes', oldRoutes);
	dynamicRoutes[0].children = backEndRouter(res.data);
	resetRoute(); // 删除/重置路由
	router.addRoute(pathMatch); // 添加404界面
	setAddRoute(); // 添加动态路由
	setFilterMenu(); // 过滤权限菜单
	setCacheTagsViewRoutes(); // 添加 keepAlive 缓存
};

// 后端控制路由，后端路由 component 转换
export function backEndRouter(routes: any) {
	if (!routes) return;
	return routes.map((item: any) => {
		const { component } = item;
		const { children } = item;
		if (component) item.component = dynamicImport(dynamicViewsModules, component as string);
		children && backEndRouter(children);
		return item;
	});
}

// 后端控制路由，后端路由 component 转换函数
export function dynamicImport(dynamicViewsModules: Record<string, () => Promise<{ [key: string]: any }>>, component: string) {
	const keys = Object.keys(dynamicViewsModules);
	const matchKeys = keys.filter((key) => {
		const k = key.replace('../views', '');
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
	});
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return dynamicViewsModules[matchKey];
	}
	if (matchKeys?.length > 1) {
		console.warn('Do not create files that do not end with. Vue');
		return false;
	}
}

// 多级嵌套数组处理成一维数组
export function formatFlatteningRoutes(arr: any) {
	if (arr.length < 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

// 多级嵌套数组处理后的一维数组，再处理成 `定义动态路由` 的格式
// 只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存
// isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
export function formatTwoStageRoutes(arr: any) {
	if (arr.length < 0) return false;
	const newArr: any = [];
	const cacheList: Array<string> = [];
	arr.map((v: any) => {
		if (v.path === '/') {
			newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] });
		} else {
			newArr[0].children.push({ ...v });
			if (newArr[0].meta.isKeepAlive && v.meta.isKeepAlive) {
				cacheList.push(v.name);
				store.dispatch('keepAliveNames/setCacheKeepAlive', cacheList);
			}
		}
	});
	return newArr;
}

// 缓存多级嵌套数组处理后的一维数组(tagsView、菜单搜索中使用：未过滤隐藏的(isHide))
export function setCacheTagsViewRoutes() {
	// 先处理有权限的路由，否则 tagsView、菜单搜索中无权限的路由也将显示
	let authsRoutes = setFilterMenuFun(dynamicRoutes, store.state.userInfos.userInfos.authPageList);
	// 添加到 vuex setTagsViewRoutes 中
	store.dispatch('tagsViewRoutes/setTagsViewRoutes', formatTwoStageRoutes(formatFlatteningRoutes(authsRoutes))[0].children);
}

// 获取当前用户的权限去比对路由表，用于左侧菜单/横向菜单的显示
export function setFilterMenu() {
	store.dispatch('routesList/setRoutesList', setFilterMenuFun(dynamicRoutes[0].children, store.state.userInfos.userInfos.authPageList));
}

// 判断路由 auth 中是否包含当前登录用户权限字段
export function hasAuth(auths: any, route: any) {
	if (route.meta && route.meta.auth) return auths.some((auth: any) => route.meta.auth.includes(auth));
	else return true;
}

// 递归过滤有权限的路由
export function setFilterMenuFun(routes: any, auth: any) {
	const menu: any = [];
	routes.map((route: any) => {
		const item = { ...route };
		if (hasAuth(auth, item)) {
			if (item.children) item.children = setFilterMenuFun(item.children, auth);
			menu.push(item);
		}
	});
	return menu;
}

// 获取当前用户的权限去比对路由表，用于动态路由的添加
export function setFilterRoute() {
	let filterRoute: any = [];
	formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))[0].children.map((route: any) => {
		if (route.meta.auth)
			route.meta.auth.map((metaAuth: any) => {
				store.state.userInfos.userInfos.authPageList.map((auth: any) => {
					if (metaAuth === auth) filterRoute.push({ ...route });
				});
			});
	});
	return filterRoute;
}

// 比对后的路由表，进行重新赋值
export function setFilterRouteEnd() {
	let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes));
	filterRouteEnd[0].children = setFilterRoute();
	return filterRouteEnd;
}

// 添加动态路由
export function setAddRoute() {
	setFilterRouteEnd().map((route: any) => {
		router.addRoute((route as unknown) as RouteRecordRaw);
	});
}

// 删除/重置路由
export function resetRoute() {
	setFilterRouteEnd().map((route: any) => {
		const { name } = route;
		router.hasRoute(name) && router.removeRoute(name);
	});
}

// 初始化方法，防止刷新时丢失
export function initAllFun() {
	const token = getSession('token');
	if (!token) return false;
	store.dispatch('userInfos/setUserInfos'); // 触发初始化用户信息
	setAddRoute(); // 添加动态路由
	router.addRoute(pathMatch); // 添加404界面
	setFilterMenu(); // 过滤权限菜单
	setCacheTagsViewRoutes(); // 添加 keepAlive 缓存
}

// 初始化方法执行
const requestRoutes = store.state.themeConfig.themeConfig.isRequestRoutes;
if (!requestRoutes) initAllFun();
// 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
if (requestRoutes)
	getBackEndControlRoutes((res: any) => {
		setBackEndControlRoutesFun(res);
	});

// 路由加载前
router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} - ${store.state.themeConfig.themeConfig.globalTitle}` || store.state.themeConfig.themeConfig.globalTitle;
	NProgress.configure({ showSpinner: false });
	if (to.meta.title) NProgress.start();
	const token = getSession('token');
	if (to.path === '/login' && !token) {
		next();
		NProgress.done();
	} else {
		if (!token) {
			next('/login');
			clearSession();
			resetRoute();
			NProgress.done();
		} else if (token && to.path === '/login') {
			next('/home');
			NProgress.done();
		} else {
			next();
		}
	}
});

// 路由加载后
router.afterEach(() => {
	NProgress.done();
});

// 导出路由
export default router;
