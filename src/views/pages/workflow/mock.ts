// 左侧菜单导航数据
export const leftNavList = [
	{
		title: '录像',
		icon: 'el-icon-video-camera-solid',
		isOpen: true,
		children: [
			{
				icon: 'el-icon-s-custom',
			},
			{
				icon: 'el-icon-s-opportunity',
			},
			{
				icon: 'el-icon-s-data',
			},
			{
				icon: 'el-icon-s-check',
			},
			{
				icon: 'el-icon-s-grid',
			},
			{
				icon: 'el-icon-menu',
			},
		],
		form: {},
	},
	{
		title: '文本',
		isOpen: true,
		icon: 'el-icon-s-order',
		children: [
			{
				icon: 'el-icon-share',
			},
			{
				icon: 'el-icon-s-shop',
			},
			{
				icon: 'el-icon-s-marketing',
			},
		],
		form: {},
	},
	{
		title: '电视',
		isOpen: true,
		icon: 'el-icon-s-platform',
		children: [
			{
				icon: 'el-icon-s-flag',
			},
			{
				icon: 'el-icon-s-comment',
			},
		],
		form: {},
	},
];
