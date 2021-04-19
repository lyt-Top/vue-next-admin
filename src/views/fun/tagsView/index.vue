<template>
	<div>
		<el-card shadow="hover" header="tagsView 非当前页演示">
			<el-form :model="formInline" size="small" label-width="40px" class="tags-view-form">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4" class="tags-view-form-col">
						<el-form-item label="功能">
							<el-select v-model="formInline.selectId" placeholder="请选择" class="w100">
								<el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4" class="tags-view-form-col">
						<el-form-item label="路径">
							<el-input v-model="formInline.path" placeholder="路径如：/fun/tagsView"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
						<el-form-item>
							<el-button type="primary" @click="onImplementClick" icon="el-icon-thumb">点击执行</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-card shadow="hover" header="tagsView 当前页演示" class="mt15">
			<div class="flex-warp">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="small" icon="el-icon-refresh-right" @click="refreshCurrentTagsView">刷新当前页 </el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="info" size="small" icon="el-icon-close" @click="closeCurrentTagsView">关闭当前页</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="warning" size="small" icon="el-icon-circle-close" @click="closeOtherTagsView">关闭其它 </el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="danger" size="small" icon="el-icon-folder-delete" @click="closeAllTagsView">全部关闭 </el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'funTagsView',
	data() {
		return {
			formInline: {
				path: '',
				selectId: 0,
			},
			selectOptions: [
				{
					value: 0,
					label: '刷新当前',
				},
				{
					value: 1,
					label: '关闭当前',
				},
				{
					value: 2,
					label: '关闭其它',
				},
				{
					value: 3,
					label: '关闭全部',
				},
			],
		};
	},
	methods: {
		// 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部
		// 1、刷新当前 tagsView
		refreshCurrentTagsView() {
			this.bus.$emit('onCurrentContextmenuClick', {
				id: 0,
				path: this.$route.path,
			});
		},
		// 2、关闭当前 tagsView
		closeCurrentTagsView() {
			this.bus.$emit('onCurrentContextmenuClick', {
				id: 1,
				path: this.$route.path,
			});
		},
		// 3、关闭其它 tagsView
		closeOtherTagsView() {
			this.bus.$emit('onCurrentContextmenuClick', {
				id: 2,
				path: this.$route.path,
			});
		},
		// 4、关闭全部 tagsView
		closeAllTagsView() {
			this.bus.$emit('onCurrentContextmenuClick', {
				id: 3,
				path: this.$route.path,
			});
		},
		// 执行点击
		onImplementClick() {
			this.bus.$emit('onCurrentContextmenuClick', {
				id: this.formInline.selectId,
				path: this.formInline.path,
			});
		},
	},
};
</script>
