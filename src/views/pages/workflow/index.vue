<template>
	<div class="workflow-form-container">
		<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${setViewHeight}` }">
			<div class="workflow">
				<div class="workflow-left">
					<el-scrollbar>
						<div :id="`left${key}`" v-for="(val, key) in leftNavList" :key="key">
							<div class="workflow-left-title">
								<span>{{ val.title }}</span>
								<i :class="val.isOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
							</div>
							<div class="workflow-left-item" v-for="(v, k) in val.children" :key="k">
								<i :class="v.icon"></i>
							</div>
						</div>
					</el-scrollbar>
				</div>
				<div class="workflow-right">
					<div id="right"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue';
import Sortable from 'sortablejs';
import { useStore } from '/@/store/index';
import { leftNavList } from './mock';
export default defineComponent({
	name: 'pagesWorkflow',
	setup() {
		const store = useStore();
		const state = reactive({
			leftNavList,
		});
		// 设置 view 的高度
		const setViewHeight = computed(() => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			let { isTagsViewCurrenFull } = store.state.tagsViewRoutes;
			if (isTagsViewCurrenFull) {
				return `30px`;
			} else {
				if (isTagsview) return `114px`;
				else return `80px`;
			}
		});
		// 初始化拖动
		const initSortable = () => {
			state.leftNavList.forEach((v, k) => {
				Sortable.create(document.getElementById(`left${k}`), {
					group: { name: 'vue-next-admin-1', pull: 'clone', put: false },
					animation: 1000,
					sort: false,
					draggable: '.workflow-left-item',
					direction: 'vertical',
					forceFallback: true,
					onEnd: function (evt) {
						console.log(evt);
					},
				});
			});

			Sortable.create(document.getElementById(`right`), {
				group: { name: 'vue-next-admin-2', pull: 'clone', put: true },
				animation: 1000,
				onEnd: function (evt) {
					console.log(evt);
				},
			});
		};
		// 页面加载时
		onMounted(() => {
			initSortable();
		});
		return {
			setViewHeight,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.workflow-form-container {
	.workflow {
		display: flex;
		height: 100%;
		width: 100%;
		.workflow-left {
			width: 220px;
			::v-deep(.el-collapse-item__content) {
				padding-bottom: 0;
			}
			.workflow-left-title {
				height: 50px;
				display: flex;
				align-items: center;
				padding: 0 15px;
				border-top: 1px solid var(--el-border-color-light, #ebeef5);
				border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
				color: --el-text-color-primary;
				cursor: pointer;
				span {
					flex: 1;
				}
			}
			.workflow-left-item {
				display: inline-block;
				width: 33.33%;
				height: 50px;
				position: relative;
				cursor: pointer;
				i {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 25px;
					color: var(--el-text-color-secondary);
					transition: all 0.3s ease;
				}
				&:hover {
					i {
						color: var(--el-text-color-regular);
						transition: all 0.3s ease;
					}
				}
			}
		}
		.workflow-right {
			flex: 1;
			border: 1px solid red;
			#right {
				border: 1px solid yellow;
				height: 100%;
				width: 100%;
			}
		}
	}
}
</style>
