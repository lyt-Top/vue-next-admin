<template>
	<div class="icon-selector">
		<el-popover placement="bottom" :width="fontIconWidth" v-model:visible="fontIconVisible" popper-class="icon-selector-popper">
			<template #reference>
				<el-input
					v-model="fontIconSearch"
					:placeholder="placeholder"
					:clearable="clearable"
					:disabled="disabled"
					:size="size"
					ref="inputWidthRef"
					@clear="onClearFontIcon"
				>
					<template #prepend>
						<i :class="fontIconPrefix === '' ? prepend : fontIconPrefix" class="font14"></i>
					</template>
				</el-input>
			</template>
			<transition name="el-zoom-in-top">
				<div class="icon-selector-warp" v-show="fontIconVisible">
					<div class="icon-selector-warp-title">{{ title }}</div>
					<div class="icon-selector-warp-row">
						<el-scrollbar>
							<el-row :gutter="10">
								<el-col
									:xs="4"
									:sm="4"
									:md="2"
									:lg="2"
									:xl="1"
									:class="`${fontIconTabsIcon}-col`"
									@click="onColClick(v, k)"
									v-for="(v, k) in fontIconSheetsFilterList"
									:key="k"
								>
									<div class="icon-selector-warp-item" :class="{ 'icon-selector-active': fontIconIndex === k }">
										<div class="flex-margin">
											<div class="icon-selector-warp-item-value">
												<i :class="[fontIconTabsIcon, v]"></i>
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
							<el-empty :image-size="100" v-if="fontIconSheetsFilterList.length <= 0" :description="emptyDescription"></el-empty>
						</el-scrollbar>
					</div>
				</div>
			</transition>
		</el-popover>
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted, nextTick, computed } from 'vue';
import initIconfont from '/@/utils/getStyleSheets';
export default {
	name: 'iconSelector',
	props: {
		// 输入框前置内容
		prepend: {
			type: String,
			default: () => 'el-icon-thumb',
		},
		// 输入框占位文本
		placeholder: {
			type: String,
			default: () => '请输入内容搜索图标或者选择图标',
		},
		// 输入框占位文本
		size: {
			type: String,
			default: () => 'small',
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
	},
	setup(props, { emit }) {
		const inputWidthRef = ref();
		const state: any = reactive({
			fontIconPrefix: '',
			fontIconVisible: false,
			fontIconWidth: 0,
			fontIconIndex: '',
			fontIconSearch: '',
			fontIconTabsIndex: 0,
			fontIconTabsIcon: 'iconfont ali',
			fontIconSheetsList: [],
		});
		// 设置无数据时的空状态
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
		const initFontIconData = () => {
			if (props.type === 'ali') {
				initIconfont.ali().then((res: any) => {
					state.fontIconTabsIcon = 'iconfont ali';
					state.fontIconTabsIndex = 0;
					state.fontIconSheetsList = res;
				});
			} else if (props.type === 'ele') {
				initIconfont.ele().then((res: any) => {
					state.fontIconTabsIcon = 'ele';
					state.fontIconTabsIndex = 1;
					state.fontIconSheetsList = res;
				});
			} else if (props.type === 'awe') {
				initIconfont.awe().then((res: any) => {
					state.fontIconTabsIcon = 'fa awe';
					state.fontIconTabsIndex = 2;
					state.fontIconSheetsList = res;
				});
			}
		};
		// 获取当前点击的 icon 图标
		const onColClick = (v: any, k: number) => {
			state.fontIconIndex = k;
			state.fontIconVisible = false;
			if (state.fontIconTabsIndex === 0) state.fontIconPrefix = `iconfont ali ${v}`;
			else if (state.fontIconTabsIndex === 1) state.fontIconPrefix = `ele ${v}`;
			else if (state.fontIconTabsIndex === 2) state.fontIconPrefix = `fa awe ${v}`;
			emit('get', state.fontIconPrefix);
		};
		// 清空当前点击的 icon 图标
		const onClearFontIcon = () => {
			state.fontIconIndex = '';
			state.fontIconPrefix = '';
			emit('clear', state.fontIconPrefix);
		};
		// 页面加载时
		onMounted(() => {
			initFontIconData();
			initResize();
			getInputWidth();
		});
		return {
			inputWidthRef,
			fontIconSheetsFilterList,
			onColClick,
			onClearFontIcon,
			...toRefs(state),
		};
	},
};
</script>
