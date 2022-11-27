<template>
	<div class="visualizing-demo1">
		<!-- 地图 -->
		<div ref="visualizingDemo1" style="height: 100%"></div>
		<div class="visualizing-container">
			<!-- 头部 -->
			<div class="visualizing-container-head">
				<div class="visualizing-container-head-left">
					<div class="visualizing-container-head-left-text">
						<div class="visualizing-container-head-left-text-box">{{ state.time.txt }}</div>
					</div>
				</div>
				<div class="visualizing-container-head-center">
					<div class="visualizing-container-head-center-box">
						<div class="visualizing-container-head-center-maintitle">深圳市xxx软件科技有限公司</div>
						<div class="visualizing-container-head-center-subtitle">旅游经济</div>
					</div>
				</div>
				<div class="visualizing-container-head-right">
					<div class="visualizing-container-head-right-text">
						<div class="visualizing-container-head-right-text-box">🌤 多云转晴东南风 26~30℃</div>
					</div>
				</div>
			</div>

			<!-- 图表左侧 -->
			<div class="visualizing-container-content-left">
				<div class="visualizing-container-content-left-flex">
					<div class="visualizing-container-title">
						<i class="el-icon-s-shop"></i>
						<span>产业概况</span>
					</div>
					<hr class="visualizing-container-title-colorful" />
					<div ref="visualizingContentLeftTop" style="height: 100%"></div>
				</div>
				<div class="visualizing-container-content-left-flex">
					<div class="visualizing-container-title">
						<i class="el-icon-s-promotion"></i>
						<span>A级风景区对比</span>
					</div>
					<hr class="visualizing-container-title-colorful" />
					<div ref="visualizingContentLeftBottom" style="height: 100%"></div>
				</div>
			</div>

			<!-- 图表中间 -->
			<div class="visualizing-container-content-center">
				<div class="visualizing-container-content-center-bottom">
					<div class="visualizing-container-content-center-bottom-flex">
						<div class="visualizing-container-title">
							<i class="el-icon-s-custom"></i>
							<span>游客过夜情况</span>
						</div>
						<hr class="visualizing-container-title-colorful" />
						<div ref="visualizingContentCenterTop" style="height: 100%"></div>
					</div>
					<div class="visualizing-container-content-center-bottom-flex">
						<div class="visualizing-container-title">
							<i class="el-icon-s-flag"></i>
							<span>游客驻留时长</span>
						</div>
						<hr class="visualizing-container-title-colorful" />
						<div ref="visualizingContentCenterBottom" style="height: 100%"></div>
					</div>
				</div>
			</div>

			<!-- 图表右侧 -->
			<div class="visualizing-container-content-right">
				<div class="visualizing-container-content-right-flex">
					<div class="visualizing-container-title">
						<i class="el-icon-s-marketing"></i>
						<span>当日游客趋势分析</span>
					</div>
					<hr class="visualizing-container-title-colorful" />
					<div ref="visualizingContentRightTop" style="height: 100%"></div>
				</div>
				<div class="visualizing-container-content-right-flex">
					<div class="visualizing-container-title">
						<i class="el-icon-s-data"></i>
						<span>当月游客趋势分析</span>
					</div>
					<hr class="visualizing-container-title-colorful" />
					<div ref="visualizingContentRightBottom" style="height: 100%"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="visualizingLinkDemo1">
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import { formatDate } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import { echartsMapList, echartsMapData, echartsMapImgs } from './mock/demo1';

// 定义变量内容
const visualizingDemo1 = ref();
const visualizingContentLeftTop = ref();
const visualizingContentLeftBottom = ref();
const visualizingContentCenterTop = ref();
const visualizingContentCenterBottom = ref();
const visualizingContentRightTop = ref();
const visualizingContentRightBottom = ref();
const state = reactive({
	echartsMapList,
	echartsMapData,
	echartsMapImgs,
	time: {
		txt: '',
		fun: 0,
	},
	myCharts: [] as EmptyArrayType,
});

// 初始化时间
const initTime = () => {
	state.time.txt = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ');
	state.time.fun = window.setInterval(() => {
		state.time.txt = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ');
	}, 1000);
};
// echartsMap 将坐标信息和对应物理量的值合在一起
const convertData = (data: any) => {
	let res = [];
	for (let i = 0; i < data.length; i++) {
		let geoCoord = state.echartsMapData[data[i].name];
		if (geoCoord) {
			res.push({
				name: data[i].name,
				value: geoCoord.concat(data[i].value),
			});
		}
	}
	return res;
};
// 初始化 echartsMap（地图上的点）
const initEchartsMap = () => {
	const myChart = echarts.init(<HTMLElement>visualizingDemo1.value);
	const option = {
		tooltip: {
			trigger: 'item',
			formatter(params: any) {
				// 自定义鼠标放入样式
				let item = state.echartsMapImgs.find((v: any) => v.name === params.name);
				let html = `<div style="width: 240px">
							<div style="display: flex; align-items: center">
								<img src="${item?.url}" style="width: 50px; height: 50px; border-radius: 100%; position: relative; border: 4px solid #ffffff; margin-left: -4px" />
								<div
									style="
										background: #51c1ff;
										width: 100%;
										height: 32px;
										margin-left: -14px;
										display: flex;
										align-items: center;
										padding-left: 20px;
										color: #fff;
									"
								>
									${item?.name}
								</div>
							</div>
							<div style="margin-top: 10px; font-size: 12px">
								<div style="width: 61px"><i class="el-icon-location-information" style="margin-right: 5px"></i>地址：</div>
								<div style="flex: 1; white-space: pre-wrap; word-break: break-all; margin-top: 5px; color: #333">${item?.add}</div>
							</div>
							<div style="margin-top: 10px; font-size: 12px">
								<div style="width: 61px"><i class="el-icon-chat-dot-round" style="margin-right: 5px"></i>概括：</div>
								<div style="flex: 1; white-space: pre-wrap; word-break: break-all; margin-top: 5px; color: #333">${item?.dec}</div>
							</div>
						</div>`;
				return html;
			},
		},
		color: ['#ea7ccc'],
		bmap: {
			center: [114.064524, 22.549225],
			zoom: 11,
			roam: true,
			mapStyle: {},
		},
		series: [
			{
				name: '门票收入',
				type: 'scatter',
				coordinateSystem: 'bmap',
				data: convertData(state.echartsMapList),
				symbolSize: function (val: any) {
					return val[2] / 10;
				},
				encode: {
					value: 2,
				},
				label: {
					formatter: '{b}',
					position: 'right',
					show: false,
				},
				emphasis: {
					label: {
						show: true,
					},
				},
			},
			{
				name: '门票收入',
				type: 'effectScatter',
				coordinateSystem: 'bmap',
				data: convertData(
					state.echartsMapList
						.sort(function (a: any, b: any) {
							return b.value - a.value;
						})
						.slice(0, 6)
				),
				symbolSize: function (val: any) {
					return val[2] / 10;
				},
				encode: {
					value: 2,
				},
				showEffectOn: 'render',
				rippleEffect: {
					brushType: 'stroke',
				},
				hoverAnimation: true,
				label: {
					formatter: '{b}',
					position: 'right',
					show: true,
				},
				itemStyle: {
					shadowBlur: 100,
					shadowColor: '#333',
				},
				zlevel: 1,
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);

	// 地图
	const map = (<any>myChart).getModel().getComponent('bmap').getBMap();
	// BMAP_NORMAL_MAP ：此地图类型展示普通街道视图
	// BMAP_PERSPECTIVE_MAP ：此地图类型展示透视图像视图。（这个还不会用）
	// BMAP_SATELLITE_MAP：卫星地图 （没有坐标， 绿绿的一片的卫星地图）
	// BMAP_HYBRID_MAP：混合地图 （既有坐标，也是绿绿的一片的卫星地图）
	// eslint-disable-next-line no-undef
	map.setMapType(BMAP_SATELLITE_MAP);
	// eslint-disable-next-line no-undef
	let bdary = new BMap.Boundary();
	// 获取行政区域
	bdary.get('深圳', function (rs: any) {
		// 行政区域的点有多少个
		let count = rs.boundaries.length;
		for (let i = 0; i < count; i++) {
			// eslint-disable-next-line no-undef
			let ply = new BMap.Polygon(rs.boundaries[i], {
				// 设置多边形边线线粗
				strokeWeight: 4,
				// 设置多边形边线透明度0-1
				strokeOpacity: 1,
				// 设置多边形边线样式为实线或虚线，取值 solid 或 dashed
				StrokeStyle: 'dashed',
				// 设置多边形边线颜色
				strokeColor: '#febb50',
				// 设置多边形填充颜色
				fillColor: '',
			});
			// 建立多边形覆盖物
			// 添加覆盖物
			map.addOverlay(ply);
			// 调整视野
			map.setViewport(ply.getPath());
		}
		// 初始化地图，设置中心点坐标和地图级别
		// new BMap.Point('深圳市', 11)
		// eslint-disable-next-line no-undef
		map.centerAndZoom(new BMap.Point(114.064524, 22.549225), 11);
	});
};
// 产业概况
const initVisualizingContentLeftTop = () => {
	const myChart = echarts.init(visualizingContentLeftTop.value);
	const option = {
		grid: {
			top: 50,
			right: 0,
			bottom: 50,
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
				color: '#16cfd0',
			},
		},
		yAxis: [
			{
				type: 'value',
				name: '价格',
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
					},
				},
				axisLabel: {
					color: '#16cfd0',
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
// A级风景区对比
const initVisualizingContentLeftBottom = () => {
	const myChart = echarts.init(visualizingContentLeftBottom.value);
	const option = {
		grid: {
			top: 50,
			right: 10,
			bottom: 40,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['1月', '2月', '3月', '4月', '5月'],
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
				color: '#16cfd0',
				textStyle: {
					fontSize: 10,
				},
			},
		},
		yAxis: [
			{
				type: 'value',
				name: '销量',
				axisLabel: {
					color: '#16cfd0',
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
				name: '客流',
				type: 'line',
				stack: '总量',
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
				data: [140, 232, 101, 264, 90],
			},
			{
				name: '天数',
				type: 'line',
				stack: '总量',
				smooth: true,
				lineStyle: {
					width: 0,
				},
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(0, 221, 255)',
						},
						{
							offset: 1,
							color: 'rgba(77, 119, 255)',
						},
					]),
				},
				emphasis: {
					focus: 'series',
				},
				data: [120, 282, 111, 234, 220],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 游客过夜情况
const initVisualizingContentCenterTop = () => {
	const myChart = echarts.init(visualizingContentCenterTop.value);
	const min = 100;
	const max = 1000;
	const option = {
		grid: {
			top: 50,
			right: 10,
			bottom: 66,
			left: 38,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		xAxis: [
			{
				type: 'category',
				data: ['地区', '地区', '地区', '地区', '地区', '地区', '地区', '地区', '地区', '地区'],
				axisLabel: {
					color: '#16cfd0',
					textStyle: {
						fontSize: 9,
					},
					interval: 0,
					rotate: -45,
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
						width: 1,
					},
				},
				axisTick: {
					show: false,
				},
			},
		],
		yAxis: [
			{
				type: 'value',
				name: '天数',
				nameGap: 25,
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
					},
				},
				axisLabel: {
					color: '#16cfd0',
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
				type: 'bar',
				barWidth: 15,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: '#de682e',
							},
							{
								offset: 1,
								color: '#ecc232',
							},
						]),
					},
				},
				label: {
					normal: {
						show: true,
						position: 'top',
						formatter: function (param: any) {
							if (param.value == max || param.value == min) {
								return '';
							}
							return param.value;
						},
						textStyle: {
							color: 'rgba(22, 207, 208, 0.8)',
							fontSize: 10,
						},
					},
				},
				markPoint: {
					symbolSize: 30,
					label: {
						normal: {
							textStyle: {
								color: '#ffffff',
								fontSize: 10,
							},
						},
					},
					data: [
						{ name: '年最低', value: min, xAxis: 0, yAxis: 100 },
						{ name: '年最高', value: max, xAxis: 9, yAxis: 1000 },
					],
				},
				data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 游客驻留时长
const initVisualizingContentCenterBottom = () => {
	const myChart = echarts.init(visualizingContentCenterBottom.value);
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		grid: {
			top: 26,
			right: 10,
			bottom: 66,
			left: 45,
		},
		xAxis: {
			type: 'value',
			axisLabel: {
				color: '#16cfd0',
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(22, 207, 208, 0.3)',
				},
			},
		},
		yAxis: {
			type: 'category',
			axisLabel: {
				color: '#16cfd0',
			},
		},
		series: [
			{
				name: '已完成',
				type: 'bar',
				stack: 'total',
				label: {
					show: true,
				},
				emphasis: {
					focus: 'series',
				},
				barWidth: 12,
				itemStyle: {
					label: {
						show: true,
					},
					labelLine: {
						show: false,
					},
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
						{ offset: 0, color: 'rgba(7,165,255,0.2)' },
						{ offset: 1, color: 'rgba(7,165,255,1)' },
					]),
				},
			},
			{
				name: '进行中',
				type: 'bar',
				stack: 'total',
				label: {
					show: true,
				},
				emphasis: {
					focus: 'series',
				},
				barWidth: 12,
				itemStyle: {
					label: {
						show: true,
					},
					labelLine: {
						show: false,
					},
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
						{ offset: 0, color: 'rgba(41,244,236,0)' },
						{ offset: 1, color: 'rgba(41,244,236,1)' },
					]),
				},
			},
		],
		dataset: {
			source: [
				{ status: '已签收', value1: 33, value2: 93 },
				{ status: '配送中', value1: 53, value2: 32 },
				{ status: '已出库', value1: 78, value2: 65 },
				{ status: '采购中', value1: 12, value2: 35 },
				{ status: '接单中', value1: 90, value2: 52 },
			],
		},
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 当日游客趋势分析
const initVisualizingContentRightTop = () => {
	const myChart = echarts.init(visualizingContentRightTop.value);
	const option = {
		grid: {
			top: 50,
			right: 30,
			bottom: 50,
			left: 20,
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
				color: '#16cfd0',
			},
		},
		yAxis: [
			{
				type: 'value',
				name: '亿元',
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
					},
				},
				axisLabel: {
					color: '#16cfd0',
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
				name: '同比',
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
// 当月游客趋势分析
const initVisualizingContentRightBottom = () => {
	const myChart = echarts.init(visualizingContentRightBottom.value);
	const option = {
		grid: {
			top: 50,
			right: 10,
			bottom: 40,
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
				color: '#16cfd0',
			},
		},
		yAxis: [
			{
				type: 'value',
				name: '人数(万)',
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
					},
				},
				axisLabel: {
					color: '#16cfd0',
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
				data: [20, 15, 40, 55, 65, 85],
				smooth: true,
				itemStyle: {
					color: '#EA7CCC',
				},
			},
			{
				name: '最新成交价',
				type: 'line',
				data: [30, 45, 65, 85, 60, 105],
				smooth: true,
				itemStyle: {
					color: '#FAC958',
				},
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 批量设置 echarts resize
const initEchartsResize = () => {
	window.addEventListener('resize', () => {
		for (let i = 0; i < state.myCharts.length; i++) {
			state.myCharts[i].resize();
		}
	});
};
// 页面加载时
onMounted(async () => {
	NextLoading.done();
	initTime();
	await initEchartsMap();
	await initVisualizingContentLeftTop();
	await initVisualizingContentLeftBottom();
	await initVisualizingContentCenterTop();
	await initVisualizingContentCenterBottom();
	await initVisualizingContentRightTop();
	await initVisualizingContentRightBottom();
	await initEchartsResize();
});
// 页面卸载时
onUnmounted(() => {
	window.clearInterval(state.time.fun);
});
</script>

<style scoped lang="scss">
// 左右两侧图表宽度
$lrWidth: 288px;
// 中部图表高度
$cheight: 240px;
// 标题宽度
$titleWidth: 240px;
.visualizing-demo1 {
	height: 100%;
	width: 100%;
	position: relative;
	:deep(.BMap_cpyCtrl) {
		display: none;
	}
	:deep(.anchorBL) {
		display: none;
	}
	.visualizing-container {
		.visualizing-container-head {
			height: 60px;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			color: #ffffff;
			background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.02));
			z-index: 3;
			.visualizing-container-head-left {
				flex: 1;
				position: relative;
				height: 60px;
				.visualizing-container-head-left-text {
					position: relative;
					z-index: 1;
					font-size: 12px;
					opacity: 0.6;
					width: 93%;
					padding-left: 15px;
					top: 50%;
					transform: translateY(-100%);
					.visualizing-container-head-left-text-box {
						width: 100%;
						position: relative;
						padding-left: 15px;
						&::after {
							content: '';
							height: 20px;
							width: 100%;
							position: absolute;
							background: linear-gradient(to right, rgba(22, 207, 208, 0.1), rgba(22, 207, 208, 0.3));
							top: -1px;
							left: 0;
							transform: skew(30deg);
						}
					}
				}
				&::before,
				&::after {
					content: '';
					height: 3px;
					background: linear-gradient(-90deg, #16cfd0, transparent);
					position: absolute;
					width: 100%;
				}
				&::before {
					top: 1px;
					right: 33px;
					opacity: 0.8;
				}
				&::after {
					top: 41px;
					right: -2px;
				}
			}
			.visualizing-container-head-center {
				height: 60px;
				font-size: 18px;
				text-align: center;
				display: flex;
				flex-direction: column;
				position: relative;
				padding: 0 60px;
				background: radial-gradient(rgba(0, 0, 0, 0.7) 5%, rgba(0, 0, 0, 0.5) 15%, rgba(0, 0, 0, 0.02) 70%);
				.visualizing-container-head-center-box {
					margin: auto;
					position: relative;
					z-index: 1;
					.visualizing-container-head-center-maintitle {
						position: relative;
						&::before,
						&::after {
							content: '';
							position: absolute;
							min-width: 21%;
							height: 29px;
							top: 2px;
							opacity: 0.3;
							border-top: 1px solid #16cfd0;
						}
						&::before {
							left: -70px;
							border-right: 2px solid #16cfd0;
							transform: skew(50deg);
						}
						&::after {
							right: -70px;
							border-left: 2px solid #16cfd0;
							transform: skew(-50deg);
						}
					}
					.visualizing-container-head-center-subtitle {
						font-size: 14px;
						opacity: 0.8;
						position: relative;
						&::before,
						&::after {
							content: '';
							position: absolute;
							min-width: 35%;
							height: 23px;
							bottom: 8px;
							border-bottom: 2px solid #16cfd0;
						}
						&::before {
							transform: skew(50deg);
							left: -33px;
							border-left: 3px solid #16cfd0;
							border-image: linear-gradient(to right, #16cfd0, rgba(22, 207, 208, 0.02)) 1 10;
						}
						&::after {
							transform: skew(-50deg);
							right: -33px;
							border-right: 3px solid #16cfd0;
							border-image: linear-gradient(to left, rgba(22, 207, 208, 1), rgba(22, 207, 208, 0.02)) 1 10;
						}
					}
					&::before,
					&::after {
						content: '';
						position: absolute;
						width: 36px;
						height: 17px;
						top: -8px;
						border-bottom: 2px solid rgba(22, 207, 208, 0.7);
					}
					&::before {
						transform: skew(32deg);
						left: -89px;
						border-left: 3px solid rgba(22, 207, 208, 0.7);
					}
					&::after {
						transform: skew(-32deg);
						right: -89px;
						border-right: 3px solid rgba(22, 207, 208, 0.7);
					}
				}
				&::before,
				&::after {
					content: '';
					position: absolute;
					min-width: 50%;
					height: 15px;
					bottom: 0px;
					border-bottom: 4px solid #16cfd0;
				}
				&::before {
					transform: skew(60deg);
					left: 13px;
					border-left: 5px solid #16cfd0;
				}
				&::after {
					transform: skew(-60deg);
					right: 13px;
					border-right: 5px solid #16cfd0;
				}
			}
			.visualizing-container-head-right {
				flex: 1;
				position: relative;
				height: 60px;
				.visualizing-container-head-right-text {
					position: relative;
					z-index: 1;
					font-size: 12px;
					opacity: 0.6;
					width: 93%;
					float: right;
					text-align: right;
					padding-right: 15px;
					top: 50%;
					transform: translateY(-100%);
					.visualizing-container-head-right-text-box {
						width: 100%;
						position: relative;
						padding-right: 15px;
						&::after {
							content: '';
							height: 20px;
							width: 100%;
							position: absolute;
							background: linear-gradient(to left, rgba(22, 207, 208, 0.1), rgba(22, 207, 208, 0.3));
							top: -1px;
							right: 0;
							transform: skew(-30deg);
						}
					}
				}
				&::before,
				&::after {
					content: '';
					height: 3px;
					background: linear-gradient(90deg, #16cfd0, transparent);
					position: absolute;
					width: 100%;
				}
				&::before {
					top: 1px;
					left: 33px;
					opacity: 0.8;
				}
				&::after {
					top: 41px;
					left: -2px;
				}
			}
		}
		.visualizing-container-title {
			max-width: $titleWidth;
			font-size: 14px;
			color: #ffffff;
			opacity: 0.8;
			padding: 0 5px;
			border-bottom: 1px solid #ffffff;
			border-image: linear-gradient(to right, #ffffff, rgba(22, 207, 208, 0.02)) 1 10;
			position: relative;
			i {
				padding-right: 5px;
				color: orange;
			}
			&::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 1px;
				height: 10px;
				background: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.5));
			}
		}
		.visualizing-container-title-colorful {
			max-width: $titleWidth;
			border: 0;
			padding: 1px;
			background: linear-gradient(135deg, red, orange, green, #16cfd0, purple);
			--mask-image: repeating-linear-gradient(135deg, #000 0px, #000 1px, transparent 1px, transparent 4px);
			-webkit-mask-image: var(--mask-image);
			mask-image: var(--mask-image);
		}
		.visualizing-container-content-left {
			width: $lrWidth;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.01));
			padding-top: 60px;
			z-index: 2;
			.visualizing-container-content-left-flex {
				height: 50%;
				display: flex;
				flex-direction: column;
				padding-left: 15px;
			}
		}
		.visualizing-container-content-center {
			width: 100%;
			height: $cheight;
			position: absolute;
			bottom: 0;
			left: 0;
			background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.01));
			z-index: 1;
			.visualizing-container-content-center-bottom {
				width: calc(100% - #{$lrWidth * 2});
				height: $cheight;
				left: $lrWidth;
				bottom: 0;
				position: absolute;
				display: flex;
				padding: 0 15px;
				.visualizing-container-content-center-bottom-flex {
					width: 50%;
					padding: 0 15px;
				}
			}
		}
		.visualizing-container-content-right {
			width: $lrWidth;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
			padding-top: 60px;
			background: linear-gradient(to left, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.01));
			z-index: 2;
			.visualizing-container-content-right-flex {
				height: 50%;
				display: flex;
				flex-direction: column;
				padding-right: 15px;
			}
		}
	}
}
</style>
