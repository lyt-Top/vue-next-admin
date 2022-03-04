<template>
	<div class="system-edit-user-container">
		<el-dialog title="修改用户" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户名称">
							<el-input v-model="ruleForm.userName" placeholder="请输入账户名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户昵称">
							<el-input v-model="ruleForm.userNickname" placeholder="请输入用户昵称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="关联角色">
							<el-select v-model="ruleForm.roleSign" placeholder="请选择" clearable class="w100">
								<el-option label="超级管理员" value="admin"></el-option>
								<el-option label="普通用户" value="common"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="部门">
							<el-cascader
								:options="deptData"
								:props="{ checkStrictly: true, value: 'deptName', label: 'deptName' }"
								placeholder="请选择部门"
								clearable
								class="w100"
								v-model="ruleForm.department"
							>
								<template #default="{ node, data }">
									<span>{{ data.deptName }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号">
							<el-input v-model="ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱">
							<el-input v-model="ruleForm.email" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别">
							<el-select v-model="ruleForm.sex" placeholder="请选择" clearable class="w100">
								<el-option label="男" value="男"></el-option>
								<el-option label="女" value="女"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户密码">
							<el-input v-model="ruleForm.password" placeholder="请输入" type="password" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户过期">
							<el-date-picker v-model="ruleForm.overdueTime" type="date" placeholder="请选择" class="w100"> </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户状态">
							<el-switch v-model="ruleForm.status" inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="用户描述">
							<el-input v-model="ruleForm.describe" type="textarea" placeholder="请输入用户描述" maxlength="150"></el-input>
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
import { reactive, toRefs, onMounted, defineComponent } from 'vue';

// 定义接口来定义对象的类型
interface DeptData {
	deptName: string;
	createTime: string;
	status: boolean;
	sort: number | string;
	describe: string;
	id: number;
	children?: DeptData[];
}
interface RuleFormRow {
	userName: string;
	userNickname: string;
	roleSign: string;
	department: any;
	phone: string;
	email: string;
	sex: string;
	password: string;
	overdueTime: string;
	status: boolean;
	describe: string;
}
interface UserState {
	isShowDialog: boolean;
	ruleForm: RuleFormRow;
	deptData: Array<DeptData>;
}

export default defineComponent({
	name: 'systemEditUser',
	setup() {
		const state = reactive<UserState>({
			isShowDialog: false,
			ruleForm: {
				userName: '', // 账户名称
				userNickname: '', // 用户昵称
				roleSign: '', // 关联角色
				department: [], // 部门
				phone: '', // 手机号
				email: '', // 邮箱
				sex: '', // 性别
				password: '', // 账户密码
				overdueTime: '', // 账户过期
				status: true, // 用户状态
				describe: '', // 用户描述
			},
			deptData: [], // 部门数据
		});
		// 打开弹窗
		const openDialog = (row: RuleFormRow) => {
			state.ruleForm = row;
			state.isShowDialog = true;
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
		const onSubmit = () => {
			closeDialog();
		};
		// 初始化部门数据
		const initTableData = () => {
			state.deptData.push({
				deptName: 'vueNextAdmin',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Math.random(),
				describe: '顶级部门',
				id: Math.random(),
				children: [
					{
						deptName: 'IT外包服务',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Math.random(),
						describe: '总部',
						id: Math.random(),
					},
					{
						deptName: '资本控股',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Math.random(),
						describe: '分部',
						id: Math.random(),
					},
				],
			});
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
