<template>
	<div class="layout-footer pb15">
		<div class="layout-footer-warp">
			<div>vue-next-admin，Made by lyt with ❤️</div>
			<div class="mt5">版权所有：深圳市xxx软件科技有限公司</div>
		</div>
	</div>
</template>

<script setup name="layoutFooter"></script>

<style scoped lang="scss">
.layout-footer {
	width: 100%;
	display: flex;
	&-warp {
		margin: auto;
		color: var(--el-text-color-secondary);
		text-align: center;
		animation: error-num 0.3s ease;
	}
}
</style>
