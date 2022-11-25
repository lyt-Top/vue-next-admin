<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<div class="searchBox">
				<el-input v-model="tableData.param.Keywords" size="default" placeholder="请输入角色名称"
					style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click="initData">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddRole">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增角色
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="Name" label="角色名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Status" label="角色状态" show-overflow-tooltip>
					<template #default="scope">
						<el-radio-group v-model="scope.row.Status" @change="onRowStatus(scope.row)" :disabled="scope.row.Name === '超级管理员'">
							<el-radio :label="0">
								启用
							</el-radio>
							<el-radio :label="1">
								禁用
							</el-radio>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column prop="CreateTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="140">
					<template #default="scope">
						<el-button type="success" size="small" @click="onOpenEditRole(scope.row)">
							<i class="fa fa-pencil-square-o"></i>
						</el-button>
						<el-button type="danger" :disabled="scope.row.Name === '超级管理员'" size="small"
							@click="onRowDel(scope.row)">
							<i class="fa fa-trash"></i>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="tableData.param.Page" background
				v-model:page-size="tableData.param.PageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total">
			</el-pagination>
		</div>
		<AddRole ref="addRoleRef" :loadData="initData" />
		<EditRole ref="editRoleRef" :loadData="initData" />
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import { getPage, del, setStatus } from '/@/api/role';
import { initBackEndControlRoutes } from '/@/router/backEnd';
export default defineComponent({
	name: 'systemRole',
	components: {
		AddRole: defineAsyncComponent(() => import('/@/views/system/role/component/addRole.vue')),
		EditRole: defineAsyncComponent(() => import('/@/views/system/role/component/editRole.vue')),
	},
	setup() {
		const addRoleRef = ref();
		const editRoleRef = ref();
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
		// 打开新增角色弹窗
		const onOpenAddRole = () => {
			addRoleRef.value.openDialog();
		};
		// 打开修改角色弹窗
		const onOpenEditRole = (row: Object) => {
			editRoleRef.value.openDialog(row);
		};
		// 删除角色
		const onRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.Name}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				const result = await del({ Id: Number(row.Id) });
				if (result.data.code === 200) {
					ElNotification({
						message: result.data.msg,
						type: 'success',
						duration: 500,
						onClose() {
							initBackEndControlRoutes();
							initData();
						},
					})
				}
			})
		};
		//修改状态
		const onRowStatus = async (row: any) => {
			const result = await setStatus({ Id: Number(row.Id), Status: Number(row.Status) });
			if (result.data.code === 200) {
				ElNotification({
					message: result.data.msg,
					type: 'success',
					duration: 500,
					onClose() {
						initData();
					},
				})
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
			addRoleRef,
			editRoleRef,
			onOpenAddRole,
			onOpenEditRole,
			onRowDel,
			onRowStatus,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.system-role-container {
	.system-role-padding {
		padding: 15px;

		.el-table {
			flex: 1;
		}
	}
}
</style>
