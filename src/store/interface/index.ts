// 接口类型声明

// 布局配置
declare interface ThemeConfigState {
	themeConfig: {
		isDrawer: boolean;
		primary: string;
		success: string;
		info: string;
		warning: string;
		danger: string;
		topBar: string;
		menuBar: string;
		columnsMenuBar: string;
		topBarColor: string;
		menuBarColor: string;
		columnsMenuBarColor: string;
		isTopBarColorGradual: boolean;
		isMenuBarColorGradual: boolean;
		isMenuBarColorHighlight: boolean;
		isCollapse: boolean;
		isUniqueOpened: boolean;
		isFixedHeader: boolean;
		isFixedHeaderChange: boolean;
		isClassicSplitMenu: boolean;
		isLockScreen: boolean;
		lockScreenTime: number;
		isShowLogo: boolean;
		isShowLogoChange: boolean;
		isBreadcrumb: boolean;
		isTagsview: boolean;
		isBreadcrumbIcon: boolean;
		isTagsviewIcon: boolean;
		isCacheTagsView: boolean;
		isSortableTagsView: boolean;
		isFooter: boolean;
		isGrayscale: boolean;
		isInvert: boolean;
		isWartermark: boolean;
		wartermarkText: string;
		tagsStyle: string;
		animation: string;
		columnsAsideStyle: string;
		layout: string;
		isRequestRoutes: boolean;
		globalTitle: string;
		globalViceTitle: string;
		globalI18n: string;
	};
}

// 路由列表
declare interface RoutesListState {
	routesList: Array<object>;
}

// 路由缓存列表
declare interface KeepAliveNamesState {
	keepAliveNames: Array<string>;
}

// TagsView 路由列表
declare interface TagsViewRoutesState {
	tagsViewRoutes: Array<object>;
}

// 用户信息
declare interface UserInfosState {
	userInfos: object;
}

// 后端返回原始路由(未处理时)
declare interface RequestOldRoutesState {
	requestOldRoutes: Array<object>;
}

// 主接口(顶级类型声明)
declare interface RootStateTypes {
	themeConfig: ThemeConfigState;
	routesList: RoutesListState;
	keepAliveNames: KeepAliveNamesState;
	tagsViewRoutes: TagsViewRoutesState;
	userInfos: UserInfosState;
	requestOldRoutes: RequestOldRoutesState;
}
