<template>
	<view>
		<view class="history" v-show="historyList.length">
			<view class="title"><text class="txt">搜索历史</text></view>
			<view class="del-icon"><i class="iconfont" @click="del">&#xe611;</i></view>
		</view>
		<view class="list">
			<text class="msg-box" v-for="(v, k) in historyList" :key="k" @click="historyClick(v,k)">{{ v.value }}</text>
		</view>
		<view class="history">
			<view class="title"><text class="txt">搜索发现</text></view>
			<view class="del-icon" v-if="isShow">
				<i class="iconfont" @click="see">&#xe7ac;</i>
			</view>
			<view class="del-icon" v-else><i class="iconfont" @click="see">&#xe7af;</i></view>
		</view>
		<view class="find" v-if="isShow">
			<view class="flex" v-for="(v, k) in findList" :key="k">{{ v.value }}</view>
		</view>
		<view class="find-hide" v-else><text class="hide">当前搜索发现已隐藏</text></view>
	</view>
</template>

<script>
export default {
	// 解决方案：可禁用顶部导航（pages.json设置），自己写样式（返回事件、input等）
	data() {
		return {
			titleTimer: '',
			historyList: [],
			findList: [
				{
					value: '三星evo 860'
				},
				{
					value: 'ssd固态硬盘'
				},
				{
					value: '海盗船内存条ddr4'
				},
				{
					value: '小米笔记本键盘薄膜'
				},
				{
					value: '小米笔记本'
				}
			],
			isShow: true
		};
	},
	methods: {
		createView() {
			clearTimeout(this.titleTimer);
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let currentWebview = page.$getAppWebview();
			let nTitle = currentWebview.getTitleNView();
			nTitle.draw([
				{
					tag: 'rect',
					id: 'rect',
					color: '#999',
					position: {
						left: '50px',
						right: '50px',
						top: '7px',
						bottom: '7px'
					},
					rectStyles: {
						color: '#f6f6f6',
						radius: '30px',
						borderColor: '#999'
					}
				},
				{
					tag: 'font',
					id: 'font',
					text: '\ue624',
					position: {
						left: '55px',
						width: '30px',
						top: '7px',
						bottom: '7px'
					},
					textStyles: {
						size: '13px',
						fontSrc: '/static/iconfont.ttf',
						color: '#999'
					}
				},
				{
					tag: 'input',
					id: 'input',
					position: {
						left: '55px',
						right: '70px',
						top: '7px',
						bottom: '7px'
					},
					inputStyles: {
						placeholder: '关键字搜索',
						borderRadius: '30px',
						borderWidth: '0px',
						borderColor: '#F5F5F5',
						fontSize: '13px',
						type: 'search',
						color: '#999',
						onComplete: e => {
							if (e.text != '') {
								uni.hideKeyboard(); // 隐藏软键盘
								for (let item of this.historyList) {
									if (item.value.indexOf(e.text) > -1) return;
								}
								this.historyList.push({
									value: e.text
								});
								plus.runtime.openURL(`taobao://s.taobao.com/search?q=${e.text}`)
							}
						},
						onFocus: function(e) {
							console.log('获得焦点');
						},
						onBlur: function(e) {
							console.log('失去焦点');
						}
					}
				}
			]);
		},
		startcreatview() {
			this.titleTimer = setTimeout(() => {
				this.createView();
			}, 100); //具体缓迟时间可以按需设置
		},
		del() {
			this.historyList = [];
		},
		see() {
			this.isShow = !this.isShow;
		},
		historyClick(data, index) {
			plus.runtime.openURL(`taobao://s.taobao.com/search?q=${data.value}`)
		}
	},
	onLoad() {
		this.startcreatview();
	},
	onNavigationBarButtonTap: function(e) {
		uni.hideKeyboard();
	}
};
</script>

<style lang="scss">
.history {
	display: flex;
	align-items: center;
	height: 70upx;
	padding: 10upx 28upx;

	.txt {
		font-size: $uni-font-size-lg;
	}

	.title {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.del-icon {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: $uni-text-color-grey;
	}
}

.list {
	padding: 0 28upx 0 18upx;
	font-size: $uni-font-size-lg;
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;

	.msg-box {
		margin: 10upx;
		background-color: #f7f7f7;
		border-radius: 10upx;
		padding: 15upx;
		color: #848484;
	}
}

.find {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	padding: 0 28upx;
	font-size: $uni-font-size-lg;

	.flex {
		width: 50%;
		margin: 15upx 0;
		color: #848484;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
}

.find-hide {
	display: flex;

	.hide {
		color: #cbcbcb;
		margin: auto;
		font-size: $uni-font-size-sm;
	}
}
</style>
