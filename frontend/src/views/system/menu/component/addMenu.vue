<template>
	<div class="system-add-menu-container">
		<el-dialog :title="ruleForm.Type === 0 ? '新增目录' : ruleForm.Type === 1 ? '新增菜单' : '新增按钮'" v-model="isShowDialog"
			width="769px" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false">
			<el-form :model="ruleForm" ref="formRule" :rules="rules" size="default" label-width="80px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="路由类型" prop="Type">
							<el-radio-group v-model="ruleForm.Type">
								<el-radio :label="0">目录</el-radio>
								<el-radio :label="1">菜单</el-radio>
								<el-radio :label="2">按钮</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否隐藏" prop="IsHide">
							<el-radio-group v-model="ruleForm.IsHide">
								<el-radio :label="true">隐藏</el-radio>
								<el-radio :label="false">显示</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type === 1 || ruleForm.Type === 2" :xs="24" :sm="24" :md="24" :lg="24"
						:xl="24" class="mb20">
						<el-form-item label="上级路由" prop="ParentIds">
							<el-cascader :options="menuTree"
								:props="{ checkStrictly: true, value: 'Id', label: 'Title', children: 'Children' }"
								placeholder="请选择上级路由" clearable class="w100" v-model="ParentIds">
								<template #default="{ node, data }">
									<span>{{ data.Title }}</span>
									<span v-if="!node.isLeaf"> ({{ data.Children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="路由名称" prop="Name">
							<el-input @input="inputName" v-model="ruleForm.Name" placeholder="格式：system.route"
								clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="ruleForm.Type === 0 ? '目录名称' : ruleForm.Type === 1 ? '菜单名称' : '按钮名称'"
							prop="Title">
							<el-input :disabled="true" v-model="ruleForm.Title"
								placeholder="格式：message.router.systemRoute" clearable>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type < 2" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="路由路径" prop="Path">
							<el-input :disabled="true" v-model="ruleForm.Path" placeholder="" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type < 2" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="组件名称" prop="Component">
							<el-input  v-model="ruleForm.Component" placeholder="" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type === 0" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="重定向" prop="Redirect">
							<el-input v-model="ruleForm.Redirect" placeholder="请输入路由重定向" clearable>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type < 2" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="ruleForm.Type === 0 ? '目录图标' : '菜单图标'" prop="Icon">
							<IconSelector :placeholder="ruleForm.Type === 0 ? '请选择目录图标' : '请选择菜单图标'"
								v-model="ruleForm.Icon" type="all" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="权限标识" prop="Permission">
							<el-input :disabled="true" v-model="ruleForm.Permission" placeholder="请输入权限标识" clearable>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type < 2" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序" prop="Sort">
							<el-input-number v-model="ruleForm.Sort" controls-position="right" placeholder="请输入排序"
								class="w100" />
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type < 2" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="页面缓存" prop="IsKeepAlive">
							<el-radio-group v-model="ruleForm.IsKeepAlive">
								<el-radio :label="true">缓存</el-radio>
								<el-radio :label="false">不缓存</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type < 2" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否固定" prop="IsAffix">
							<el-radio-group v-model="ruleForm.IsAffix">
								<el-radio :label="true">固定</el-radio>
								<el-radio :label="false">不固定</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type === 1" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="链接类型" prop="linkType">
							<el-radio-group v-model="linkType" @change="onSelectLinkChange">
								<el-radio :label="0">无</el-radio>
								<el-radio :label="1">外链</el-radio>
								<el-radio :label="2">内嵌</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.Type === 1" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="链接地址" prop="IsLink">
							<el-input v-model="ruleForm.IsLink" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
								placeholder="外链/内嵌时链接地址" clearable :disabled="!(linkType > 0)">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">新 增</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, reactive, toRefs, onMounted, defineComponent, ref } from 'vue';
import { initBackEndControlRoutes } from "/@/router/backEnd";
import { getMenuTree, add } from '/@/api/menu';
import { useI18n } from 'vue-i18n';
import { ElNotification, FormInstance } from 'element-plus';

export default defineComponent({
	name: 'systemAddMenu',
	components: {
		IconSelector: defineAsyncComponent(() => import('/@/components/iconSelector/index.vue')),
	},
	props: {
		loadData: {
			type: Function,
			default: null
		}
	},
	setup(props) {
		const state = reactive({
			loading: false,
			ParentIds: [] as any,
			isShowDialog: false,
			linkType: 0,
			ruleForm: {
				ParentId: 0, // 上级菜单
				Type: 0, // 菜单类型
				Name: '', // 路由名称
				Component: '', // 组件路径
				Sort: 0, // 菜单排序
				Path: '', // 路由路径
				Redirect: '', // 路由重定向，有子集 children 时
				Title: '', // 菜单名称
				Icon: '', // 菜单图标
				IsHide: false, // 是否隐藏
				IsKeepAlive: true, // 是否缓存
				IsAffix: false, // 是否固定
				IsLink: '', // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink: 链接地址不为空`
				IsIframe: false, // 是否内嵌，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
				Permission: '', // 权限标识
			},
			menuTree: [], // 上级菜单数据
		});
		const inputName = () => {
			state.ruleForm.Title = "message.router." + state.ruleForm.Name;
			state.ruleForm.Path = "/" + state.ruleForm.Name.replaceAll(".", "/");
			state.ruleForm.Component = "/" + state.ruleForm.Name.replaceAll(".", "/") + "/index";
			state.ruleForm.Permission = state.ruleForm.Name;
		}
		const rules = reactive({
			ParentIds: [
				{
					validator: (rule: any, value: any, callback: any) => {
						if (state.ParentIds === null || state.ParentIds?.length <= 0) {
							callback(new Error('请选择上级路由'))
						} else {
							callback()
						}
					},
					trigger: 'blur'
				},
			],
			Name: [
				{ required: true, message: '请输入路由名称', trigger: 'blur' },
			]
		});
		const formRule = ref<FormInstance>()
		const { t } = useI18n();
		const getMenuData = async () => {
			state.menuTree = [];
			const result = await getMenuTree({});
			if (result.data.code === 200) {
				state.menuTree = result.data.data;
				state.menuTree.forEach((item: any) => {
					item.Title = t(item.Title);
					item.Children.forEach((info: any) => {
						info.Title = t(info.Title);
						info.Children.forEach((info3: any) => {
							info3.Title = t(info3.Title);
						});
					});
				});
			}
		};
		// 打开弹窗
		const openDialog = () => {
			state.ParentIds = [];
			state.linkType = 0;
			formRule.value?.resetFields();
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
			//延迟0.5秒来解决弹出层未关闭，重复提交的问题
			setTimeout(() => {
				state.loading = false;
			}, 500)
		};
		// 链接类型
		const onSelectLinkChange = () => {
			if (state.linkType === 0) {
				state.ruleForm.IsIframe = false;
				state.ruleForm.IsLink = "";
			}
			if (state.linkType === 1) {
				state.ruleForm.IsIframe = false;
				state.ruleForm.IsLink = "";
			}
			if (state.linkType === 2) {
				state.ruleForm.IsIframe = true;
				state.ruleForm.IsLink = "";
			}
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = async () => {
			await formRule.value?.validate(async (valid: boolean) => {
				state.ruleForm.ParentId = state.ParentIds[state.ParentIds.length - 1]
				if (valid) {
					const result = await add(state.ruleForm);
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
		// 页面加载时
		onMounted(() => {
			getMenuData();
		});
		return {
			rules,
			formRule,
			inputName,
			openDialog,
			closeDialog,
			onSelectLinkChange,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
