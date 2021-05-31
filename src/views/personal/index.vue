<template>
	<div class="personal" :style="{ height: `calc(100vh - ${setMainHeight}` }">
		<div class="layout-view-bg-white flex">
			<div class="flex-margin color-primary">personal</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'personal',
	data() {
		return {};
	},
	computed: {
		// 设置主盒子高度
		setMainHeight() {
			let { isTagsview } = this.$store.state.themeConfig.themeConfig;
			if (isTagsview) return `114px`;
			else return `80px`;
		},
	},
};
</script>

<style scoped lang="scss">
.personal  {}
</style>
