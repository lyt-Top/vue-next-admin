<template>
	<div class="system-menu-container">
		<el-dialog title="新增菜单" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="small" label-width="80px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单名称">
							<el-input v-model="ruleForm.meta.title" placeholder="格式：message.router.xxx" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="路由名称">
							<el-input v-model="ruleForm.name" placeholder="路由名称（路由中的name值）" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单图标">
							<el-input v-model="ruleForm.meta.icon" placeholder="请输入菜单图标" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="组件地址">
							<el-input v-model="ruleForm.component" placeholder="组件地址" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否隐藏">
							<el-select v-model="ruleForm.meta.isHide" placeholder="请选择是否隐藏" clearable class="w100">
								<el-option label="是" value="true"></el-option>
								<el-option label="否" value="false"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否缓存">
							<el-select v-model="ruleForm.meta.isKeepAlive" placeholder="请选择是否缓存" clearable class="w100">
								<el-option label="是" value="true"></el-option>
								<el-option label="否" value="false"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否固定">
							<el-select v-model="ruleForm.meta.isAffix" placeholder="请选择是否固定" clearable class="w100">
								<el-option label="是" value="true"></el-option>
								<el-option label="否" value="false"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否外链">
							<el-select v-model="ruleForm.isLink" placeholder="请选择是否外链" clearable class="w100" :disabled="ruleForm.meta.isIframe === 'true'">
								<el-option label="是" value="true"></el-option>
								<el-option label="否" value="false"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否内嵌">
							<el-select v-model="ruleForm.meta.isIframe" placeholder="请选择是否iframe" clearable class="w100" @change="onSelectIframeChange">
								<el-option label="是" value="true"></el-option>
								<el-option label="否" value="false"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="链接地址">
							<el-input
								v-model="ruleForm.meta.isLink"
								placeholder="外链/内嵌时链接地址（http:xxx.com）"
								clearable
								:disabled="ruleForm.isLink === '' || ruleForm.isLink === 'false'"
							>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="权限标识">
							<el-input v-model="ruleForm.meta.auth" placeholder="路由权限标识（多个请用逗号隔开）" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单排序">
							<el-input v-model="ruleForm.menuSort" placeholder="菜单排序" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="small">新 增</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
// import { setBackEndControlRefreshRoutes } from "/@/router/backEnd";
export default {
	name: 'systemAddMenu',
	setup() {
		const state = reactive({
			isShowDialog: false,
			/**
			 * 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式（请注意参数类型！）
			 * 受到 `element plus` 类型 `string/number/object` 影响，不可使用 `:value="true"`
			 * 的写法，所以传值到后台时，需要转换成布尔值，否则页面可能出现玄学。
			 * 路由权限标识为数组格式，基本都需要自行转换类型
			 */
			ruleForm: {
				name: '', // 路由名称
				component: '', // 组件地址
				isLink: '', // 是否外链
				menuSort: '', // 菜单排序
				meta: {
					title: '', // 菜单名称
					icon: '', // 菜单图标
					isHide: '', // 是否隐藏
					isKeepAlive: '', // 是否缓存
					isAffix: '', // 是否固定
					isLink: '', // 是否外链，开启外链条件，`1、isLink:true 2、链接地址不为空`
					isIframe: '', // 是否内嵌，开启条件，`1、isIframe:true 2、链接地址不为空`
					auth: '', // 路由权限标识（多个请用逗号隔开），最后转成数组格式
				},
			},
		});
		// 打开弹窗
		const openDialog = (row?: object) => {
			console.log(row);
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = (row?: object) => {
			console.log(row);
			state.isShowDialog = false;
		};
		// 是否内嵌下拉改变
		const onSelectIframeChange = () => {
			if (state.ruleForm.meta.isIframe === 'true') {
				state.ruleForm.isLink = 'true';
			} else {
				state.ruleForm.isLink = '';
			}
		};
		// 取消
		const onCancel = () => {
			closeDialog();
			initForm();
		};
		// 新增
		const onSubmit = () => {
			console.log(state.ruleForm); // 数据，请注意需要转换的类型
			closeDialog(); // 关闭弹窗
			// setBackEndControlRefreshRoutes() // 刷新菜单，未进行后端接口测试
		};
		// 表单初始化，方法：`resetFields()` 无法使用
		const initForm = () => {
			state.ruleForm.name = '';
			state.ruleForm.component = '';
			state.ruleForm.isLink = '';
			state.ruleForm.menuSort = '';
			state.ruleForm.meta.title = '';
			state.ruleForm.meta.icon = '';
			state.ruleForm.meta.isHide = '';
			state.ruleForm.meta.isKeepAlive = '';
			state.ruleForm.meta.isAffix = '';
			state.ruleForm.meta.isLink = '';
			state.ruleForm.meta.isIframe = '';
			state.ruleForm.meta.auth = '';
		};
		return {
			openDialog,
			closeDialog,
			onSelectIframeChange,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
