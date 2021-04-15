<template>
	<view>
		<swipers />
		<view class="nav">
			<view class="nav-flex">
				<view class="nav-flex-item" v-for="(v, k) in indexNavList" :key="k" @click="handleTabs(v, k)">
					<view class="yse" :class="v.bgColor">
						<i class="iconfont">{{ v.icon }}</i>
					</view>
					<text class="txt">{{ v.title }}</text>
				</view>
			</view>
		</view>

		<view class="list">
			<view class="list-flex" v-for="(v, k) in indexTellList" :key="k" @click="handleClick(v, k)">
				<view class="list-flex-warp">
					<view class="img"><image class="photo" :src="v.imgPath"></image></view>
					<view class="content">
						<view class="title">
							<text class="txt">{{ v.title }}</text>
						</view>
						<view class="date">
							<text class="msg">{{ v.time }}</text>
							<text class="msg right">阅读({{ v.num }})</text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import swipers from './component/swipers';
import { mapGetters, mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			indexNavList: [],
			indexTellList: [],
			loadingType: 0,
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			demoList: {},
			param: {
				columnId: 0,
				minId: 0,
				pageSize: 10,
				column: 'id,post_id,title,author_name,cover,published_at,comments_count',
				time: new Date().getTime() + ''
			}
		};
	},
	components: {
		swipers,
		uniLoadMore
	},
	computed: {
		...mapState(['indexsNavList', 'indexsTellList'])
	},
	mounted() {
		this.indexNavList = this.indexsNavList.list;
		this.indexTellList = this.indexsTellList.list;
	},
	created() {
		this.getList();
	},
	methods: {
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		switchTab(url) {
			uni.switchTab({
				url: url
			});
		},
		handleTabs(data, index) {
			switch (index) {
				case 0:
					this.navigateGoTo('/pages/my/component/web-view?path=https://map.sogou.com/m/webapp/m.html');
					break;
				case 1:
					this.switchTab('/pages/ship/ship');
					break;
				case 2:
					this.switchTab('/pages/goods/goods');
					break;
				case 3:
					this.navigateGoTo('/pages/index/order');
					break;
			}
		},
		...mapMutations(['getIndexTellList']),
		handleClick(data, index) {
			uni.navigateTo({
				url: '/pages/index/component/details?post_id=' + data.post_id
			});
		},
		setLoadMore() {
			this.param.minId = this.demoList.data[this.demoList.data.length - 1].id;
			this.loadingType = 1;
			setTimeout(() => {
				this.getIndexTellList(this.demoList);
				this.demoList.data.length <= 0 ? (this.loadingType = 2) : (this.loadingType = 0);
			}, 500);
		},
		getList() {
			uni.request({
				url: this.apiUrl + 'api/news',
				data: this.param,
				success: res => {
					if (res.statusCode == 200) {
						this.demoList = res;
						this.setLoadMore();
					}
				}
			});
		}
	},
	onPullDownRefresh() {
		this.getList();
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onReachBottom() {
		this.getList();
	}
};
</script>

<style lang="scss">
.nav {
	height: 248upx;
	display: flex;
	justify-content: space-around;
	background-color: #f4f8fe;

	&-flex {
		flex: 1;
		display: flex;

		&-item {
			margin: auto;
			display: flex;
			flex-direction: column;

			.yse {
				width: 75upx;
				height: 75upx;
				border-radius: 28upx;
				margin: auto;
				display: flex;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

				i {
					margin: auto;
					color: white;
				}
			}

			.yse1 {
				background: linear-gradient(to bottom right, #febc5d 0%, #fd964c 25%, #fc7f42 100%);
			}

			.yse2 {
				background: linear-gradient(to bottom right, #84edfd 0%, #56c6f9 25%, #3eb2f6 100%);
			}

			.yse3 {
				background: linear-gradient(to bottom right, #7bfaa1 0%, #4ceaa0 25%, #2de09f 100%);
			}

			.yse4 {
				background: linear-gradient(to bottom right, #dfa1fe 0%, #c075fc 25%, #ae5afa 100%);
			}

			.txt {
				font-size: $uni-font-size-base;
				color: $titleColor;
				text-align: center;
				padding-top: 15upx;
			}
		}
	}
}
.list {
	&-flex {
		height: 186upx;
		padding: 28upx;
		display: flex;
		position: relative;

		&::after {
			content: '';
			background: $border-size-color;
			position: absolute;
			width: 100%;
			height: 1px;
			left: 0;
			bottom: 0;
			transform: scaleY(0.5);
		}

		&-warp {
			width: 100%;
			display: flex;

			.img {
				width: 200upx;

				.photo {
					width: 200upx;
					height: 100%;
				}
			}

			.content {
				flex: 1;
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				align-content: space-around;
				padding-left: 28upx;

				.title {
					flex: 1;

					.txt {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						font-size: $uni-font-size-lg;
					}
				}

				.date {
					flex: 1;
					display: flex;
					justify-content: space-around;
					align-items: flex-end;

					.msg {
						font-size: $uni-font-size-base;
						color: $titleColor;
						flex: 1;
						display: flex;
					}

					.right {
						justify-content: flex-end;
					}
				}
			}
		}
	}
}
</style>
