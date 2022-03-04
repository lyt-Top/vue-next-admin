<template>
	<div class="layout-navbars-close-full" v-if="isTagsViewCurrenFull">
		<div class="layout-navbars-close-full-box" title="关闭全屏" @click="onCloseFullscreen">
			<SvgIcon name="ele-Close" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '/@/store/index';
export default defineComponent({
	name: 'layoutCloseFull',
	setup() {
		const store = useStore();
		// 获取卡片全屏信息
		const isTagsViewCurrenFull = computed(() => {
			return store.state.tagsViewRoutes.isTagsViewCurrenFull;
		});
		// 关闭当前全屏
		const onCloseFullscreen = () => {
			store.dispatch('tagsViewRoutes/setCurrenFullscreen', false);
		};
		return {
			isTagsViewCurrenFull,
			onCloseFullscreen,
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-close-full {
	position: fixed;
	z-index: 9999999999;
	right: -30px;
	top: -30px;
	.layout-navbars-close-full-box {
		width: 60px;
		height: 60px;
		border-radius: 100%;
		position: relative;
		cursor: pointer;
		background: rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		i {
			position: absolute;
			left: 11px;
			top: 35px;
			color: #333333;
			transition: all 0.3s ease;
		}
		&:hover {
			background: rgba(0, 0, 0, 0.2);
			transition: all 0.3s ease;
			i {
				color: var(--el-color-primary);
				transition: all 0.3s ease;
			}
		}
	}
}
</style>
