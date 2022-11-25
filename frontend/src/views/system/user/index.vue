<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="searchBox">
				<el-input size="default" v-model="tableData.param.Keywords" placeholder="请输入名称"
					style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click="initData">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddUser">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增用户
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="UserName" label="名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="NickName" label="昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Avatar" label="头像" show-overflow-tooltip>
					<template #default="scope">
						<el-avatar shape="square" :size="50"
							:src="scope.row.Avatar === '' ? avatar : scope.row.Avatar" />
					</template>
				</el-table-column>
				<el-table-column prop="Phone" label="手机号" show-overflow-tooltip>
					<template #default="scope">
						<i class="fa fa-phone-square" style="margin-right: 5px;" aria-hidden="true"></i>
						{{
								scope.row.Phone
						}}
					</template>
				</el-table-column>
				<el-table-column prop="Email" label="邮箱" show-overflow-tooltip>
					<template #default="scope">
						<i class="fa fa-envelope-square" style="margin-right: 5px;" aria-hidden="true"></i>
						{{ scope.row.Email }}
					</template>
				</el-table-column>
				<el-table-column prop="Sex" label="性别" show-overflow-tooltip align="center">
					<template #default="scope">
						<i v-if="scope.row.Sex === 0" style="font-size: 32px;color: #409eff;" class="fa fa-male"
							aria-hidden="true"></i>
						<i v-else class="fa fa-female" style="font-size: 32px;color: #f56c6c;" aria-hidden="true"></i>
					</template>
				</el-table-column>
				<el-table-column prop="Status" label="状态" show-overflow-tooltip>
					<template #default="scope">
						<el-radio-group :disabled="scope.row.UserName === 'admin'" v-model="scope.row.Status"
							@change="onRowStatus(scope.row)">
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
						<el-button :disabled="scope.row.UserName === 'admin'" type="success" size="small"
							@click="onOpenEditUser(scope.row)">
							<i class="fa fa-pencil-square-o"></i>
						</el-button>
						<el-button :disabled="scope.row.UserName === 'admin'" type="danger" size="small"
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
		</el-card>
		<AddUer ref="addUserRef" :loadData="initData" />
		<EditUser ref="editUserRef" :loadData="initData" />
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import { getPage, setStatus, del } from '/@/api/user';
import avatar from '/@/assets/avtar.png';
export default defineComponent({
	name: 'systemUser',
	components: {
		AddUer: defineAsyncComponent(() => import('/@/views/system/user/component/addUser.vue')),
		EditUser: defineAsyncComponent(() => import('/@/views/system/user/component/editUser.vue')),
	},
	setup() {
		const addUserRef = ref();
		const editUserRef = ref();
		const state = reactive({
			avatar,
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
		// 打开新增用户弹窗
		const onOpenAddUser = () => {
			addUserRef.value.openDialog();
		};
		// 打开修改用户弹窗
		const onOpenEditUser = (row: Object) => {
			editUserRef.value.openDialog(row);
		};
		// 删除用户
		const onRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除账户：“${row.UserName}”，是否继续?`, '提示', {
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
			addUserRef,
			editUserRef,
			onOpenAddUser,
			onOpenEditUser,
			onRowStatus,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.system-user-container {
	:deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;

		.el-table {
			flex: 1;
		}
	}
}
</style>
