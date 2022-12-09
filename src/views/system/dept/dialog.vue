<template>
	<div class="system-dept-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="deptDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="上级部门">
							<el-cascader
								:options="state.deptData"
								:props="{ checkStrictly: true, value: 'deptName', label: 'deptName' }"
								placeholder="请选择部门"
								clearable
								class="w100"
								v-model="state.ruleForm.deptLevel"
							>
								<template #default="{ node, data }">
									<span>{{ data.deptName }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="部门名称">
							<el-input v-model="state.ruleForm.deptName" placeholder="请输入部门名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="负责人">
							<el-input v-model="state.ruleForm.person" placeholder="请输入负责人" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号">
							<el-input v-model="state.ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱">
							<el-input v-model="state.ruleForm.email" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.sort" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="部门状态">
							<el-switch v-model="state.ruleForm.status" inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="部门描述">
							<el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入部门描述" maxlength="150"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemDeptDialog">
import { reactive, ref } from 'vue';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const deptDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		deptLevel: [] as string[], // 上级部门
		deptName: '', // 部门名称
		person: '', // 负责人
		phone: '', // 手机号
		email: '', // 邮箱
		sort: 0, // 排序
		status: true, // 部门状态
		describe: '', // 部门描述
	},
	deptData: [] as DeptTreeType[], // 部门数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 打开弹窗
const openDialog = (type: string, row: RowDeptType) => {
	if (type === 'edit') {
		row.deptLevel = ['vueNextAdmin'];
		row.person = 'lyt';
		row.phone = '12345678910';
		row.email = 'vueNextAdmin@123.com';
		state.ruleForm = row;
		state.dialog.title = '修改部门';
		state.dialog.submitTxt = '修 改';
	} else {
		state.dialog.title = '新增部门';
		state.dialog.submitTxt = '新 增';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	deptDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.isShowDialog = true;
	getMenuData();
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	closeDialog();
	emit('refresh');
	// if (state.dialog.type === 'add') { }
};
// 初始化部门数据
const getMenuData = () => {
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

// 暴露变量
defineExpose({
	openDialog,
});
</script>
