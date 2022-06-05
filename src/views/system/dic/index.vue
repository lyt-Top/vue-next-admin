<template>
	<div class="system-dic-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入字典名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddDic">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增字典
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="50" />
				<el-table-column prop="dicName" label="字典名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="fieldName" label="字段名" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="字典状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="describe" label="字典描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenEditDic(scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<AddDic ref="addDicRef" />
		<EditDic ref="editDicRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddDic from '/@/views/system/dic/component/addDic.vue';
import EditDic from '/@/views/system/dic/component/editDic.vue';

// 定义接口来定义对象的类型
interface TableDataRow {
	dicName: string;
	fieldName: string;
	describe: string;
	status: boolean;
	createTime: string;
}
interface TableDataState {
	tableData: {
		data: Array<TableDataRow>;
		total: number;
		loading: boolean;
		param: {
			pageNum: number;
			pageSize: number;
		};
	};
}

export default defineComponent({
	name: 'systemDic',
	components: { AddDic, EditDic },
	setup() {
		const addDicRef = ref();
		const editDicRef = ref();
		const state = reactive<TableDataState>({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10,
				},
			},
		});
		// 初始化表格数据
		const initTableData = () => {
			const data: Array<TableDataRow> = [];
			for (let i = 0; i < 2; i++) {
				data.push({
					dicName: i === 0 ? '角色标识' : '用户性别',
					fieldName: i === 0 ? 'SYS_ROLE' : 'SYS_UERINFO',
					describe: i === 0 ? '这是角色字典' : '这是用户性别字典',
					status: true,
					createTime: new Date().toLocaleString(),
				});
			}
			state.tableData.data = data;
			state.tableData.total = state.tableData.data.length;
		};
		// 打开新增字典弹窗
		const onOpenAddDic = () => {
			addDicRef.value.openDialog();
		};
		// 打开修改字典弹窗
		const onOpenEditDic = (row: TableDataRow) => {
			editDicRef.value.openDialog(row);
		};
		// 删除字典
		const onRowDel = (row: TableDataRow) => {
			ElMessageBox.confirm(`此操作将永久删除字典名称：“${row.dicName}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			addDicRef,
			editDicRef,
			onOpenAddDic,
			onOpenEditDic,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>
