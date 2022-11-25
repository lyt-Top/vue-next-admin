// mitt 事件类型定义
export type MittType = {
	openSetingsDrawer?: string; // 打开布局设置弹窗
	restoreDefault?: string; // 分栏布局，鼠标移入、移出数据显示
	setSendColumnsChildren?: string; // 分栏布局，鼠标移入、移出菜单数据传入到 navMenu 下的菜单中
	setSendClassicChildren?: string; // 经典布局，开启切割菜单时，菜单数据传入到 navMenu 下的菜单中
	getBreadcrumbIndexSetFilterRoutes?: string; // 布局设置弹窗，开启切割菜单时，菜单数据传入到 navMenu 下的菜单中
	layoutMobileResize?: object; // 浏览器窗口改变时，用于适配移动端界面显示
	openOrCloseSortable?: string; // 布局设置弹窗，开启 TagsView 拖拽
	openShareTagsView?: string; // 布局设置弹窗，开启 TagsView 共用
	onTagsViewRefreshRouterView?: any; // tagsview 刷新界面
	onCurrentContextmenuClick?: any; // tagsview 右键菜单每项点击时
	setHoverPreload?: string; // 分栏菜单鼠标悬停预加载
};
