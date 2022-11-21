<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';
import { judementSameArr } from '/@/utils/arrayOperation';

const props = defineProps({
	value: {
		type: Array,
		default: () => [],
	},
});

const stores = useUserInfo();
const { userInfos } = storeToRefs(stores);

// 获取 pinia 中的用户权限
const getUserAuthBtnList = computed(() => {
	return judementSameArr(props.value, userInfos.value.authBtnList);
});
</script>
