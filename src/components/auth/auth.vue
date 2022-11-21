<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';

const props = defineProps({
	value: {
		type: String,
		default: () => '',
	},
});

const stores = useUserInfo();
const { userInfos } = storeToRefs(stores);

// 获取 pinia 中的用户权限
const getUserAuthBtnList = computed(() => {
	return userInfos.value.authBtnList.some((v: string) => v === props.value);
});
</script>
