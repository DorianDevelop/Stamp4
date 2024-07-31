<template>
	<Layout
		class="layout"
		routeAPI="/stamp3ate/plug"
		:searchType="0"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input ref="labelInput" label-color="green-dark1" class="xs3" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.when"> </w-input>
				</w-flex>

				<div class="controllerHeads" v-if="loadedId !== -1">
					<div class="Heads" :class="{ selected: controllerChoice === 1 }" @click="controllerChoice = 1">
						<p>Drivers</p>
					</div>
					<div class="Heads" :class="{ selected: controllerChoice === 0 }" @click="controllerChoice = 0">
						<p>Actions</p>
					</div>
				</div>
				<div class="controllerContainer" v-if="controllerChoice === 1 && loadedId !== -1">
					<div class="controllerAdding">
						<w-flex class="py2 mt2 align-end mb1 px1" gap="3">
							<w-input label-color="green-dark1" class="xs1" label="Ordre" v-model="newDriver.order"> </w-input>

							<div class="selects_valid">
								<p>Validate</p>
								<select v-model="newDriver.valid">
									<option :value="1">Yes</option>
									<option :value="0">No</option>
								</select>
							</div>
							<w-input label-color="green-dark1" class="xs3" label="Plug-in ID" v-model="newDriver.label"> </w-input>

							<w-input label-color="green-dark1" class="xs3" label="Inst ID" v-model="newDriver.instID"> </w-input>
							<w-input label-color="green-dark1" class="xs3" label="Protocol" v-model="newDriver.protocol"> </w-input>
						</w-flex>
						<w-flex class="py2 align-end mb1 px1" gap="3">
							<w-input label-color="green-dark1" class="xs3" label="LabVIEW plug-in" v-model="newDriver.driver"> </w-input>
							<w-input label-color="green-dark1" class="xs3" label="Wizard" v-model="newDriver.wizard"> </w-input>
						</w-flex>
						<w-flex class="py2 align-end mb1 px1" gap="3">
							<w-input label-color="green-dark1" class="xs3" label="Initialization" v-model="newDriver.init"> </w-input>
							<w-input label-color="green-dark1" class="xs3" label="C++ plug-in" v-model="newDriver.driverDll"> </w-input>
						</w-flex>
						<div class="btns">
							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="success" icon="wi-check" @click="saveActionOrDriver(newDriver, -1, 1)"></w-button>
								</template>
								Ajouter
							</w-tooltip>
							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="error" icon="wi-cross" @click="cancelAdding(1)"></w-button>
								</template>
								Annuler
							</w-tooltip>
						</div>
					</div>
					<div class="separator"></div>
					<div class="controllerContent">
						<div v-for="driver in allDrivers" :key="driver.id" class="driver_action">
							<w-flex class="py2 mt2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs1" label="Ordre" v-model="driver.order" @change="addInChangedList(driver.id)"> </w-input>

								<div class="selects_valid">
									<p>Validate</p>
									<select v-model="driver.valid" @change="addInChangedList(driver.id)">
										<option :value="1">Yes</option>
										<option :value="0">No</option>
									</select>
								</div>
								<w-input label-color="green-dark1" class="xs4" label="Plug-in ID" v-model="driver.label" @change="addInChangedList(driver.id)"> </w-input>

								<w-input label-color="green-dark1" class="xs4" label="Inst ID" v-model="driver.instID" @change="addInChangedList(driver.id)"> </w-input>
								<w-input label-color="green-dark1" class="xs4" label="Protocol" v-model="driver.protocol" @change="addInChangedList(driver.id)"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="LabVIEW plug-in" v-model="driver.driver" @change="addInChangedList(driver.id)"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="Wizard" v-model="driver.wizard" @change="addInChangedList(driver.id)"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="Initialization" v-model="driver.init" @change="addInChangedList(driver.id)"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="C++ plug-in" v-model="driver.driverDll" @change="addInChangedList(driver.id)"> </w-input>
							</w-flex>

							<w-tooltip>
								<template #activator="{ on }">
									<w-button class="deleteBTN" v-on="on" bg-color="error" icon="wi-cross" @click="deleteActionOrDriver(driver.id, 1)"></w-button>
								</template>
								Supprimer
							</w-tooltip>
						</div>
					</div>
				</div>
				<div class="controllerContainer" v-if="controllerChoice === 0 && loadedId !== -1">
					<div class="controllerAdding">
						<w-flex class="py2 align-end mb1 px1" gap="3">
							<w-input label-color="green-dark1" class="xs1" label="Ordre" v-model="newAction.order"> </w-input>
							<w-input label-color="green-dark1" class="xs4" label="Label" v-model="newAction.label"> </w-input>
							<div class="selects">
								<p>Driver</p>
								<select v-model="newAction.idDriver">
									<option v-for="driver in allDrivers" :key="driver.id" :value="driver.id">
										{{ driver.label }}
									</option>
								</select>
							</div>
							<w-input label-color="green-dark1" class="xs4" label="Information" v-model="newAction.info"> </w-input>
						</w-flex>
						<w-flex class="py2 align-end mb2 px1" gap="3">
							<w-input label-color="green-dark1" class="xs6" label="Commande SCPI" v-model="newAction.scpi"> </w-input>
						</w-flex>
						<div class="btns">
							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="success" icon="wi-check" @click="saveActionOrDriver(newAction, -1, 0)"></w-button>
								</template>
								Ajouter
							</w-tooltip>
							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="error" icon="wi-cross" @click="cancelAdding(0)"></w-button>
								</template>
								Annuler
							</w-tooltip>
						</div>
					</div>
					<div class="separator"></div>
					<div class="controllerHeaders">
						<div class="Category targets">
							<div class="Heads" v-for="head in allTargets" :key="head.id" @click="selectHeader(0, head)" :class="{ selected: selected.target === head }">
								<p>{{ head.label }}</p>
							</div>
						</div>
						<div class="Category functs" v-if="selected.target !== null">
							<div class="Heads FunctsHead" v-for="head in allFunctions" :key="head.id" @click="selectHeader(1, head)" :class="{ selected: selected.funct === head }">
								<p>{{ head.label }}</p>
							</div>
						</div>
						<div class="Category organs" v-if="selected.funct !== null">
							<div class="Heads OrgansHead" v-for="head in allOrgans" :key="head.id" @click="selectHeader(2, head)" :class="{ selected: selected.organ === head }">
								<p>{{ head.label }}</p>
							</div>
						</div>
						<div class="Category actions" v-if="selected.organ !== null">
							<div class="Heads ActionsHead" v-for="head in allActs" :key="head.id" @click="selectHeader(3, head)" :class="{ selected: selected.action === head }">
								<p>{{ head.label }}</p>
							</div>
						</div>
					</div>
					<div class="controllerContent" v-if="IdsToLoad.length > 0">
						<div v-for="act in filteredActions" :key="act.id" class="driver_action">
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs1" label="Ordre" v-model="act.order" @change="addInActChangedList(act.id)"> </w-input>
								<w-input label-color="green-dark1" class="xs4" label="Label" v-model="act.label" @change="addInActChangedList(act.id)"> </w-input>
								<div class="selects">
									<p>Driver</p>
									<select v-model="act.idDriver" @change="addInActChangedList(act.id)">
										<option v-for="driver in allDrivers" :key="driver.id" :value="driver.id">
											{{ driver.label }}
										</option>
									</select>
								</div>
								<w-input label-color="green-dark1" class="xs4" label="Information" v-model="act.info" @change="addInActChangedList(act.id)"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb2 px1" gap="3">
								<w-input label-color="green-dark1" class="xs6" label="Commande SCPI" v-model="act.scpi" @change="addInActChangedList(act.id)"> </w-input>
							</w-flex>

							<w-tooltip>
								<template #activator="{ on }">
									<w-button class="deleteBTN" v-on="on" bg-color="error" icon="wi-cross" @click="deleteActionOrDriver(act.id, 0)"></w-button>
								</template>
								Supprimer
							</w-tooltip>
						</div>
					</div>
				</div>
				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
			<div>
				<div v-if="getAllDriversAndActionOfPlugins(props.selectedId ? props.selectedId : -1, props.datas.id ? props.datas.id : -1)"></div>
			</div>
			<div class="saveAll" v-if="loadedId !== null && loadedId !== -1">
				<p>Activer la sauvegarde générale</p>
				<w-switch class="saveAllSwitch" v-model="saveAll" color="red"></w-switch>
			</div>
		</template>
	</Layout>
</template>
<script>
import axios from 'axios';
import Layout from '@/views/ItemLayout.vue';
export default {
	components: {
		Layout,
	},
	data() {
		return {
			loadedId: null,
			duppId: null,
			creationId: null,
			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},

			controllerChoice: 1,

			allDrivers: [],
			allActions: [],
			IdsToLoad: [],

			allTargets: [],
			allFunctions: [],
			allOrgans: [],
			allActs: [],

			selected: {
				target: null,
				funct: null,
				organ: null,
				action: null,
			},

			newAction: {
				target: '',
				funct: '',
				organ: '',
				action: '',
				order: 0,
				label: '',
				idDriver: null,
				info: '',
				scpi: '',
			},

			newDriver: {
				order: 0,
				valid: 1,
				label: '',
				instID: '',
				protocol: '',
				driver: '',
				driverDll: '',
				wizard: '',
				init: '',
			},

			allDrvChanged: [],
			allActChanged: [],
			saveAll: true,
		};
	},
	async mounted() {
		await axios
			.get('http://10.192.136.74:3000/stamp3/targets')
			.then((reponse) => reponse.data)
			.then((data) => {
				this.allTargets = data;
				this.selected.target = data[0];
			});
		this.getAllFunctionsRelatedToTarget(this.selected.target.id);
	},
	watch: {
		'selected.target': function (newTarget) {
			this.getAllFunctionsRelatedToTarget(newTarget.id);
		},
		'selected.funct': function (newFunc) {
			this.getAllOrgansRelatedToFunction(newFunc.id);
		},
		'selected.organ': function (newOrgan) {
			this.getAllActionsRelatedToOrgan(newOrgan.id);
		},
	},
	computed: {
		filteredActions() {
			return this.allActions.filter((act) => this.IdsToLoad.includes(act.id));
		},
	},
	methods: {
		createJSONItem(datas) {
			return {
				label: datas.label || '',
				when: datas.when || '1900-01-01',
				who: datas.who || '',
				comment: datas.comment || '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			if (this.saveAll) this.saveAllDatas();

			if (this.creationId !== null) {
				this.createDefaultDriver();
			}
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
		},
		async getAllDriversAndActionOfPlugins(selectedId, id) {
			this.loadedId = id;
			this.allActChanged = [];
			this.allDrvChanged = [];
			this.allDrivers = [];
			this.allActions = [];
			this.cancelAdding(0);
			this.cancelAdding(1);

			this.duppId = null;
			this.creationId = null;

			if (selectedId === -1 && id === -1) {
				axios
					.get(`http://10.192.136.74:3000/stamp3ate/findNextPlugID`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.creationId = data[0].AUTO_INCREMENT;
						return false;
					});
			}

			if (id === null || id === -1) return false;

			await axios
				.get(`http://10.192.136.74:3000/stamp3ate/driversForPlug/${id}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allDrivers = data;
					this.newAction.idDriver = this.allDrivers[0].id;
					let lastOrder = 0;
					data.forEach((e) => {
						if (e.order > lastOrder) lastOrder = e.order;
					});
					this.newDriver.order = lastOrder + 1;
				});
			await axios
				.get(`http://10.192.136.74:3000/stamp3ate/actionsForPlug/${id}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allActions = data;
					//this.findIdActionToLoad();
				});

			if (selectedId === -1 && id !== -1 && id !== null) {
				axios
					.get(`http://10.192.136.74:3000/stamp3ate/findNextPlugID`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.duppId = data[0].AUTO_INCREMENT;
						return true;
					});
			} else {
				return true;
			}
		},
		selectHeader(index, header) {
			switch (index) {
				case 0:
					this.selected.target = header;
					break;
				case 1:
					this.selected.funct = header;
					break;
				case 2:
					this.selected.organ = header;
					break;
				case 3:
					this.selected.action = header;
					break;

				default:
					break;
			}
			this.findIdActionToLoad();
		},
		findIdActionToLoad() {
			//if (this.selected.target === null || this.selected.organ === null || this.selected.funct === null || this.selected.action === null) return;
			let allActToLoad = this.allActions.filter(
				(x) => x.target === this.selected.target.label && x.organ === this.selected.organ.label && x.funct === this.selected.funct.label && x.action === this.selected.action.label
			);
			this.IdsToLoad = [];
			let lastOrder = 0;
			allActToLoad.forEach((e) => {
				if (e.order > lastOrder) lastOrder = e.order;
				this.IdsToLoad.push(e.id);
			});
			this.newAction.order = parseInt(lastOrder) + 1;
		},
		addInChangedList(id) {
			if (!this.allDrvChanged.includes(id)) {
				this.allDrvChanged.push(id);
			}
		},
		addInActChangedList(id) {
			if (!this.allActChanged.includes(id)) {
				this.allActChanged.push(id);
			}
		},
		saveActionOrDriver(obj, i, type) {
			if (this.loadedId === undefined || this.loadedId === null || i === undefined || i === null) return;

			let create = false;
			if (this.duppId !== null || i === -1) create = true;

			let datas;
			let queryString = '';
			switch (type) {
				case 0:
					datas = {
						idPlug: this.loadedId,
						target: obj.target || this.selected.target.code,
						funct: obj.funct || this.selected.funct.code,
						organ: obj.organ || this.selected.organ.code,
						action: obj.action || this.selected.action.code,
						order: obj.order || 0,
						label: obj.label || '',
						idDriver: obj.idDriver,
						scpi: obj.scpi || '',
						info: obj.info || '',
					};
					if (this.duppId !== null) {
						datas.idPlug = this.duppId;
					}
					if (create) queryString = `http://10.192.136.74:3000/stamp3ate/actionsForPlug/`;
					else queryString = `http://10.192.136.74:3000/stamp3ate/actionsForPlug/${i}`;
					break;
				case 1:
					datas = {
						idATE: this.loadedId,
						order: obj.order || 0,
						valid: obj.valid || 1,
						label: obj.label || '',
						instID: obj.instID || '',
						protocol: obj.protocol || '',
						driver: obj.driver || '',
						driverDll: obj.driverDll || '',
						wizard: obj.wizard || '',
						init: obj.init || '',
					};
					if (this.duppId !== null) {
						datas.idATE = this.duppId;
					}

					if (create) queryString = `http://10.192.136.74:3000/stamp3ate/driversForPlug/`;
					else queryString = `http://10.192.136.74:3000/stamp3ate/driversForPlug/${i}`;
					break;
				default:
					break;
			}
			if (create) {
				axios
					.post(queryString, datas)
					.then((response) => {
						if (response.status === 200) {
							console.log('Creation succeed');

							if (this.duppId === null) this.getAllDriversAndActionOfPlugins(this.loadedId);
						} else {
							console.error('Error saving:', response.status, response.data);
						}
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			} else {
				axios
					.put(queryString, datas)
					.then((response) => {
						if (response.status === 200) {
							console.log('Save succeed');
						} else {
							console.error('Error saving:', response.status, response.data);
						}
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			}
		},
		createDefaultDriver() {
			if (this.creationId === null) return;
			axios
				.post(`http://10.192.136.74:3000/stamp3ate/defaultDriver/${this.creationId}`)
				.then((response) => {
					if (response.status === 200) {
						console.log('Creation succeed');
					} else {
						console.error('Error saving:', response.status, response.data);
					}
				})
				.catch((error) => {
					console.error('Unexpected error:', error);
				});
		},

		async saveAllDatas() {
			let actToSave = this.allActions.filter((act) => this.allActChanged.includes(act.id));
			let drvToSave = this.allDrivers.filter((drv) => this.allDrvChanged.includes(drv.id));
			if (this.duppId !== null) {
				actToSave = this.allActions;
				drvToSave = this.allDrivers;
			}
			actToSave.forEach((act) => {
				this.saveActionOrDriver(act, act.id, 0);
			});
			drvToSave.forEach((drv) => {
				this.saveActionOrDriver(drv, drv.id, 1);
			});
		},

		cancelAdding(type) {
			switch (type) {
				case 0:
					this.newAction = {
						target: '',
						funct: '',
						organ: '',
						action: '',
						order: 0,
						label: '',
						idDriver: null,
						info: '',
						scpi: '',
					};
					break;
				case 1:
					this.newDriver = {
						order: 0,
						valid: 1,
						label: '',
						instID: '',
						protocol: '',
						driver: '',
						driverDll: '',
						wizard: '',
						init: '',
					};
					break;
				default:
					break;
			}
		},

		deleteActionOrDriver(id, type) {
			if (id == undefined || id == null) return;
			let queryString = '';
			switch (type) {
				case 0:
					queryString = `http://10.192.136.74:3000/stamp3ate/actionsForPlug/${id}`;
					break;
				case 1:
					queryString = `http://10.192.136.74:3000/stamp3ate/driversForPlug/${id}`;
					break;
				default:
					break;
			}

			axios
				.delete(queryString)
				.then((response) => {
					if (response.status === 200) {
						this.$waveui.notify({
							message: 'Suppréssion reussit',
							timeout: 2000,
							bgColor: 'error',
							color: 'warning',
							dismiss: false,
							shadow: true,
							round: true,
							sm: true,
							icon: 'wi-cross',
						});

						this.getAllDriversAndActionOfPlugins(this.loadedId);
					} else {
						console.error('Error deleting', response.status, response.data);
					}
				})
				.catch((error) => {
					console.error('Unexpected error:', error);
				});
		},

		async getAllFunctionsRelatedToTarget(id) {
			console.log(id);
			if (id !== -1) {
				try {
					const response = await axios.get(`http://10.192.136.74:3000/stamp3/functsWithTarget/${id}`);
					this.allFunctions = response.data;
					this.selected.funct = this.allFunctions[0];
				} catch (error) {
					console.error('Error fetching functions:', error);
				}
			} else {
				this.allFunctions = [];
			}
		},
		async getAllOrgansRelatedToFunction(id) {
			if (id !== -1) {
				try {
					const response = await axios.get(`http://10.192.136.74:3000/stamp3/organsWithFunct/${id}`);
					this.allOrgans = response.data;
					this.selected.organ = this.allOrgans[0];
				} catch (error) {
					console.error('Error fetching organs:', error);
				}
			} else {
				this.allOrgans = [];
			}
		},
		async getAllActionsRelatedToOrgan(id) {
			if (id !== -1) {
				try {
					const response = await axios.get(`http://10.192.136.74:3000/stamp3/actionsWithOrgan/${id}`);
					this.allActs = response.data;
					this.selected.action = this.allActs[0];
				} catch (error) {
					console.error('Error fetching actions:', error);
				}
			} else {
				this.allActs = [];
			}
		},
	},
};
</script>

<style scoped>
.controllerHeaders {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	width: 75%;
	margin: auto;
}

.Heads {
	border: 1px solid rgba(0, 0, 0, 0.202);
	border-radius: 5px;

	padding: 0.3rem 0.8rem;
	cursor: pointer;

	transition: all 0.2s ease;

	min-width: 80px;
	text-align: center;
}

.Category {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
}

.Heads.selected {
	background: #54b946;
	color: white;
}

.FunctsHead.selected {
	background: #20aaf4;
	color: white;
}

.OrgansHead.selected {
	background: #bf19d8;
	color: white;
}

.ActionsHead.selected {
	background: #f6550a;
	color: white;
}

.driver_action,
.controllerAdding {
	margin: 1rem 0;
	padding: 0.1rem 1rem;
	box-shadow: 0 0 2px rgba(90, 90, 90, 0.9);
	border-radius: 10px;
}

.controllerAdding {
	margin-bottom: 1rem;
}

.selects {
	color: #54b946;
	width: 300px;
}

.selects select {
	width: 100%;
}

.selects_valid {
	color: #54b946;
	width: 100px;
}

.selects_valid select {
	width: 100%;
	margin-top: 0.2rem;
	padding: 0.4rem 0.8rem;
}

.btns {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
	margin: 1rem 0;
}

.btns .w-button {
	padding: 0.8rem 2rem;
}

.controllerHeads {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
}

.separator {
	width: 75%;
	height: 0px;
	border-bottom: 1px solid #035726;
	margin: 1rem auto;
}

.saveAll {
	position: absolute;
	top: 136px;
	right: 42px;
	display: flex;
	gap: 1rem;
}

.saveAll p {
	opacity: 0.7;
}

.deleteBTN {
	width: 100px;
	display: block;
	margin: 0.5rem auto;
}
</style>
