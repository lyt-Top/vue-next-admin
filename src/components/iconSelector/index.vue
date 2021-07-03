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
					@input="onIconInput"
				>
					<template #prepend>
						<i
							:class="[
								fontIconIndex === '' ? prepend : fontIconPrefix,
								{ iconfont: fontIconTabsIndex === 0 },
								{ ele: fontIconTabsIndex === 1 },
								{ fa: fontIconTabsIndex === 2 },
							]"
							class="font14"
						></i>
					</template>
				</el-input>
			</template>
			<transition name="el-zoom-in-top">
				<div class="icon-selector-warp" v-show="fontIconVisible">
					<div class="icon-selector-warp-title">{{ title }}</div>
					<div class="icon-selector-warp-row">
						<el-scrollbar>
							<el-row :gutter="10" v-if="fontIconSheetsFilterList.length > 0">
								<el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" @click="onColClick(v, k)" v-for="(v, k) in fontIconSheetsFilterList" :key="k">
									<div class="icon-selector-warp-item" :class="{ 'icon-selector-active': fontIconIndex === k }">
										<div class="flex-margin">
											<div class="icon-selector-warp-item-value">
												<i :class="v"></i>
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
import { ref, toRefs, reactive, onMounted, nextTick, computed, watch } from 'vue';
import initIconfont from '/@/utils/getStyleSheets';
export default {
	name: 'iconSelector',
	emits: ['update:modelValue', 'get', 'clear'],
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
		// 双向绑定值，字段名为固定，改了之后将不生效
		// 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
		modelValue: String,
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
			fontIconSheetsList: [],
		});
		// icon input 改变时，实现双向绑定
		const onIconInput = (icon) => {
			emit('update:modelValue', icon);
		};
		// 处理 icon 双向绑定数值回显
		const initModeValueEcho = () => {
			// 父级 v-model 为空，不执行下一步
			if (props.modelValue === '') return false;
			// 双向绑定赋值回显
			state.fontIconSearch = props.modelValue;
			// 处理回显
			let iconData: object = {};
			for (let i in state.fontIconSheetsList) {
				if (state.fontIconSheetsList[i].toLowerCase().indexOf(props.modelValue) !== -1) {
					iconData = { item: state.fontIconSheetsList[i] };
				}
			}
			onColClick(iconData.item, 0);
		};
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
		const initFontIconData = async () => {
			if (props.type === 'ali') {
				await initIconfont.ali().then((res: any) => {
					state.fontIconTabsIndex = 0;
					// 阿里字体图标使用 `iconfont xxx`
					state.fontIconSheetsList = res.map((i) => `iconfont ${i}`);
				});
			} else if (props.type === 'ele') {
				await initIconfont.ele().then((res: any) => {
					state.fontIconTabsIndex = 1;
					state.fontIconSheetsList = res;
				});
			} else if (props.type === 'awe') {
				await initIconfont.awe().then((res: any) => {
					state.fontIconTabsIndex = 2;
					// fontawesome字体图标使用 `fa xxx`
					state.fontIconSheetsList = res.map((i) => `fa ${i}`);
				});
			}
			initModeValueEcho();
		};
		// 获取当前点击的 icon 图标
		const onColClick = (v: any, k: number) => {
			state.fontIconIndex = k;
			state.fontIconVisible = false;
			if (state.fontIconTabsIndex === 0) state.fontIconPrefix = `${v}`;
			else if (state.fontIconTabsIndex === 1) state.fontIconPrefix = `${v}`;
			else if (state.fontIconTabsIndex === 2) state.fontIconPrefix = `${v}`;
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
		// 监听双向绑定 modelValue 的变化
		watch(
			() => props.modelValue,
			() => {
				initModeValueEcho();
			}
		);
		return {
			inputWidthRef,
			fontIconSheetsFilterList,
			onColClick,
			onClearFontIcon,
			onIconInput,
			...toRefs(state),
		};
	},
};
</script>
