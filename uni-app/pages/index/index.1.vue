<template>
	<view id="demo">
		<view>
			<scroll-view
				:scroll-top="scrollTop"
				scroll-y="true"
				@scroll="scroll"
				:lower-threshold="50"
				:style="{ height: scrollDemo.height }"
			>
				<view style="height: 100%;">
					<swipers />
					<view class="nav">
						<view class="nav-flex">
							<view
								class="nav-flex-item"
								v-for="(v, k) in indexNavList"
								:key="k"
								@click="handleTabs(v, k)"
							>
								<view class="yse" :class="v.bgColor">
									<i class="iconfont">{{ v.icon }}</i>
								</view>
								<text class="txt">{{ v.title }}</text>
							</view>
						</view>
					</view>
					<lists :indexsTellList="indexTellList" />
				</view>
			</scroll-view>
		</view>
		<go-top :is-show="scrollDemo.isShow" @gotop="gotoTop" />
	</view>
</template>

<script>
import swipers from './component/swipers';
import lists from './component/list';
import goTop from '@/components/go-to-top/go-to-top';
import { mapGetters, mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			indexNavList: [],
			indexTellList: [],
			scrollDemo: {
				height: null,
				isShow: false
			},
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		};
	},
	components: {
		swipers,
		lists,
		goTop
	},
	computed: {
		...mapState(['indexsNavList', 'indexsTellList'])
	},
	mounted() {
		this.indexNavList = this.indexsNavList.list;
		this.indexTellList = this.indexsTellList.list;
		this.getSystem();
	},
	created() {},
	methods: {
		handleTabs(data, index) {
			console.log(data);
		},
		// https://uniapp.dcloud.io/api/system/info
		getSystem() {
			uni.getSystemInfo({
				success: res => {
					this.scrollDemo.height = res.windowHeight + 50 + 'px';
				}
			});
		},
		scroll: function(e) {
			this.old.scrollTop = e.detail.scrollTop;
			e.detail.scrollTop > 200
				? (this.scrollDemo.isShow = true)
				: (this.scrollDemo.isShow = false);
		},
		gotoTop(distance) {
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
		}
	}
};
</script>

<style lang="scss">
page {
	position: fixed;
	height: 100%;
	width: 100%;
	overflow: hidden;

	#demo {
		height: 100%;
		overflow: auto;

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
						background: linear-gradient(
							to bottom right,
							#febc5d 0%,
							#fd964c 25%,
							#fc7f42 100%
						);
					}

					.yse2 {
						background: linear-gradient(
							to bottom right,
							#84edfd 0%,
							#56c6f9 25%,
							#3eb2f6 100%
						);
					}

					.yse3 {
						background: linear-gradient(
							to bottom right,
							#7bfaa1 0%,
							#4ceaa0 25%,
							#2de09f 100%
						);
					}

					.yse4 {
						background: linear-gradient(
							to bottom right,
							#dfa1fe 0%,
							#c075fc 25%,
							#ae5afa 100%
						);
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
	}
}
</style>
