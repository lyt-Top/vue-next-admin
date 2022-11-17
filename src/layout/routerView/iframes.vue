<template>
	<div class="layout-padding layout-padding-unset layout-iframe">
		<div class="layout-padding-auto layout-padding-view">
			<div class="w100" v-for="v in setIframeList" :key="v.path" v-loading="v.meta.loading" element-loading-background="white">
				<transition-group :name="name" mode="out-in">
					<iframe
						:src="v.meta.isLink"
						:key="v.path"
						frameborder="0"
						height="100%"
						width="100%"
						style="position: absolute"
						:data-url="v.path"
						v-show="getRoutePath === v.path"
						ref="iframeRef"
					/>
				</transition-group>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'layoutIframeView',
	props: {
		refreshKey: {
			type: String,
			default: () => '',
		},
		name: {
			type: String,
			default: () => 'slide-right',
		},
		list: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const iframeRef = ref();
		const route = useRoute();
		// 处理 list 列表，当打开时，才进行加载
		const setIframeList = computed(() => {
			return (<any>props.list).filter((v: any) => v.meta.isIframeOpen);
		});
		// 获取 iframe 当前路由 path
		const getRoutePath = computed(() => {
			return route.path;
		});
		// 关闭 iframe loading
		const closeIframeLoading = (val: string, item: any) => {
			nextTick(() => {
				if (!iframeRef.value) return false;
				iframeRef.value.forEach((v: any) => {
					if (v.dataset.url === val) {
						v.onload = () => {
							if (item.meta.isIframeOpen && item.meta.loading) item.meta.loading = false;
						};
					}
				});
			});
		};
		// 监听路由变化，初始化 iframe 数据，防止多个 iframe 时，切换不生效
		watch(
			() => route.fullPath,
			(val) => {
				const item: any = props.list.find((v: any) => v.path === val);
				if (!item) return false;
				if (!item.meta.isIframeOpen) item.meta.isIframeOpen = true;
				closeIframeLoading(val, item);
			},
			{
				immediate: true,
			}
		);
		// 监听 iframe refreshKey 变化，用于 tagsview 右键菜单刷新
		watch(
			() => props.refreshKey,
			() => {
				const item: any = props.list.find((v: any) => v.path === route.path);
				if (!item) return false;
				if (item.meta.isIframeOpen) item.meta.isIframeOpen = false;
				setTimeout(() => {
					item.meta.isIframeOpen = true;
					item.meta.loading = true;
					closeIframeLoading(route.fullPath, item);
				});
			},
			{
				deep: true,
			}
		);
		return {
			iframeRef,
			setIframeList,
			getRoutePath,
		};
	},
});
</script>
