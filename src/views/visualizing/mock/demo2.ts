// 顶部下来菜单
export const dropdownList: Array<object> = [
	{
		label: '广东省农业农村厅',
	},
	{
		label: '广西省农业农村厅',
	},
	{
		label: '四川省农业农村厅',
	},
	{
		label: '湖北省农业农村厅',
	},
	{
		label: '福建省农业农村厅',
	},
	{
		label: '山东省农业农村厅',
	},
	{
		label: '江西省农业农村厅',
	},
];

// sky 天气
export const skyList: Array<object> = [
	{
		v1: '时间',
		v2: '天气',
		v3: '温度',
		v4: '湿度',
		v5: '降水概率',
		v6: '风向',
		v7: '风力',
		type: 'title',
	},
	{
		v1: '今天',
		v2: 'ele-Sunny',
		v3: '20°/26°',
		v4: '80%',
		v5: '50%',
		v6: '东南风',
		v7: '13m/s',
	},
	{
		v1: '明天',
		v2: 'ele-Lightning',
		v3: '20°/26°',
		v4: '80%',
		v5: '50%',
		v6: '东南风',
		v7: '13m/s',
	},
	{
		v1: '后天',
		v2: 'ele-Sunny',
		v3: '20°/26°',
		v4: '80%',
		v5: '50%',
		v6: '东南风',
		v7: '13m/s',
	},
];

// 当前设置状态
export const dBtnList: Array<object> = [
	{
		v1: '地块A-灌溉',
		v2: '阳光玫瑰种植',
		v3: '126天',
		v4: '设备在线',
	},
	{
		v1: '地块B-收割',
		v2: '阳光玫瑰种植',
		v3: '360天',
		v4: '设备预警',
	},
];

// 当前设备监测
export const chartData4List: Array<object> = [
	{
		label: '温度',
	},
	{
		label: '光照',
	},
	{
		label: '湿度',
	},
	{
		label: '风力',
	},
	{
		label: '张力',
	},
	{
		label: '气压',
	},
];

// 3DEarth 地图周围按钮组
export const earth3DBtnList: Array<object> = [
	{
		topLevelClass: 'fixed-top',
		icon: 'ele-MagicStick',
		label: '环境监测',
		type: 0,
	},
	{
		topLevelClass: 'fixed-right',
		icon: 'ele-MoonNight',
		label: '精准管理',
		type: 1,
	},
	{
		topLevelClass: 'fixed-bottom',
		icon: 'ele-TrendCharts',
		label: '数据报表',
		type: 2,
	},
	{
		topLevelClass: 'fixed-left',
		icon: 'ele-Van',
		label: '产品追溯',
		type: 3,
	},
];
