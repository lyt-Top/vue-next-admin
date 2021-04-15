// 用户列表选项
const tableList = {
	state: {
		list: [{
				icon: '\ue673',
				title: '关于我们',
				color: '#3889ff',
				path: '/pages/my/about'
			},
// 			{
// 				icon: '\ue677',
// 				title: '联系我们',
// 				color: '#37d5ad',
// 				path: ''
// 			},
			{
				icon: '\ue697',
				title: '意见反馈',
				color: '#f9c215',
				path: '/pages/my/feedback'
			},
			{
				icon: '\ue622',
				title: '图怪兽网',
				color: '#FFA09E',
				path: '/pages/my/component/web-view?path=https://818ps.com/'
			},
			{
				icon: '\ue799',
				title: 'Vue',
				color: '#41B883',
				path: '/pages/my/component/web-view?path=https://cn.vuejs.org/v2/guide/'
			},
			{
				icon: '\ue8b9',
				title: 'V-charts',
				color: '#42B983',
				path: '/pages/my/component/web-view?path=https://v-charts.js.org/#/'
			},
			{
				icon: '\uebff',
				title: 'Echarts',
				color: '#AA314D',
				path: '/pages/my/component/web-view?path=https://echarts.baidu.com/index.html'
			},
			{
				icon: '\ue63f',
				title: 'Vant',
				color: '#19B5FE',
				path: '/pages/my/component/web-view?path=https://youzan.github.io/vant/mobile.html#/zh-CN/'
			},
			{
				icon: '\ue66c',
				title: 'Wenxin',
				color: '#51C332',
				path: '/pages/my/component/web-view?path=https://developers.weixin.qq.com/miniprogram/dev/'
			},
			{
				icon: '\ue685',
				title: 'BUI',
				color: '#FF4201',
				path: '/pages/my/component/web-view?path=http://www.easybui.com/demo/#main'
			},
			{
				icon: '\ue621',
				title: 'Element',
				color: '#1A9DFF',
				path: '/pages/my/component/web-view?path=http://element-cn.eleme.io/#/zh-CN/component/installation'
			},
			{
				icon: '\ue654',
				title: '68design',
				color: '#0DA056',
				path: '/pages/my/component/web-view?path=http://m.68design.net/'
			},
			{
				icon: '\ue61c',
				title: 'Taobao',
				color: '#FF692F',
				path: '/pages/my/component/web-view?path=https://main.m.taobao.com/'
			},
			{
				icon: '\ue67a',
				title: 'Node',
				color: '#6FBC4F',
				path: '/pages/my/component/web-view?path=http://nodejs.cn/api/'
			},
			{
				icon: '\ue66d',
				title: 'Express',
				color: '#37d5ad',
				path: '/pages/my/component/web-view?path=http://www.expressjs.com.cn/'
			},
			{
				icon: '\ue620',
				title: 'uni-app官网',
				color: '#2C993A',
				path: '/pages/my/component/web-view?path=https://uniapp.dcloud.io/'
			}
		],
	},
	mutations: {
		getTableList: (state, Arr) => {
			Arr.length <= 0 ? state.list = state.list : state.list = Arr
		}
	},
	actions: {
		setTableList(context, Arr) {
			context.commit('getTableList', Arr)
		}
	}
}

export default tableList
