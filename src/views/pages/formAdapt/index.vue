<template>
	<div class="form-adapt-container">
		<el-card shadow="hover" header="表单自适应演示(改变窗口查看效果)">
			<el-form :model="form" size="small" label-width="100px" class="mt35 mb35">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="姓名">
							<el-input v-model="form.name" placeholder="请输入姓名" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="用户归属部门">
							<el-input v-model="form.email" placeholder="请输入用户归属部门" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="登陆账户名">
							<el-input v-model="form.autograph" placeholder="请输入登陆账户名" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="职务">
							<el-select v-model="form.occupation" placeholder="请选择职务" clearable class="w100">
								<el-option label="计算机 / 互联网 / 通信" value="1"></el-option>
								<el-option label="生产 / 工艺 / 制造" value="2"></el-option>
								<el-option label="医疗 / 护理 / 制药" value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="手机">
							<el-input v-model="form.phone" placeholder="请输入手机" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="性别">
							<el-select v-model="form.sex" placeholder="请选择性别" clearable class="w100">
								<el-option label="男" value="1"></el-option>
								<el-option label="女" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="登录密码">
							<el-input v-model="form.phone1" placeholder="请输入登录密码" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="权限角色">
							<el-input v-model="form.phone2" placeholder="请输入权限角色" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="创建用户">
							<el-input v-model="form.phone3" placeholder="请输入创建用户" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="修改用户">
							<el-input v-model="form.phone4" placeholder="请输入修改用户" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="所属用户">
							<el-input v-model="form.phone5" placeholder="请输入所属用户" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
						<el-form-item label="所属部门">
							<el-input v-model="form.phone6" placeholder="请输入所属部门" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-form-item>
							<el-button type="primary" icon="iconfont icon-biaodan">更新个人信息</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'pagesFormAdapt',
	data() {
		return {
			form: {},
		};
	},
};
</script>
