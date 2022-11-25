<!--
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-22 13:43:03
 * @FilePath: \frontend\src\layout\footer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="layout-footer pb15">
		<div class="layout-footer-warp">
			<div>TsPlatform，Made by 490912587@qq.com with ❤️</div>
			<div class="mt5">甜蜜蜜版权所有</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'layoutFooter',
});
</script>

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
