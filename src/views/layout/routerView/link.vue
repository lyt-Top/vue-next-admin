<template>
	<div class="layout-scrollbar">
		<div class="layout-view-bg-white flex layout-view-link">
			<a :href="meta.isLink" target="_blank" class="flex-margin">{{ meta.title }}：{{ meta.isLink }}</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'layoutLinkView',
	props: {
		meta: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
