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
					type: '石头',
					weight: '200吨',
					status: '未发货',
					children: [
						{
							title: '发货港',
							msg: '广西 南宁'
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
							msg: '201810115050'
						},
						{
							title: '订单日期',
							msg: '2018-10-01 12:50:50'
						}
					]
				}
			]
		};
	}
};
</script>
