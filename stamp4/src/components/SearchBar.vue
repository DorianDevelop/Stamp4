<template>
	<div class="search mt5">
		<w-breadcrumbs :items="items" class="liens" />
		<v-select :options="options" v-model="choice"></v-select>
		<ArrowIndication :mot="namePage" v-if="!(choice || !showArrow)" />
	</div>
</template>

<script>
import vSelect from 'vue-select';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import ArrowIndication from '@/components/ArrowIndication.vue';

export default {
	props: {
		route: String,
		refreshSearch: Boolean,
		newItem: Boolean,
		displayArrow: Boolean,
	},
	components: {
		vSelect,
		ArrowIndication,
	},
	data() {
		return {
			showArrow: this.displayArrow,
			options: [],
			selected: null,
			choice: this.selected,

			refresh: this.refreshSearch,

			items: [{ label: 'Home', route: '/' }],
			namePage: '',
		};
	},
	created() {
		this.getValueForSelect();
	},
	methods: {
		async getValueForSelect() {
			await axios
				.get('http://10.192.136.74:3000' + this.route)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.options = data;
				});
		},
	},
	mounted() {
		const route = this.$router.currentRoute.value.matched;

		route.forEach((r) => {
			this.items.push({
				label: r.name,
				route: r.path,
			});
		});

		this.namePage = route[route.length - 1].name;
		if (this.namePage.endsWith('s')) {
			this.namePage = this.namePage.slice(0, -1);
		}

		if (VueCookies.get('gamme') && VueCookies.get('gamme') !== 'null' && VueCookies.get('gamme') !== null && this.namePage === 'Gamme') {
			this.choice = VueCookies.get('gamme');
			this.showArrow = false;
		}
	},
	watch: {
		choice(newVal) {
			if (this.namePage === 'Gamme') {
				VueCookies.set('gamme', newVal, '3h');

				if (newVal === null) {
					VueCookies.remove('gamme');
				}
			}
			this.$emit('update:selected', newVal);
		},
		refreshSearch(newVal) {
			this.options = [];
			this.selected = null;
			this.choice = this.selected;
			this.getValueForSelect();

			this.refresh = newVal;
		},
		newItem(newVal) {
			this.showArrow = !newVal;
		},
	},
};
</script>

<style scoped>
@import 'vue-select/dist/vue-select.css';

.search {
	min-width: 340px;
	background: var(--white);
	font-size: 1rem;

	height: 32px;
}
</style>
