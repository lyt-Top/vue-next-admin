<template>
	<div class="sponsors-container" title="点击前往体验" v-show="sponsors.isShow" @click="onSponsorsClick">
		<el-carousel height="240px" indicator-position="none" :arrow="setCarouselShow" @change="onCarouselChange">
			<el-carousel-item v-for="(v, k) in sponsors.list" :key="k">
				<img :src="v.url" class="sponsors-img" />
				<div class="sponsors-text" v-html="v.text"></div>
			</el-carousel-item>
		</el-carousel>
		<div class="sponsors-close" title="关闭赞助商" @click.stop="onCloseSponsors">
			<i class="el-icon-close"></i>
		</div>
	</div>
</template>

<script>
import sponsorsOne from '@/assets/ccflowRightNextAdmin.png';
export default {
	name: 'layoutSponsors',
	data() {
		return {
			sponsors: {
				list: [
					{
						url: sponsorsOne,
						text: `驰骋BPM系统包含表单引擎+流程引擎+权限控制,方便集成,配置灵活,功能强大,适合中国国情的工作流引擎.演示:http://demo.ccflow.org。右上角点star方可加群: 1060674395`,
						link: 'http://www.ccflow.org/',
					},
				],
				isShow: false,
				index: 0,
			},
		};
	},
	computed: {
		// 设置轮播图箭头显示
		setCarouselShow() {
			return this.sponsors.list.length <= 1 ? 'never' : 'hover';
		},
	},
	methods: {
		// 关闭赞助商
		onCloseSponsors() {
			this.sponsors.isShow = false;
		},
		// 轮播图改变时
		onCarouselChange(e) {
			this.sponsors.index = e;
		},
		// 当前项内容点击
		onSponsorsClick() {
			window.open(this.sponsors.list[this.sponsors.index].link);
		},
		// 延迟显示，防止影响其它界面加载
		delayShow() {
			setTimeout(() => {
				this.sponsors.isShow = true;
			}, 3000);
		},
	},
	mounted() {
		this.delayShow();
	},
};
</script>

<style scoped lang="scss">
.sponsors-container {
	position: fixed;
	right: 15px;
	bottom: 15px;
	z-index: 3;
	width: 200px;
	background-color: var(--prev-bg-main-color);
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
	border-radius: 5px;
	overflow: hidden;
	cursor: pointer;
	.sponsors-img {
		width: 100%;
		height: 80px;
	}
	.sponsors-text {
		padding: 10px;
		color: var(--prev-color-text-regular);
		font-size: 14px;
	}
	.sponsors-close {
		width: 60px;
		height: 60px;
		border-radius: 100%;
		background: rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
		position: absolute;
		right: -35px;
		bottom: -35px;
		z-index: 5;
		i {
			position: absolute;
			left: 9px;
			top: 9px;
			color: #afafaf;
			transition: all 0.3s ease;
		}
		&:hover {
			transition: all 0.3s ease;
			i {
				color: var(--prev-color-primary);
				transition: all 0.3s ease;
			}
		}
	}
}
</style>
