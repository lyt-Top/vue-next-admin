<template>
	<template v-for="val in chils">
		<el-sub-menu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
			<template #title>
				<SvgIcon :name="val.meta.icon" />
				<span>{{ $t(val.meta.title) }}</span>
			</template>
			<sub-item :chil="val.children" />
		</el-sub-menu>
		<template v-else>
			<el-menu-item :index="val.path" :key="val.path">
				<template v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
					<SvgIcon :name="val.meta.icon" />
					<span>{{ $t(val.meta.title) }}</span>
				</template>
				<template v-else>
					<a class="w100" @click.prevent="onALinkClick(val)">
						<SvgIcon :name="val.meta.icon" />
						{{ $t(val.meta.title) }}
					</a>
				</template>
			</el-menu-item>
		</template>
	</template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { verifyUrl } from '/@/utils/toolsValidate';

export default defineComponent({
	name: 'navMenuSubItem',
	props: {
		chil: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const router = useRouter();
		// 获取父级菜单数据
		const chils = computed(() => {
			return <any>props.chil;
		});
		// 打开外部链接
		const onALinkClick = (val: any) => {
			const { origin, pathname } = window.location;
			router.push(val.path);
			if (verifyUrl(val.meta.isLink)) window.open(val.meta.isLink);
			else window.open(`${origin}${pathname}#${val.meta.isLink}`);
		};
		return {
			chils,
			onALinkClick,
		};
	},
});
</script>
