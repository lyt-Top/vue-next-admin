<template>
	<div class="home-container">
		<el-row :gutter="15">
			<el-col :sm="6" class="mb15">
				<div class="home-card-item home-card-first">
					<div class="flex-margin flex">
						<img :src="getUserInfos.photo" />
						<div class="home-card-first-right ml15">
							<div class="flex-margin">
								<div class="home-card-first-right-title">
									{{ currentTime }}，{{ getUserInfos.userName === '' ? 'test' : getUserInfos.userName }}！
								</div>
								<div class="home-card-first-right-msg mt5">{{ getUserInfos.userName === 'admin' ? '超级管理' : '普通用户' }}</div>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :sm="6" class="mb15" v-for="(v, k) in topCardItemList" :key="k">
				<div class="home-card-item home-card-item-box" :style="{ background: v.color }">
					<div class="home-card-item-flex">
						<div class="home-card-item-title pb3">{{ v.title }}</div>
						<div class="home-card-item-title-num pb6" :id="`titleNum${k + 1}`"></div>
						<div class="home-card-item-tip pb3">{{ v.tip }}</div>
						<div class="home-card-item-tip-num" :id="`tipNum${k + 1}`"></div>
					</div>
					<i :class="v.icon" :style="{ color: v.iconColor }"></i>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15">
			<el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16" class="mb15">
				<el-card shadow="hover" :header="$t('message.card.title1')">
					<div style="height: 200px" ref="homeLaboratoryRef"></div>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8">
				<el-card shadow="hover" :header="$t('message.card.title2')">
					<div class="home-monitor">
						<div class="flex-warp">
							<div class="flex-warp-item" v-for="(v, k) in environmentList" :key="k">
								<div class="flex-warp-item-box">
									<i :class="v.icon" :style="{ color: v.iconColor }"></i>
									<span class="pl5">{{ v.label }}</span>
									<div class="mt10">{{ v.value }}</div>
								</div>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="15">
			<el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16" class="home-warning-media">
				<el-card shadow="hover" :header="$t('message.card.title3')" class="home-warning-card">
					<el-table :data="tableData.data" style="width: 100%" stripe>
						<el-table-column prop="date" :label="$t('message.table.th1')"></el-table-column>
						<el-table-column prop="name" :label="$t('message.table.th2')"></el-table-column>
						<el-table-column prop="address" :label="$t('message.table.th3')"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8" class="home-dynamic-media">
				<el-card shadow="hover" :header="$t('message.card.title4')">
					<div class="home-dynamic">
						<el-scrollbar>
							<div class="home-dynamic-item" v-for="(v, k) in activitiesList" :key="k">
								<div class="home-dynamic-item-left">
									<div class="home-dynamic-item-left-time1 mb5">{{ v.time1 }}</div>
									<div class="home-dynamic-item-left-time2">{{ v.time2 }}</div>
								</div>
								<div class="home-dynamic-item-line">
									<i class="iconfont icon-fangkuang"></i>
								</div>
								<div class="home-dynamic-item-right">
									<div class="home-dynamic-item-right-title mb5">
										<SvgIcon name="elementComment" />
										<span>{{ v.title }}</span>
									</div>
									<div class="home-dynamic-item-right-label">{{ v.label }}</div>
								</div>
							</div>
						</el-scrollbar>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mt15">
				<el-card shadow="hover" :header="$t('message.card.title5')">
					<div style="height: 200px" ref="homeOvertimeRef"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, nextTick, computed, getCurrentInstance, watch, onActivated } from 'vue';
import * as echarts from 'echarts';
import { CountUp } from 'countup.js';
import { formatAxis } from '/@/utils/formatTime';
import { useStore } from '/@/store/index';
import { topCardItemList, environmentList, activitiesList } from './mock';
export default {
	name: 'home',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const state = reactive({
			topCardItemList,
			environmentList,
			activitiesList,
			tableData: {
				data: [
					{
						date: '2016-05-02',
						name: '1号实验室',
						address: '烟感2.1%OBS/M',
					},
					{
						date: '2016-05-04',
						name: '2号实验室',
						address: '温度30℃',
					},
					{
						date: '2016-05-01',
						name: '3号实验室',
						address: '湿度57%RH',
					},
				],
			},
			myCharts: [],
		});
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		// 当前时间提示语
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});
		// 初始化数字滚动
		const initNumCountUp = () => {
			nextTick(() => {
				new CountUp('titleNum1', Math.random() * 10000).start();
				new CountUp('titleNum2', Math.random() * 10000).start();
				new CountUp('titleNum3', Math.random() * 10000).start();
				new CountUp('tipNum1', Math.random() * 1000).start();
				new CountUp('tipNum2', Math.random() * 1000).start();
				new CountUp('tipNum3', Math.random() * 1000).start();
			});
		};
		// 商品销售情
		const initHomeLaboratory = () => {
			const myChart = echarts.init(proxy.$refs.homeLaboratoryRef);
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['预购队列', '最新成交价'],
					right: 13,
				},
				color: [
					'#63caff',
					'#49beff',
					'#03387a',
					'#03387a',
					'#03387a',
					'#6c93ee',
					'#a9abff',
					'#f7a23f',
					'#27bae7',
					'#ff6d9d',
					'#cb79ff',
					'#f95b5a',
					'#ccaf27',
					'#38b99c',
					'#93d0ff',
					'#bd74e0',
					'#fd77da',
					'#dea700',
				],
				xAxis: {
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				},
				yAxis: [
					{
						type: 'value',
						name: '价格',
					},
				],
				series: [
					{
						name: '预购队列',
						type: 'bar',
						data: [200, 85, 112, 275, 305, 415, 441, 405, 275, 305, 415, 441],
						itemStyle: {
							barBorderRadius: [4, 4, 0, 0],
							color: {
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								type: 'linear',
								global: false,
								colorStops: [
									{
										offset: 0,
										color: '#0b9eff',
									},
									{
										offset: 1,
										color: '#63caff',
									},
								],
							},
						},
					},
					{
						name: '最新成交价',
						type: 'line',
						data: [50, 85, 22, 155, 170, 25, 224, 245, 285, 300, 415, 641],
						itemStyle: {
							color: '#febb50',
						},
					},
				],
			};
			myChart.setOption(option);
			state.myCharts.push(myChart);
		};
		// 履约超时预警
		const initHomeOvertime = () => {
			const myChart = echarts.init(proxy.$refs.homeOvertimeRef);
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['订单数量', '超时数量', '在线数量', '预警数量'],
					right: 13,
				},
				xAxis: {
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				},
				yAxis: [
					{
						type: 'value',
						name: '数量',
					},
				],
				series: [
					{
						name: '订单数量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20, 11, 13, 10, 9, 17, 19],
					},
					{
						name: '超时数量',
						type: 'bar',
						data: [15, 12, 26, 15, 11, 16, 31, 13, 5, 16, 13, 15],
					},
					{
						name: '在线数量',
						type: 'line',
						data: [15, 20, 16, 20, 30, 8, 16, 19, 12, 18, 19, 14],
					},
					{
						name: '预警数量',
						type: 'line',
						data: [10, 10, 13, 12, 15, 18, 19, 10, 12, 15, 11, 17],
					},
				],
			};
			myChart.setOption(option);
			state.myCharts.push(myChart);
		};
		// 批量设置 echarts resize
		const initEchartsResizeFun = () => {
			nextTick(() => {
				for (let i = 0; i < state.myCharts.length; i++) {
					state.myCharts[i].resize();
				}
			});
		};
		// 批量设置 echarts resize
		const initEchartsResize = () => {
			window.addEventListener('resize', initEchartsResizeFun);
		};
		// 页面加载时
		onMounted(() => {
			initNumCountUp();
			initHomeLaboratory();
			initHomeOvertime();
			initEchartsResize();
		});
		// 由于页面缓存原因，keep-alive
		onActivated(() => {
			initEchartsResizeFun();
		});
		// 监听 vuex 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
		watch(
			() => store.state.tagsViewRoutes.isTagsViewCurrenFull,
			() => {
				initEchartsResizeFun();
			}
		);
		return {
			getUserInfos,
			currentTime,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.home-container {
	overflow-x: hidden;
	.home-card-item {
		width: 100%;
		height: 103px;
		background: var(--el-text-color-secondary);
		border-radius: 4px;
		transition: all ease 0.3s;
		&:hover {
			box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
			transition: all ease 0.3s;
		}
	}
	.home-card-item-box {
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		&:hover {
			i {
				right: 0px !important;
				bottom: 0px !important;
				transition: all ease 0.3s;
			}
		}
		i {
			position: absolute;
			right: -10px;
			bottom: -10px;
			font-size: 70px;
			transform: rotate(-30deg);
			transition: all ease 0.3s;
		}
		.home-card-item-flex {
			padding: 0 20px;
			color: var(--color-whites);
			.home-card-item-title,
			.home-card-item-tip {
				font-size: 13px;
			}
			.home-card-item-title-num {
				font-size: 18px;
			}
			.home-card-item-tip-num {
				font-size: 13px;
			}
		}
	}
	.home-card-first {
		background: var(--el-color-white);
		border: 1px solid var(--el-border-color-light, #ebeef5);
		display: flex;
		align-items: center;
		img {
			width: 60px;
			height: 60px;
			border-radius: 100%;
			border: 2px solid var(--color-primary-light-5);
		}
		.home-card-first-right {
			flex: 1;
			display: flex;
			flex-direction: column;
			.home-card-first-right-title {
				color: var(--el-color-black);
			}
			.home-card-first-right-msg {
				font-size: 13px;
				color: var(--el-text-color-secondary);
			}
		}
	}
	.home-monitor {
		height: 200px;
		.flex-warp-item {
			width: 50%;
			height: 100px;
			display: flex;
			.flex-warp-item-box {
				margin: auto;
				height: auto;
				text-align: center;
				color: var(--el-text-color-primary);
			}
		}
	}
	.home-warning-card {
		height: 292px;
		::v-deep(.el-card) {
			height: 100%;
		}
	}
	.home-dynamic {
		height: 200px;
		.home-dynamic-item {
			display: flex;
			width: 100%;
			height: 60px;
			overflow: hidden;
			&:first-of-type {
				.home-dynamic-item-line {
					i {
						color: orange !important;
					}
				}
			}
			.home-dynamic-item-left {
				text-align: right;
				.home-dynamic-item-left-time1 {
				}
				.home-dynamic-item-left-time2 {
					font-size: 13px;
					color: var(--el-text-color-secondary);
				}
			}
			.home-dynamic-item-line {
				height: 60px;
				border-right: 2px dashed var(--el-border-color-light, #ebeef5);
				margin: 0 20px;
				position: relative;
				i {
					color: var(--color-primary);
					font-size: 12px;
					position: absolute;
					top: 1px;
					left: -6px;
					transform: rotate(46deg);
					background: var(--el-color-white);
				}
			}
			.home-dynamic-item-right {
				flex: 1;
				.home-dynamic-item-right-title {
					i {
						margin-right: 5px;
						border: 1px solid var(--el-border-color-light, #ebeef5);
						width: 20px;
						height: 20px;
						border-radius: 100%;
						padding: 3px 2px 2px;
						text-align: center;
						color: var(--color-primary);
					}
				}
				.home-dynamic-item-right-label {
					font-size: 13px;
					color: var(--el-text-color-secondary);
				}
			}
		}
	}
}
</style>
