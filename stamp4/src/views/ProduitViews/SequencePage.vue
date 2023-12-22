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
				<w-flex class="py2 align-start mb1 px1" gap="3">
					<w-input label-color="green-dark1" class="mb1 xs5 pa1" label="Label" @input="hasBeenSaved = false" :validators="[validators.required]" v-model="props.datas.label">
					</w-input>
					<div class="selects my1 ml5">
						<p>Gammes</p>
						<select @change="hasBeenSaved = false" v-model="props.datas.range">
							<option v-for="item in allGammes" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
					</div>
				</w-flex>

				<w-flex class="py2 align-start mb1 px1" gap="3">
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
				</div>
				<div class="allActions">
					<div class="action" v-for="item in allActions" :key="item.id" :value="item.id">
						<div class="title" @click="openAction(item.id)">
							<p class="actionTitle">
								<span class="order">{{ item.order }}</span>
								{{ allActionsName[item.id] }}
							</p>
							<button class="icon" :class="{ opened: allActionsState[item.id] }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
								</svg>
							</button>
						</div>
						<div v-if="allActionsState[item.id]">
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 0" v-model="item.param0"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 1" v-model="item.param1"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 2" v-model="item.param2"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 3" v-model="item.param3"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 4" v-model="item.param4"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 5" v-model="item.param5"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 6" v-model="item.param6"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 7" v-model="item.param7"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb1 px1" label="Paramètre 8" v-model="item.param8"></w-input>
							<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs12 mb4 px1" label="Paramètre 9" v-model="item.param9"></w-input>

							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="error" icon="wi-cross" @click="deleteAction(item.id)"></w-button>
								</template>
								Supprimer
							</w-tooltip>
						</div>
					</div>
				</div>

				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" @input="hasBeenSaved = false" v-model="props.datas.comment">
				</w-textarea>
			</w-form>
			<!-- UGLY CODE? Maybe, but it's responsive display ^^' -->
			<div>
				<div v-if="getAllActions(props.datas.id ? props.datas.id : -1)"></div>
				<div v-if="getAllFunctionsRelatedToTarget(NewAction.idTarget ? NewAction.idTarget : -1)"></div>
				<div v-if="getAllOrgansRelatedToFunction(NewAction.idFunc ? NewAction.idFunc : -1)"></div>
				<div v-if="getAllActionsRelatedToOrgan(NewAction.idOrgan ? NewAction.idOrgan : -1)"></div>
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
			},

			currentID: null,

			hasBeenSaved: true,
			notYetCreatedSequence: false,
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
			console.log('R');
		},
		async saveAllActions() {
			await this.allActions.forEach((action) => {
				axios
					.put('http://localhost:3000/stamp3uut/action/' + action.id, action)
					.then((response) => {
						if (response.status !== 200) {
							console.error('Error getting Name:', response.status, response.data);
						}
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			});
		},
		async getAllActions(id) {
			this.currentID = id;
			this.allActionsState = [];
			await axios
				.get('http://localhost:3000/stamp3uut/actionForStep/' + id)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allActions = data;
				});

			let max = 0;
			this.allActions.forEach((action) => {
				if (action.order > max) max = action.order;
				this.getActionName(action);
				this.allActionsState[action.id] = false;
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
				};

				await axios
					.post('http://localhost:3000/stamp3uut/action', datas)
					.then((response) => {
						if (response.status === 200) {
							this.getAllActions(this.currentID);
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
						this.getAllActions(this.currentID);
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
	color: #76c76b;
	width: 200px;
}

.selects select {
	width: 100%;
}

.order {
	width: 50px;
	color: #76c76b;
	display: block;
	text-align: center;

	border-left: 3px solid #76c76b;
	border-right: 3px solid #76c76b;

	font-weight: 800;
}

.actionTitle {
	display: flex;
	justify-content: flex-start;
	gap: 0.5rem;
	align-items: center;
}
</style>
