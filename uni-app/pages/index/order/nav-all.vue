<template>
	<orderDetails :order="list" />
</template>

<script>
import orderDetails from '../component/order-details';
export default {
	components: {
		orderDetails
	},
	data() {
		return {
			list: [
				{
					type: '木材',
					weight: '2000吨',
					status: '待装货',
					children: [
						{
							title: '发货港',
							msg: '江苏 南京'
						},
						{
							title: '卸货港',
							msg: '江苏 南昌'
						},
						{
							title: '价格',
							msg: '5000元'
						},
						{
							title: '订单编号',
							msg: '20190101195050'
						},
						{
							title: '订单日期',
							msg: '2019-01-01 19:50:50'
						}
					]
				},
				{
					type: '木材',
					weight: '2000吨',
					status: '待装货',
					children: [
						{
							title: '发货港',
							msg: '江苏 南京'
						},
						{
							title: '卸货港',
							msg: '江苏 南昌'
						},
						{
							title: '价格',
							msg: '5000元'
						},
						{
							title: '订单编号',
							msg: '20190101195050'
						},
						{
							title: '订单日期',
							msg: '2019-01-01 19:50:50'
						}
					]
				},
				{
					type: '黄金',
					weight: '1000吨',
					status: '已到达',
					children: [
						{
							title: '发货港',
							msg: '广西 南宁'
						},
						{
							title: '卸货港',
							msg: '广东 广州'
						},
						{
							title: '船名',
							msg: '蛟龙号'
						},
						{
							title: '船舶类型',
							msg: '集装箱船'
						},
						{
							title: '价格',
							msg: '5000元'
						},
						{
							title: '订单编号',
							msg: '20190101195050'
						},
						{
							title: '订单日期',
							msg: '2019-01-01 19:50:50'
						}
					]
				}
			]
		};
	}
};
</script>
