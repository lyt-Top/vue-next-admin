<template>
	<div class="layout-footer mt15" v-show="isDelayFooter">
		<div class="layout-footer-warp">
			<div>vue-next-admin，Made by lyt with ❤️</div>
			<div class="mt5">深圳市 xxx 公司版权所有</div>
		</div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

export default defineComponent({
	name: 'layoutFooter',
	setup() {
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
		return {
			...toRefs(state),
		};
	},
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
		animation: error-num 1s ease-in-out;
	}
}
</style>
