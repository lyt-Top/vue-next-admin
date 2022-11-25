<template>
	<div class="system-edit-user-container">
		<el-dialog title="修改用户" v-model="isShowDialog" width="769px" :close-on-press-escape="false"
			:close-on-click-modal="false" :show-close="false">
			<el-form :model="ruleForm" ref="formRule" :rules="rules" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户类型" prop="UserType">
							<el-select v-model="ruleForm.UserType" placeholder="请选择" clearable class="w100">
								<el-option :disabled="true" label="超级管理员" :value="999"></el-option>
								<el-option label="普通用户" :value="0"></el-option>
								<el-option label="管理员" :value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别" prop="Sex">
							<el-radio-group v-model="ruleForm.Sex">
								<el-radio :label="0">
									男
								</el-radio>
								<el-radio :label="1">
									女
								</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账号" prop="UserName">
							<el-input v-model="ruleForm.UserName" placeholder="请输入账号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="昵称" prop="NickName">
							<el-input v-model="ruleForm.NickName" placeholder="请输入昵称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号" prop="Phone">
							<el-input v-model="ruleForm.Phone" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="生日" prop="Birthday">
							<el-date-picker style="width:100%" v-model="ruleForm.Birthday" type="date"
								placeholder="请输入生日" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱" prop="Email">
							<el-input v-model="ruleForm.Email" placeholder="请输入邮箱" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="真实姓名" prop="RealName">
							<el-input v-model="ruleForm.RealName" placeholder="请输入真实姓名" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="身份证号" prop="IdCard">
							<el-input v-model="ruleForm.IdCard" placeholder="请输入身份证号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="关联角色" prop="RoleId">
							<el-select v-model="ruleForm.RoleId" placeholder="请选择" clearable class="w100">
								<el-option v-for="(item, index) in roleData" :key="index" :label="item.Name"
									:value="item.Id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">修 改</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { reactive, toRefs, onMounted, defineComponent, ref } from 'vue';
import { getList } from '/@/api/role';
import { edit } from '/@/api/user';
import { initBackEndControlRoutes } from '/@/router/backEnd';

export default defineComponent({
	name: 'systemEditUser',
	props: {
		loadData: {
			type: Function,
			default: null
		}
	},
	setup(props) {
		const state = reactive({
			roleData: [] as any,
			loading: false,
			isShowDialog: false,
			ruleForm: {
				UserType: 0,
				UserName: '', // 账户名称
				NickName: '', // 用户昵称
				Avatar: '',
				Birthday: '',
				Sex: 0, // 性别
				Email: '', // 邮箱
				Phone: '', // 手机号
				RealName: '',
				IdCard: '',
				Status: true, // 用户状态
				RoleId: '', // 关联角色
			},
		});
		const rules = reactive({
			UserType: [
				{
					required: true,
					message: '请选择账号类型',
					trigger: 'change',
				},
			],
			UserName: [{ required: true, message: '请输入账号', trigger: 'blur' },
			],
			Phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
			],
			Email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },],
			RoleId: [
				{
					required: true,
					message: '请选择授权角色',
					trigger: 'change',
				},
			],
		});
		const formRule = ref();
		// 打开弹窗
		const openDialog = (row: any) => {
			state.ruleForm = row;
			state.isShowDialog = true;
			getRoleData();
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = async () => {
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
		// 获取菜单结构数据
		const getRoleData = async () => {
			state.roleData = [];
			const result = await getList({});
			if (result.data.code === 200) {
				state.roleData = result.data.data;
			}
		};
		return {
			rules,
			formRule,
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
