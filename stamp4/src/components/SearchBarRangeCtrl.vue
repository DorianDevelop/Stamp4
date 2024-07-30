<template>
	<div class="search mt5">
		<w-breadcrumbs :items="items" class="liens" />
		<v-select :options="gammeFilter" v-model="gammeChoice" @update:modelValue="filterChanged"></v-select>
		<ArrowFilter mot="une Gamme" v-if="!(gammeChoice || !showArrow) && displayArrow" class="fleche_filtre fl" />
		<v-select :options="ctrls" v-model="ctrlChoice" @update:modelValue="filterChanged"></v-select>
		<ArrowFilter mot="un Control" v-if="!(ctrlChoice || !showArrow) && displayArrow"
			class="fleche_filtre fl fleche_ctrl" />
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
			selectedCtrlFilter: null,
			selected: null,

			gammeFilter: [],
			gammeChoice: this.selectedGammeFilter,
			ctrlChoice: this.selectedCtrlFilter,

			options: [],
			choice: this.selected,

			refresh: this.refreshSearch,

			items: [{ label: 'Home', route: '/' }],
			namePage: '',

			ctrls: [
				{ id: '000', label: 'Non défini !' },
				{ id: '100', label: 'Optical Inspection' },
				{ id: '110', label: 'In Circuit Test' },
				{ id: '130', label: 'PCB Functional Test' },
				{ id: '175', label: 'Pressure/Leak Test' },
				{ id: '190', label: 'Electrical Safety Test' },
				{ id: '210', label: 'Unit Hypot Functional Test' },
				{ id: '230', label: 'Battery Test' },
				{ id: '240', label: 'Charge' },
				{ id: '250', label: 'Discharge Test' },
				{ id: '252', label: 'AQL Discharge Test' },
				{ id: '260', label: 'Battery Charge Test' },
				{ id: '280', label: 'Discharge Retest' },
				{ id: '285', label: 'Pre-Cover Inspection' },
				{ id: '300', label: 'Recharge' },
				{ id: '310', label: 'Final Test' },
				{ id: '320', label: 'Final Electrical Safety Test' },
				{ id: '340', label: 'System Config' },
				{ id: '360', label: 'Sys Final Diag Test' },
				{ id: '370', label: 'Sys Acoustic Test' },
				{ id: '390', label: 'Sys Acoustic Diag Test' },
				{ id: '400', label: 'Sys Burn-in Test' },
				{ id: '420', label: 'Sys Burn-in Diag Test' },
				{ id: '430', label: 'Pre-Box Inspection' },
				{ id: '500', label: 'Finished Product Audit' },
				{ id: '510', label: 'Japan Pre-Inspection' },
				{ id: '951', label: 'REP Clear Customer Data' },
				{ id: '952', label: 'REP Flash new revision' },
				{ id: '953', label: 'REP RIN test specifique' },
				{ id: '999', label: 'Station de dévelopement' },
			],
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

		async filterChanged() {
			let query = '';
			let showQuali = false;

			if (this.ctrlChoice !== null && this.ctrlChoice !== undefined) {
				VueCookies.set('ctrl', this.ctrlChoice, '3h');
			} else {
				VueCookies.remove('ctrl');
			}
			if (this.gammeChoice !== null && this.gammeChoice !== undefined) {
				VueCookies.set('gamme', this.gammeChoice, '3h');
			} else {
				VueCookies.remove('gamme');
			}

			if (this.gammeChoice !== null && this.gammeChoice !== undefined && (this.ctrlChoice === null || this.ctrlChoice === undefined)) {
				const id = this.gammeChoice.id;
				query = `http://localhost:3000${this.route}Filtered/${id}`;
			} else if (this.gammeChoice !== null && this.gammeChoice !== undefined && this.ctrlChoice !== null && this.ctrlChoice !== undefined) {
				const id = this.gammeChoice.id;
				const ctrl = parseInt(this.ctrlChoice.id);
				query = `http://localhost:3000${this.route}Filtered/${id}/${ctrl}`;
				showQuali = true;
			} else if ((this.gammeChoice === null || this.gammeChoice === undefined) && this.ctrlChoice !== null && this.ctrlChoice !== undefined) {
				const ctrl = parseInt(this.ctrlChoice.id);
				query = `http://localhost:3000${this.route}Filteredctrl/${ctrl}`;
				showQuali = true;
			} else {
				return;
			}
			this.selected = null;
			this.choice = this.selected;

			await axios
				.get(query)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.options = data;
				});
			if (showQuali) {
				for (let i = 0; i < this.options.length; i++) {
					this.options[i] = {
						id: this.options[i].id,
						label: this.options[i].quali == 1 ? '🟢 ' + this.options[i].label : '🔴 ' + this.options[i].label,
					};
				}
			}
		},

		loadSearch() {
			if (VueCookies.get('gamme') && VueCookies.get('gamme') !== 'null' && VueCookies.get('gamme') !== null) {
				this.gammeChoice = VueCookies.get('gamme');
			}
			if (VueCookies.get('ctrl') && VueCookies.get('ctrl') !== 'null' && VueCookies.get('ctrl') !== null) {
				this.ctrlChoice = VueCookies.get('ctrl');
			}

			window.setTimeout(() => {
				this.filterChanged();
			}, 700);
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
	top: 240px;
}

.fleche_filtre {
	left: 385px;
}

.fleche_ctrl {
	top: 117px;
}
</style>
