<template>
	<div class="search mt5">
		<w-breadcrumbs :items="items" class="liens" />
		<v-select :options="gammeFilter" v-model="gammeChoice" @update:modelValue="filterChanged"></v-select>
		<ArrowFilter mot="une Gamme" v-if="!(gammeChoice || !showArrow) && displayArrow" class="fleche_filtre fl" />
		<v-select :options="options" v-model="choice"></v-select>
		<ArrowIndication :mot="namePage" v-if="!(choice || !showArrow) && displayArrow" class="fleche fl" />
	</div>
</template>

<script>
import vSelect from 'vue-select';
import axios from 'axios';
import ArrowIndication from '@/components/ArrowIndication.vue';
import ArrowFilter from '@/components/ArrowFilter.vue';
import VueCookies from 'vue-cookies';
/*
TO DO : Ajouter filtre CTRL, chiant de ofu
*/

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
		ArrowFilter,
	},
	data() {
		return {
			showArrow: true,

			selectedGammeFilter: null,
			selected: null,

			gammeFilter: [],
			gammeChoice: this.selectedGammeFilter,

			options: [],
			choice: this.selected,

			refresh: this.refreshSearch,

			items: [{ label: 'Home', route: '/' }],
			namePage: '',
		};
	},
	created() {
		this.getGammeForFilter();
	},
	methods: {
		async getGammeForFilter() {
			await axios
				.get('http://localhost:3000/stamp3uut/gammes')
				.then((reponse) => reponse.data)
				.then((data) => {
					this.gammeFilter = data;
				});

			await axios
				.get(`http://localhost:3000${this.route}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.options = data;
				});
		},

		async filterChanged(val) {
			this.showArrow = true;
			if (!val) {
				VueCookies.remove('gamme');

				return;
			}
			this.selected = null;
			this.choice = this.selected;

			VueCookies.set('gamme', val, '3h');

			const id = val.id;
			await axios
				.get(`http://localhost:3000${this.route}Filtered/${id}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.options = data;
				});
		},

		loadSearch() {
			if (VueCookies.get('gamme') && VueCookies.get('gamme') !== 'null' && VueCookies.get('gamme') !== null) {
				this.gammeChoice = VueCookies.get('gamme');
				window.setTimeout(() => {
					this.filterChanged(this.gammeChoice);
				}, 700);
			}
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
		this.loadSearch();
	},
	watch: {
		choice(newVal) {
			this.$emit('update:selected', newVal);
		},
		refreshSearch(newVal) {
			this.options = [];
			this.selected = null;
			this.choice = this.selected;

			this.showArrow = true;
			this.loadSearch();
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

	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.fleche {
	top: 190px;
}
.fleche_filtre {
	left: 385px;
}
</style>
