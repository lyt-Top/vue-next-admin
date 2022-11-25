<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';

export default defineComponent({
	name: 'auths',
	props: {
		value: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const stores = useUserInfo();
		const { userInfos } = storeToRefs(stores);
		// 获取 vuex 中的用户权限
		const getUserAuthBtnList = computed(() => {
			let flag = false;
			userInfos.value.authBtnList.map((val: string) => {
				props.value.map((v) => {
					if (val === v) flag = true;
				});
			});
			return flag;
		});
		return {
			getUserAuthBtnList,
		};
	},
});
</script>
