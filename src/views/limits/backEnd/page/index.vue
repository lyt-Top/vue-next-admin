<template>
	<div class="layout-pd">
		<el-alert
			title="温馨提示：1、此页面无法模拟后端控制路由，因为 `gitee` 上所请求的 `json` 菜单数据线上会出现跨域的情况（json地址：
      https://gitee.com/lyt-top/vue-next-admin-images/raw/master/menu/adminMenu.json）。2、本地接口请求文件位置：`/src/api/menu/index.ts`。
      3、拉取代码后本地请求查看后端控制页面路由效果：`/src/store/modules/themeConfig.ts`中开启（isRequestRoutes 为 true，则开启后端控制路由）。
      4、此页面效果只作为演示使用，若出现不可逆转的bug，请尝试 `F5` 刷新页面。5、默认启用的是 `前端控制路由`。"
			type="warning"
			:closable="false"
		></el-alert>
		<el-button type="primary" size="default" class="mt15" @click="onGoToFrontEndPage">
			<el-icon>
				<ele-Position />
			</el-icon>
			立即前往前端控制路由
		</el-button>
	</div>
</template>

<script setup lang="ts" name="limitsBackEndEndPage">
import { useRouter } from 'vue-router';

// 定义变量内容
const router = useRouter();

// 立即前往前端控制路由
const onGoToFrontEndPage = () => {
	router.push('/limits/frontEnd/page');
};
</script>
