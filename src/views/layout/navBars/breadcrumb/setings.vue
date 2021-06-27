<template>
	<div class="layout-breadcrumb-seting">
		<el-drawer
			:title="$t('message.layout.configTitle')"
			:visible.sync="getThemeConfig.isDrawer"
			direction="rtl"
			destroy-on-close
			size="240px"
			@close="onDrawerClose"
		>
			<el-scrollbar class="layout-breadcrumb-seting-bar">
				<!-- 界面设置 -->
				<el-divider content-position="left">{{ $t('message.layout.threeTitle') }}</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.threeIsCollapse') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isCollapse" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.threeIsUniqueOpened') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isUniqueOpened" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.threeIsFixedHeader') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isFixedHeader" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>

				<!-- 界面显示 -->
				<el-divider content-position="left">{{ $t('message.layout.fourTitle') }}</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsShowLogo') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isShowLogo" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div
					class="layout-breadcrumb-seting-bar-flex mt15"
					:style="{ opacity: getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse' ? 0.5 : 1 }"
				>
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsBreadcrumb') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch
							v-model="getThemeConfig.isBreadcrumb"
							:disabled="getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse'"
							@change="setLocalThemeConfig"
						></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsBreadcrumbIcon') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isBreadcrumbIcon" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsTagsview') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isTagsview" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsTagsviewIcon') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isTagsviewIcon" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsCacheTagsView') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isCacheTagsView" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsFooter') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isFooter" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsGrayscale') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isGrayscale" @change="onAddFilterChange('grayscale')"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsInvert') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isInvert" @change="onAddFilterChange('invert')"></el-switch>
					</div>
				</div>

				<!-- 其它设置 -->
				<el-divider content-position="left">{{ $t('message.layout.fiveTitle') }}</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fiveTagsStyle') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select v-model="getThemeConfig.tagsStyle" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
							<el-option label="风格1" value="tags-style-one"></el-option>
						</el-select>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fiveAnimation') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select v-model="getThemeConfig.animation" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
							<el-option label="slide-right" value="slide-right"></el-option>
							<el-option label="slide-left" value="slide-left"></el-option>
							<el-option label="opacitys" value="opacitys"></el-option>
						</el-select>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fiveColumnsAsideStyle') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select v-model="getThemeConfig.columnsAsideStyle" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
							<el-option label="圆角" value="columns-round"></el-option>
							<el-option label="卡片" value="columns-card"></el-option>
						</el-select>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15 mb28">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fiveColumnsAsideLayout') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select v-model="getThemeConfig.columnsAsideLayout" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
							<el-option label="水平" value="columns-horizontal"></el-option>
							<el-option label="垂直" value="columns-vertical"></el-option>
						</el-select>
					</div>
				</div>

				<!-- 布局切换 -->
				<el-divider content-position="left">{{ $t('message.layout.sixTitle') }}</el-divider>
				<div class="layout-drawer-content-flex">
					<!-- defaults 布局 -->
					<div class="layout-drawer-content-item" @click="onSetLayout('defaults')">
						<section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'defaults' }">
							<aside class="el-aside" style="width: 20px"></aside>
							<section class="el-container is-vertical">
								<header class="el-header" style="height: 10px"></header>
								<main class="el-main"></main>
							</section>
						</section>
						<div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'defaults' }">
							<div class="layout-tips-box">
								<p class="layout-tips-txt">{{ $t('message.layout.sixDefaults') }}</p>
							</div>
						</div>
					</div>
					<!-- classic 布局 -->
					<div class="layout-drawer-content-item" @click="onSetLayout('classic')">
						<section class="el-container is-vertical el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'classic' }">
							<header class="el-header" style="height: 10px"></header>
							<section class="el-container">
								<aside class="el-aside" style="width: 20px"></aside>
								<section class="el-container is-vertical">
									<main class="el-main"></main>
								</section>
							</section>
						</section>
						<div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'classic' }">
							<div class="layout-tips-box">
								<p class="layout-tips-txt">{{ $t('message.layout.sixClassic') }}</p>
							</div>
						</div>
					</div>
					<!-- transverse 布局 -->
					<div class="layout-drawer-content-item" @click="onSetLayout('transverse')">
						<section class="el-container is-vertical el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'transverse' }">
							<header class="el-header" style="height: 10px"></header>
							<section class="el-container">
								<section class="el-container is-vertical">
									<main class="el-main"></main>
								</section>
							</section>
						</section>
						<div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'transverse' }">
							<div class="layout-tips-box">
								<p class="layout-tips-txt">{{ $t('message.layout.sixTransverse') }}</p>
							</div>
						</div>
					</div>
					<!-- columns 布局 -->
					<div class="layout-drawer-content-item" @click="onSetLayout('columns')">
						<section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'columns' }">
							<aside class="el-aside-dark" style="width: 10px"></aside>
							<aside class="el-aside" style="width: 20px"></aside>
							<section class="el-container is-vertical">
								<header class="el-header" style="height: 10px"></header>
								<main class="el-main"></main>
							</section>
						</section>
						<div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'columns' }">
							<div class="layout-tips-box">
								<p class="layout-tips-txt">{{ $t('message.layout.sixColumns') }}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="copy-config">
					<el-alert :title="$t('message.layout.tipText')" type="warning" :closable="false"> </el-alert>
					<el-button
						size="small"
						class="copy-config-btn"
						icon="el-icon-document-copy"
						type="primary"
						ref="copyConfigBtnRef"
						@click="onCopyConfigClick"
						>{{ $t('message.layout.copyText') }}
					</el-button>
				</div>
			</el-scrollbar>
		</el-drawer>
	</div>
</template>

<script>
import ClipboardJS from 'clipboard';
import { Local } from '@/utils/storage.js';
export default {
	name: 'layoutBreadcrumbSeting',
	data() {
		return {
			isCollapse: false,
			layout: 'defaults',
		};
	},
	computed: {
		// 获取布局配置信息
		getThemeConfig() {
			return this.$store.state.themeConfig.themeConfig;
		},
	},
	created() {
		// 判断当前布局是否不相同，不相同则初始化当前布局的样式，防止监听窗口大小改变时，布局配置logo、菜单背景等部分布局失效问题
		if (!Local.get('frequency')) this.initSetLayoutChange();
		Local.set('frequency', 1);
		// 监听窗口大小改变，非默认布局，设置成默认布局（适配移动端）
		this.bus.$on('layoutMobileResize', (res) => {
			if (this.$store.state.themeConfig.themeConfig.layout === res.layout) return false;
			this.$store.state.themeConfig.themeConfig.layout = res.layout;
			this.$store.state.themeConfig.themeConfig.isDrawer = false;
			this.$store.state.themeConfig.themeConfig.isCollapse = false;
			this.initSetLayoutChange();
		});
	},
	mounted() {
		this.initLayoutConfig();
	},
	methods: {
		// 初始化：刷新页面时，设置了值，直接取缓存中的值进行初始化
		initLayoutConfig() {
			window.addEventListener('load', () => {
				// 灰色模式
				if (this.$store.state.themeConfig.themeConfig.isGrayscale) this.onAddFilterChange('grayscale');
				// 色弱模式
				if (this.$store.state.themeConfig.themeConfig.isInvert) this.onAddFilterChange('invert');
				// 语言国际化
				if (Local.get('themeConfigPrev')) this.$i18n.locale = Local.get('themeConfigPrev').globalI18n;
			});
		},
		// 存储布局配置
		setLocalThemeConfig() {
			Local.remove('themeConfigPrev');
			Local.set('themeConfigPrev', this.$store.state.themeConfig.themeConfig);
			this.setLocalThemeConfigStyle();
		},
		// 存储布局配置全局主题样式（html根标签）
		setLocalThemeConfigStyle() {
			Local.set('themeConfigStyle', document.documentElement.style.cssText);
		},
		// 布局配置弹窗打开
		openDrawer() {
			this.$store.state.themeConfig.themeConfig.isDrawer = true;
		},
		// 关闭弹窗时，初始化变量
		onDrawerClose() {
			this.$store.state.themeConfig.themeConfig.isDrawer = false;
			this.setLocalThemeConfig();
		},
		// 灰色模式/色弱模式
		onAddFilterChange(attr) {
			if (attr === 'grayscale') {
				if (this.$store.state.themeConfig.themeConfig.isGrayscale) this.$store.state.themeConfig.themeConfig.isInvert = false;
			} else {
				if (this.$store.state.themeConfig.themeConfig.isInvert) this.$store.state.themeConfig.themeConfig.isGrayscale = false;
			}
			const cssAttr =
				attr === 'grayscale'
					? `grayscale(${this.$store.state.themeConfig.themeConfig.isGrayscale ? 1 : 0})`
					: `invert(${this.$store.state.themeConfig.themeConfig.isInvert ? '80%' : '0%'})`;
			const appEle = document.body;
			appEle.setAttribute('style', `filter: ${cssAttr};`);
			this.setLocalThemeConfig();
		},
		// 布局切换
		onSetLayout(layout) {
			Local.set('oldLayout', layout);
			if (this.$store.state.themeConfig.themeConfig.layout === layout) return false;
			this.$store.state.themeConfig.themeConfig.layout = layout;
			this.$store.state.themeConfig.themeConfig.isDrawer = false;
			this.initSetLayoutChange();
		},
		// 设置布局切换，重置主题样式
		initSetLayoutChange() {
			if (this.$store.state.themeConfig.themeConfig.layout === 'classic') {
				this.onBgColorPickerChange('menuBar', '#ffffff');
				this.onBgColorPickerChange('menuBarColor', '#606266');
				this.onBgColorPickerChange('topBar', '#ffffff');
				this.onBgColorPickerChange('topBarColor', '#606266');
			} else if (this.$store.state.themeConfig.themeConfig.layout === 'transverse') {
				this.onBgColorPickerChange('menuBarColor', '#ffffff');
				this.onBgColorPickerChange('topBar', '#545c64');
				this.onBgColorPickerChange('topBarColor', '#ffffff');
			} else if (this.$store.state.themeConfig.themeConfig.layout === 'columns') {
				this.onBgColorPickerChange('menuBar', '#ffffff');
				this.onBgColorPickerChange('menuBarColor', '#606266');
				this.onBgColorPickerChange('topBar', '#ffffff');
				this.onBgColorPickerChange('topBarColor', '#606266');
			} else {
				this.onBgColorPickerChange('menuBar', '#545c64');
				this.onBgColorPickerChange('menuBarColor', '#eaeaea');
				this.onBgColorPickerChange('topBar', '#ffffff');
				this.onBgColorPickerChange('topBarColor', '#606266');
			}
		},
		// 菜单 / 顶栏背景等
		onBgColorPickerChange(bg, rgb) {
			document.documentElement.style.setProperty(`--bg-${bg}`, rgb);
			this.setLocalThemeConfigStyle();
		},
		// 一键复制配置
		onCopyConfigClick() {
			this.$store.state.themeConfig.themeConfig.isDrawer = false;
			let clipboardJS = new ClipboardJS('.copy-config-btn', {
				text: () => JSON.stringify(this.$store.state.themeConfig.themeConfig),
			});
			clipboardJS.on('success', () => {
				this.$message.success('配置复制成功');
				this.isDrawer = false;
				clipboardJS.destroy();
			});
			clipboardJS.on('error', () => {
				this.$message.error('配置复制失败');
			});
		},
	},
};
</script>

<style scoped lang="scss">
.layout-breadcrumb-seting-bar {
	height: calc(100vh - 50px);
	padding: 0 15px;
	::v-deep .el-scrollbar__view {
		overflow-x: hidden !important;
	}
	.layout-breadcrumb-seting-bar-flex {
		display: flex;
		align-items: center;
		&-label {
			flex: 1;
			color: #666666;
		}
	}
	.layout-drawer-content-flex {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		margin: 0 -5px;
		.layout-drawer-content-item {
			width: 50%;
			height: 70px;
			cursor: pointer;
			border: 1px solid transparent;
			position: relative;
			padding: 5px;
			.el-container {
				height: 100%;
				.el-aside-dark {
					background-color: #b3c0d1;
				}
				.el-aside {
					background-color: #d3dce6;
				}
				.el-header {
					background-color: #b3c0d1;
				}
				.el-main {
					background-color: #e9eef3;
				}
			}
			.el-circular {
				border-radius: 2px;
				overflow: hidden;
				border: 1px solid transparent;
				transition: all 0.3s ease-in-out;
			}
			.drawer-layout-active {
				border: 1px solid;
				border-color: var(--color-primary);
			}
			.layout-tips-warp,
			.layout-tips-warp-active {
				transition: all 0.3s ease-in-out;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				border: 1px solid;
				border-color: #8cc5ff;
				border-radius: 100%;
				padding: 4px;
				.layout-tips-box {
					transition: inherit;
					width: 30px;
					height: 30px;
					z-index: 9;
					border: 1px solid;
					border-color: #8cc5ff;
					border-radius: 100%;
					.layout-tips-txt {
						transition: inherit;
						position: relative;
						top: 5px;
						font-size: 12px;
						line-height: 1;
						letter-spacing: 2px;
						white-space: nowrap;
						color: #8cc5ff;
						text-align: center;
						transform: rotate(30deg);
						left: -1px;
						background-color: #e9eef3;
						width: 32px;
						height: 17px;
						line-height: 17px;
					}
				}
			}
			.layout-tips-warp-active {
				border: 1px solid;
				border-color: var(--color-primary);
				.layout-tips-box {
					border: 1px solid;
					border-color: var(--color-primary);
					.layout-tips-txt {
						color: var(--color-primary) !important;
						background-color: #e9eef3 !important;
					}
				}
			}
			&:hover {
				.el-circular {
					transition: all 0.3s ease-in-out;
					border: 1px solid;
					border-color: var(--color-primary);
				}
				.layout-tips-warp {
					transition: all 0.3s ease-in-out;
					border-color: var(--color-primary);
					.layout-tips-box {
						transition: inherit;
						border-color: var(--color-primary);
						.layout-tips-txt {
							transition: inherit;
							color: var(--color-primary) !important;
							background-color: #e9eef3 !important;
						}
					}
				}
			}
		}
	}
	.copy-config {
		margin: 10px 0;
		.copy-config-btn {
			width: 100%;
			margin-top: 15px;
		}
		.copy-config-last-btn {
			margin: 10px 0 0;
		}
	}
}
</style>
