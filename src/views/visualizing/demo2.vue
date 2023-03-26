<template>
	<div class="visualizing-demo2">
		<!-- 顶部 -->
		<div class="big-data-up">
			<div class="up-left">
				<SvgIcon name="ele-Timer" class="mr5" />
				<span>{{ state.time.txt }}</span>
			</div>
			<div class="up-center">
				<span>智慧农业系统平台</span>
			</div>
			<div class="up-right">
				<el-dropdown size="small">
					<span class="el-dropdown-link">
						{{ state.dropdownActive }}
						<SvgIcon name="ele-ArrowDown" class="el-icon--right" />
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="(v, k) in state.dropdownList" :key="k">{{ v.label }} </el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<div class="ml15">
					<SvgIcon name="ele-Bell" class="mr5" />
					<span>消息</span>
				</div>
				<div class="ml15">
					<SvgIcon name="ele-User" class="mr5" />
					<span>个人</span>
				</div>
				<div class="ml15">
					<SvgIcon name="ele-SwitchButton" class="mr5" />
					<span>返回</span>
				</div>
			</div>
		</div>

		<div class="big-data-down">
			<!-- 左边 -->
			<div class="big-data-down-left">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">天气预报</div>
						<div class="flex-content flex-content-overflow">
							<div class="sky">
								<SvgIcon name="ele-Sunny" class="sky-left" />
								<div class="sky-center">
									<div class="mb2">
										<span class="font">多云转晴</span>
										<span class="font">东南风</span>
										<span>良</span>
									</div>
									<div class="sky-tip">温馨提示：多云转晴，南风转北风风力3级</div>
								</div>
								<div class="sky-right">
									<span>25</span>
									<span class="font">°C</span>
								</div>
							</div>
							<div class="sky-dd">
								<div class="sky-dl" v-for="(v, k) in state.skyList" :key="k" :class="{ 'sky-dl-first': k === 1 }">
									<div>{{ v.v1 }}</div>
									<div v-if="v.type === 'title'">{{ v.v2 }}</div>
									<div v-else>
										<SvgIcon :name="v.v2" />
									</div>
									<div>{{ v.v3 }}</div>
									<div>{{ v.v4 }}</div>
									<div class="tip">{{ v.v5 }}</div>
									<div>{{ v.v6 }}</div>
									<div>{{ v.v7 }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">当前设备状态</div>
						<div class="flex-content flex-content-overflow">
							<div class="d-states">
								<div class="d-states-item">
									<SvgIcon name="ele-Odometer" class="i-bg1" />
									<div class="d-states-flex">
										<div class="d-states-item-label">园区设备数</div>
										<div class="d-states-item-value">99</div>
									</div>
								</div>
								<div class="d-states-item">
									<SvgIcon name="ele-FirstAidKit" class="i-bg2" />
									<div class="d-states-flex">
										<div class="d-states-item-label">预警设备数</div>
										<div class="d-states-item-value">10</div>
									</div>
								</div>
								<div class="d-states-item">
									<SvgIcon name="ele-VideoPlay" class="i-bg3" />
									<div class="d-states-flex">
										<div class="d-states-item-label">运行设备数</div>
										<div class="d-states-item-value">20</div>
									</div>
								</div>
							</div>
							<div class="d-btn">
								<div class="d-btn-item" v-for="(v, k) in state.dBtnList" :key="k" :class="{ 'd-btn-active': state.dBtnActive === k }">
									<SvgIcon name="ele-Money" class="d-btn-item-left" />
									<div class="d-btn-item-center">
										<div>{{ v.v1 }}</div>
										<div>{{ v.v2 }}|{{ v.v3 }}</div>
									</div>
									<div class="d-btn-item-eight">{{ v.v4 }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">近30天预警总数</div>
						<div class="flex-content" ref="rightChartData1"></div>
					</div>
				</div>
			</div>

			<!-- 中间 -->
			<div class="big-data-down-center">
				<div class="big-data-down-center-one">
					<div class="big-data-down-center-one-content" ref="rightChartData5">
						<div id="3DEarth"></div>
						<div :class="v.topLevelClass" v-for="(v, k) in state.earth3DBtnList" :key="k">
							<div class="circle" v-for="i in 4" :key="i"></div>
							<div class="text-box">
								<SvgIcon :name="v.icon" :size="22" />
								<div class="text">{{ v.label }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="big-data-down-center-two">
					<div class="flex-warp-item-box">
						<div class="flex-title">
							<span>当前设备监测</span>
							<span class="flex-title-small">单位：次</span>
						</div>
						<div class="flex-content">
							<div class="flex-content-left">
								<div class="monitor-item" v-for="(v, k) in state.chartData4List" :key="k">
									<div class="monitor-wave" :class="{ 'monitor-active': k === state.chartData4Index }">
										<div class="monitor-z-index">
											<div class="monitor-item-label">{{ v.label }}</div>
										</div>
									</div>
								</div>
							</div>
							<div class="flex-content-right" ref="rightChartData4"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- 右边 -->
			<div class="big-data-down-right">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">
							<span>近7天产品追溯扫码统计</span>
							<span class="flex-title-small">单位：次</span>
						</div>
						<div class="flex-content" ref="rightChartData3"></div>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">当前任务统计</div>
						<div class="flex-content">
							<div class="task">
								<div class="task-item task-first-item">
									<div class="task-item-value task-first">25</div>
									<div class="task-item-label">待办任务</div>
								</div>
								<div class="task-item">
									<div class="task-item-box task1">
										<div class="task-item-value">12</div>
										<div class="task-item-label">施肥</div>
									</div>
								</div>
								<div class="task-item">
									<div class="task-item-box task2">
										<div class="task-item-value">3</div>
										<div class="task-item-label">施药</div>
									</div>
								</div>
								<div class="task-item">
									<div class="task-item-box task3">
										<div class="task-item-value">5</div>
										<div class="task-item-label">农事</div>
									</div>
								</div>
								<div class="task-item">
									<div class="task-item-box task4">
										<div class="task-item-value">3</div>
										<div class="task-item-label">巡园</div>
									</div>
								</div>
								<div class="task-item">
									<div class="task-item-box task5">
										<div class="task-item-value">2</div>
										<div class="task-item-label">采集</div>
									</div>
								</div>
							</div>
							<div ref="rightChartData6" class="progress"></div>
						</div>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">
							<span>近7天投入品记录</span>
							<span class="flex-title-small">单位：件</span>
						</div>
						<div class="flex-content" ref="rightChartData2"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="visualizingLinkDemo2">
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';
import { formatDate } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import { dropdownList, skyList, dBtnList, earth3DBtnList, chartData4List } from './mock/demo2';

// 定义变量内容
const rightChartData1 = ref();
const rightChartData2 = ref();
const rightChartData3 = ref();
const rightChartData4 = ref();
const rightChartData5 = ref();
const rightChartData6 = ref();
const state = reactive<Demo2State>({
	time: {
		txt: '',
		fun: 0,
	},
	dropdownList,
	dropdownActive: '请选择',
	skyList,
	dBtnList,
	chartData4Index: 0,
	dBtnActive: 0,
	earth3DBtnList,
	chartData4List,
	myCharts: [],
});

// 初始化时间
const initTime = () => {
	state.time.txt = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ');
	state.time.fun = window.setInterval(() => {
		state.time.txt = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ');
	}, 1000);
};
// 近30天预警总数
const initRightChartData1 = () => {
	const myChart = echarts.init(rightChartData1.value);
	const option = {
		tooltip: {
			trigger: 'item',
		},
		series: [
			{
				name: '面积模式',
				type: 'pie',
				radius: [10, 60],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 5,
				},
				data: [
					{ name: '天气预警', value: 100 },
					{ name: '病虫害预警', value: 50 },
					{ name: '任务预警', value: 130 },
					{ name: '监测设备预警', value: 62 },
				],
				label: {
					color: '#c0d1f2',
				},
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 当前设备监测
const initRightChartData4 = () => {
	const myChart = echarts.init(rightChartData4.value);
	const option = {
		grid: {
			top: 10,
			right: 10,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['1月', '2月', '3月', '4月', '5月', '6月'],
			axisLine: {
				lineStyle: {
					color: 'rgba(22, 207, 208, 0.1)',
					width: 1,
				},
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				interval: 0,
				color: '#c0d1f2',
				textStyle: {
					fontSize: 10,
				},
			},
		},
		yAxis: [
			{
				type: 'value',
				axisLabel: {
					color: '#c0d1f2',
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.3)',
					},
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: 'rgba(22, 207, 208, 0.02)',
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
		],
		series: [
			{
				name: '温度',
				type: 'line',
				smooth: true,
				lineStyle: {
					width: 0,
				},
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(128, 255, 165)',
						},
						{
							offset: 1,
							color: 'rgba(1, 191, 236)',
						},
					]),
				},
				emphasis: {
					focus: 'series',
				},
				data: [140, 232, 101, 264, 90, 70],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 近7天产品追溯扫码统计
const initRightChartData3 = () => {
	const myChart = echarts.init(rightChartData3.value);
	const option = {
		grid: {
			top: 10,
			right: 0,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			data: ['1月', '2月', '3月', '4月', '5月', '6月'],
			axisLine: {
				lineStyle: {
					color: 'rgba(22, 207, 208, 0.1)',
					width: 1,
				},
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				color: '#c0d1f2',
			},
		},
		yAxis: [
			{
				type: 'value',
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
					},
				},
				axisLabel: {
					color: '#c0d1f2',
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.3)',
					},
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: 'rgba(22, 207, 208, 0.02)',
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
		],
		series: [
			{
				name: '预购队列',
				type: 'line',
				data: [200, 85, 112, 275, 305, 415],
				itemStyle: {
					color: '#16cfd0',
				},
			},
			{
				name: '最新成交价',
				type: 'line',
				data: [50, 85, 22, 155, 170, 25],
				itemStyle: {
					color: '#febb50',
				},
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 当前任务统计
const initRightChartData6 = () => {
	const myChart = echarts.init(rightChartData6.value);
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		grid: {
			top: 20,
			right: 50,
			bottom: 0,
			left: 80,
		},
		xAxis: [
			{
				splitLine: {
					show: false,
				},
				type: 'value',
				show: false,
			},
		],
		yAxis: [
			{
				splitLine: {
					show: false,
				},
				axisLine: {
					//y轴
					show: false,
				},
				type: 'category',
				axisTick: {
					show: false,
				},
				inverse: true,
				data: ['施肥任务完成率', '施药任务完成率', '农事任务完成率'],
				axisLabel: {
					color: '#A7D6F4',
					fontSize: 12,
				},
			},
		],
		series: [
			{
				name: '标准化',
				type: 'bar',
				barWidth: 10, // 柱子宽度
				label: {
					show: true,
					position: 'right', // 位置
					color: '#A7D6F4',
					fontSize: 12,
					distance: 15, // 距离
					formatter: '{c}%', // 这里是数据展示的时候显示的数据
				}, // 柱子上方的数值
				itemStyle: {
					barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）

					color: new echarts.graphic.LinearGradient(
						1,
						0,
						0,
						0,
						[
							{
								offset: 0,
								color: '#51C5FD',
							},
							{
								offset: 1,
								color: '#005BB1',
							},
						],
						false
					), // 渐变
				},
				data: [75, 100, 60],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 近7天投入品记录
const initRightChartData2 = () => {
	const myChart = echarts.init(rightChartData2.value);
	const option = {
		grid: {
			top: 10,
			right: 0,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		xAxis: {
			data: ['1月', '2月', '3月', '4月', '5月', '6月'],
			axisLine: {
				lineStyle: {
					color: 'rgba(22, 207, 208, 0.5)',
					width: 1,
				},
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				color: '#c0d1f2',
			},
		},
		yAxis: [
			{
				type: 'value',
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
					},
				},
				axisLabel: {
					color: '#c0d1f2',
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.3)',
					},
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: 'rgba(22, 207, 208, 0.02)',
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
			{
				type: 'value',
				position: 'right',
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: true,
					formatter: '{value}%',
					textStyle: {
						color: '#16cfd0',
					},
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: 'rgba(22, 207, 208, 0.02)',
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
		],
		series: [
			{
				name: '销售水量',
				type: 'line',
				yAxisIndex: 1,
				smooth: true,
				showAllSymbol: true,
				symbol: 'circle',
				itemStyle: {
					color: '#058cff',
				},
				lineStyle: {
					color: '#058cff',
				},
				areaStyle: {
					color: 'rgba(5,140,255, 0.2)',
				},
				data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8],
			},
			{
				name: '主营业务',
				type: 'bar',
				barWidth: 15,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: '#00FFE3',
							},
							{
								offset: 1,
								color: '#4693EC',
							},
						]),
					},
				},
				data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 3DEarth 地图
const init3DEarth = (globeRadius: any) => {
	let el = <HTMLElement>document.getElementById('3DEarth');
	el.style.height = `${rightChartData5.value.offsetHeight}px`;
	const myChart = echarts.init(el);
	const option = {
		globe: {
			baseTexture: 'https://i.hd-r.cn/4d572a171eb475da0c2e731d15b63aea.jpg',
			heightTexture: 'https://i.hd-r.cn/52356e8d906c84c5e23390f829dec7a3.jpg',
			shading: 'realistic',
			light: {
				ambient: {
					intensity: 0.4,
				},
				main: {
					intensity: 0.4,
				},
			},
			viewControl: {
				autoRotate: true,
			},
			postEffect: {
				enable: true,
				bloom: {
					enable: true,
				},
			},
			globeRadius,
		},
		series: {
			type: 'lines3D',
			coordinateSystem: 'globe',
			blendMode: 'lighter',
			lineStyle: {
				width: 1,
				color: 'rgb(50, 50, 150)',
				opacity: 0.1,
			},
			data: [],
		},
	};
	// 随机模拟攻击线
	let rodamData: any = function () {
		let longitude = 105.18;
		let longitude2 = Math.random() * 360 - 180;
		let latitude = 37.51;
		let latitude2 = Math.random() * 180 - 90;
		return {
			coords: [
				[longitude2, latitude2],
				[longitude, latitude],
			],
			value: (Math.random() * 3000).toFixed(2),
		};
	};
	for (let i = 0; i < 150; i++) {
		option.series.data = option.series.data.concat(rodamData());
	}
	myChart.setOption(option);
};
// 监听地球大小变化
const initAddEventListener3DEarth = () => {
	let w = document.body.clientWidth;
	let globeRadius = 0;
	if (w >= 1920) globeRadius = 100;
	else if (w > 1200 && w < 1920) globeRadius = 70;
	else if (w > 992 && w < 1200) globeRadius = 60;
	else if (w > 768 && w < 992) globeRadius = 40;
	else if (w < 768) globeRadius = 20;
	init3DEarth(globeRadius);
};
// 批量设置 echarts resize
const initEchartsResize = () => {
	initAddEventListener3DEarth();
	window.addEventListener('resize', () => {
		for (let i = 0; i < state.myCharts.length; i++) {
			state.myCharts[i].resize();
		}
		initAddEventListener3DEarth();
	});
};
// 页面加载时
onMounted(async () => {
	NextLoading.done();
	initTime();
	await initRightChartData1();
	await initRightChartData4();
	await initRightChartData3();
	await initRightChartData2();
	await initRightChartData6();
	await initEchartsResize();
});
// 页面卸载时
onUnmounted(() => {
	window.clearInterval(state.time.fun);
});
</script>

<style scoped lang="scss">
.visualizing-demo2 {
	height: 100%;
	width: 100%;
	overflow: hidden;
	background: url(https://i.hd-r.cn/b1040178e4a2265fe87ffbb9bda839a4.jpg);
	background-size: 100% 100%;
	display: flex;
	flex-direction: column;
	font-size: 13px;
	.big-data-up {
		height: 70px;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 15px;
		color: #43bdf0;
		overflow: hidden;
		.up-left {
			width: 30%;
			font-style: italic;
		}
		.up-center {
			width: 40%;
			display: flex;
			justify-content: center;
			font-size: 20px;
			letter-spacing: 5px;
			background-image: -webkit-linear-gradient(left, #43bdf0, #c0d1f2 25%, #43bdf0 50%, #c0d1f2 75%, #43bdf0);
			-webkit-text-fill-color: transparent;
			background-clip: text;
			-webkit-background-clip: text;
			background-size: 200% 100%;
			animation: masked-animation 4s infinite linear;
			-webkit-box-reflect: below -2px -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(255, 255, 255, 0.1)));
			@keyframes masked-animation {
				0% {
					background-position: 0 0;
				}
				100% {
					background-position: -100% 0;
				}
			}
			position: relative;
			&::after {
				content: '';
				width: 50%;
				position: absolute;
				bottom: -15px;
				left: 50%;
				transform: translateX(-50%);
				border: 1px transparent solid;
				border-image: linear-gradient(to right, rgba(0, 0, 0, 0.1), #43bdf0) 1 10;
			}
			span {
				cursor: pointer;
			}
		}
		.up-right {
			width: 30%;
			justify-content: flex-end;
			display: flex;
			align-items: center;
			.ml15:hover {
				cursor: pointer;
			}
			:deep(.el-dropdown) {
				font-size: 13px !important;
				color: #43bdf0;
				cursor: pointer;
			}
		}
	}
	.big-data-down {
		flex: 1;
		overflow: hidden;
		display: flex;
		.big-data-down-left,
		.big-data-down-right {
			width: 30%;
			display: flex;
			flex-direction: column;
			.flex-warp-item {
				padding: 0 7.5px 15px 15px;
				width: 100%;
				height: 33.33%;
				.flex-warp-item-box {
					width: 100%;
					height: 100%;
					background: rgba(22, 34, 58, 0.4);
					display: flex;
					flex-direction: column;
					padding: 15px;
					.flex-title {
						margin-bottom: 15px;
						color: #c0d1f2;
						display: flex;
						justify-content: space-between;
						.flex-title-small {
							font-size: 12px;
						}
					}
					.flex-content {
						flex: 1;
						font-size: 12px;
					}
					.flex-content-overflow {
						overflow: hidden;
					}
				}
			}
		}
		.big-data-down-left {
			color: #c0d1f2;
			.sky {
				display: flex;
				align-items: center;
				.sky-left {
					font-size: 30px;
				}
				.sky-center {
					flex: 1;
					overflow: hidden;
					padding: 0 10px;
					.font {
						margin-right: 15px;
						background: unset !important;
						border-radius: unset !important;
						padding: unset !important;
					}
					span {
						background: #22bc76;
						border-radius: 2px;
						padding: 0 5px;
					}
					.sky-tip {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				.sky-right {
					span {
						font-size: 30px;
					}
					font {
						font-size: 20px;
					}
				}
			}
			.sky-dd {
				.sky-dl {
					display: flex;
					align-items: center;
					height: 28px;
					overflow: hidden;
					div {
						flex: 1;
						overflow: hidden;
						i {
							font-size: 14px;
						}
					}
					.tip {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					&:hover {
						background: rgba(0, 0, 0, 0.05);
						cursor: default;
						border-radius: 4px;
					}
					&:first-child:hover {
						background: unset;
					}
				}
				.sky-dl-first {
					color: #43bdf0;
				}
			}
			.d-states {
				display: flex;
				.d-states-item {
					flex: 1;
					display: flex;
					align-items: center;
					overflow: hidden;
					i {
						font-size: 20px;
						height: 33px;
						width: 33px;
						line-height: 33px;
						text-align: center;
						border-radius: 100%;
						flex-shrink: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.i-bg1 {
						background: #22bc76;
					}
					.i-bg2 {
						background: #e2356d;
					}
					.i-bg3 {
						background: #43bbef;
					}
					.d-states-flex {
						overflow: hidden;
						padding: 0 10px 0;
						.d-states-item-label {
							color: #43bdf0;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.d-states-item-value {
							font-size: 20px;
							text-align: center;
						}
					}
				}
			}
			.d-btn {
				margin-top: 15px;
				.d-btn-item {
					border: 1px solid #c0d1f2;
					display: flex;
					width: 100%;
					height: 35px;
					border-radius: 35px;
					align-items: center;
					padding: 0 4px;
					margin-top: 15px;
					cursor: pointer;
					transition: all ease 0.3s;
					.d-btn-item-left {
						font-size: 20px;
						border: 1px solid #c0d1f2;
						width: 25px;
						height: 25px;
						line-height: 25px;
						border-radius: 100%;
						text-align: center;
						font-size: 14px;
					}
					.d-btn-item-center {
						padding: 0 10px;
						flex: 1;
					}
					.d-btn-item-eight {
						text-align: right;
						padding-right: 10px;
					}
				}
				.d-btn-active {
					transition: all ease 0.3s;
					border: 1px solid #43bdf0;
					color: #43bdf0;
					.d-btn-item-left {
						border: 1px solid #43bdf0;
					}
				}
			}
		}
		.big-data-down-center {
			width: 40%;
			display: flex;
			flex-direction: column;
			.big-data-down-center-one {
				height: 66.67%;
				padding: 0 7.5px 15px;
				.big-data-down-center-one-content {
					height: 100%;
					position: relative;
					.fixed-top,
					.fixed-right,
					.fixed-bottom,
					.fixed-left {
						position: absolute;
						width: 100px;
						height: 100px;
						display: flex;
						cursor: pointer;
						.circle {
							position: absolute;
							border-radius: 50%;
							background: rgba(0, 0, 0, 0.01);
							z-index: 10;
						}
						.text-box {
							position: relative;
							z-index: 11;
							color: #c0d1f2;
							margin: auto;
							text-align: center;
							font-size: 12px;
							i {
								font-size: 28px;
								margin-bottom: 10px;
							}
						}
					}
					.fixed-top {
						left: 20px;
						top: 20px;
					}
					.fixed-right {
						right: 20px;
						top: 20px;
					}
					.fixed-bottom {
						right: 20px;
						bottom: 20px;
					}
					.fixed-left {
						left: 20px;
						bottom: 20px;
					}
					.circle:nth-of-type(1) {
						width: 100px;
						height: 95px;
						animation: turnAround 6s infinite linear;
						box-shadow: 0 0 1px 0 #869fe4, inset 0 0 10px 0 #869fe4;
					}
					.circle:nth-of-type(2) {
						width: 95px;
						height: 100px;
						animation: turnAround 10s infinite linear;
						box-shadow: 0 0 1px 0 #3397f2, inset 0 0 10px 0 #3397f2;
					}
					.circle:nth-of-type(3) {
						width: 110px;
						height: 100px;
						animation: turnAround 5s infinite linear;
						box-shadow: 0 0 1px 0 #3eaadc, inset 0 0 10px 0 #3eaadc;
					}
					.circle:nth-of-type(4) {
						width: 100px;
						height: 110px;
						animation: turnAround 15s infinite linear;
						box-shadow: 0 0 1px 0 #09f, inset 0 0 10px 0 #09f;
					}
					@keyframes turnAround {
						100% {
							transform: rotate(360deg);
						}
					}
				}
			}
			.big-data-down-center-two {
				padding: 0 7.5px 15px;
				height: 33.33%;
				.flex-warp-item-box {
					width: 100%;
					height: 100%;
					background: rgba(22, 34, 58, 0.4);
					display: flex;
					flex-direction: column;
					padding: 15px;
					.flex-title {
						margin-bottom: 15px;
						color: #c0d1f2;
						display: flex;
						justify-content: space-between;
						.flex-title-small {
							font-size: 12px;
						}
					}
					.flex-content {
						flex: 1;
						font-size: 12px;
						display: flex;
						height: calc(100% - 30px);
						.flex-content-left {
							display: flex;
							flex-wrap: wrap;
							width: 120px;
							height: 100%;
							.monitor-item {
								width: 50%;
								display: flex;
								align-items: center;
								.monitor-wave {
									cursor: pointer;
									width: 40px;
									height: 40px;
									position: relative;
									background-color: #43bdf0;
									border-radius: 50%;
									overflow: hidden;
									text-align: center;
									&::before,
									&::after {
										content: '';
										position: absolute;
										left: 50%;
										width: 40px;
										height: 40px;
										background: #f4f4f4;
										animation: roateOne 10s linear infinite;
										transform: translateX(-50%);
										z-index: 1;
									}
									&::before {
										bottom: 10px;
										border-radius: 60%;
									}
									&::after {
										bottom: 8px;
										opacity: 0.7;
										border-radius: 37%;
									}
									.monitor-z-index {
										position: relative;
										z-index: 2;
										color: #4eb8ff;
										display: flex;
										align-items: center;
										height: 100%;
										justify-content: center;
										font-weight: bold;
									}
								}
								@keyframes roateOne {
									0% {
										transform: translate(-50%, 0) rotateZ(0deg);
									}
									50% {
										transform: translate(-50%, -2%) rotateZ(180deg);
									}
									100% {
										transform: translate(-50%, 0%) rotateZ(360deg);
									}
								}
								.monitor-active {
									background-color: #22bc76;
									.monitor-z-index {
										color: #22bc76;
									}
								}
							}
						}
						.flex-content-right {
							flex: 1;
						}
					}
				}
			}
		}
		.big-data-down-right {
			.flex-warp-item {
				padding: 0 15px 15px 7.5px;
				.flex-content {
					display: flex;
					flex-direction: column;
					.task {
						display: flex;
						height: 45px;
						.task-item {
							flex: 1;
							color: #c0d1f2;
							display: flex;
							justify-content: center;
							.task-item-box {
								position: relative;
								width: 45px;
								height: 45px;
								overflow: hidden;
								border-radius: 100%;
								z-index: 0;
								display: flex;
								align-items: center;
								flex-direction: column;
								justify-content: center;
								box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.3);
								&::before {
									content: '';
									position: absolute;
									z-index: -2;
									left: -50%;
									top: -50%;
									width: 200%;
									height: 200%;
									background-repeat: no-repeat;
									background-size: 50% 50%, 50% 50%;
									background-position: 0 0, 100% 0, 100% 100%, 0 100%;
									background-image: linear-gradient(#19d4ae, #19d4ae), linear-gradient(#5ab1ef, #5ab1ef), linear-gradient(#fa6e86, #fa6e86),
										linear-gradient(#ffb980, #ffb980);
									animation: rotate 2s linear infinite;
								}
								&::after {
									content: '';
									position: absolute;
									z-index: -1;
									left: 1px;
									top: 1px;
									width: calc(100% - 2px);
									height: calc(100% - 2px);
									border-radius: 100%;
								}
								.task-item-value {
									text-align: center;
									font-size: 14px;
									font-weight: bold;
								}
								.task-item-label {
									text-align: center;
								}
							}
							.task1 {
								&::after {
									background: #5492be;
								}
							}
							.task2 {
								&::after {
									background: #43a177;
								}
							}
							.task3 {
								&::after {
									background: #a76077;
								}
							}
							.task4 {
								&::after {
									background: #b4825a;
								}
							}
							.task5 {
								&::after {
									background: #74568f;
								}
							}
						}
						.task-first-item {
							flex-direction: column;
							text-align: center;
							.task-first {
								font-size: 20px;
							}
						}
					}
				}
			}
			.progress {
				flex: 1;
			}
		}
	}
}
</style>
