<template>
	<div class="table-demo-container layout-padding">
		<div class="table-demo-padding layout-padding-view layout-padding-auto">
			<div class="system-user-search mb15">
				<el-input v-model="state.tableData.param.search" size="default" placeholder="请输入核酸采样点名称" style="max-width: 180px" />
				<el-button size="default" type="primary" class="ml10" @click="onSearch">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
			</div>
			<Table
				ref="tableRef"
				v-bind="state.tableData"
				class="table-demo"
				@delRow="onTableDelRow"
				@pageChange="onTablePageChange"
				@sortHeader="onSortHeader"
			/>
		</div>
	</div>
</template>

<script setup lang="ts" name="makeTableDemo">
import { defineAsyncComponent, reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));

// 定义变量内容
const tableRef = ref<RefType>();
const state = reactive<TableDemoState>({
	tableData: {
		// 列表数据（必传）
		data: [],
		// 表头内容（必传，注意格式）
		header: [
			{ key: 'name', colWidth: '', title: '应检尽检核酸采样点名称', type: 'text', isCheck: true },
			{ key: 'address', colWidth: '', title: '详细地址', type: 'text', isCheck: true },
			{ key: 'phone', colWidth: '', title: '采样点联系电话', type: 'text', isCheck: true },
			{ key: 'time', colWidth: '', title: '开放时间', type: 'text', isCheck: true },
			{ key: 'isSupport', colWidth: '', title: '是否支持24小时核酸检测', type: 'text', isCheck: true },
			{ key: 'image', colWidth: '', width: '70', height: '40', title: '图片描述', type: 'image', isCheck: true },
		],
		// 搜索参数（可选）
		param: {
			search: '',
		},
		// 配置项（必传）
		config: {
			total: 0, // 列表总数
			loading: true, // loading 加载
			isBorder: false, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: true, // 是否显示表格多选
			isOperate: true, // 是否显示表格操作栏
		},
	},
});

// 初始化列表数据
const getTableData = () => {
	state.tableData.config.loading = true;
	state.tableData.data = [];
	for (let i = 0; i < 20; i++) {
		state.tableData.data.push({
			id: `123456789${i + 1}`,
			name: `莲塘别墅广场${i + 1}`,
			address: `中沧公寓中庭榕树下${i + 1}`,
			phone: `0592-6081259${i + 1}`,
			time: `6:00 ~ 24:00`,
			isSupport: `${i % 2 === 0 ? '是' : '否'}`,
			image: `https://img2.baidu.com/it/u=417454395,2713356475&fm=253&fmt=auto?w=200&h=200`,
		});
	}
	// 数据总数（模拟，真实从接口取）
	state.tableData.config.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.config.loading = false;
	}, 500);
};
// 搜索
const onSearch = () => {
	tableRef.value.pageReset();
};
// 删除当前项回调
const onTableDelRow = (row: EmptyObjectType) => {
	ElMessage.success(`删除${row.name}成功！`);
	getTableData();
};
// 分页改变时回调
const onTablePageChange = (page: TableDemoPageType) => {
	state.tableData.param.pageNum = page.pageNum;
	state.tableData.param.pageSize = page.pageSize;
	getTableData();
};
// 拖动显示列排序回调
const onSortHeader = (data: TableHeaderType[]) => {
	state.tableData.header = data;
};

// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style scoped lang="scss">
.table-demo-container {
	.table-demo-padding {
		padding: 15px;
		.table-demo {
			flex: 1;
			overflow: hidden;
		}
	}
}
</style>
