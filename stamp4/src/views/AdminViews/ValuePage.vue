<template>
	<div class="container">
		<div class="topOptions">
			<SearchBar :route="routeAPI + 's'" @update:selected="getValueForOne" />
			<ButtonBar :status="selectedId !== null" @btn:save="saveSelection" @btn:delete="deleteSelection" @btn:add="addItem" />
		</div>
		<div class="infos" v-if="selectedId !== null">
			<w-form class="editForm">
				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 xs6 pa1" label="Label" :validators="[validators.required]" v-model="datas.label">
					</w-input>
					<w-input type="number" label-color="red" class="mb1 xs2 pa1" label="Id Famille" v-model="datas.idFamily"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 pa1" label="Type" v-model="datas.type"> </w-input>
					<w-input label-color="red" class="mb1 pa1" label="Valeur" v-model="datas.value"> </w-input>
				</w-flex>
			</w-form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import ButtonBar from '@/components/ButtonBar.vue';

export default {
	name: 'ValuePage',
	components: {
		SearchBar,
		ButtonBar,
	},
	data() {
		return {
			routeAPI: '/stamp3/value',
			routePage: '/admin/values',

			selectedId: null,

			datas: [],

			validators: {
				required: (value) => !!value || 'This field is required',
			},
		};
	},
	methods: {
		async getValueForOne(val) {
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
		},
		saveSelection() {
			if (this.selectedId === null) return;
			if (this.selectedId === -1) {
				this.createItem();
				return;
			}
			console.log('Please no');
			console.log(this.datas);
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
						icon: 'wi-star',
					});
				}
			});
		},
		async deleteSelection() {
			if (this.selectedId == null || this.selectedId === -1) return;
			await axios.delete(`http://localhost:3000${this.routeAPI}/${this.selectedId}`).then((response) => {
				console.log(response);
			});
			window.location.href = this.routePage;
		},
		addItem() {
			this.selectedId = -1;
			this.datas = [];
		},
		async createItem() {
			if (!this.datas.label) {
				return;
			}
			console.log(this.datas);
			await axios
				.post(`http://localhost:3000${this.routeAPI}`, {
					label: this.datas.label,
					idFamily: this.datas.idFamily ? this.datas.idFamily : 0,
					type: this.datas.type ? this.datas.type : '',
					value: this.datas.value ? this.datas.value : '',
				})
				.then((response) => {
					console.log(response);
				});

			window.location.href = this.routePage;
		},
	},
};
</script>
