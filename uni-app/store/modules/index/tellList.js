// 首页中的列表数据
const indexTellList = {
	state: {
		list: []
	},
	mutations: {
		getIndexTellList: (state, obj) => {
			for (let i = 0; i < obj.data.length; i++) {
				const result = obj.data[i]
				state.list.push({
					imgPath: result.cover,
					title: result.title,
					time: result.published_at.substring(5, 20),
					num: result.id,
					post_id: result.post_id
				})
			}
		}
	}
}

export default indexTellList
