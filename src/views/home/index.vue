<template>
	<div class="home">
		<h1>This is an about {{ text }}</h1>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('home');
</script>
