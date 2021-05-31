<template>
	<div class="layout-columns-aside">
		<el-scrollbar>
			<ul>
				<li
					v-for="(v, k) in columnsAsideList"
					:key="k"
					@click="onColumnsAsideMenuClick(v, k)"
					ref="columnsAsideOffsetTopRefs"
					:class="{ 'layout-columns-active': liIndex === k }"
					:title="$t(v.meta.title)"
				>
					<div :class="setColumnsAsidelayout" v-if="!v.meta.isLink || (v.meta.isLink && v.meta.isIframe)">
						<i :class="v.meta.icon"></i>
						<div class="font12">
							{{
								$t(v.meta.title) && $t(v.meta.title).length >= 4
									? $t(v.meta.title).substr(0, setColumnsAsidelayout === 'columns-vertical' ? 4 : 3)
									: $t(v.meta.title)
							}}
						</div>
					</div>
					<div :class="setColumnsAsidelayout" v-else>
						<a :href="v.meta.isLink" target="_blank">
							<i :class="v.meta.icon"></i>
							<div class="font12">
								{{
									$t(v.meta.title) && $t(v.meta.title).length >= 4
										? $t(v.meta.title).substr(0, setColumnsAsidelayout === 'columns-vertical' ? 4 : 3)
										: $t(v.meta.title)
								}}
							</div>
						</a>
					</div>
				</li>
				<div ref="columnsAsideActiveRef" :class="setColumnsAsideStyle"></div>
			</ul>
		</el-scrollbar>
	</div>
</template>

<script>
export default {
	name: 'layoutColumnsAside',
	data() {
		return {
			columnsAsideList: [],
			liIndex: 0,
			difference: 0,
			routeSplit: [],
		};
	},
	computed: {
		// 设置分栏高亮风格
		setColumnsAsideStyle() {
			return this.$store.state.themeConfig.themeConfig.columnsAsideStyle;
		},
		// 设置分栏布局风格
		setColumnsAsidelayout() {
			return this.$store.state.themeConfig.themeConfig.columnsAsideLayout;
		},
	},
	mounted() {
		this.setFilterRoutes();
	},
	methods: {
		// 设置菜单高亮位置移动
		setColumnsAsideMove(k) {
			const els = this.$refs.columnsAsideOffsetTopRefs;
			this.liIndex = k;
			this.$refs.columnsAsideActiveRef.style.top = `${els[k].offsetTop + this.difference}px`;
		},
		// 菜单高亮点击事件
		onColumnsAsideMenuClick(v, k) {
			this.setColumnsAsideMove(k);
			let { path, redirect } = v;
			if (redirect) this.$router.push(redirect);
			else this.$router.push(path);
		},
		// 设置高亮动态位置
		onColumnsAsideDown(k) {
			this.$nextTick(() => {
				this.setColumnsAsideMove(k);
			});
		},
		// 设置/过滤路由（非静态路由/是否显示在菜单中）
		setFilterRoutes() {
			if (this.$store.state.routesList.routesList.length <= 0) return false;
			this.columnsAsideList = this.filterRoutesFun(this.$store.state.routesList.routesList);
			const resData = this.setSendChildren(this.$route.path);
			if (Object.keys(resData).length <= 0) return false;
			this.onColumnsAsideDown(resData.item[0].k);
			this.bus.$emit('setSendColumnsChildren', resData);
		},
		// 传送当前子级数据到菜单中
		setSendChildren(path) {
			const currentPathSplit = path.split('/');
			let currentData = {};
			this.columnsAsideList.map((v, k) => {
				if (v.path === `/${currentPathSplit[1]}`) {
					v['k'] = k;
					currentData['item'] = [{ ...v }];
					currentData['children'] = [{ ...v }];
					if (v.children) currentData['children'] = v.children;
				}
			});
			return currentData;
		},
		// 路由过滤递归函数
		filterRoutesFun(arr) {
			return arr
				.filter((item) => !item.meta.isHide)
				.map((item) => {
					item = Object.assign({}, item);
					if (item.children) item.children = this.filterRoutesFun(item.children);
					return item;
				});
		},
		// tagsView 点击时，根据路由查找下标 columnsAsideList，实现左侧菜单高亮
		setColumnsMenuHighlight(path) {
			this.routeSplit = path.split('/');
			this.routeSplit.shift();
			const routeFirst = `/${this.routeSplit[0]}`;
			const currentSplitRoute = this.columnsAsideList.find((v) => v.path === routeFirst);
			if (!currentSplitRoute) return false;
			// 延迟拿值，防止取不到
			setTimeout(() => {
				this.onColumnsAsideDown(currentSplitRoute.k);
			}, 0);
		},
	},
	watch: {
		// 监听 vuex 数据变化
		'$store.state': {
			handler(val) {
				val.themeConfig.themeConfig.columnsAsideStyle === 'columnsRound' ? (this.difference = 3) : (this.difference = 0);
				if (val.routesList.routesList.length === this.columnsAsideList.length) return false;
				this.setFilterRoutes();
			},
			deep: true,
		},
		// 监听路由的变化
		$route: {
			handler(to) {
				this.setColumnsMenuHighlight(to.path);
				this.bus.$emit('setSendColumnsChildren', this.setSendChildren(to.path));
			},
			deep: true,
		},
	},
};
</script>

<style scoped lang="scss">
.layout-columns-aside {
	width: 70px;
	height: 100%;
	background: var(--bg-columnsMenuBar);
	ul {
		position: relative;
		li {
			color: var(--bg-columnsMenuBarColor);
			width: 100%;
			height: 50px;
			text-align: center;
			display: flex;
			cursor: pointer;
			position: relative;
			z-index: 1;
			.columns-vertical {
				margin: auto;
				.columns-vertical-title {
					padding-top: 1px;
				}
			}
			.columns-horizontal {
				display: flex;
				height: 50px;
				width: 100%;
				align-items: center;
				padding: 0 5px;
				i {
					margin-right: 3px;
				}
				a {
					display: flex;
					.columns-horizontal-title {
						padding-top: 1px;
					}
				}
			}
			a {
				text-decoration: none;
				color: var(--bg-columnsMenuBarColor);
			}
		}
		.layout-columns-active {
			color: #ffffff;
			transition: 0.3s ease-in-out;
		}
		.columns-round {
			background: var(--color-primary);
			color: #ffffff;
			position: absolute;
			left: 50%;
			top: 2px;
			height: 50px;
			width: 65px;
			transform: translateX(-50%);
			z-index: 0;
			transition: 0.3s ease-in-out;
			border-radius: 5px;
		}
		.columns-card {
			@extend .columns-round;
			top: 0;
			height: 50px;
			width: 100%;
			border-radius: 0;
		}
	}
}
</style>
