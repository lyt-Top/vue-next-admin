<template>
	<div class="layout-navbars-breadcrumb-user" :style="{ flex: layoutUserFlexNum }">
		<el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont icon-ziti" title="组件大小"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="" :disabled="disabledSize === ''">默认</el-dropdown-item>
					<el-dropdown-item command="medium" :disabled="disabledSize === 'medium'">中等</el-dropdown-item>
					<el-dropdown-item command="small" :disabled="disabledSize === 'small'">小型</el-dropdown-item>
					<el-dropdown-item command="mini" :disabled="disabledSize === 'mini'">超小</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<div class="layout-navbars-breadcrumb-user-icon" @click="onSearchClick">
			<i class="el-icon-search" title="菜单搜索"></i>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
			<i class="icon-skin iconfont" title="布局配置"></i>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon">
			<el-popover placement="bottom" trigger="click" v-model:visible="isShowUserNewsPopover" :width="300" popper-class="el-popover-pupop-user-news">
				<template #reference>
					<el-badge :is-dot="true" @click="isShowUserNewsPopover = !isShowUserNewsPopover">
						<i class="el-icon-bell" title="消息"></i>
					</el-badge>
				</template>
				<transition name="el-zoom-in-top">
					<UserNews v-show="isShowUserNewsPopover" />
				</transition>
			</el-popover>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon mr10" @click="onScreenfullClick">
			<i class="iconfont" :title="isScreenfull ? '开全屏' : '关全屏'" :class="!isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"></i>
		</div>
		<el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
			<span class="layout-navbars-breadcrumb-user-link">
				<img :src="getUserInfos.photo" class="layout-navbars-breadcrumb-user-link-photo mr5" />
				{{ getUserInfos.userName === '' ? 'test' : getUserInfos.userName }}
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="/home">首页</el-dropdown-item>
					<el-dropdown-item command="wareHouse">代码仓库</el-dropdown-item>
					<el-dropdown-item command="/404">404</el-dropdown-item>
					<el-dropdown-item command="/401">401</el-dropdown-item>
					<el-dropdown-item divided command="logOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<Search ref="searchRef" />
	</div>
</template>

<script lang="ts">
import { ref, getCurrentInstance, computed, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import screenfull from 'screenfull';
import { resetRoute } from '/@/router/index';
import { useStore } from '/@/store/index';
import { Session, Local } from '/@/utils/storage';
import UserNews from '/@/layout/navBars/breadcrumb/userNews.vue';
import Search from '/@/layout/navBars/breadcrumb/search.vue';
export default {
	name: 'layoutBreadcrumbUser',
	components: { UserNews, Search },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const router = useRouter();
		const store = useStore();
		const searchRef = ref();
		const state = reactive({
			isScreenfull: false,
			isShowUserNewsPopover: false,
			disabledSize: '',
		});
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 设置分割样式
		const layoutUserFlexNum = computed(() => {
			let { layout, isClassicSplitMenu } = getThemeConfig.value;
			let num = '';
			if (layout === 'defaults' || (layout === 'classic' && !isClassicSplitMenu) || layout === 'columns') num = 1;
			else num = null;
			return num;
		});
		// 全屏点击时
		const onScreenfullClick = () => {
			if (!screenfull.isEnabled) {
				ElMessage.warning('暂不不支持全屏');
				return false;
			}
			screenfull.toggle();
			screenfull.on('change', () => {
				if (screenfull.isFullscreen) state.isScreenfull = true;
				else state.isScreenfull = false;
			});
		};
		// 布局配置 icon 点击时
		const onLayoutSetingClick = () => {
			proxy.mittBus.emit('openSetingsDrawer');
		};
		// 下拉菜单点击时
		const onHandleCommandClick = (path: string) => {
			if (path === 'logOut') {
				ElMessageBox({
					closeOnClickModal: false,
					closeOnPressEscape: false,
					title: '提示',
					message: '此操作将退出登录, 是否继续?',
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '退出中';
							setTimeout(() => {
								done();
								setTimeout(() => {
									instance.confirmButtonLoading = false;
								}, 300);
							}, 700);
						} else {
							done();
						}
					},
				})
					.then(() => {
						Session.clear(); // 清除缓存/token等
						resetRoute(); // 删除/重置路由
						router.push('/login');
						setTimeout(() => {
							ElMessage.success('安全退出成功！');
						}, 300);
					})
					.catch(() => {});
			} else if (path === 'wareHouse') {
				window.open('https://gitee.com/lyt-top/vue-next-admin');
			} else {
				router.push(path);
			}
		};
		// 菜单搜索点击
		const onSearchClick = () => {
			searchRef.value.openSearch();
		};
		// 组件大小改变
		const onComponentSizeChange = (size: string) => {
			Local.remove('themeConfig');
			getThemeConfig.value.globalComponentSize = size;
			Local.set('themeConfig', getThemeConfig.value);
			proxy.$ELEMENT.size = size;
			initComponentSize();
			window.location.reload();
		};
		// 初始化全局组件大小
		const initComponentSize = () => {
			switch (Local.get('themeConfig').globalComponentSize) {
				case '':
					state.disabledSize = '';
					break;
				case 'medium':
					state.disabledSize = 'medium';
					break;
				case 'small':
					state.disabledSize = 'small';
					break;
				case 'mini':
					state.disabledSize = 'mini';
					break;
			}
		};
		// 页面加载时
		onMounted(() => {
			if (Local.get('themeConfig')) {
				initComponentSize();
			}
		});
		return {
			getUserInfos,
			onLayoutSetingClick,
			onHandleCommandClick,
			onScreenfullClick,
			onSearchClick,
			onComponentSizeChange,
			searchRef,
			layoutUserFlexNum,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	&-link {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
		&-photo {
			width: 25px;
			height: 25px;
			border-radius: 100%;
		}
	}
	&-icon {
		padding: 0 10px;
		cursor: pointer;
		color: var(--bg-topBarColor);
		height: 50px;
		line-height: 50px;
		display: flex;
		align-items: center;
		&:hover {
			background: rgba(0, 0, 0, 0.04);
			i {
				display: inline-block;
				animation: logoAnimation 0.3s ease-in-out;
			}
		}
	}
	::v-deep(.el-dropdown) {
		color: var(--bg-topBarColor);
	}
	::v-deep(.el-badge) {
		height: 40px;
		line-height: 40px;
		display: flex;
		align-items: center;
	}
	::v-deep(.el-badge__content.is-fixed) {
		top: 12px;
	}
}
</style>
