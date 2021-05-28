<template>
	<div class="layout-navbars-breadcrumb" :style="{ display: isShowBreadcrumb }">
		<i
			class="layout-navbars-breadcrumb-icon"
			:class="getThemeConfig.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
			@click="onThemeConfigChange"
		></i>
		<el-breadcrumb class="layout-navbars-breadcrumb-hide">
			<transition-group name="breadcrumb" mode="out-in">
				<el-breadcrumb-item v-for="(v, k) in breadcrumbList" :key="v.path">
					<span v-if="k === breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">
						<i :class="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon"></i>{{ $t(v.meta.title) }}
					</span>
					<a v-else @click.prevent="onBreadcrumbClick(v)">
						<i :class="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon"></i>{{ $t(v.meta.title) }}
					</a>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name: 'layoutBreadcrumb',
	data() {
		return {
			breadcrumbList: [],
			routeSplit: [],
			routeSplitFirst: '',
			routeSplitIndex: 1,
		};
	},
	computed: {
		// 获取布局配置信息
		getThemeConfig() {
			return this.$store.state.themeConfig.themeConfig;
		},
		// 动态设置经典、横向布局不显示
		isShowBreadcrumb() {
			const { layout, isBreadcrumb } = this.$store.state.themeConfig.themeConfig;
			if (layout === 'classic' || layout === 'transverse') {
				return 'none';
			} else {
				return isBreadcrumb ? '' : 'none';
			}
		},
	},
	mounted() {
		this.initRouteSplit(this.$route.path);
	},
	methods: {
		// breadcrumb 当前项点击时
		onBreadcrumbClick(v) {
			const { redirect, path } = v;
			if (redirect) this.$router.push(redirect);
			else this.$router.push(path);
		},
		// breadcrumb icon 点击菜单展开与收起
		onThemeConfigChange() {
			this.$store.state.themeConfig.themeConfig.isCollapse = !this.$store.state.themeConfig.themeConfig.isCollapse;
		},
		// 递归设置 breadcrumb
		getBreadcrumbList(arr) {
			arr.map((item) => {
				this.routeSplit.map((v, k, arrs) => {
					if (this.routeSplitFirst === item.path) {
						this.routeSplitFirst += `/${arrs[this.routeSplitIndex]}`;
						this.breadcrumbList.push(item);
						this.routeSplitIndex++;
						if (item.children) this.getBreadcrumbList(item.children);
					}
				});
			});
		},
		// 当前路由分割处理
		initRouteSplit(path) {
			this.breadcrumbList = [
				{
					path: '/',
					meta: {
						title: this.$store.state.routesList.routesList[0].meta.title,
						icon: this.$store.state.routesList.routesList[0].meta.icon,
					},
				},
			];
			this.routeSplit = path.split('/');
			this.routeSplit.shift();
			this.routeSplitFirst = `/${this.routeSplit[0]}`;
			this.routeSplitIndex = 1;
			this.getBreadcrumbList(this.$store.state.routesList.routesList);
		},
	},
	// 监听路由的变化
	watch: {
		$route: {
			handler(newVal) {
				this.initRouteSplit(newVal.path);
			},
			deep: true,
		},
	},
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;
	padding-left: 15px;
	.layout-navbars-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		margin-right: 15px;
		color: var(--bg-topBarColor);
	}
	.layout-navbars-breadcrumb-span {
		opacity: 0.7;
		color: var(--bg-topBarColor);
	}
	.layout-navbars-breadcrumb-iconfont {
		font-size: 14px;
		margin-right: 5px;
	}
	& ::v-deep .el-breadcrumb__separator {
		opacity: 0.7;
		color: var(--bg-topBarColor);
	}
}
</style>
