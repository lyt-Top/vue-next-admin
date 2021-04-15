<template>
	<view>
		<picker
			:mode="sel.date"
			:value="date"
			:start="startDate"
			:end="endDate"
			@change="bindDateChange"
			@cancel="bindDateCancel"
		>
			<view class="uni-input title">{{ date }}</view>
		</picker>
	</view>
</template>

<script>
export default {
	props: ['sel'],
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			date: currentDate
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.date = '空船日期';
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
			this.$emit('gettime', e.target.value);
		},
		bindDateCancel() {
			this.init();
			this.$emit('gettime', '');
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style></style>
