<template>
	<div class="home">
		<h1>This is an about {{ text }}</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue';
export default defineComponent({
	name: 'about',
	setup() {
		const state = reactive({
			text: 'about',
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
