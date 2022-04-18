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
				<li
					v-for="(v, k) in dropdownList"
					class="el-dropdown-menu__item"
					aria-disabled="false"
					tabindex="-1"
					:key="k"
					@click="onCurrentClick(v.contextMenuClickId)"
				>
					<SvgIcon :name="v.icon" />
					<span>{{ v.txt }}{{ item.type === 'line' ? '线' : '节点' }}</span>
				</li>
			</ul>
			<div class="el-popper__arrow" style="left: 10px"></div>
		</div>
	</transition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, onMounted, onUnmounted } from 'vue';

export default defineComponent({
	name: 'pagesWorkflowContextmenu',
	props: {
		dropdown: {
			type: Object,
		},
	},
	setup(props, { emit }) {
		const state = reactive({
			isShow: false,
			dropdownList: [
				{ contextMenuClickId: 0, txt: '删除', icon: 'ele-Delete' },
				{ contextMenuClickId: 1, txt: '编辑', icon: 'ele-Edit' },
			],
			item: {
				type: 'node',
			},
			conn: {},
		});
		// 父级传过来的坐标 x,y 值
		const dropdowns = computed(() => {
			return <any>props.dropdown;
		});
		// 当前项菜单点击
		const onCurrentClick = (contextMenuClickId: number) => {
			emit('current', Object.assign({}, { contextMenuClickId }, state.item), state.conn);
		};
		// 打开右键菜单：判断是否固定，固定则不显示关闭按钮
		const openContextmenu = (item: any, conn = {}) => {
			state.item = item;
			state.conn = conn;
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
			document.body.addEventListener('contextmenu', closeContextmenu);
		});
		// 页面卸载时，移除右键菜单监听事件
		onUnmounted(() => {
			document.body.removeEventListener('click', closeContextmenu);
			document.body.removeEventListener('contextmenu', closeContextmenu);
		});
		return {
			dropdowns,
			openContextmenu,
			closeContextmenu,
			onCurrentClick,
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
