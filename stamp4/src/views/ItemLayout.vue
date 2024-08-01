<template>
	<div class="container">

		<LoadingIndicator ref="loadingComponent" :duration="loadingDuration" />
		<div class="topOptions">
			<SearchBar v-if="searchBar === 0" :newItem="newItemCreated" :refreshSearch="refreshSearch"
				:route="routeAPI + 's'" @update:selected="getValueForOne" :displayArrow="showArrow" />
			<SearchBarRange :displayArrow="showArrow" v-else-if="searchBar === 1" :newItem="newItemCreated"
				:refreshSearch="refreshSearch" :route="routeAPI + 's'" @update:selected="getValueForOne" />
			<SearchBarRangeCtrl :displayArrow="showArrow" v-else-if="searchBar === 2" :newItem="newItemCreated"
				:refreshSearch="refreshSearch" :route="routeAPI + 's'" @update:selected="getValueForOne" />
			<ButtonBar v-if="showBtns" :status="selectedId !== null" :displayEditBtn="showEditBtn"
				@btn:save="saveSelection" @btn:delete="deleteSelection" @btn:add="addItem" @btn:dup="dupItem" />
		</div>
		<w-alert v-model="duplicationAlerte.show" class="actionWarning" info> Pensez bien à sauvegarder pour terminer la
			duplication. </w-alert>
		<w-alert v-model="creationAlerte.show" class="actionWarning" warning> Sauvegarder les informations principales,
			afin de pouvoir ajouter des paramètres. </w-alert>
		<div class="infos" v-if="selectedId !== null">
			<slot :datas="datas" :selectedId="selectedId"></slot>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import SearchBarRange from '@/components/SearchBarRange.vue';
import ButtonBar from '@/components/ButtonBar.vue';
import SearchBarRangeCtrl from '@/components/SearchBarRangeCtrl.vue';

import LoadingIndicator from '@/components/LoadingIndicator.vue';
export default {
	props: {
		routeAPI: String,
		formating: Function,
		validation: Function,
		searchType: Number,
		showBtns: Boolean,
	},
	name: 'ItemLayout',
	components: {
		SearchBarRangeCtrl,
		SearchBarRange,
		SearchBar,
		ButtonBar,
		LoadingIndicator,
	},
	data() {
		return {
			loadingDuration: 1000,

			showArrow: true,
			refreshSearch: false,
			showEditBtn: true,

			selectedId: null,

			datas: {},

			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},
			duplicationAlerte: { show: false },
			creationAlerte: { show: false },

			searchBar: this.searchType,

			newItemCreated: false,
		};
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
			if (this.datas.dateStart) {
				let englishDate = new Date(this.datas.dateStart).toLocaleDateString('fr-FR');
				this.datas.dateStart = englishDate.split('/').reverse().join('-');
			}
			if (this.datas.dateEnd) {
				let englishDate = new Date(this.datas.dateEnd).toLocaleDateString('fr-FR');
				this.datas.dateEnd = englishDate.split('/').reverse().join('-');
			}
		},
		saveSelection() {

			this.loadingDuration = 2000
			this.$refs.loadingComponent.startLoading();

			let valid = this.validation(this.datas);
			if (valid === false || valid === 'Pas les droits') {
				if (valid === 'Pas les droits') return;
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

			if (!this.isValidDateFormat(this.datas.date) && this.datas.date !== undefined) {
				this.datas.date = '2024-01-01';
			}
			if (!this.isValidDateFormat(this.datas.when) && this.datas.when !== undefined) {
				this.datas.when = '2024-01-01';
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

			this.loadingDuration = 500
			this.$refs.loadingComponent.startLoading();

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
			this.loadingDuration = 500
			this.$refs.loadingComponent.startLoading();


			this.newItemCreated = true;

			this.creationAlerte.show = true;
			this.duplicationAlerte.show = false;
			this.showEditBtn = false;
			this.selectedId = -1;
			this.datas = [];
		},
		dupItem() {
			this.loadingDuration = 500
			this.$refs.loadingComponent.startLoading();

			this.duplicationAlerte.show = true;
			this.creationAlerte.show = false;
			this.showEditBtn = false;
			this.datas.label + ' - copie';
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
			this.loadingDuration = 3000
			if (this.routeAPI === "/stamp3drv/protocol")
				this.loadingDuration = 5000
			this.$refs.loadingComponent.startLoading();

			if (!this.isValidDateFormat(this.datas.date)) {
				this.datas.date = '2024-01-01';
			}
			if (!this.isValidDateFormat(this.datas.when)) {
				this.datas.when = '2024-01-01';
			}
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

		isValidDateFormat(dateString) {
			const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
			return dateRegex.test(dateString);
		},
	},
};
</script>
