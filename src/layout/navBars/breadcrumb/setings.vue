<template>
	<div class="layout-breadcrumb-seting">
		<el-drawer
			:title="$t('message.layout.configTitle')"
			v-model="getThemeConfig.isDrawer"
			direction="rtl"
			destroy-on-close
			size="240px"
			@close="onDrawerClose"
		>
			<el-scrollbar class="layout-breadcrumb-seting-bar">
				<!-- 全局主题 -->
				<el-divider content-position="left">{{ $t('message.layout.oneTitle') }}</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.primary" size="small" @change="onColorPickerChange('primary')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">success</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.success" size="small" @change="onColorPickerChange('success')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">info</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.info" size="small" @change="onColorPickerChange('info')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">warning</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.warning" size="small" @change="onColorPickerChange('warning')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">danger</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.danger" size="small" @change="onColorPickerChange('danger')"> </el-color-picker>
					</div>
				</div>

				<!-- 菜单 / 顶栏 -->
				<el-divider content-position="left">{{ $t('message.layout.twoTitle') }}</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoTopBar') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.topBar" size="small" @change="onBgColorPickerChange('topBar')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoMenuBar') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.menuBar" size="small" @change="onBgColorPickerChange('menuBar')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoColumnsMenuBar') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.columnsMenuBar" size="small" @change="onBgColorPickerChange('columnsMenuBar')">
						</el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoTopBarColor') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.topBarColor" size="small" @change="onBgColorPickerChange('topBarColor')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoMenuBarColor') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.menuBarColor" size="small" @change="onBgColorPickerChange('menuBarColor')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoColumnsMenuBarColor') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.columnsMenuBarColor" size="small" @change="onBgColorPickerChange('columnsMenuBarColor')">
						</el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt10">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoIsTopBarColorGradual') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isTopBarColorGradual" @change="onTopBarGradualChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt14">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoIsMenuBarColorGradual') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isMenuBarColorGradual" @change="onMenuBarGradualChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt14">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoIsColumnsMenuBarColorGradual') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isColumnsMenuBarColorGradual" @change="onColumnsMenuBarGradualChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt14">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.twoIsMenuBarColorHighlight') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isMenuBarColorHighlight" @change="onMenuBarHighlightChange"></el-switch>
					</div>
				</div>

				<!-- 界面设置 -->
				<el-divider content-position="left">{{ $t('message.layout.threeTitle') }}</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.threeIsCollapse') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isCollapse" @change="onThemeConfigChange"></el-switch>
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
						<el-switch v-model="getThemeConfig.isFixedHeader" @change="onIsFixedHeaderChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15" :style="{ opacity: getThemeConfig.layout !== 'classic' ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.threeIsClassicSplitMenu') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isClassicSplitMenu" :disabled="getThemeConfig.layout !== 'classic'" @change="onClassicSplitMenuChange">
						</el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.threeIsLockScreen') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isLockScreen" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt11">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.threeLockScreenTime') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-input-number
							v-model="getThemeConfig.lockScreenTime"
							controls-position="right"
							:min="1"
							:max="9999"
							@change="setLocalThemeConfig"
							size="mini"
							style="width: 90px"
						>
						</el-input-number>
					</div>
				</div>

				<!-- 界面显示 -->
				<el-divider content-position="left">{{ $t('message.layout.fourTitle') }}</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsShowLogo') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isShowLogo" @change="onIsShowLogoChange"></el-switch>
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
							@change="onIsBreadcrumbChange"
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
				<div class="layout-breadcrumb-seting-bar-flex mt15" :style="{ opacity: isMobile ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsSortableTagsView') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isSortableTagsView" :disabled="isMobile ? true : false" @change="onSortableTagsViewChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsShareTagsView') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isShareTagsView" @change="onShareTagsViewChange"></el-switch>
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
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsDark') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isIsDark" @change="onAddDarkChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourIsWartermark') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isWartermark" @change="onWartermarkChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt14">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fourWartermarkText') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-input v-model="getThemeConfig.wartermarkText" size="mini" style="width: 90px" @input="onWartermarkTextInput($event)"></el-input>
					</div>
				</div>

				<!-- 其它设置 -->
				<el-divider content-position="left">{{ $t('message.layout.fiveTitle') }}</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">{{ $t('message.layout.fiveTagsStyle') }}</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select v-model="getThemeConfig.tagsStyle" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
							<el-option label="风格1" value="tags-style-one"></el-option>
							<el-option label="风格2" value="tags-style-two"></el-option>
							<el-option label="风格3" value="tags-style-three"></el-option>
							<el-option label="风格4" value="tags-style-four"></el-option>
							<el-option label="风格5" value="tags-style-five"></el-option>
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
				<div class="layout-breadcrumb-seting-bar-flex mt15 mb27">
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
					<el-button size="small" class="copy-config-btn" type="primary" ref="copyConfigBtnRef" @click="onCopyConfigClick">
						<el-icon>
							<elementCopyDocument />
						</el-icon>
						{{ $t('message.layout.copyText') }}
					</el-button>
					<el-button size="small" class="copy-config-btn-reset" type="info" @click="onResetConfigClick">
						<el-icon>
							<elementRefreshRight />
						</el-icon>
						{{ $t('message.layout.resetText') }}
					</el-button>
				</div>
			</el-scrollbar>
		</el-drawer>
	</div>
</template>

<script lang="ts">
import { nextTick, onUnmounted, onMounted, getCurrentInstance, defineComponent, computed, reactive, toRefs } from 'vue';
import { useStore } from '/@/store/index';
import { getLightColor } from '/@/utils/theme';
import { verifyAndSpace } from '/@/utils/toolsValidate';
import { Local } from '/@/utils/storage';
import Watermark from '/@/utils/wartermark';
import commonFunction from '/@/utils/commonFunction';
import other from '/@/utils/other';
export default defineComponent({
	name: 'layoutBreadcrumbSeting',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const { copyText } = commonFunction();
		const state = reactive({
			isMobile: false,
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 1、全局主题
		const onColorPickerChange = (color: string) => {
			setPropertyFun(`--color-${color}`, getThemeConfig.value[color]);
			setDispatchThemeConfig();
		};
		// 1、全局主题设置函数
		const setPropertyFun = (color: string, targetVal: any) => {
			document.documentElement.style.setProperty(color, targetVal);
			for (let i = 1; i <= 9; i++) {
				document.documentElement.style.setProperty(`${color}-light-${i}`, getLightColor(targetVal, i / 10));
			}
		};
		// 2、菜单 / 顶栏
		const onBgColorPickerChange = (bg: string) => {
			document.documentElement.style.setProperty(`--bg-${bg}`, getThemeConfig.value[bg]);
			onTopBarGradualChange();
			onMenuBarGradualChange();
			onColumnsMenuBarGradualChange();
			setDispatchThemeConfig();
		};
		// 2、菜单 / 顶栏 --> 顶栏背景渐变
		const onTopBarGradualChange = () => {
			setGraduaFun('.layout-navbars-breadcrumb-index', getThemeConfig.value.isTopBarColorGradual, getThemeConfig.value.topBar);
		};
		// 2、菜单 / 顶栏 --> 菜单背景渐变
		const onMenuBarGradualChange = () => {
			setGraduaFun('.layout-container .el-aside', getThemeConfig.value.isMenuBarColorGradual, getThemeConfig.value.menuBar);
		};
		// 2、菜单 / 顶栏 --> 分栏菜单背景渐变
		const onColumnsMenuBarGradualChange = () => {
			setGraduaFun('.layout-container .layout-columns-aside', getThemeConfig.value.isColumnsMenuBarColorGradual, getThemeConfig.value.columnsMenuBar);
		};
		// 2、菜单 / 顶栏 --> 背景渐变函数
		const setGraduaFun = (el: string, bool: boolean, color: string) => {
			nextTick(() => {
				let els = document.querySelector(el);
				if (!els) return false;
				if (bool) els.setAttribute('style', `background-image:linear-gradient(to bottom left , ${color}, ${getLightColor(color, 0.6)})`);
				else els.setAttribute('style', `background-image:${color}`);
				setLocalThemeConfig();
			});
		};
		// 2、菜单 / 顶栏 --> 菜单字体背景高亮
		const onMenuBarHighlightChange = () => {
			nextTick(() => {
				setTimeout(() => {
					let elsItems = document.querySelectorAll('.el-menu-item');
					let elActive = document.querySelector('.el-menu-item.is-active');
					if (!elActive) return false;
					if (getThemeConfig.value.isMenuBarColorHighlight) {
						elsItems.forEach((el: any) => el.setAttribute('id', ``));
						elActive.setAttribute('id', `add-is-active`);
						Local.set('menuBarHighlightId', elActive.getAttribute('id'));
					} else {
						elActive.setAttribute('id', ``);
					}
					setLocalThemeConfig();
				}, 0);
			});
		};
		// 3、界面设置 --> 菜单水平折叠
		const onThemeConfigChange = () => {
			onMenuBarHighlightChange();
			setDispatchThemeConfig();
		};
		// 3、界面设置 --> 固定 Header
		const onIsFixedHeaderChange = () => {
			getThemeConfig.value.isFixedHeaderChange = getThemeConfig.value.isFixedHeader ? false : true;
			setLocalThemeConfig();
		};
		// 3、界面设置 --> 经典布局分割菜单
		const onClassicSplitMenuChange = () => {
			getThemeConfig.value.isBreadcrumb = false;
			setLocalThemeConfig();
			proxy.mittBus.emit('getBreadcrumbIndexSetFilterRoutes');
		};
		// 4、界面显示 --> 侧边栏 Logo
		const onIsShowLogoChange = () => {
			getThemeConfig.value.isShowLogoChange = getThemeConfig.value.isShowLogo ? false : true;
			setLocalThemeConfig();
		};
		// 4、界面显示 --> 面包屑 Breadcrumb
		const onIsBreadcrumbChange = () => {
			if (getThemeConfig.value.layout === 'classic') {
				getThemeConfig.value.isClassicSplitMenu = false;
			}
			setLocalThemeConfig();
		};
		// 4、界面显示 --> 开启 TagsView 拖拽
		const onSortableTagsViewChange = () => {
			proxy.mittBus.emit('openOrCloseSortable');
			setLocalThemeConfig();
		};
		// 4、界面显示 --> 开启 TagsView 共用
		const onShareTagsViewChange = () => {
			proxy.mittBus.emit('openShareTagsView');
			setLocalThemeConfig();
		};
		// 4、界面显示 --> 灰色模式/色弱模式
		const onAddFilterChange = (attr: string) => {
			if (attr === 'grayscale') {
				if (getThemeConfig.value.isGrayscale) getThemeConfig.value.isInvert = false;
			} else {
				if (getThemeConfig.value.isInvert) getThemeConfig.value.isGrayscale = false;
			}
			const cssAttr =
				attr === 'grayscale' ? `grayscale(${getThemeConfig.value.isGrayscale ? 1 : 0})` : `invert(${getThemeConfig.value.isInvert ? '80%' : '0%'})`;
			const appEle: any = document.body;
			appEle.setAttribute('style', `filter: ${cssAttr}`);
			setLocalThemeConfig();
		};
		// 4、界面显示 --> 深色模式
		const onAddDarkChange = () => {
			const body = document.documentElement as HTMLElement;
			if (getThemeConfig.value.isIsDark) body.setAttribute('data-theme', 'dark');
			else body.setAttribute('data-theme', '');
		};
		// 4、界面显示 --> 开启水印
		const onWartermarkChange = () => {
			getThemeConfig.value.isWartermark ? Watermark.set(getThemeConfig.value.wartermarkText) : Watermark.del();
			setLocalThemeConfig();
		};
		// 4、界面显示 --> 水印文案
		const onWartermarkTextInput = (val: string) => {
			getThemeConfig.value.wartermarkText = verifyAndSpace(val);
			if (getThemeConfig.value.wartermarkText === '') return false;
			if (getThemeConfig.value.isWartermark) Watermark.set(getThemeConfig.value.wartermarkText);
			setLocalThemeConfig();
		};
		// 5、布局切换
		const onSetLayout = (layout: string) => {
			Local.set('oldLayout', layout);
			if (getThemeConfig.value.layout === layout) return false;
			getThemeConfig.value.layout = layout;
			getThemeConfig.value.isDrawer = false;
			initLayoutChangeFun();
			onMenuBarHighlightChange();
		};
		// 设置布局切换函数
		const initLayoutChangeFun = () => {
			onBgColorPickerChange('menuBar');
			onBgColorPickerChange('menuBarColor');
			onBgColorPickerChange('topBar');
			onBgColorPickerChange('topBarColor');
		};
		// 关闭弹窗时，初始化变量。变量用于处理 proxy.$refs.layoutScrollbarRef.update()
		const onDrawerClose = () => {
			getThemeConfig.value.isFixedHeaderChange = false;
			getThemeConfig.value.isShowLogoChange = false;
			getThemeConfig.value.isDrawer = false;
			setLocalThemeConfig();
		};
		// 布局配置弹窗打开
		const openDrawer = () => {
			getThemeConfig.value.isDrawer = true;
		};
		// 触发 store 布局配置更新
		const setDispatchThemeConfig = () => {
			setLocalThemeConfig();
			setLocalThemeConfigStyle();
		};
		// 存储布局配置
		const setLocalThemeConfig = () => {
			Local.remove('themeConfig');
			Local.set('themeConfig', getThemeConfig.value);
		};
		// 存储布局配置全局主题样式（html根标签）
		const setLocalThemeConfigStyle = () => {
			Local.set('themeConfigStyle', document.documentElement.style.cssText);
		};
		// 一键复制配置
		const onCopyConfigClick = () => {
			let copyThemeConfig = Local.get('themeConfig');
			copyThemeConfig.isDrawer = false;
			copyText(JSON.stringify(copyThemeConfig)).then(() => {
				getThemeConfig.value.isDrawer = false;
			});
		};
		// 一键恢复默认
		const onResetConfigClick = () => {
			Local.clear();
			window.location.reload();
		};
		// 修复防止退出登录再进入界面时，需要刷新样式才生效的问题，初始化布局样式等(登录的时候触发，目前方案)
		const initSetStyle = () => {
			setTimeout(() => {
				// 2、菜单 / 顶栏 --> 顶栏背景渐变
				onTopBarGradualChange();
				// 2、菜单 / 顶栏 --> 菜单背景渐变
				onMenuBarGradualChange();
				// 2、菜单 / 顶栏 --> 分栏菜单背景渐变
				onColumnsMenuBarGradualChange();
				// 2、菜单 / 顶栏 --> 菜单字体背景高亮
				onMenuBarHighlightChange();
			}, 1300);
		};
		onMounted(() => {
			nextTick(() => {
				// 判断当前布局是否不相同，不相同则初始化当前布局的样式，防止监听窗口大小改变时，布局配置logo、菜单背景等部分布局失效问题
				if (!Local.get('frequency')) initLayoutChangeFun();
				Local.set('frequency', 1);
				// 修复防止退出登录再进入界面时，需要刷新样式才生效的问题，初始化布局样式等(登录的时候触发，目前方案)
				proxy.mittBus.on('onSignInClick', () => {
					initSetStyle();
				});
				// 监听菜单点击，菜单字体背景高亮
				proxy.mittBus.on('onMenuClick', () => {
					onMenuBarHighlightChange();
				});
				// 监听窗口大小改变，非默认布局，设置成默认布局（适配移动端）
				proxy.mittBus.on('layoutMobileResize', (res: any) => {
					getThemeConfig.value.layout = res.layout;
					getThemeConfig.value.isDrawer = false;
					initLayoutChangeFun();
					onMenuBarHighlightChange();
					state.isMobile = other.isMobile();
				});
				setTimeout(() => {
					// 修复防止退出登录再进入界面时，需要刷新样式才生效的问题，初始化布局样式等(登录的时候触发，目前方案)
					initSetStyle();
					// 灰色模式
					if (getThemeConfig.value.isGrayscale) onAddFilterChange('grayscale');
					// 色弱模式
					if (getThemeConfig.value.isInvert) onAddFilterChange('invert');
					// 深色模式
					if (getThemeConfig.value.isIsDark) onAddDarkChange();
					// 开启水印
					onWartermarkChange();
					// 语言国际化
					if (Local.get('themeConfig')) proxy.$i18n.locale = Local.get('themeConfig').globalI18n;
				}, 100);
			});
		});
		onUnmounted(() => {
			// 取消监听菜单点击，菜单字体背景高亮
			proxy.mittBus.off('onMenuClick');
			proxy.mittBus.off('onSignInClick');
			proxy.mittBus.off('layoutMobileResize');
		});
		return {
			openDrawer,
			onColorPickerChange,
			onBgColorPickerChange,
			onTopBarGradualChange,
			onMenuBarGradualChange,
			onColumnsMenuBarGradualChange,
			onMenuBarHighlightChange,
			onThemeConfigChange,
			onIsFixedHeaderChange,
			onIsShowLogoChange,
			getThemeConfig,
			onDrawerClose,
			onAddFilterChange,
			onAddDarkChange,
			onWartermarkChange,
			onWartermarkTextInput,
			onSetLayout,
			setLocalThemeConfig,
			onClassicSplitMenuChange,
			onIsBreadcrumbChange,
			onSortableTagsViewChange,
			onShareTagsViewChange,
			onCopyConfigClick,
			onResetConfigClick,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.layout-breadcrumb-seting-bar {
	height: calc(100vh - 50px);
	padding: 0 15px;
	::v-deep(.el-scrollbar__view) {
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
				border-color: var(--color-primary-light-4);
				border-radius: 100%;
				padding: 4px;
				.layout-tips-box {
					transition: inherit;
					width: 30px;
					height: 30px;
					z-index: 9;
					border: 1px solid;
					border-color: var(--color-primary-light-4);
					border-radius: 100%;
					.layout-tips-txt {
						transition: inherit;
						position: relative;
						top: 5px;
						font-size: 12px;
						line-height: 1;
						letter-spacing: 2px;
						white-space: nowrap;
						color: var(--color-primary-light-4);
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
		.copy-config-btn-reset {
			width: 100%;
			margin: 10px 0 0;
		}
	}
}
</style>
