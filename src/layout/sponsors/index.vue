<template>
	<div class="sponsors-container" title="点击前往体验" v-show="state.sponsors.isShow" @click="onSponsorsClick">
		<el-carousel height="240px" indicator-position="none" :arrow="setCarouselShow" @change="onCarouselChange">
			<el-carousel-item v-for="(v, k) in state.sponsors.list" :key="k">
				<img :src="v.url" class="sponsors-img" />
				<div class="sponsors-text" v-html="v.text"></div>
			</el-carousel-item>
		</el-carousel>
		<div class="sponsors-close">
			<SvgIcon name="ele-Close" :size="12" title="关闭赞助商" @click.stop="onCloseSponsors" />
		</div>
	</div>
</template>

<script setup lang="ts" name="layoutSponsors">
import { reactive, computed, onMounted } from 'vue';
import sponsorsOne from '/@/assets/ccflowRightNextAdmin.png';

// 定义变量内容
const state = reactive({
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
});

// 设置轮播图箭头显示
const setCarouselShow = computed(() => {
	return state.sponsors.list.length <= 1 ? 'never' : 'hover';
});
// 关闭赞助商
const onCloseSponsors = () => {
	state.sponsors.isShow = false;
};
// 轮播图改变时
const onCarouselChange = (e: number) => {
	state.sponsors.index = e;
};
// 当前项内容点击
const onSponsorsClick = () => {
	window.open(state.sponsors.list[state.sponsors.index].link);
};
// 延迟显示，防止影响其它界面加载
const delayShow = () => {
	setTimeout(() => {
		state.sponsors.isShow = true;
	}, 3000);
};
// 页面加载时
onMounted(() => {
	delayShow();
});
</script>

<style scoped lang="scss">
.sponsors-container {
	position: fixed;
	right: 15px;
	bottom: 15px;
	z-index: 3;
	width: 200px;
	background-color: var(--next-bg-main-color);
	box-shadow: var(--el-box-shadow-lighter);
	border-radius: 5px;
	overflow: hidden;
	cursor: pointer;
	.sponsors-img {
		width: 100%;
		height: 80px;
	}
	.sponsors-text {
		padding: 10px;
		color: var(--el-text-color-regular);
		font-size: var(--el-dialog-content-font-size);
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
		:deep(i) {
			position: absolute;
			left: 9px;
			top: 9px;
			color: #afafaf;
			transition: all 0.3s ease;
		}
		&:hover {
			transition: all 0.3s ease;
			:deep(i) {
				color: var(--el-color-primary);
				transition: all 0.3s ease;
			}
		}
	}
}
</style>
