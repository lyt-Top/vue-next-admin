<template>
	<div>
		<transition name="el-zoom-in-center">
			<ul
				class="el-dropdown-menu el-popper el-dropdown-menu--medium custom-contextmenu"
				:style="`top: ${this.dropdown.y}px;left: ${this.dropdown.x}px;`"
				x-placement="bottom-end"
				id="contextmenu"
				v-show="isShow"
			>
				<li class="el-dropdown-menu__item" v-for="(v, k) in dropdownList" :key="k" @click="onCurrentContextmenuClick(v.id)">
					<template v-if="!v.affix">
						<i :class="v.icon"></i>
						<span>{{ $t(v.txt) }}</span>
					</template>
				</li>
				<div x-arrow class="popper__arrow" style="left: 5px"></div>
			</ul>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'layoutTagsViewContextmenu',
	props: {
		dropdown: {
			type: Object,
		},
	},
	data() {
		return {
			isShow: false,
			dropdownList: [
				{ id: 0, txt: 'message.tagsView.refresh', affix: false, icon: 'el-icon-refresh-right' },
				{ id: 1, txt: 'message.tagsView.close', affix: false, icon: 'el-icon-close' },
				{ id: 2, txt: 'message.tagsView.closeOther', affix: false, icon: 'el-icon-circle-close' },
				{ id: 3, txt: 'message.tagsView.closeAll', affix: false, icon: 'el-icon-folder-delete' },
			],
			path: {},
		};
	},
	mounted() {
		// 监听页面监听进行右键菜单的关闭
		document.body.addEventListener('click', this.closeContextmenu);
	},
	methods: {
		// 当前项菜单点击
		onCurrentContextmenuClick(id) {
			this.$emit('currentContextmenuClick', { id, path: this.path });
		},
		// 打开右键菜单：判断是否固定，固定则不显示关闭按钮
		openContextmenu(item) {
			this.path = item.path;
			item.meta.isAffix ? (this.dropdownList[1].affix = true) : (this.dropdownList[1].affix = false);
			this.closeContextmenu();
			setTimeout(() => {
				this.isShow = true;
			}, 80);
		},
		// 关闭右键菜单
		closeContextmenu() {
			this.isShow = false;
		},
	},
	destroyed() {
		// 页面卸载时，移除右键菜单监听事件
		document.body.removeEventListener('click', this.closeContextmenu);
	},
};
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
