<template>
	<div id="app">
		<HorizontalNav />
		<router-view></router-view>
	</div>
</template>

<script>
import HorizontalNav from '@/components/HorizontalNav.vue';

export default {
	name: 'App',
	components: {
		HorizontalNav,
	},
};
</script>
