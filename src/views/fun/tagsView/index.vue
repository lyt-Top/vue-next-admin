<template>
	<div class="fun-tagsview">
		<NoticeBar
			text="已删除非当前页 tagsView 演示，后续有时间可以再加回来！，tagsview 支持多标签（参数不同）、单标签共用（参数不同）"
			background="#ecf5ff"
			color="#409eff"
		/>
		<el-card shadow="hover" header="tagsView 当前页演示" class="mt15">
			<div class="flex-warp">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="default" @click="refreshCurrentTagsView">
							<el-icon>
								<ele-RefreshRight />
							</el-icon>
							刷新当前页
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="info" size="default" @click="closeCurrentTagsView">
							<el-icon>
								<ele-Close />
							</el-icon>
							关闭当前页
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="warning" size="default" @click="closeOtherTagsView">
							<el-icon>
								<ele-CircleClose />
							</el-icon>
							关闭其它
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="danger" size="default" @click="closeAllTagsView">
							<el-icon>
								<ele-FolderDelete />
							</el-icon>
							全部关闭
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="success" size="default" @click="openCurrenFullscreen">
							<el-icon>
								<ele-FullScreen />
							</el-icon>
							当前页全屏
						</el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, toRefs, defineComponent } from 'vue';
import NoticeBar from '/@/components/noticeBar/index.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'funTagsView',
	components: { NoticeBar },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const state = reactive({});
		// 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部 4 当前页全屏
		// 1、刷新当前 tagsView
		const refreshCurrentTagsView = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 0, ...route }));
		};
		// 2、关闭当前 tagsView
		const closeCurrentTagsView = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 1, ...route }));
		};
		// 3、关闭其它 tagsView
		const closeOtherTagsView = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 2, ...route }));
		};
		// 4、关闭全部 tagsView
		const closeAllTagsView = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 3, ...route }));
		};
		// 5、开启当前页面全屏
		const openCurrenFullscreen = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 4, ...route }));
		};
		return {
			refreshCurrentTagsView,
			closeCurrentTagsView,
			closeOtherTagsView,
			closeAllTagsView,
			openCurrenFullscreen,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.fun-tagsview {
	.fun-tagsview-from-item {
		::v-deep(.el-form-item__content) {
			margin-left: 0 !important;
		}
	}
}
</style>
