<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<div ref="echartsMapRef" style="height: 100%"></div>
		</div>
	</div>
</template>

<script setup lang="ts" name="funEchartsMap">
import { reactive, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import { echartsMapList, echartsMapData } from './mock';

// 定义变量内容
const echartsMapRef = ref<RefType>('');
const state = reactive({
	echartsMap: '' as unknown,
	echartsMapList,
	echartsMapData,
});

// echartsMap 将坐标信息和对应物理量的值合在一起
const convertData = (data: EmptyObjectType[]) => {
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
// 初始化 echartsMap
const initEchartsMap = () => {
	const myChart = echarts.init(echartsMapRef.value);
	const option = {
		tooltip: {
			trigger: 'item',
		},
		color: ['#9a60b4', '#ea7ccc'],
		bmap: {
			center: [104.114129, 37.550339],
			zoom: 5,
			roam: true,
			mapStyle: {},
		},
		series: [
			{
				name: 'pm2.5',
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
				name: 'Top 5',
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
					shadowBlur: 10,
					shadowColor: '#333',
				},
				zlevel: 1,
			},
		],
	};
	myChart.setOption(option);
	window.addEventListener('resize', () => {
		myChart.resize();
	});
};
// 页面加载时
onMounted(() => {
	initEchartsMap();
});
</script>
