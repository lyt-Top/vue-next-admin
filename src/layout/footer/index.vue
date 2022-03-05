<template>
	<div class="layout-footer mt15" v-show="state.isDelayFooter">
		<div class="layout-footer-warp">
			<div>vue-next-admin，Made by lyt with ❤️</div>
			<div class="mt5">版权所有：深圳市xxx软件科技有限公司</div>
		</div>
	</div>
</template>

<script setup name="layoutFooter">
import { onBeforeRouteUpdate } from 'vue-router';

const state = reactive({
	isDelayFooter: true,
});
// 路由改变时，等主界面动画加载完毕再显示 footer
onBeforeRouteUpdate(() => {
	setTimeout(() => {
		state.isDelayFooter = false;
		setTimeout(() => {
			state.isDelayFooter = true;
		}, 800);
	}, 0);
});
</script>

<style scoped lang="scss">
.layout-footer {
	width: 100%;
	display: flex;
	&-warp {
		margin: auto;
		color: var(--el-text-color-secondary);
		text-align: center;
		animation: logoAnimation 0.3s ease-in-out;
	}
}
</style>
