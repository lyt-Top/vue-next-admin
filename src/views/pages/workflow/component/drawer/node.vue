<template>
	<div class="workflow-drawer-node">
		<el-tabs type="border-card" v-model="tabsActive">
			<!-- 节点编辑 -->
			<el-tab-pane label="节点编辑" name="1">
				<el-scrollbar>
					<el-form :model="node" :rules="nodeRules" ref="nodeFormRef" size="default" label-width="80px" class="pt15 pr15 pb15 pl15">
						<el-form-item label="数据id" prop="id">
							<el-input v-model="node.id" placeholder="请输入数据id" clearable disabled></el-input>
						</el-form-item>
						<el-form-item label="节点id" prop="nodeId">
							<el-input v-model="node.nodeId" placeholder="请输入节点id" clearable disabled></el-input>
						</el-form-item>
						<el-form-item label="类型" prop="type">
							<el-input v-model="node.type" placeholder="请输入类型" clearable disabled></el-input>
						</el-form-item>
						<el-form-item label="left坐标" prop="left">
							<el-input v-model="node.left" placeholder="请输入left坐标" clearable disabled></el-input>
						</el-form-item>
						<el-form-item label="top坐标" prop="top">
							<el-input v-model="node.top" placeholder="请输入top坐标" clearable disabled></el-input>
						</el-form-item>
						<el-form-item label="icon图标" prop="icon">
							<el-input v-model="node.icon" placeholder="请输入icon图标" clearable></el-input>
						</el-form-item>
						<el-form-item label="名称" prop="name">
							<el-input v-model="node.name" placeholder="请输入名称" clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-button class="mb15" @click="onNodeRefresh">
								<SvgIcon name="ele-RefreshRight" />
								重置
							</el-button>
							<el-button type="primary" class="mb15" @click="onNodeSubmit">
								<SvgIcon name="ele-Check" />
								保存
							</el-button>
						</el-form-item>
					</el-form>
				</el-scrollbar>
			</el-tab-pane>

			<!-- 扩展表单 -->
			<el-tab-pane label="扩展表单" name="2">
				<el-scrollbar>
					<el-form :model="form" ref="extendFormRef" size="default" label-width="80px" class="pt15 pr15 pb15 pl15">
						<el-form-item
							:label="val.label"
							:prop="val.prop"
							v-for="(val, key) in node.from"
							:key="key"
							:rules="[{ required: val.required, message: `${val.label}不能为空`, trigger: 'blur' }]"
						>
							<el-input
								v-model="form[val.prop]"
								:placeholder="val.placeholder"
								clearable
								v-if="val.type === 'input'"
								:disabled="val.disabled"
							></el-input>
							<el-select v-model="form[val.prop]" placeholder="请选择" v-if="val.type === 'select'" clearable :disabled="val.disabled">
								<el-option v-for="item in val.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
							<el-checkbox-group v-model="form[val.prop]" v-if="val.type === 'checkbox'" :disabled="val.disabled">
								<el-checkbox label="美食推荐" name="type"></el-checkbox>
								<el-checkbox label="统计分析" name="type"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item>
							<el-button class="mb15" @click="onExtendRefresh">
								<SvgIcon name="ele-RefreshRight" />
								重置
							</el-button>
							<el-button type="primary" class="mb15" @click="onExtendSubmit" :loading="loading.extend">
								<SvgIcon name="ele-Check" />
								保存
							</el-button>
						</el-form-item>
					</el-form>
				</el-scrollbar>
			</el-tab-pane>

			<!-- 图表可视化 -->
			<el-tab-pane label="图表可视化" name="3">
				<el-scrollbar>
					<div class="flex-content-right">
						<div style="height: 200px; width: 320px" ref="chartsMonitorRef"></div>
					</div>
				</el-scrollbar>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, nextTick, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';

// 定义接口来定义对象的类型
interface WorkflowDrawerNodeState {
	node: { [key: string]: any };
	nodeRules: any;
	form: any;
	tabsActive: string;
	loading: {
		extend: boolean;
	};
}

export default defineComponent({
	name: 'pagesWorkflowDrawerNode',
	setup(props, { emit }) {
		const { proxy } = <any>getCurrentInstance();
		const nodeFormRef = ref();
		const extendFormRef = ref();
		const chartsMonitorRef = ref();
		const state = reactive<WorkflowDrawerNodeState>({
			node: {},
			nodeRules: {
				id: [{ required: true, message: '请输入数据id', trigger: 'blur' }],
				nodeId: [{ required: true, message: '请输入节点id', trigger: 'blur' }],
				type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
				left: [{ required: true, message: '请输入left坐标', trigger: 'blur' }],
				top: [{ required: true, message: '请输入top坐标', trigger: 'blur' }],
				icon: [{ required: true, message: '请输入icon图标', trigger: 'blur' }],
				name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
			},
			form: {
				module: [],
			},
			tabsActive: '1',
			loading: {
				extend: false,
			},
		});
		// 获取父组件数据
		const getParentData = (data: object) => {
			state.tabsActive = '1';
			state.node = data;
			initChartsMonitor();
		};
		// 节点编辑-重置
		const onNodeRefresh = () => {
			state.node.icon = '';
			state.node.name = '';
		};
		// 节点编辑-保存
		const onNodeSubmit = () => {
			nodeFormRef.value.validate((valid: boolean) => {
				if (valid) {
					emit('submit', state.node);
					emit('close');
				} else {
					return false;
				}
			});
		};
		// 扩展表单-重置
		const onExtendRefresh = () => {
			extendFormRef.value.resetFields();
		};
		// 扩展表单-保存
		const onExtendSubmit = () => {
			extendFormRef.value.validate((valid: boolean) => {
				if (valid) {
					state.loading.extend = true;
					setTimeout(() => {
						state.loading.extend = false;
						ElMessage.success('保存成功');
						emit('close');
					}, 1000);
				} else {
					return false;
				}
			});
		};
		// 图表可视化-初始化
		const initChartsMonitor = () => {
			const myChart = echarts.init(proxy.$refs.chartsMonitorRef);
			const numsOne = [];
			const numsTwo = [];
			for (let i = 0; i < 7; i++) {
				numsOne.push(`${Math.floor(Math.random() * 52 + 10)}:${Math.floor(Math.random() * 52 + 1)}`);
				numsTwo.push(Math.floor(Math.random() * 52 + 1));
			}
			const option = {
				grid: {
					top: 50,
					right: 30,
					bottom: 30,
					left: 50,
				},
				tooltip: {
					trigger: 'axis',
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: numsOne,
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						itemStyle: {
							color: '#289df5',
							borderColor: '#289df5',
							areaStyle: {
								type: 'default',
								opacity: 0.1,
							},
						},
						data: numsTwo,
						type: 'line',
						areaStyle: {},
					},
				],
			};
			myChart.setOption(option);
			nextTick(() => {
				myChart.resize();
			});
		};
		return {
			nodeFormRef,
			extendFormRef,
			chartsMonitorRef,
			getParentData,
			onNodeRefresh,
			onNodeSubmit,
			onExtendRefresh,
			onExtendSubmit,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.workflow-drawer-node {
	:deep {
		.el-tabs {
			box-shadow: unset;
			border: unset;
			.el-tabs__nav {
				display: flex;
				width: 100%;
				.el-tabs__item {
					flex: 1;
					padding: unset;
					text-align: center;
					&:first-of-type.is-active {
						border-left-color: transparent;
					}
					&:last-of-type.is-active {
						border-right-color: transparent;
					}
				}
			}
			.el-tabs__content {
				padding: 0;
				height: calc(100vh - 90px);
				.el-tab-pane {
					height: 100%;
				}
			}
		}
	}
}
</style>
