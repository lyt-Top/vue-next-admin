<template>
	<div class="workflow-form-container">
		<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${setViewHeight}` }">
			<div class="workflow">
				<!-- 顶部工具栏 -->
				<div class="workflow-tool">
					<div class="pl15">{{ setToolTitle }}</div>
					<div class="workflow-tool-right">
						<div class="workflow-tool-icon">
							<i class="el-icon-warning-outline"></i>
						</div>
						<div class="workflow-tool-icon">
							<i class="el-icon-download"></i>
						</div>
						<div class="workflow-tool-icon">
							<i class="el-icon-video-play"></i>
						</div>
						<div class="workflow-tool-icon">
							<i class="el-icon-full-screen"></i>
						</div>
						<div class="workflow-tool-icon">
							<i class="el-icon-printer"></i>
						</div>
					</div>
				</div>

				<!-- 左侧导航区 -->
				<div class="workflow-content">
					<div id="workflow-left">
						<el-scrollbar>
							<div
								:id="`left${key}`"
								v-for="(val, key) in leftNavList"
								:key="key"
								:style="{ height: val.isOpen ? 'auto' : '50px', overflow: 'hidden' }"
								class="workflow-left-id"
							>
								<div class="workflow-left-title" @click="onTitleClick(val)">
									<span>{{ val.title }}</span>
									<i :class="val.isOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
								</div>
								<div class="workflow-left-item" v-for="(v, k) in val.children" :key="k" :data-name="v.name" :data-icon="v.icon">
									<div class="workflow-left-item-icon">
										<i :class="v.icon" class="workflow-icon-drag"></i>
										<div class="font10 pl5 name">{{ v.name }}</div>
									</div>
								</div>
							</div>
						</el-scrollbar>
					</div>

					<!-- 右侧绘画区 -->
					<div id="workflow-right">
						<div
							v-for="(v, k) in nodeList"
							:key="k"
							:id="v.nodeId"
							:class="v.class"
							:style="{ left: v.left, top: v.top }"
							@click="onItemCloneClick(k)"
							@contextmenu.prevent="onContextmenu(v, k, $event)"
						>
							<div class="workflow-right-box" :class="{ 'workflow-right-active': nodeIndex === k }">
								<div class="workflow-left-item-icon">
									<i class="workflow-icon-drag" :class="v.icon"></i>
									<div class="font10 pl5 name">{{ v.name }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 节点右键菜单 -->
		<Contextmenu :dropdown="dropdownNode" ref="contextmenuNodeRef" @current="onCurrentNodeClick" />
		<!-- 线右键菜单 -->
		<Contextmenu :dropdown="dropdownLine" ref="contextmenuLineRef" @current="onCurrentLineClick" />
		<!-- 弹窗表单、线 -->
		<Drawer ref="drawerRef" />
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, onMounted, nextTick, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { jsPlumb } from 'jsplumb';
import Sortable from 'sortablejs';
import { useStore } from '/@/store/index';
import Contextmenu from './component/contextmenu/index.vue';
import Drawer from './component/drawer/index.vue';
import { leftNavList } from './mock';
import { jsplumbDefaults, jsplumbMakeSource, jsplumbMakeMakeTarget } from './config';
export default defineComponent({
	name: 'pagesWorkflow',
	components: { Contextmenu, Drawer },
	setup() {
		const contextmenuNodeRef = ref();
		const contextmenuLineRef = ref();
		const drawerRef = ref();
		const store = useStore();
		const state = reactive({
			leftNavList: [],
			jsPlumb: null,
			nodeList: [],
			nodeIndex: null,
			dropdownNode: { x: '', y: '' },
			dropdownLine: { x: '', y: '' },
			jsplumbDefaults,
			jsplumbMakeSource,
			jsplumbMakeMakeTarget,
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
		// 设置 tool 标题
		const setToolTitle = computed(() => {
			let { globalTitle } = store.state.themeConfig.themeConfig;
			return `${globalTitle}工作流`;
		});
		// 左侧导航-数据初始化
		const initLeftNavList = () => {
			state.leftNavList = leftNavList;
		};
		// 左侧导航-初始化拖动
		const initSortable = () => {
			state.leftNavList.forEach((v, k) => {
				Sortable.create(document.getElementById(`left${k}`), {
					group: { name: 'vue-next-admin-1', pull: 'clone', put: false },
					animation: 0,
					sort: false,
					draggable: '.workflow-left-item',
					forceFallback: true,
					onEnd: function (evt) {
						const { name, icon } = evt.clone.dataset;
						const { layerX, layerY, clientX, clientY } = evt.originalEvent;
						const el = document.querySelector('#workflow-right') as HTMLElement;
						const { x, y, width, height } = el.getBoundingClientRect();
						if (clientX < x || clientX > width + x || clientY < y || y > y + height) {
							ElMessage({ type: 'warning', message: '请把节点拖入到画布中' });
						} else {
							// 节点id（唯一）
							const nodeId = Math.random().toString(36).substr(2, 12);
							// 处理节点数据
							const node = {
								nodeId,
								left: `${layerX - 40}px`,
								top: `${layerY - 15}px`,
								class: 'workflow-right-clone',
								cloneItem: evt.clone.innerHTML,
								name,
								icon,
							};
							// 右侧视图内容数组
							state.nodeList.push(node);
							// 元素加载完毕时
							nextTick(() => {
								// 整个节点作为source或者target
								state.jsPlumb.makeSource(nodeId, state.jsplumbMakeSource);
								// 整个节点作为source或者target
								state.jsPlumb.makeTarget(nodeId, state.jsplumbMakeMakeTarget);
								// 设置节点可以拖拽（此处为id值，非class）
								state.jsPlumb.draggable(nodeId, {
									containment: 'parent',
									stop: (el) => {
										state.nodeList.forEach((v) => {
											if (v.nodeId === el.el.id) {
												// 节点x, y重新赋值，防止再次从左侧导航中拖拽节点时，x, y恢复默认
												v.left = `${el.pos[0]}px`;
												v.top = `${el.pos[1]}px`;
											}
										});
									},
								});
							});
						}
					},
				});
			});
		};
		// 左侧导航-菜单标题点击
		const onTitleClick = (val) => {
			val.isOpen = !val.isOpen;
		};
		// 右侧内容区-当前项点击
		const onItemCloneClick = (k) => {
			state.nodeIndex = k;
		};
		// 右侧内容区-当前项右键菜单点击
		const onContextmenu = (v, k, e) => {
			state.nodeIndex = k;
			const { clientX, clientY } = e;
			state.dropdownNode.x = clientX;
			state.dropdownNode.y = clientY;
			v.index = k;
			v.type = 'node';
			contextmenuNodeRef.value.openContextmenu(v);
		};
		// 右侧内容区-当前项右键菜单点击回调(节点)
		const onCurrentNodeClick = (item) => {
			const { index, contextMenuClickId, name } = item;
			state.leftNavList.map((v) => {
				v.children.map((v) => {
					if (v.name === name) item.form = v.form;
				});
			});
			if (contextMenuClickId === 0) state.nodeList.splice(index, 1);
			else if (contextMenuClickId === 1) drawerRef.value.open(item);
		};
		// 右侧内容区-当前项右键菜单点击回调(线)
		const onCurrentLineClick = (item, conn) => {
			const { contextMenuClickId } = item;
			state.leftNavList.map((v) => {
				v.children.map((v) => {
					if (v.name === name) item.form = v.form;
				});
			});
			if (contextMenuClickId === 0) state.jsPlumb.deleteConnection(conn);
			else if (contextMenuClickId === 1) drawerRef.value.open(item);
		};
		// 初始化 jsPlumb
		const initJsPlumb = () => {
			jsPlumb.ready(() => {
				state.jsPlumb = jsPlumb.getInstance({
					detachable: false,
					Container: 'workflow-right',
				});
				// 导入默认配置
				state.jsPlumb.importDefaults(state.jsplumbDefaults);
				// 会使整个jsPlumb立即重绘。
				state.jsPlumb.setSuspendDrawing(false, true);
				// 点击线弹出右键菜单
				state.jsPlumb.bind('contextmenu', (conn, originalEvent) => {
					originalEvent.preventDefault();
					const { clientX, clientY } = originalEvent;
					state.dropdownLine.x = clientX;
					state.dropdownLine.y = clientY;
					const v = state.nodeList.find((v) => v.nodeId === conn.targetId);
					const k = state.nodeList.findIndex((v) => v.nodeId === conn.targetId);
					v.index = k;
					v.type = 'line';
					contextmenuLineRef.value.openContextmenu(v, conn);
				});
				// 连线
				state.jsPlumb.bind('connection', (evt) => {
					const { sourceId, targetId } = evt;
					const conn = state.jsPlumb.getConnections({
						source: sourceId,
						target: targetId,
					})[0];
					conn.setLabel('同意');
					conn.endpointStyle = [{ fill: '#f35958' }];
					conn.style.color = 'red';
				});
			});
		};
		// 页面加载时
		onMounted(async () => {
			await initLeftNavList();
			initSortable();
			initJsPlumb();
		});
		return {
			setViewHeight,
			setToolTitle,
			onTitleClick,
			onItemCloneClick,
			onContextmenu,
			onCurrentNodeClick,
			onCurrentLineClick,
			contextmenuNodeRef,
			contextmenuLineRef,
			drawerRef,
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
		flex-direction: column;
		.workflow-tool {
			height: 35px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
			.workflow-tool-right {
				flex: 1;
				display: flex;
				justify-content: flex-end;
			}
			&-icon {
				padding: 0 10px;
				cursor: pointer;
				color: var(--bg-topBarColor);
				height: 35px;
				line-height: 35px;
				display: flex;
				align-items: center;
				&:hover {
					background: rgba(0, 0, 0, 0.04);
					i {
						display: inline-block;
						animation: logoAnimation 0.3s ease-in-out;
					}
				}
			}
		}
		.workflow-content {
			flex: 1;
			display: flex;
			#workflow-left {
				width: 220px;
				height: 100%;
				border-right: 1px solid var(--el-border-color-light, #ebeef5);
				::v-deep(.el-collapse-item__content) {
					padding-bottom: 0;
				}
				.workflow-left-title {
					height: 50px;
					display: flex;
					align-items: center;
					padding: 0 15px;
					border-top: 1px solid var(--el-border-color-light, #ebeef5);
					color: --el-text-color-primary;
					cursor: default;
					span {
						flex: 1;
					}
				}
				.workflow-left-item {
					display: inline-block;
					width: calc(50% - 15px);
					position: relative;
					cursor: move;
					margin: 0 0 10px 10px;
					.workflow-left-item-icon {
						height: 35px;
						display: flex;
						align-items: center;
						transition: all 0.3s ease;
						padding: 5px 10px;
						border: 1px dashed transparent;
						background: rgba(0, 0, 0, 0.04);
						border-radius: 3px;
						i,
						.name {
							color: var(--el-text-color-secondary);
							transition: all 0.3s ease;
						}
						&:hover {
							transition: all 0.3s ease;
							border: 1px dashed var(--color-primary);
							background: var(--color-primary-light-9);
							border-radius: 5px;
							i,
							.name {
								transition: all 0.3s ease;
								color: var(--color-primary);
							}
						}
					}
				}
				& .workflow-left-id:first-of-type {
					.workflow-left-title {
						border-top: none;
					}
				}
			}
			#workflow-right {
				flex: 1;
				position: relative;
				overflow: hidden;
				height: 100%;
				background-image: linear-gradient(90deg, rgb(156 214 255 / 15%) 10%, rgba(0, 0, 0, 0) 10%),
					linear-gradient(rgb(156 214 255 / 15%) 10%, rgba(0, 0, 0, 0) 10%);
				background-size: 10px 10px;
				.workflow-right-clone {
					position: absolute;
					.workflow-right-box {
						height: 35px;
						align-items: center;
						border: 1px solid var(--el-border-color-light, #ebeef5);
						color: var(--el-text-color-secondary);
						padding: 0 10px;
						border-radius: 3px;
						cursor: move;
						transition: all 0.3s ease;
						background: rgba(255, 255, 255, 0.3);
						min-width: 94.5px;
						.workflow-left-item-icon {
							display: flex;
							align-items: center;
							height: 35px;
						}
						&:hover {
							border: 1px dashed var(--color-primary);
							background: var(--color-primary-light-9);
							transition: all 0.3s ease;
							color: var(--color-primary);
							i {
								cursor: Crosshair;
							}
						}
					}
					.workflow-right-active {
						border: 1px dashed var(--color-primary);
						background: var(--color-primary-light-9);
						color: var(--color-primary);
					}
				}
				::v-deep(.jtk-overlay):not(.aLabel) {
					padding: 4px 10px;
					border: 1px solid var(--el-border-color-light, #ebeef5);
					color: var(--el-text-color-secondary);
					background: rgba(255, 255, 255, 1);
					border-radius: 3px;
					font-size: 10px;
				}
			}
		}
	}
}
</style>
