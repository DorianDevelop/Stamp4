<template>
	<Layout
		class="layout"
		routeAPI="/stamp3uut/spec"
		:searchType="1"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input
						@input="hasBeenSaved = false"
						ref="labelInput"
						label-color="green-dark1"
						class="xs4"
						label="Label"
						:validators="[validators.required]"
						v-model="props.datas.label"
					>
					</w-input>
					<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.when"> </w-input>
					<div class="selects my1 ml5" v-if="creationId === -1">
						<p>Gammes</p>
						<select v-model="props.datas.range">
							<option v-for="item in allGammes" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
					</div>
				</w-flex>

				<div class="stepContainer">
					<div class="adding">
						<p class="addingLabel">Ajout de step</p>
						<w-input type="number" label-color="green-dark1" class="xs3" step="5" max="999" min="10" v-model="newStepNumber"></w-input>

						<v-select :options="allSteps" v-model="newStep"></v-select>

						<w-button bg-color="success" icon="wi-check" @click="addNewStep(props.datas.id)"></w-button>
					</div>
					<div class="steps" v-if="allSelectedSteps.length !== 0">
						<p class="stepsLabel">Liste des steps</p>
						<div class="step" v-for="item in allSelectedSteps" :key="item.id" :value="item.id">
							<p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									style="fill: #f87777; transform: ; msfilter: "
									@click="removeStep(item.linkId, props.datas.id)"
								>
									<path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
								</svg>
								<span v-if="item.No !== null">{{ item.No.toString().padStart(3, '0') }}</span>
								<span v-else>{{ item.No }}</span>
								<i class="inter">-</i>

								<w-tooltip top color="white" bg-color="grey-dark5">
									<template #activator="{ on }">
										<p v-on="on">{{ truncatedString(item.label) }}</p>
									</template>
									{{ item.label }}
								</w-tooltip>
							</p>
						</div>
					</div>
					<div class="steps" v-if="allSelectedSteps.length === 0">
						<p class="stepsLabel">Liste des steps</p>
						<p class="nothing">Pas de steps renseigné</p>
					</div>
				</div>

				<w-textarea @input="hasBeenSaved = false" rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment">
				</w-textarea>
			</w-form>
			<!-- UGLY CODE? Maybe, but it's responsive display ^^' -->
			<div>
				<div v-if="getAllStepOfSpec(props.selectedId ? props.selectedId : -1, props.datas.id ? props.datas.id : -1)"></div>
				<div v-if="getAllStepOfRange(props.datas.range ? props.datas.range : -1)"></div>
			</div>
		</template>
	</Layout>
</template>
<script>
import vSelect from 'vue-select';
import Layout from '@/views/ItemLayout.vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
	components: {
		Layout,
		vSelect,
	},
	data() {
		return {
			creationId: null,
			selectedId: null,

			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},
			allSelectedSteps: [],
			allSteps: [],
			newStep: null,
			newStepNumber: 10,
			allGammes: [],

			hasBeenSaved: true,
		};
	},
	async mounted() {
		await axios
			.get('http://10.192.136.74:3000/stamp3uut/gammes')
			.then((reponse) => reponse.data)
			.then((data) => {
				this.allGammes = data;
			});
	},
	methods: {
		truncatedString(str) {
			let truncatedStr = str.substring(0, 25);
			if (str.length > 25) {
				truncatedStr += '..';
			}
			return truncatedStr;
		},
		createJSONItem(datas) {
			return {
				label: datas.label,
				range: datas.range || null,
				ctrl: VueCookies.get('ctrl') ? VueCookies.get('ctrl').id : 0,
				replay: datas.replay ? datas.replay : 0,
				date: datas.when ? datas.when : '1900-01-01',
				who: datas.who ? datas.who : '',
				comment: datas.comment ? datas.comment : '',
			};
		},
		async getAllStepOfSpec(selectedId, id) {
			if (id !== -1) this.creationId = null;
			this.selectedId = selectedId;
			if (selectedId === -1) {
				axios
					.get(`http://10.192.136.74:3000/stamp3uut/findNextSpecID`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.creationId = data[0].AUTO_INCREMENT;
						return false;
					});
			}
			if (id !== -1) {
				await axios
					.get(`http://10.192.136.74:3000/stamp3uut/stepForSpec/${id}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.allSelectedSteps = data;
					});
			}
			return true;
		},
		async getAllStepOfRange(id) {
			if (id === -1 && VueCookies.get('gamme')) {
				id = VueCookies.get('gamme').id;
			}
			if (id !== -1) {
				await axios
					.get(`http://10.192.136.74:3000/stamp3uut/stepForGamme/${id}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.allSteps = data;
					});
				this.newStep = this.allSteps[0];
			}

			return true;
		},
		async addNewStep(idSpec) {
			if (!idSpec && this.creationId !== null) {
				idSpec = this.creationId;
			}
			if (idSpec !== -1 && idSpec && this.newStep) {
				let datas = {
					idMain: idSpec,
					idLink: this.newStep.id,
					No: this.newStepNumber !== 0 ? this.newStepNumber : 1,
				};
				await axios
					.post('http://10.192.136.74:3000/stamp3uut/stepForSpec', datas)
					.then((response) => {
						if (response.status === 200) {
							this.getAllStepOfSpec(this.creationId ? this.creationId : -1, idSpec);
							console.log('Success', response.status, response.data);
						} else {
							console.error('Error adding step:', response.status, response.data);
						}
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			}
		},
		removeStep(idLink, idSpec) {
			axios
				.delete('http://10.192.136.74:3000/stamp3uut/stepForSpec/' + idLink)
				.then((response) => {
					if (response.status === 200) {
						this.getAllStepOfSpec(this.creationId ? this.creationId : -1, idSpec);
					} else {
						console.error('Error adding step:', response.status, response.data);
					}
				})
				.catch((error) => {
					console.error('Unexpected error:', error);
				});
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			this.saveAllStep();
			this.hasBeenSaved = true;
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
		},
		async saveAllStep() {
			if (this.creationId !== null) {
				await this.allSelectedSteps.forEach((step) => {
					let datas = {
						idMain: this.creationId,
						idLink: step.id,
						No: step.No,
					};
					axios
						.post('http://10.192.136.74:3000/stamp3uut/stepForSpec', datas)
						.then((response) => {
							if (response.status === 200) {
								this.getAllStepOfSpec(this.creationId, -1);
							} else {
								console.error('Error adding step:', response.status, response.data);
							}
						})
						.catch((error) => {
							console.error('Unexpected error:', error);
						});
				});
			}
		},
	},
	async beforeRouteLeave(to, from, next) {
		if (!this.hasBeenSaved) {
			if (confirm('Es-tu sur de vouloir quitter la page sans sauvegarder ?')) {
				next();
			} else {
				next(false);
			}
		} else {
			next();
		}
	},
};
</script>
<style scoped>
.selects {
	color: #439b47;
	width: 200px;
}

.selects select {
	width: 100%;
}
</style>
