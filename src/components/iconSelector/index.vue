<template>
	<div class="icon-selector w100 h100">
		<el-popover
			placement="bottom"
			:width="fontIconWidth"
			trigger="click"
			transition="el-zoom-in-top"
			popper-class="icon-selector-popper"
			@show="onPopoverShow"
		>
			<template #reference>
				<el-input
					v-model="fontIconSearch"
					:placeholder="fontIconPlaceholder"
					:clearable="clearable"
					:disabled="disabled"
					:size="size"
					ref="inputWidthRef"
					@clear="onClearFontIcon"
					@focus="onIconFocus"
					@blur="onIconBlur"
				>
					<template #prepend>
						<SvgIcon
							:name="fontIconPrefix === '' ? prepend : fontIconPrefix"
							class="font14"
							v-if="fontIconPrefix === '' ? prepend?.indexOf('ele-') > -1 : fontIconPrefix?.indexOf('ele-') > -1"
						/>
						<i v-else :class="fontIconPrefix === '' ? prepend : fontIconPrefix" class="font14"></i>
					</template>
				</el-input>
			</template>
			<template #default>
				<div class="icon-selector-warp">
					<div class="icon-selector-warp-title flex">
						<div class="flex-auto">{{ title }}</div>
						<div class="icon-selector-warp-title-tab" v-if="type === 'all'">
							<span :class="{ 'span-active': fontIconType === 'ali' }" @click="onIconChange('ali')" class="ml10" title="iconfont 图标">ali</span>
							<span :class="{ 'span-active': fontIconType === 'ele' }" @click="onIconChange('ele')" class="ml10" title="elementPlus 图标">ele</span>
							<span :class="{ 'span-active': fontIconType === 'awe' }" @click="onIconChange('awe')" class="ml10" title="fontawesome 图标">awe</span>
						</div>
					</div>
					<div class="icon-selector-warp-row">
						<el-scrollbar ref="selectorScrollbarRef">
							<el-row :gutter="10" v-if="fontIconSheetsFilterList.length > 0">
								<el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" @click="onColClick(v)" v-for="(v, k) in fontIconSheetsFilterList" :key="k">
									<div class="icon-selector-warp-item" :class="{ 'icon-selector-active': fontIconPrefix === v }">
										<div class="flex-margin">
											<div class="icon-selector-warp-item-value">
												<SvgIcon :name="v" />
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
							<el-empty :image-size="100" v-if="fontIconSheetsFilterList.length <= 0" :description="emptyDescription"></el-empty>
						</el-scrollbar>
					</div>
				</div>
			</template>
		</el-popover>
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted, nextTick, computed, watch, defineComponent } from 'vue';
import initIconfont from '/@/utils/getStyleSheets';

export default defineComponent({
	name: 'iconSelector',
	emits: ['update:modelValue', 'get', 'clear'],
	props: {
		// 输入框前置内容
		prepend: {
			type: String,
			default: () => 'ele-Pointer',
		},
		// 输入框占位文本
		placeholder: {
			type: String,
			default: () => '请输入内容搜索图标或者选择图标',
		},
		// 输入框占位文本
		size: {
			type: String,
			default: () => 'default',
		},
		// 弹窗标题
		title: {
			type: String,
			default: () => '请选择图标',
		},
		// icon 图标类型
		type: {
			type: String,
			default: () => 'ele',
		},
		// 禁用
		disabled: {
			type: Boolean,
			default: () => false,
		},
		// 是否可清空
		clearable: {
			type: Boolean,
			default: () => true,
		},
		// 自定义空状态描述文字
		emptyDescription: {
			type: String,
			default: () => '无相关图标',
		},
		// 双向绑定值，默认为 modelValue，
		// 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
		// 参考：https://v3.cn.vuejs.org/guide/component-custom-events.html#%E5%A4%9A%E4%B8%AA-v-model-%E7%BB%91%E5%AE%9A
		modelValue: String,
	},
	setup(props, { emit }) {
		const inputWidthRef = ref();
		const selectorScrollbarRef = ref();
		const state = reactive({
			fontIconPrefix: '',
			fontIconWidth: 0,
			fontIconSearch: '',
			fontIconTabsIndex: 0,
			fontIconSheetsList: [],
			fontIconPlaceholder: '',
			fontIconType: 'ali',
			fontIconShow: true,
		});
		// 处理 input 获取焦点时，modelValue 有值时，改变 input 的 placeholder 值
		const onIconFocus = () => {
			if (!props.modelValue) return false;
			state.fontIconSearch = '';
			state.fontIconPlaceholder = props.modelValue;
		};
		// 处理 input 失去焦点时，为空将清空 input 值，为点击选中图标时，将取原先值
		const onIconBlur = () => {
			setTimeout(() => {
				const icon = state.fontIconSheetsList.filter((icon: string) => icon === state.fontIconSearch);
				if (icon.length <= 0) state.fontIconSearch = '';
			}, 300);
		};
		// 处理 icon 双向绑定数值回显
		const initModeValueEcho = () => {
			if (props.modelValue === '') return ((<string | undefined>state.fontIconPlaceholder) = props.placeholder);
			(<string | undefined>state.fontIconPlaceholder) = props.modelValue;
			(<string | undefined>state.fontIconPrefix) = props.modelValue;
		};
		// 处理 icon type 类型为 all 时，类型 ali、ele、awe 回显问题
		const initFontIconTypeEcho = () => {
			if ((<any>props.modelValue)?.indexOf('iconfont') > -1) onIconChange('ali');
			else if ((<any>props.modelValue)?.indexOf('ele-') > -1) onIconChange('ele');
			else if ((<any>props.modelValue)?.indexOf('fa') > -1) onIconChange('awe');
			else onIconChange('ali');
		};
		// 图标搜索及图标数据显示
		const fontIconSheetsFilterList = computed(() => {
			if (!state.fontIconSearch) return state.fontIconSheetsList;
			let search = state.fontIconSearch.trim().toLowerCase();
			return state.fontIconSheetsList.filter((item: any) => {
				if (item.toLowerCase().indexOf(search) !== -1) return item;
			});
		});
		// 获取 input 的宽度
		const getInputWidth = () => {
			nextTick(() => {
				state.fontIconWidth = inputWidthRef.value.$el.offsetWidth;
			});
		};
		// 监听页面宽度改变
		const initResize = () => {
			window.addEventListener('resize', () => {
				getInputWidth();
			});
		};
		// 初始化数据
		const initFontIconData = async (type: string) => {
			state.fontIconSheetsList = [];
			if (type === 'ali') {
				await initIconfont.ali().then((res: any) => {
					// 阿里字体图标使用 `iconfont xxx`
					state.fontIconSheetsList = res.map((i: string) => `iconfont ${i}`);
				});
			} else if (type === 'ele') {
				await initIconfont.ele().then((res: any) => {
					state.fontIconSheetsList = res;
				});
			} else if (type === 'awe') {
				await initIconfont.awe().then((res: any) => {
					// fontawesome字体图标使用 `fa xxx`
					state.fontIconSheetsList = res.map((i: string) => `fa ${i}`);
				});
			}
			// 初始化 input 的 placeholder
			// 参考（单项数据流）：https://cn.vuejs.org/v2/guide/components-props.html?#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81
			state.fontIconPlaceholder = props.placeholder;
			// 初始化双向绑定回显
			initModeValueEcho();
		};
		// 图标点击切换
		const onIconChange = (type: string) => {
			state.fontIconType = type;
			initFontIconData(type);
		};
		// 获取当前点击的 icon 图标
		const onColClick = (v: any) => {
			state.fontIconPlaceholder = v;
			state.fontIconPrefix = v;
			emit('get', state.fontIconPrefix);
			emit('update:modelValue', state.fontIconPrefix);
		};
		// 清空当前点击的 icon 图标
		const onClearFontIcon = () => {
			state.fontIconPrefix = '';
			emit('clear', state.fontIconPrefix);
			emit('update:modelValue', state.fontIconPrefix);
		};
		// 监听 Popover 打开，用于双向绑定值回显
		const onPopoverShow = () => {
			initModeValueEcho();
			initFontIconTypeEcho();
		};
		// 页面加载时
		onMounted(() => {
			initModeValueEcho();
			initResize();
			getInputWidth();
		});

		// 监听双向绑定 modelValue 的变化
		watch(
			() => props.modelValue,
			() => {
				initModeValueEcho();
			}
		);
		return {
			inputWidthRef,
			selectorScrollbarRef,
			fontIconSheetsFilterList,
			onColClick,
			onIconChange,
			onClearFontIcon,
			onIconFocus,
			onIconBlur,
			onPopoverShow,
			...toRefs(state),
		};
	},
});
</script>
