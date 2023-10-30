<template>
	<div class="container">
		<div class="topOptions">
			<SearchBar :route="routeAPI + 's'" @update:selected="getValueForOne" />
			<ButtonBar :status="selectedId !== null" @btn:save="saveSelection" @btn:delete="deleteSelection" @btn:add="addItem" />
		</div>
		<div class="infos" v-if="selectedId !== null">
			<w-form class="editForm">
				<w-flex class="py2 align-start">
					<w-input type="number" label-color="red" class="mb1 xs2 pa1" label="ApcNo" v-model="datas.apcNo"> </w-input>
					<w-input type="number" label-color="red" class="mb1 xs2 pa1" label="Code" v-model="datas.code"> </w-input>
					<w-input label-color="red" class="mb1 xs5 pa1" label="Label" :validators="[validators.required]" v-model="datas.label">
					</w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 xs3 pa1" label="Function" v-model="datas.function"> </w-input>
					<w-input label-color="red" class="mb1 xs2 pa1" label="HelpF" v-model="datas.helpF"> </w-input>
					<w-input label-color="red" class="mb1 xs2 pa1" label="HelpS" v-model="datas.helpS"> </w-input>
					<w-input type="number" label-color="red" class="mb1 xs2 pa1" label="Level" v-model="datas.level"> </w-input>
					<w-input label-color="red" class="mb1 xs2 pa1" label="Module" v-model="datas.module"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-textarea
						rows="4"
						:no-autogrow="true"
						label-color="red"
						class="pa1 textAreaForm"
						label="Message Français"
						v-model="datas.msgFR"
					>
					</w-textarea>
					<w-textarea
						rows="4"
						:no-autogrow="true"
						label-color="red"
						class="pa1 textAreaForm"
						label="Message Anglais"
						v-model="datas.msgEN"
					>
					</w-textarea>
				</w-flex>

				<w-textarea label-color="red" class="pa1 textAreaForm" label="Comment" v-model="datas.comment"> </w-textarea>
			</w-form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import ButtonBar from '@/components/ButtonBar.vue';

export default {
	name: 'ErrorsPage',
	components: {
		SearchBar,
		ButtonBar,
	},
	data() {
		return {
			routeAPI: '/stamp3/error',
			routePage: '/admin/errors',

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
					code: this.datas.code,
					apcNo: this.datas.apcNo ? this.datas.apcNo : 0,
					function: this.datas.function ? this.datas.function : '',
					helpF: this.datas.helpF ? this.datas.helpF : '',
					helpS: this.datas.helpS ? this.datas.helpS : '',
					level: this.datas.level ? this.datas.level : 0,
					module: this.datas.module ? this.datas.module : '',
					msgEN: this.datas.msgEN ? this.datas.msgEN : '',
					msgFR: this.datas.msgFR ? this.datas.msgFR : '',
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
