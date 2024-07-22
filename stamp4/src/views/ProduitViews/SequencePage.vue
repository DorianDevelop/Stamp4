<template>
	<Layout
		class="layout"
		routeAPI="/stamp3uut/step"
		:searchType="1"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input label-color="green-dark1" class="xs4" label="Label" @input="hasBeenSaved = false" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.when"> </w-input>
				</w-flex>

				<div class="addAction">
					<p class="addingLabel">Ajout d'action</p>
					<w-input label-color="green-dark1" class="xs3" label="Ordre" type="number" v-model="NewAction.No"> </w-input>

					<div class="groupOfSelect">
						<div class="selects">
							<p>Cible</p>
							<select v-model="NewAction.idTarget">
								<option v-for="item in allTargets" :key="item.id" :value="item.id">{{ item.label }}</option>
							</select>
						</div>
						<div class="selects">
							<p>Fonction</p>
							<select v-model="NewAction.idFunc">
								<option v-for="item in allFunctions" :key="item.id" :value="item.id">
									{{ item.label }}
								</option>
							</select>
						</div>
						<div class="selects">
							<p>Organ</p>
							<select v-model="NewAction.idOrgan">
								<option v-for="item in allOrgans" :key="item.id" :value="item.id">
									{{ item.label }}
								</option>
							</select>
						</div>
						<div class="selects">
							<p>Actions</p>
							<select v-model="NewAction.idAction">
								<option v-for="item in allActs" :key="item.id" :value="item.id">
									{{ item.label }}
								</option>
							</select>
						</div>
					</div>
					<div class="btns">
						<w-tooltip>
							<template #activator="{ on }">
								<w-button v-on="on" bg-color="success" icon="wi-check" @click="createNewAction(props.datas.id, props.datas.range)"></w-button>
							</template>
							Valider
						</w-tooltip>
						<w-tooltip>
							<template #activator="{ on }">
								<w-button v-on="on" bg-color="error" icon="wi-cross" @click="cancelAction"></w-button>
							</template>
							Supprimer
						</w-tooltip>
					</div>
					<div class="addParams" v-if="NewAction.idAction && addingAction">
						<w-input label-color="green-dark1" :label="addingAction.param0_fr" v-model="NewAction.param0" v-if="addingAction.type0 != null && addingAction.type0 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param1_fr" v-model="NewAction.param1" v-if="addingAction.type1 != null && addingAction.type1 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param2_fr" v-model="NewAction.param2" v-if="addingAction.type2 != null && addingAction.type2 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param3_fr" v-model="NewAction.param3" v-if="addingAction.type3 != null && addingAction.type3 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param4_fr" v-model="NewAction.param4" v-if="addingAction.type4 != null && addingAction.type4 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param5_fr" v-model="NewAction.param5" v-if="addingAction.type5 != null && addingAction.type5 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param6_fr" v-model="NewAction.param6" v-if="addingAction.type6 != null && addingAction.type6 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param7_fr" v-model="NewAction.param7" v-if="addingAction.type7 != null && addingAction.type7 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param8_fr" v-model="NewAction.param8" v-if="addingAction.type8 != null && addingAction.type8 != ''"> </w-input>
						<w-input label-color="green-dark1" :label="addingAction.param9_fr" v-model="NewAction.param9" v-if="addingAction.type9 != null && addingAction.type9 != ''"> </w-input>
					</div>
				</div>
				<w-switch color="green" v-model="newVersion" class="text-sync" label="Nouvelle affichage" v-if="false"></w-switch>
				<div class="allActions" :class="{ newVersion: newVersion, oldVersion: !newVersion }">
					<div class="action" v-for="item in allActions" :key="item.id" :value="item.id">
						<div class="title" @click="openAction(item.id)">
							<p class="actionTitle">
								<span class="order">{{ item.order }}</span>
								{{ allActionsName[item.id] }}
							</p>
							<button class="icon" :class="{ opened: allActionsState[item.id] }" v-if="newVersion">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
								</svg>
							</button>
						</div>
						<div v-if="item.infos" class="listParams">
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 0)" v-if="item.param0 && item.param0 !== ''" v-on="on">
										<p>{{ item.param0 }}</p>
									</div>
								</template>
								{{ item.infos.param0_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 1)" v-if="item.param1 && item.param1 !== ''" v-on="on">
										<p>{{ item.param1 }}</p>
									</div>
								</template>
								{{ item.infos.param1_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 2)" v-if="item.param2 && item.param2 !== ''" v-on="on">
										<p>{{ item.param2 }}</p>
									</div>
								</template>
								{{ item.infos.param2_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 3)" v-if="item.param3 && item.param3 !== ''" v-on="on">
										<p>{{ item.param3 }}</p>
									</div>
								</template>
								{{ item.infos.param3_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 4)" v-if="item.param4 && item.param4 !== ''" v-on="on">
										<p>{{ item.param4 }}</p>
									</div>
								</template>
								{{ item.infos.param4_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 5)" v-if="item.param5 && item.param5 !== ''" v-on="on">
										<p>{{ item.param5 }}</p>
									</div>
								</template>
								{{ item.infos.param5_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 6)" v-if="item.param6 && item.param6 !== ''" v-on="on">
										<p>{{ item.param6 }}</p>
									</div>
								</template>
								{{ item.infos.param6_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 7)" v-if="item.param7 && item.param7 !== ''" v-on="on">
										<p>{{ item.param7 }}</p>
									</div>
								</template>
								{{ item.infos.param7_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 8)" v-if="item.param8 && item.param8 !== ''" v-on="on">
										<p>{{ item.param8 }}</p>
									</div>
								</template>
								{{ item.infos.param8_fr }}
							</w-tooltip>
							<w-tooltip top color="white" bg-color="green">
								<template #activator="{ on }">
									<div class="selectParam" @click="openModalParam(item.id, 9)" v-if="item.param9 && item.param9 !== ''" v-on="on">
										<p>{{ item.param0 }}</p>
									</div>
								</template>
								{{ item.infos.param9_fr }}
							</w-tooltip>
							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="error" icon="wi-cross" @click="deleteAction(item.id)"></w-button>
								</template>
								Supprimer
							</w-tooltip>
						</div>
						<!-- <div v-if="allActionsState[item.id] && item.infos" class="listParams">
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param0_fr"
								v-model="item.param0"
								v-if="item.param0 && item.param0 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param1_fr"
								v-model="item.param1"
								v-if="item.param1 && item.param1 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param2_fr"
								v-model="item.param2"
								v-if="item.param2 && item.param2 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param3_fr"
								v-model="item.param3"
								v-if="item.param3 && item.param3 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param4_fr"
								v-model="item.param4"
								v-if="item.param4 && item.param4 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param5_fr"
								v-model="item.param5"
								v-if="item.param5 && item.param5 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param6_fr"
								v-model="item.param6"
								v-if="item.param6 && item.param6 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param7_fr"
								v-model="item.param7"
								v-if="item.param7 && item.param7 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb1 px1"
								:label="item.infos.param8_fr"
								v-model="item.param8"
								v-if="item.param8 && item.param8 !== ''"
							></w-input>
							<w-input
								@input="hasBeenSaved = false"
								label-color="green-dark1"
								class="xs12 mb4 px1"
								:label="item.infos.param9_fr"
								v-model="item.param9"
								v-if="item.param9 && item.param9 !== ''"
							></w-input>

							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="error" icon="wi-cross" @click="deleteAction(item.id)"></w-button>
								</template>
								Supprimer
							</w-tooltip>
						</div> -->
					</div>
				</div>

				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" @input="hasBeenSaved = false" v-model="props.datas.comment">
				</w-textarea>
				<div v-if="showInput" class="modalBackground" @click="closeModal()"></div>
				<div v-if="showInput" class="modalComposant">
					<h1 class="modalTitle">{{ selectedTitle }}</h1>
					<p class="modalSubtitle">({{ selectedSubtitle }})</p>
					<textarea type="text" v-model="selectedParam"></textarea>
					<w-button bg-color="green-dark2" lg dark @click="closeModal()"> Fermer </w-button>
				</div>
			</w-form>
			<!-- TODO : Refaire tout ? -->
			<!-- UGLY CODE? Maybe, but it's responsive display ^^' -->
			<div>
				<div v-if="getAllActions(props.selectedId ? props.selectedId : -1, props.datas.id ? props.datas.id : -1)"></div>
				<div v-if="getAllFunctionsRelatedToTarget(NewAction.idTarget ? NewAction.idTarget : -1)"></div>
				<div v-if="getAllOrgansRelatedToFunction(NewAction.idFunc ? NewAction.idFunc : -1)"></div>
				<div v-if="getAllActionsRelatedToOrgan(NewAction.idOrgan ? NewAction.idOrgan : -1)"></div>
				<div v-if="getAllParamsNecessary(NewAction.idAction ? NewAction.idAction : -1)"></div>
			</div>
		</template>
	</Layout>
</template>
<script>
import Layout from '@/views/ItemLayout.vue';
import axios from 'axios';

export default {
	components: {
		Layout,
	},
	data() {
		return {
			creationId: null,
			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},
			allGammes: [],
			allActions: [],
			allActionsName: [],
			allActionsState: [],

			allTargets: [],
			allFunctions: [],
			allOrgans: [],
			allActs: [],

			NewAction: {
				No: 50,
				idTarget: null,
				idFunc: null,
				idOrgan: null,
				idAction: null,
				param0: null,
				param1: null,
				param2: null,
				param3: null,
				param4: null,
				param5: null,
				param6: null,
				param7: null,
				param8: null,
				param9: null,
			},

			selectedParam: null,
			selectedTitle: null,
			selectedSubtitle: null,
			selectedItem: null,
			selectedParamNumber: null,
			showInput: false,

			loadIsFinished: false,

			addingAction: [],

			currentID: null,

			hasBeenSaved: true,
			notYetCreatedSequence: false,
			newVersion: false,
		};
	},
	async mounted() {
		this.cancelAction();
		await axios
			.get('http://localhost:3000/stamp3uut/gammes')
			.then((reponse) => reponse.data)
			.then((data) => {
				this.allGammes = data;
			});

		await axios
			.get('http://localhost:3000/stamp3/targets')
			.then((reponse) => reponse.data)
			.then((data) => {
				this.allTargets = data;
			});
	},
	methods: {
		createJSONItem(datas) {
			return {
				tstFunc: datas.tstFunc ? datas.tstFunc : '',
				label: datas.label,
				range: datas.range ? datas.range : null,
				date: datas.date ? datas.date : '1900-01-01',
				who: datas.who ? datas.who : '',
				comment: datas.comment ? datas.comment : '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			this.hasBeenSaved = true;
			this.saveAllActions();
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
		},
		async saveAllActions() {
			await this.allActions.forEach((action) => {
				delete action.infos;
				if (this.creationId !== null) {
					action.idStep = this.creationId;
					axios
						.post('http://localhost:3000/stamp3uut/action/', action)
						.then((response) => {
							if (response.status !== 200) {
								console.error('Error getting Name:', response.status, response.data);
							}
						})
						.catch((error) => {
							console.error('Unexpected error:', error);
						});
				} else {
					axios
						.put('http://localhost:3000/stamp3uut/action/' + action.id, action)
						.then((response) => {
							if (response.status !== 200) {
								console.error('Error getting Name:', response.status, response.data);
							}
							this.getAllActions(this.currentID ? this.currentID : -1, this.currentID);
						})
						.catch((error) => {
							console.error('Unexpected error:', error);
						});
				}
			});
		},
		async getAllActions(selectedId, id) {
			if (id !== -1) this.creationId = null;
			if (selectedId === -1) {
				axios
					.get(`http://localhost:3000/stamp3uut/findNextStepID`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.creationId = data[0].AUTO_INCREMENT;
						return false;
					});
			}
			this.currentID = id;
			this.allActionsState = [];
			await axios
				.get('http://localhost:3000/stamp3uut/actionForStep/' + id)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allActions = data;
				});

			let max = 0;
			await this.allActions.forEach((action) => {
				if (action.order > max) max = action.order;
				axios
					.get(`http://localhost:3000/stamp3/action/${action.idAction}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						action['infos'] = data[0];
					});
				this.getActionName(action);
				this.allActionsState[action.id] = true;
			});

			max += 10;
			this.NewAction.No = max;
		},
		async getActionName(action) {
			let datas = {
				idTarget: action.idTarget,
				idFunc: action.idFunc,
				idOrgan: action.idOrgan,
				idAction: action.idAction,
			};

			await axios
				.post('http://localhost:3000/stamp3/actionFullName', datas)
				.then((response) => {
					if (response.status === 200) {
						this.allActionsName[action.id] = response.data[0].label;
					} else {
						console.error('Error getting Name:', response.status, response.data);
					}
				})
				.catch((error) => {
					console.error('Unexpected error:', error);
				});
		},
		openAction(id, event) {
			if (event) {
				event.preventDefault();
			}
			this.allActionsState[id] = !this.allActionsState[id];
		},

		async getAllFunctionsRelatedToTarget(id) {
			if (id !== -1) {
				await axios
					.get(`http://localhost:3000/stamp3/functsWithTarget/${id}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.allFunctions = data;
					});
			}

			return true;
		},

		async getAllOrgansRelatedToFunction(id) {
			if (id !== -1) {
				await axios
					.get(`http://localhost:3000/stamp3/organsWithFunct/${id}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.allOrgans = data;
					});
			}

			return true;
		},
		async getAllActionsRelatedToOrgan(id) {
			if (id !== -1) {
				await axios
					.get(`http://localhost:3000/stamp3/actionsWithOrgan/${id}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.allActs = data;
					});
			}

			return true;
		},
		async getAllParamsNecessary(id) {
			if (id !== -1) {
				await axios
					.get(`http://localhost:3000/stamp3/action/${id}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.addingAction = data[0];
					});
			}

			return true;
		},

		async createNewAction(id, range) {
			if (this.NewAction.idAction != null && this.NewAction.idOrgan != null && this.NewAction.idFunc != null) {
				if (id == null || id === undefined) {
					await axios
						.get(`http://localhost:3000/stamp3uut/findNextID/`)
						.then((reponse) => reponse.data)
						.then((data) => {
							this.currentID = data[0].AUTO_INCREMENT;
						});

					this.notYetCreatedSequence = true;
				} else {
					this.currentID = id;
				}

				let datas = {
					idStep: this.currentID,
					range: range,
					order: this.NewAction.No,
					idTarget: this.NewAction.idTarget,
					idFunc: this.NewAction.idFunc,
					idOrgan: this.NewAction.idOrgan,
					idAction: this.NewAction.idAction,
					param0: this.NewAction.param0,
					param1: this.NewAction.param1,
					param2: this.NewAction.param2,
					param3: this.NewAction.param3,
					param4: this.NewAction.param4,
					param5: this.NewAction.param5,
					param6: this.NewAction.param6,
					param7: this.NewAction.param7,
					param8: this.NewAction.param8,
					param9: this.NewAction.param9,
				};

				await axios
					.post('http://localhost:3000/stamp3uut/action', datas)
					.then((response) => {
						if (response.status === 200) {
							this.getAllActions(this.currentID ? this.currentID : -1, this.currentID);
						} else {
							console.error('Error adding step:', response.status, response.data);
						}
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			}
		},
		async deleteAction(id) {
			await axios
				.delete('http://localhost:3000/stamp3uut/action/' + id)
				.then((response) => {
					if (response.status === 200) {
						this.getAllActions(this.currentID ? this.currentID : -1, this.currentID);
					} else {
						console.error('Error adding step:', response.status, response.data);
					}
				})
				.catch((error) => {
					console.error('Unexpected error:', error);
				});
		},
		cancelAction() {
			this.NewAction = {
				No: 50,
				idTarget: null,
				idFunc: null,
				idOrgan: null,
				idAction: null,
			};
		},
		openModalParam(i, j) {
			this.showInput = true;
			this.selectedItem = i;
			this.selectedParamNumber = j;
			this.selectedParam = this.allActions.find((item) => item.id === this.selectedItem)['param' + this.selectedParamNumber];
			let temp = this.allActions.find((item) => item.id === this.selectedItem).infos;
			this.selectedTitle = temp['param' + this.selectedParamNumber + '_fr'];
			this.selectedSubtitle = temp['param' + this.selectedParamNumber + '_en'];
		},
		closeModal() {
			this.allActions.find((item) => item.id === this.selectedItem)['param' + this.selectedParamNumber] = this.selectedParam;
			this.showInput = false;
		},
	},
	async beforeRouteLeave(to, from, next) {
		if (!this.hasBeenSaved) {
			if (confirm('Es-tu sur de vouloir quitter la page sans sauvegarder ?')) {
				if (this.notYetCreatedSequence) {
					await axios.delete('http://localhost:3000/stamp3uut/actionByStep/' + this.currentID).catch((error) => {
						console.error('Unexpected error:', error);
					});
				}
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

.order {
	width: 50px;
	color: #439b47;
	display: block;
	text-align: center;

	border-left: 3px solid #439b47;
	border-right: 3px solid #439b47;

	font-weight: 800;
}
/*
.newVersion .actionTitle {
	display: flex;
	justify-content: flex-start;
	gap: 0.5rem;
	align-items: center;
}

.newVersion .listParams {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
}
*/
.oldVersion .actionTitle {
	display: flex;
	justify-content: flex-start;
	gap: 0.5rem;
	align-items: center;
}

.oldVersion .listParams {
	display: flex;
	gap: 0.3rem;
	width: 80%;
}

.selectParam {
	border: 1px solid black;
	border-radius: 3px;
	padding: 0.1rem 0.4rem;
	max-width: 300px;
	overflow-x: hidden;
	cursor: pointer;
}

.modalBackground {
	z-index: 500;
	background: rgba(0, 0, 0, 0.307);
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}

.modalComposant {
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 505;
	gap: 1rem;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}

.modalComposant .modalTitle {
	color: white;
	text-shadow: black 0 0 12px;
	font-size: 2.5rem;
}

.modalComposant .modalSubtitle {
	color: white;
	text-shadow: black 0 0 12px;
	font-size: 1.5rem;
	margin-top: -1rem;
}

.modalComposant textarea {
	padding: 0.2rem 0.5rem;
	font-size: 18px;
	width: 95vw;
	height: 150px;
}
</style>
