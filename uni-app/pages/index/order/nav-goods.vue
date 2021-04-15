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
			list: []
		};
	}
};
</script>
