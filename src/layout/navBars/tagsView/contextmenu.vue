<template>
	<transition name="el-zoom-in-center">
		<div
			aria-hidden="true"
			class="el-dropdown__popper el-popper is-light is-pure custom-contextmenu"
			role="tooltip"
			data-popper-placement="bottom"
			:style="`top: ${dropdowns.y + 5}px;left: ${dropdowns.x}px;`"
			:key="Math.random()"
			v-show="isShow"
		>
			<ul class="el-dropdown-menu">
				<template v-for="(v, k) in dropdownList">
					<li
						class="el-dropdown-menu__item"
						aria-disabled="false"
						tabindex="-1"
						:key="k"
						v-if="!v.affix"
						@click="onCurrentContextmenuClick(v.contextMenuClickId)"
					>
						<i :class="v.icon"></i>
						<span>{{ v.txt }}</span>
					</li>
				</template>
			</ul>
			<div class="el-popper__arrow" style="left: 10px"></div>
		</div>
	</transition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, onMounted, onUnmounted } from 'vue';
export default defineComponent({
	name: 'layoutTagsViewContextmenu',
	props: {
		dropdown: {
			type: Object,
		},
	},
	setup(props, { emit }) {
		const state = reactive({
			isShow: false,
			dropdownList: [
				{ contextMenuClickId: 0, txt: '刷新', affix: false, icon: 'el-icon-refresh-right' },
				{ contextMenuClickId: 1, txt: '关闭', affix: false, icon: 'el-icon-close' },
				{ contextMenuClickId: 2, txt: '关闭其它', affix: false, icon: 'el-icon-circle-close' },
				{ contextMenuClickId: 3, txt: '全部关闭', affix: false, icon: 'el-icon-folder-delete' },
				{ contextMenuClickId: 4, txt: '当前页全屏', affix: false, icon: 'iconfont icon-fullscreen' },
			],
			item: {},
		});
		// 父级传过来的坐标 x,y 值
		const dropdowns = computed(() => {
			return props.dropdown;
		});
		// 当前项菜单点击
		const onCurrentContextmenuClick = (contextMenuClickId: number) => {
			emit('currentContextmenuClick', Object.assign({}, { contextMenuClickId }, state.item));
		};
		// 打开右键菜单：判断是否固定，固定则不显示关闭按钮
		const openContextmenu = (item: any) => {
			state.item = item;
			item.meta.isAffix ? (state.dropdownList[1].affix = true) : (state.dropdownList[1].affix = false);
			closeContextmenu();
			setTimeout(() => {
				state.isShow = true;
			}, 10);
		};
		// 关闭右键菜单
		const closeContextmenu = () => {
			state.isShow = false;
		};
		// 监听页面监听进行右键菜单的关闭
		onMounted(() => {
			document.body.addEventListener('click', closeContextmenu);
		});
		// 页面卸载时，移除右键菜单监听事件
		onUnmounted(() => {
			document.body.removeEventListener('click', closeContextmenu);
		});
		return {
			dropdowns,
			openContextmenu,
			closeContextmenu,
			onCurrentContextmenuClick,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.custom-contextmenu {
	transform-origin: center top;
	z-index: 2190;
	position: fixed;
	.el-dropdown-menu__item {
		font-size: 12px !important;
		white-space: nowrap;
		i {
			font-size: 12px !important;
		}
	}
}
</style>
