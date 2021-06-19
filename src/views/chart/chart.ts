/**
 * sky 天气
 * @returns 返回模拟数据
 */
export const skyList = [
	{
		v1: '时间',
		v2: '天气',
		v3: '温度',
		v5: '降水',
		v7: '风力',
		type: 'title',
	},
	{
		v1: '今天',
		v2: 'el-icon-cloudy-and-sunny',
		v3: '20°/26°',
		v5: '50%',
		v7: '13m/s',
	},
	{
		v1: '明天',
		v2: 'el-icon-lightning',
		v3: '20°/26°',
		v5: '50%',
		v7: '13m/s',
	},
];

/**
 * 当前设置状态
 * @returns 返回模拟数据
 */
export const dBtnList = [
	{
		v2: '阳光玫瑰种植',
		v3: '126天',
		v4: '设备在线',
	},
];

/**
 * 当前设备监测
 * @returns 返回模拟数据
 */
export const chartData4List = [
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
];

/**
 * 3DEarth 地图周围按钮组
 * @returns 返回模拟数据
 */
export const earth3DBtnList = [
	{
		topLevelClass: 'fixed-top',
		icon: 'el-icon-s-marketing',
		label: '环境监测',
		type: 0,
	},
	{
		topLevelClass: 'fixed-right',
		icon: 'el-icon-s-cooperation',
		label: '精准管理',
		type: 1,
	},
	{
		topLevelClass: 'fixed-bottom',
		icon: 'el-icon-s-order',
		label: '数据报表',
		type: 2,
	},
	{
		topLevelClass: 'fixed-left',
		icon: 'el-icon-s-claim',
		label: '产品追溯',
		type: 3,
	},
];
