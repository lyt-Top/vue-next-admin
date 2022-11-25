<template>
	<div class="system-edit-role-container">
		<el-dialog title="修改角色" v-model="isShowDialog" width="769px" :close-on-press-escape="false"
			:close-on-click-modal="false" :show-close="false">
			<el-form :model="ruleForm" size="default" label-width="90px" ref="formRule" :rules="rules">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色名称" prop="Name">
							<el-input v-model="ruleForm.Name" placeholder="请输入角色名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="角色描述" prop="Remark">
							<el-input v-model="ruleForm.Remark" type="textarea" placeholder="请输入角色描述" maxlength="150">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单权限" prop="SysRoleMenu">
							<el-tree :check-strictly="true" :data="menuData" ref="menuTree" :props="menuProps"
								:default-checked-keys="defaultCheckNode" node-key="Id" show-checkbox
								class="menu-data-tree" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" :disabled="loading" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :disabled="loading" size="default">修 改</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { ElNotification, FormInstance } from 'element-plus';
import { reactive, toRefs, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getMenuTree } from '/@/api/menu';
import { edit } from '/@/api/role';
import { initBackEndControlRoutes } from '/@/router/backEnd';

export default defineComponent({
	name: 'systemEditRole',
	props: {
		loadData: {
			type: Function,
			default: null
		}
	},
	setup(props) {
		const state = reactive({
			loading: false,
			isShowDialog: false,
			defaultCheckNode: [] as any[],
			ruleForm: {
				Name: '',
				Remark: '',
				//角色授权菜单Ids
				SysRoleMenu: [] as any[]
			},
			menuData: [] as any[],
			menuProps: {
				children: 'Children',
				label: 'Title',
			},
		});
		const rules = reactive({
			Name: [
				{ required: true, message: '请输入角色名称', trigger: 'blur' },
			],
			SysRoleMenu: [
				{
					required: true,
					message: '请选择角色授权菜单',
					trigger: 'change',
				},
			],
		});
		const formRule = ref<FormInstance>()
		const menuTree = ref();
		// 打开弹窗
		const openDialog = (row: any) => {
			state.ruleForm = row;
			state.defaultCheckNode = [] as any[];
			state.ruleForm.SysRoleMenu.forEach(info => {
				state.defaultCheckNode.push(info.MenuId)
			});
			state.isShowDialog = true;
			getMenuData();
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
			//延迟0.5秒来解决弹出层未关闭，重复提交的问题
			setTimeout(() => {
				state.loading = false;
			}, 500)
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = async () => {
			state.ruleForm.SysRoleMenu = [];
			const menus = menuTree.value.getCheckedNodes();
			menus.forEach((info: any) => {
				state.ruleForm.SysRoleMenu.push({ MenuId: info.Id });
			});
			await formRule.value?.validate(async (valid: boolean) => {
				if (valid) {
					state.loading = true;
					const result = await edit(state.ruleForm);
					if (result.data.code === 200) {
						ElNotification({
							message: result.data.msg,
							type: 'success',
							duration: 500,
							onClose() {
							},
						})
					}
					initBackEndControlRoutes();
					props.loadData();
					closeDialog();
				}
			})
		};
		const { t } = useI18n();
		// 获取菜单结构数据
		const getMenuData = async () => {
			state.menuData = [];
			const result = await getMenuTree({});
			if (result.data.code === 200) {
				state.menuData = result.data.data;
				state.menuData.forEach((item: any) => {
					item.Title = t(item.Title);
					item.Children.forEach((info: any) => {
						info.Title = t(info.Title);
						info.Children.forEach((info3: any) => {
							info3.Title = t(info3.Title);
						});
					});
				});
			}
		}
		return {
			rules,
			formRule,
			menuTree,
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.system-edit-role-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
