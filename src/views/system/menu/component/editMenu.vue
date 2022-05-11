<template>
	<div class="system-edit-menu-container">
		<el-dialog title="修改菜单" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="default" label-width="80px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="上级菜单">
							<el-cascader
								:options="menuData"
								:props="{ checkStrictly: true, value: 'path', label: 'title' }"
								placeholder="请选择上级菜单"
								clearable
								class="w100"
								v-model="ruleForm.menuSuperior"
							>
								<template #default="{ node, data }">
									<span>{{ data.title }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单类型">
							<el-radio-group v-model="ruleForm.menuType">
								<el-radio label="menu">菜单</el-radio>
								<el-radio label="btn">按钮</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单名称">
							<el-input v-model="ruleForm.meta.title" placeholder="格式：message.router.xxx" clearable></el-input>
						</el-form-item>
					</el-col>
					<template v-if="ruleForm.menuType === 'menu'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="路由名称">
								<el-input v-model="ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="路由路径">
								<el-input v-model="ruleForm.path" placeholder="路由中的 path 值" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="重定向">
								<el-input v-model="ruleForm.redirect" placeholder="请输入路由重定向" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="菜单图标">
								<IconSelector placeholder="请输入菜单图标" v-model="ruleForm.meta.icon" type="all" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="组件路径">
								<el-input v-model="ruleForm.component" placeholder="组件路径" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="链接地址">
								<el-input v-model="ruleForm.meta.isLink" placeholder="外链/内嵌时链接地址（http:xxx.com）" clearable :disabled="!ruleForm.isLink">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="权限标识">
								<el-select v-model="ruleForm.meta.roles" multiple placeholder="取角色管理" clearable class="w100">
									<el-option label="admin" value="admin"></el-option>
									<el-option label="common" value="common"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</template>
					<template v-if="ruleForm.menuType === 'btn'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="权限标识">
								<el-input v-model="ruleForm.btnPower" placeholder="请输入权限标识" clearable></el-input>
							</el-form-item>
						</el-col>
					</template>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单排序">
							<el-input-number v-model="ruleForm.menuSort" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<template v-if="ruleForm.menuType === 'menu'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否隐藏">
								<el-radio-group v-model="ruleForm.meta.isHide">
									<el-radio :label="true">隐藏</el-radio>
									<el-radio :label="false">不隐藏</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="页面缓存">
								<el-radio-group v-model="ruleForm.meta.isKeepAlive">
									<el-radio :label="true">缓存</el-radio>
									<el-radio :label="false">不缓存</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否固定">
								<el-radio-group v-model="ruleForm.meta.isAffix">
									<el-radio :label="true">固定</el-radio>
									<el-radio :label="false">不固定</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否外链">
								<el-radio-group v-model="ruleForm.isLink" :disabled="ruleForm.meta.isIframe">
									<el-radio :label="true">是</el-radio>
									<el-radio :label="false">否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否内嵌">
								<el-radio-group v-model="ruleForm.meta.isIframe" @change="onSelectIframeChange">
									<el-radio :label="true">是</el-radio>
									<el-radio :label="false">否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</template>
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
import { storeToRefs } from 'pinia';
import { useRoutesList } from '/@/stores/routesList';
import { i18n } from '/@/i18n/index';
import IconSelector from '/@/components/iconSelector/index.vue';
// import { setBackEndControlRefreshRoutes } from "/@/router/backEnd";

export default defineComponent({
	name: 'systemEditMenu',
	components: { IconSelector },
	setup() {
		const stores = useRoutesList();
		const { routesList } = storeToRefs(stores);
		const state = reactive({
			isShowDialog: false,
			// 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式
			ruleForm: {
				menuSuperior: [], // 上级菜单
				menuType: 'menu', // 菜单类型
				name: '', // 路由名称
				component: '', // 组件路径
				isLink: false, // 是否外链
				menuSort: 0, // 菜单排序
				path: '', // 路由路径
				redirect: '', // 路由重定向，有子集 children 时
				meta: {
					title: '', // 菜单名称
					icon: '', // 菜单图标
					isHide: false, // 是否隐藏
					isKeepAlive: true, // 是否缓存
					isAffix: false, // 是否固定
					isLink: '', // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink: 链接地址不为空`
					isIframe: false, // 是否内嵌，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
					roles: '', // 权限标识，取角色管理
				},
				btnPower: '', // 菜单类型为按钮时，权限标识
			},
			menuData: [], // 上级菜单数据
		});
		// 获取 vuex 中的路由
		const getMenuData = (routes: any) => {
			const arr: any = [];
			routes.map((val: any) => {
				val['title'] = i18n.global.t(val.meta.title);
				val['id'] = Math.random();
				arr.push({ ...val });
				if (val.children) getMenuData(val.children);
			});
			return arr;
		};
		// 打开弹窗
		const openDialog = (row: any) => {
			// 模拟数据，实际请走接口
			row.menuType = 'menu';
			row.menuSort = Math.random();
			row.component = `${row.component} `
				.match(/\'(.+)\'/g)
				?.join('')
				.replace(/\'/g, '');
			state.ruleForm = row;
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 是否内嵌下拉改变
		const onSelectIframeChange = () => {
			if (state.ruleForm.meta.isIframe) state.ruleForm.isLink = true;
			else state.ruleForm.isLink = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = () => {
			closeDialog(); // 关闭弹窗
			// setBackEndControlRefreshRoutes() // 刷新菜单，未进行后端接口测试
		};
		// 页面加载时
		onMounted(() => {
			state.menuData = getMenuData(routesList.value);
		});
		return {
			openDialog,
			closeDialog,
			onSelectIframeChange,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
