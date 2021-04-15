<template>
	<view class="list">
		<view
			class="list-flex"
			v-for="(v, k) in indexsTellList"
			:key="k"
			@click="handleClick(v, k)"
		>
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
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import { mapMutations } from 'vuex';
export default {
	components: {
		uniLoadMore
	},
	props: {
		indexsTellList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
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
	created() {
		this.getList();
	},
	methods: {
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
