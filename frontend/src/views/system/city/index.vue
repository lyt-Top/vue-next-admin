<!--
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-24 09:41:40
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 09:48:37
 * @FilePath: \frontend\src\views\system\city\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
			<div class="searchBox">
				<el-button size="default" type="primary" class="ml10" @click="initData">
					<el-icon>
						<ele-Search />
					</el-icon>
					刷新
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column prop="RegionId" label="编号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="RegionName" label="名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="RegionShortName" label="简称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="RegionParentId" label="行政编号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="RegionLevel" label="地区级别" show-overflow-tooltip></el-table-column>
			</el-table>
		</el-card>
		<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
			:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="tableData.param.Page" background
			v-model:page-size="tableData.param.PageSize" layout="total, sizes, prev, pager, next, jumper"
			:total="tableData.total">
		</el-pagination>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, defineComponent } from 'vue';
import { getPage } from '/@/api/city';
export default defineComponent({
	name: 'systemCity',
	setup() {
		const state = reactive({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					Keywords: "",
					Page: 1,
					PageSize: 10,
					OrderBy: ""
				},
			},
		});
		const initData = async () => {
			state.tableData.data = [];
			const result = await getPage(state.tableData.param);
			if (result.data.code === 200) {
				state.tableData.data = result.data.data.rows;
				state.tableData.total = result.data.data.total;
			}
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.PageSize = val;
			initData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.Page = val;
			initData();
		};
		// 页面加载时
		onMounted(() => {
			initData();
		});
		return {
			initData,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>