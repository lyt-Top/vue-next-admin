<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '/@/store/index';
export default defineComponent({
	name: 'auth',
	props: {
		value: {
			type: String,
			default: () => '',
		},
	},
	setup(props) {
		const store = useStore();
		// 获取 vuex 中的用户权限
		const getUserAuthBtnList = computed(() => {
			return store.state.userInfos.userInfos.authBtnList.some((v: string) => v === props.value);
		});
		return {
			getUserAuthBtnList,
		};
	},
});
</script>
