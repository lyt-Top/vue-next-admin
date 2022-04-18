<template>
	<div class="form-rules-one-container">
		<el-form :model="form" :rules="rules" ref="formRulesOneRef" size="default" label-width="100px" class="mt35">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="form.name" placeholder="请输入姓名" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="form.email" placeholder="请输入用户邮箱" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
					<el-form-item label="登陆账户名" prop="autograph">
						<el-input v-model="form.autograph" placeholder="请输入登陆账户名" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
					<el-form-item label="职务" prop="occupation">
						<el-select v-model="form.occupation" placeholder="请选择职务" clearable class="w100">
							<el-option label="计算机 / 互联网 / 通信" value="1"></el-option>
							<el-option label="生产 / 工艺 / 制造" value="2"></el-option>
							<el-option label="医疗 / 护理 / 制药" value="3"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, defineComponent } from 'vue';

export default defineComponent({
	name: 'pagesFormRulesOne',
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
	setup(props) {
		const state = reactive({
			form: { name: '', email: '', autograph: '', occupation: '' },
			rules: {
				name: { required: true, message: '请输入姓名', trigger: 'blur' },
				email: { required: true, message: '请输入用户邮箱', trigger: 'blur' },
				autograph: { required: true, message: '请输入登陆账户名', trigger: 'blur' },
				occupation: { required: true, message: '请选择职务', trigger: 'change' },
			},
		});
		// 赋值回显
		const initForm = () => {
			state.form = <any>props.data;
		};
		// 页面加载时
		onMounted(() => {
			initForm();
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
