<template>
	<view>
		<view class="logo"><image class="photo" src="../../static/my/logo.png"></image></view>
		<setList :sel-data="setListData" />
	</view>
</template>

<script>
import setList from './component/set-list';
export default {
	components: {
		setList
	},
	data() {
		return {
			setListData: [
				{
					title: '了解我们',
					path: '/pages/my/about/know'
				},
				{
					title: '联系我们',
					path: '/pages/my/about/call'
				},
				{
					title: '服务条款',
					path: '/pages/my/about/clause'
				}
			]
		};
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}
.logo {
	height: 370upx;
	display: flex;

	.photo {
		margin: auto;
		width: 299upx;
		height: 168upx;
	}
}
</style>
