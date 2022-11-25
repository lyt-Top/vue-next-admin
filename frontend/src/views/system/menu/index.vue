<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
			<div class="searchBox">
				<el-button size="default" type="primary" class="ml10" @click="initData">
					<el-icon>
						<ele-Search />
					</el-icon>
					刷新
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddMenu">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增菜单
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%" row-key="Path"
				:tree-props="{ children: 'Children', hasChildren: 'hasChildren' }">
				<el-table-column label="菜单名称" show-overflow-tooltip>
					<template #default="scope">
						<SvgIcon :name="scope.row.Icon" />
						<span class="ml10">{{ $t(scope.row.Title) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="Path" label="路由路径" show-overflow-tooltip></el-table-column>
				<el-table-column label="组件路径" show-overflow-tooltip>
					<template #default="scope">
						<span>() => import('/@/views/{{ scope.row.Component }}.vue')</span>
					</template>
				</el-table-column>
				<el-table-column label="权限标识" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.Permission }}</span>
					</template>
				</el-table-column>
				<el-table-column label="类型" show-overflow-tooltip width="100">
					<template #default="scope">
						<el-link type="warning" :underline="false" v-if="scope.row.Type === 0">
							<i class="iconfont icon-zidingyibuju" style="margin-right:5px"></i>目录
						</el-link>
						<el-link type="primary" :underline="false" v-if="scope.row.Type === 1">
							<i class="iconfont icon-caidan" style="margin-right:5px"></i>菜单
						</el-link>
						<el-link :underline="false" v-if="scope.row.Type === 2">
							<i class="fa fa-hand-o-up" style="margin-right:5px"></i>按钮
						</el-link>
					</template>
				</el-table-column>
				<el-table-column label="状态" show-overflow-tooltip width="80">
					<template #default="scope">
						<el-tag type="info" round effect="dark" v-if="scope.row.IsHide" size="small">隐藏</el-tag>
						<el-tag type="primary" round effect="dark" v-else size="small">显示</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.row.Sort }}
					</template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button type="success" size="small" @click="onOpenEditMenu(scope.row)">
							<i class="fa fa-pencil-square-o"></i>
						</el-button>
						<el-button  type="danger" size="small" @click="onRowDel(scope.row)">
							<i class="fa fa-trash"></i>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<AddMenu ref="addMenuRef" :loadData="initData" />
		<EditMenu ref="editMenuRef" :loadData="initData" />
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, ref, toRefs, reactive, defineComponent, onMounted } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ElMessageBox, ElNotification } from 'element-plus';
import { del, getMenuTree } from '/@/api/menu';
import { useI18n } from 'vue-i18n';
import { initBackEndControlRoutes } from '/@/router/backEnd';
export default defineComponent({
	name: 'systemMenu',
	components: {
		AddMenu: defineAsyncComponent(() => import('/@/views/system/menu/component/addMenu.vue')),
		EditMenu: defineAsyncComponent(() => import('/@/views/system/menu/component/editMenu.vue')),
	},
	setup() {
		const addMenuRef = ref();
		const editMenuRef = ref();
		const state = reactive({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
				},
			},
		});
		const initData = async () => {
			state.tableData.data = [];
			const result = await getMenuTree({});
			if (result.data.code === 200) {
				state.tableData.data = result.data.data;
				state.tableData.total = result.data.data.length;
			}
		};
		// 打开新增菜单弹窗
		const onOpenAddMenu = () => {
			addMenuRef.value.openDialog();
		};
		// 打开编辑菜单弹窗
		const onOpenEditMenu = (row: RouteRecordRaw) => {
			editMenuRef.value.openDialog(row);
		};
		const { t } = useI18n();
		// 删除菜单路由
		const onRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除路由名称：“${t(row.Title)}”，是否继续?`, '提示', {
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
							initBackEndControlRoutes();
						},
					})
				}
			})
		};
		// 页面加载时
		onMounted(() => {
			initData();
		});
		return {
			addMenuRef,
			editMenuRef,
			onOpenAddMenu,
			onOpenEditMenu,
			initData,
			onRowDel,
			...toRefs(state),
		};
	},
});
</script>
