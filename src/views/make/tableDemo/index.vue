<template>
	<div class="table-demo-container layout-padding">
		<div class="table-demo-padding layout-padding-view layout-padding-auto">
			<TableSearch :search="state.tableData.search" @search="onSearch" />
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
const TableSearch = defineAsyncComponent(() => import('/@/views/make/tableDemo/search.vue'));

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
		// 配置项（必传）
		config: {
			total: 0, // 列表总数
			loading: true, // loading 加载
			isBorder: false, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: true, // 是否显示表格多选
			isOperate: true, // 是否显示表格操作栏
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
		search: [
			{ label: '采样点名称', prop: 'name', placeholder: '请输入应检尽检核酸采样点名称', required: true, type: 'input' },
			{ label: '详细地址', prop: 'address', placeholder: '请输入详细地址', required: false, type: 'input' },
			{ label: '联系电话', prop: 'phone', placeholder: '请输入采样点联系电话', required: false, type: 'input' },
			{ label: '开放时间', prop: 'time', placeholder: '请选择', required: false, type: 'date' },
			{
				label: '支持24小时',
				prop: 'isSupport',
				placeholder: '请选择',
				required: false,
				type: 'select',
				options: [
					{ label: '是', value: 1 },
					{ label: '否', value: 0 },
				],
			},
			{ label: '图片描述', prop: 'image', placeholder: '请输入图片描述', required: false, type: 'input' },
			{ label: '核酸机构', prop: 'mechanism', placeholder: '请输入核酸机构', required: false, type: 'input' },
		],
		// 搜索参数（不用传，用于分页、搜索时传给后台的值，`getTableData` 中使用）
		param: {
			pageNum: 1,
			pageSize: 10,
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
// 搜索点击时表单回调
const onSearch = (data: EmptyObjectType) => {
	state.tableData.param = Object.assign({}, state.tableData.param, { ...data });
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
