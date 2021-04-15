// 首页 `swiper` 下的导航 
const indexNavList = {
	state: {
		list: [{
				bgColor: 'yse1',
				icon: '\ue666',
				title: '船舶动态'
			},
			{
				bgColor: 'yse2',
				icon: '\ue64f',
				title: '船盘发布',
			},
			{
				bgColor: 'yse3',
				icon: '\ue633',
				title: '货盘发布'
			},
			{
				bgColor: 'yse4',
				icon: '\ue617',
				title: '我的订单'
			}
		],
	},
	mutations: {
		getIndexNavList: (state, Arr) => {
			Arr.length <= 0 ? state.list = state.list : state.list = Arr
		}
	},
	actions: {
		setIndexNavList(context, Arr) {
			context.commit('getIndexNavList', Arr)
		}
	}
}

export default indexNavList
