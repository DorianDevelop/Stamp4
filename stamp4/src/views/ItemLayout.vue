<template>
	<div class="container">
		<w-breadcrumbs :items="items" class="mb1" />
		<div class="topOptions">
			<SearchBar :refreshSearch="refreshSearch" :route="routeAPI + 's'" @update:selected="getValueForOne" />
			<ButtonBar
				:status="selectedId !== null"
				:displayEditBtn="showEditBtn"
				@btn:save="saveSelection"
				@btn:delete="deleteSelection"
				@btn:add="addItem"
				@btn:dup="dupItem"
			/>
		</div>
		<w-alert v-model="duplicationAlerte.show" class="actionWarning" info>
			Pensez bien à sauvegarder pour terminer la duplication.
		</w-alert>
		<w-alert v-model="creationAlerte.show" class="actionWarning" warning>
			Pensez bien à sauvegarder pour terminer la création.
		</w-alert>
		<div class="infos" v-if="selectedId !== null">
			<slot :datas="datas"></slot>
		</div>
		<ArrowIndication :mot="namePage" v-if="selectedId === null" />
	</div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import ButtonBar from '@/components/ButtonBar.vue';
import ArrowIndication from '@/components/ArrowIndication.vue';

export default {
	props: {
		routeAPI: String,
		formating: Function,
		validation: Function,
	},
	name: 'ItemLayout',
	components: {
		SearchBar,
		ButtonBar,
		ArrowIndication,
	},
	data() {
		return {
			refreshSearch: false,
			showEditBtn: true,

			selectedId: null,

			datas: {},

			validators: {
				required: (value) => !!value || 'This field is required',
			},
			duplicationAlerte: { show: false },
			creationAlerte: { show: false },

			items: [{ label: 'Home', route: '/' }],
			namePage: '',
		};
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
	},
	methods: {
		async getValueForOne(val) {
			this.creationAlerte.show = false;
			this.duplicationAlerte.show = false;
			this.showEditBtn = true;
			if (val == null) {
				this.selectedId = null;
				return;
			}

			this.selectedId = val.id;

			await axios
				.get(`http://localhost:3000${this.routeAPI}/${this.selectedId}`)
				.then((reponse) => reponse.data[0])
				.then((data) => {
					this.datas = data;
				});

			//The next 2 rows are at modify if the date is called "when" or if there's no data
			if (this.datas.date) {
				let englishDate = new Date(this.datas.date).toLocaleDateString('fr-FR');
				this.datas.date = englishDate.split('/').reverse().join('-');
			}
			if (this.datas.when) {
				let englishDate = new Date(this.datas.when).toLocaleDateString('fr-FR');
				this.datas.when = englishDate.split('/').reverse().join('-');
			}
		},
		saveSelection() {
			if (!this.validation(this.datas)) {
				this.$emit('update:validators');
				this.$waveui.notify({
					message: 'Tout les champs obligatoires ne sont pas remplies',
					timeout: 3000,
					bgColor: 'error',
					color: 'warning',
					dismiss: false,
					shadow: true,
					round: true,
					sm: true,
					icon: 'wi-cross',
				});

				return;
			}
			if (this.selectedId === -1) {
				this.creationAlerte.show = false;
				this.duplicationAlerte.show = false;
				this.showEditBtn = true;
				this.createItem();
				return;
			}
			axios.put(`http://localhost:3000${this.routeAPI}/${this.selectedId}`, this.datas).then((response) => {
				if (response.status === 200) {
					this.$waveui.notify({
						message: 'Sauvegarde reussit',
						timeout: 3000,
						bgColor: 'success',
						color: 'warning',
						dismiss: false,
						shadow: true,
						round: true,
						sm: true,
						icon: 'wi-check',
					});
				}
			});
		},
		async deleteSelection() {
			if (this.selectedId == null || this.selectedId === -1) return;
			await axios.delete(`http://localhost:3000${this.routeAPI}/${this.selectedId}`).then((response) => {
				if (response.status === 200) {
					this.$waveui.notify({
						message: 'Suppréssion reussit',
						timeout: 3000,
						bgColor: 'error',
						color: 'warning',
						dismiss: false,
						shadow: true,
						round: true,
						sm: true,
						icon: 'wi-cross',
					});
				}
			});
			this.selectedId = null;
			this.datas = [];

			this.refreshSearch = !this.refreshSearch;
		},
		addItem() {
			this.creationAlerte.show = true;
			this.duplicationAlerte.show = false;
			this.showEditBtn = false;
			this.selectedId = -1;
			this.datas = [];
		},
		dupItem() {
			this.duplicationAlerte.show = true;
			this.creationAlerte.show = false;
			this.showEditBtn = false;
			this.selectedId = -1;

			this.$waveui.notify({
				message: 'Duplication réussit',
				timeout: 3000,
				bgColor: 'success',
				color: 'warning',
				dismiss: false,
				shadow: true,
				round: true,
				sm: true,
				icon: 'wi-star',
			});
		},
		async createItem() {
			await axios.post(`http://localhost:3000${this.routeAPI}`, this.formating(this.datas)).then((response) => {
				if (response.status === 200) {
					this.$waveui.notify({
						message: 'Création reussit',
						timeout: 3000,
						bgColor: 'success',
						color: 'warning',
						dismiss: false,
						shadow: true,
						round: true,
						sm: true,
						icon: 'wi-check',
					});
				}
			});

			this.refreshSearch = !this.refreshSearch;
		},
	},
};
</script>
