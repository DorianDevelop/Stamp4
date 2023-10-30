<template>
	<div class="container">
		<div class="topOptions">
			<SearchBar :route="routeAPI" @update:selected="getValueForOne" />
			<ButtonBar :status="selectedId !== null" @btn:save="saveSelection" @btn:delete="deleteSelection" @btn:add="addItem" />
		</div>
		<div class="infos" v-if="selectedId !== null">
			<w-form class="editForm">
				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 xs5 pa1" label="Label" :validators="[validators.required]" v-model="datas.label">
					</w-input>
					<w-input label-color="red" class="mb1 xs4 pa1" label="Host" :validators="[validators.required]" v-model="datas.host">
					</w-input>
					<w-input label-color="red" class="mb1 xs4 pa1" label="Service" v-model="datas.service"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 xs6 pa1" label="Email" v-model="datas.email"> </w-input>
					<w-input label-color="red" class="mb1 xs3 pa1" label="Créateur" v-model="datas.who"> </w-input>
					<w-input label-color="red" class="mb1 xs3 pa1" label="Date" type="date" v-model="datas.date"> </w-input>
				</w-flex>

				<w-textarea
					rows="4"
					:no-autogrow="true"
					label-color="red"
					class="pa1 textAreaForm"
					label="Comment"
					v-model="datas.comment"
				>
				</w-textarea>
			</w-form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import ButtonBar from '@/components/ButtonBar.vue';

export default {
	name: 'TEPage',
	components: {
		SearchBar,
		ButtonBar,
	},
	data() {
		return {
			routeAPI: '/stamp3/te',
			routePage: '/admin/te',

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

			//The next 2 rows are at modify if the date is called "when" or if there's no data
			let englishDate = new Date(this.datas.date).toLocaleDateString('fr-FR');
			this.datas.date = englishDate.split('/').reverse().join('-');
		},
		saveSelection() {
			if (this.selectedId === null) return;
			if (this.selectedId === -1) {
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

			await axios
				.post(`http://localhost:3000${this.routeAPI}`, {
					label: this.datas.label,
					host: this.datas.host,
					email: this.datas.email ? this.datas.email : '',
					service: this.datas.service ? this.datas.service : '',
					date: this.datas.date ? this.datas.date : '1900-01-01',
					who: this.datas.who ? this.datas.who : '',
					comment: this.datas.comment ? this.datas.comment : '',
				})
				.then((response) => {
					console.log(response);
				});

			window.location.href = this.routePage;
		},
	},
};
</script>
