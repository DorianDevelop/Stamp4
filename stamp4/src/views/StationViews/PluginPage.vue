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

				<div class="controllerHeads">
					<div class="Heads" :class="{ selected: controllerChoice === 1 }" @click="controllerChoice = 1">
						<p>Drivers</p>
					</div>
					<div class="Heads" :class="{ selected: controllerChoice === 0 }" @click="controllerChoice = 0">
						<p>Actions</p>
					</div>
				</div>
				<p>{{ allChanged }}</p>
				<div class="controllerContainer" v-if="controllerChoice === 1">
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
									<w-button v-on="on" bg-color="success" icon="wi-check"></w-button>
								</template>
								Ajouter
							</w-tooltip>
							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="error" icon="wi-cross"></w-button>
								</template>
								Annuler
							</w-tooltip>
						</div>
					</div>
					<div class="separator"></div>
					<div class="controllerContent" v-if="IdsToLoad.length > 0">
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
						</div>
					</div>
				</div>
				<div class="controllerContainer" v-if="controllerChoice === 0">
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
									<w-button v-on="on" bg-color="success" icon="wi-check"></w-button>
								</template>
								Ajouter
							</w-tooltip>
							<w-tooltip>
								<template #activator="{ on }">
									<w-button v-on="on" bg-color="error" icon="wi-cross"></w-button>
								</template>
								Annuler
							</w-tooltip>
						</div>
					</div>
					<div class="separator"></div>
					<div class="controllerHeaders">
						<div class="Category targets">
							<div class="Heads" v-for="head in allHeaders" :key="head.id" @click="resetNext(0, head)" :class="{ selected: selected.target.id === head.id }">
								<p>{{ head.label }}</p>
							</div>
						</div>
						<div class="Category functs" v-if="selected.target !== null">
							<div
								class="Heads FunctsHead"
								v-for="head in allHeaders[selected.target.id].functs"
								:key="head.id"
								@click="resetNext(1, head)"
								:class="{ selected: selected.funct.id === head.id }"
							>
								<p>{{ head.label }}</p>
							</div>
						</div>
						<div class="Category organs" v-if="selected.funct !== null">
							<div
								class="Heads OrgansHead"
								v-for="head in allHeaders[selected.target.id].functs[selected.funct.id].organs"
								:key="head.id"
								@click="resetNext(2, head)"
								:class="{ selected: selected.organ.id === head.id }"
							>
								<p>{{ head.label }}</p>
							</div>
						</div>
						<div class="Category actions" v-if="selected.organ !== null">
							<div
								class="Heads actionsHead"
								v-for="head in allHeaders[selected.target.id].functs[selected.funct.id].organs[selected.organ.id].actions"
								:key="head.id"
								@click="resetNext(3, head)"
								:class="{ selected: selected.action.id === head.id }"
							>
								<p>{{ head.label }}</p>
							</div>
						</div>
					</div>
					<div class="controllerContent" v-if="IdsToLoad.length > 0">
						<div v-for="act in filteredActions" :key="act.id" class="driver_action">
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs1" label="Ordre" v-model="act.order"> </w-input>
								<w-input label-color="green-dark1" class="xs4" label="Label" v-model="act.label"> </w-input>
								<div class="selects">
									<p>Driver</p>
									<select v-model="act.idDriver">
										<option v-for="driver in allDrivers" :key="driver.id" :value="driver.id">
											{{ driver.label }}
										</option>
									</select>
								</div>
								<w-input label-color="green-dark1" class="xs4" label="Information" v-model="act.info"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb2 px1" gap="3">
								<w-input label-color="green-dark1" class="xs6" label="Commande SCPI" v-model="act.scpi"> </w-input>
							</w-flex>
						</div>
					</div>
				</div>
				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
			<div>
				<div v-if="getAllDriversAndActionOfPlugins(props.datas.id ? props.datas.id : -1)"></div>
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
			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},

			controllerChoice: 0,

			allDrivers: [],
			allActions: [],
			IdsToLoad: [],

			selected: {
				target: { id: 0, label: 'ATE', code: 'ATE' },
				funct: { id: 0, label: 'HARDware', code: 'HARD' },
				organ: { id: 0, label: 'MISCellaneous', code: 'MISC' },
				action: { id: 0, label: 'D-IN', code: 'DIN' },
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

			allChanged: [],

			allHeaders: [
				{
					id: 0,
					label: 'ATE',
					code: 'ATE',
					functs: [
						{
							id: 0,
							label: 'HARDware',
							code: 'HARD',
							organs: [
								{
									id: 0,
									label: 'MISCellaneous',
									code: 'MISC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
										{ id: 4, label: 'Wait IN', code: 'WIN' },
									],
								},
								{
									id: 1,
									label: 'SAFEty',
									code: 'SAFE',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MODE', code: 'MODE' },
										{ id: 3, label: 'Wait IN', code: 'WIN' },
									],
								},
								{
									id: 2,
									label: 'USER',
									code: 'USER',
									actions: [
										{ id: 0, label: 'D-OUT', code: 'DOUT' },
										{ id: 1, label: 'Wait IN', code: 'WIN' },
									],
								},
							],
						},
					],
				},
				{
					id: 1,
					label: 'NORMative',
					code: 'NORM',

					functs: [
						{
							id: 0,
							label: 'CONTinuité',
							code: 'CONT',
							organs: [
								{
									id: 0,
									label: 'AC',
									code: 'AC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
										{ id: 4, label: 'Wait IN', code: 'WIN' },
									],
								},
								{
									id: 1,
									label: 'DC',
									code: 'DC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
										{ id: 4, label: 'Wait IN', code: 'WIN' },
									],
								},
							],
						},
						{
							id: 1,
							label: 'GRouND',
							code: 'GRND',
							organs: [
								{
									id: 0,
									label: 'AC',
									code: 'AC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
										{ id: 4, label: 'Wait IN', code: 'WIN' },
									],
								},
								{
									id: 1,
									label: 'DC',
									code: 'DC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
										{ id: 4, label: 'Wait IN', code: 'WIN' },
									],
								},
							],
						},
						{
							id: 2,
							label: 'HIPOT',
							code: 'HIPOT',
							organs: [
								{
									id: 0,
									label: 'AC',
									code: 'AC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
										{ id: 4, label: 'Wait IN', code: 'WIN' },
									],
								},
								{
									id: 1,
									label: 'DC',
									code: 'DC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
										{ id: 4, label: 'Wait IN', code: 'WIN' },
									],
								},
							],
						},
					],
				},
				{
					id: 2,
					label: 'PCBA',
					code: 'PCBA',
					functs: [
						{
							id: 0,
							label: 'ACQuire',
							code: 'ACQ',
							organs: [
								{
									id: 0,
									label: 'DIGItal',
									code: 'DIGI',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'Wait IN', code: 'WIN' },
									],
								},
								{
									id: 1,
									label: 'SIGNal',
									code: 'SIGN',
									actions: [
										{ id: 0, label: 'MEASure', code: 'MEAS' },
										{ id: 1, label: 'SETing', code: 'SET' },
									],
								},
							],
						},
						{
							id: 1,
							label: 'GENErateur',
							code: 'GENE',
							organs: [
								{
									id: 0,
									label: 'ANAlogic',
									code: 'ANA',
									actions: [
										{ id: 0, label: 'D-OUT', code: 'DOUT' },
										{ id: 1, label: 'MEASure', code: 'MEAS' },
										{ id: 2, label: 'SETing', code: 'SET' },
									],
								},
								{
									id: 1,
									label: 'LOGIC',
									code: 'LOGIC',
									actions: [
										{ id: 0, label: 'D-OUT', code: 'DOUT' },
										{ id: 1, label: 'MEASure', code: 'MEAS' },
										{ id: 2, label: 'SETing', code: 'SET' },
									],
								},
							],
						},
						{
							id: 2,
							label: 'LOAD',
							code: 'LOAD',
							organs: [
								{
									id: 0,
									label: 'AC',
									code: 'AC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
									],
								},
								{
									id: 1,
									label: 'DC',
									code: 'DC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
									],
								},
							],
						},
						{
							id: 3,
							label: 'SouRCE',
							code: 'SRCE',
							organs: [
								{
									id: 0,
									label: 'AC',
									code: 'AC',
									actions: [
										{ id: 0, label: 'D-OUT', code: 'DOUT' },
										{ id: 1, label: 'MEASure', code: 'MEAS' },
										{ id: 2, label: 'SETing', code: 'SET' },
									],
								},
								{
									id: 1,
									label: 'DC',
									code: 'DC',
									actions: [
										{ id: 0, label: 'D-OUT', code: 'DOUT' },
										{ id: 1, label: 'MEASure', code: 'MEAS' },
										{ id: 2, label: 'SETing', code: 'SET' },
									],
								},
							],
						},
					],
				},
				{
					id: 3,
					label: 'UPS',
					code: 'UPS',
					functs: [
						{
							id: 0,
							label: 'OUTput',
							code: 'OUT',
							organs: [
								{
									id: 0,
									label: 'AUXiliary',
									code: 'AUX',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
									],
								},
								{
									id: 1,
									label: 'CHRGer',
									code: 'CHRG',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
									],
								},
								{
									id: 2,
									label: 'DC',
									code: 'DC',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure', code: 'MEAS' },
										{ id: 3, label: 'SETing', code: 'SET' },
									],
								},
								{
									id: 3,
									label: 'UTILization',
									code: 'UTIL',
									actions: [
										{ id: 0, label: 'D-IN', code: 'DIN' },
										{ id: 1, label: 'D-OUT', code: 'DOUT' },
										{ id: 2, label: 'MEASure MONO', code: 'MEAS_MONO' },
										{ id: 3, label: 'MEASure THREE', code: 'MEAS_THREE' },
										{ id: 4, label: 'SETing', code: 'SET' },
									],
								},
							],
						},
						{
							id: 1,
							label: 'SouRCE',
							code: 'SRCE',
							organs: [
								{
									id: 0,
									label: 'ANAlogic',
									code: 'ANA',
									actions: [
										{ id: 0, label: 'D-OUT', code: 'DOUT' },
										{ id: 1, label: 'MEASure', code: 'MEAS' },
										{ id: 2, label: 'SETing', code: 'SET' },
									],
								},
								{
									id: 1,
									label: 'LOGIC',
									code: 'LOGIC',
									actions: [
										{ id: 0, label: 'D-OUT', code: 'DOUT' },
										{ id: 1, label: 'MEASure', code: 'MEAS' },
										{ id: 2, label: 'SETing', code: 'SET' },
									],
								},
							],
						},
					],
				},
			],
		};
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
			return true;
		},
		//TODO? TOUT FINIR, TU PEUX LE FAIRE, TU DOIS LE FAIRE, TU ES UN DIEU DE LA PROG PUTAIN ALORS ARRÊTE DE PROCRASTINER
		//
		validateAll() {
			this.$refs.labelInput.validate();
		},
		async getAllDriversAndActionOfPlugins(id) {
			if (id === null || id === -1) return true;
			this.allDatas = [];
			await axios
				.get(`http://localhost:3000/stamp3ate/driversForPlug/${id}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allDrivers = data;
					let lastOrder = 0;
					data.forEach((e) => {
						if (e.order > lastOrder) lastOrder = e.order;
					});
					this.newDriver.order = lastOrder + 1;
				});
			await axios
				.get(`http://localhost:3000/stamp3ate/actionsForPlug/${id}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allActions = data;
					this.findIdActionToLoad();
				});

			return false;
		},
		resetNext(index, head) {
			switch (index) {
				case 0:
					this.selected.target = { id: head.id, label: head.label, code: head.code };
					this.selected.funct = { id: head.functs[0].id, label: head.functs[0].label, code: head.functs[0].code };
					this.selected.organ = { id: head.functs[0].organs[0].id, label: head.functs[0].organs[0].label, code: head.functs[0].organs[0].code };
					this.selected.action = { id: head.functs[0].organs[0].actions[0].id, label: head.functs[0].organs[0].actions[0].label, code: head.functs[0].organs[0].actions[0].code };
					break;
				case 1:
					this.selected.funct = { id: head.id, label: head.label, code: head.code };
					this.selected.organ = { id: head.organs[0].id, label: head.organs[0].label, code: head.organs[0].code };
					this.selected.action = { id: head.organs[0].actions[0].id, label: head.organs[0].actions[0].label, code: head.organs[0].actions[0].code };
					break;
				case 2:
					this.selected.organ = { id: head.id, label: head.label, code: head.code };
					this.selected.action = { id: head.actions[0].id, label: head.actions[0].label, code: head.actions[0].code };
					break;
				case 3:
					this.selected.action = { id: head.id, label: head.label, code: head.code };
					break;

				default:
					break;
			}
			this.findIdActionToLoad();
		},
		findIdActionToLoad() {
			let allActToLoad = this.allActions.filter(
				(x) => x.target === this.selected.target.code && x.organ === this.selected.organ.code && x.funct === this.selected.funct.code && x.action === this.selected.action.code
			);
			this.IdsToLoad = [];
			let lastOrder = 0;
			allActToLoad.forEach((e) => {
				console.log(e);
				if (e.order > lastOrder) lastOrder = e.order;
				this.IdsToLoad.push(e.id);
			});
			this.newAction.order = parseInt(lastOrder) + 1;
		},
		addInChangedList(id) {
			if (!this.allChanged.includes(id)) {
				this.allChanged.push(id);
			}
		} /*
		saveAction(act, i, reload) {
			let datas = {
				order: act.order || 0,
				valid: act.valid || 1,
				label: act.label || '',
				instID: act.instID || '',
				protocol: act.protocol || '',
				driver: act.driver || '',
				driverDll: act.driverDll || '',
				wizard: act.wizard || '',
				init: act.init || '',
			};

			let queryString = '';
			if (row.id !== undefined && row.id !== null) {
				switch (i) {
					case 0:
					case 1:
						datas['complement'] = row.complement;
						queryString = `http://localhost:3000/stamp3drv/protocolBoolean/${row.id}`;
						break;
					case 2:
					case 3:
						datas['type'] = row.type;
						queryString = `http://localhost:3000/stamp3drv/protocolData/${row.id}`;
						break;
					case 4:
					case 5:
						queryString = `http://localhost:3000/stamp3drv/protocolString/${row.id}`;
						break;
				}
				axios
					.put(queryString, datas)
					.then((response) => {
						if (response.status === 200) {
							if (reload) {
								this.$waveui.notify({
									message: 'Modification reussit',
									timeout: 2000,
									bgColor: 'success',
									color: 'warning',
									dismiss: false,
									shadow: true,
									round: true,
									sm: true,
									icon: 'wi-check',
								});
								this.updateDatas(i);
							}
						} else {
							console.error('Error adding step:', response.status, response.data);
						}
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			} else {
				switch (i) {
					case 0:
					case 1:
						datas['complement'] = row.complement;
						queryString = `http://localhost:3000/stamp3drv/protocolBoolean`;
						break;
					case 2:
					case 3:
						datas['type'] = row.type;
						queryString = `http://localhost:3000/stamp3drv/protocolData`;
						break;
					case 4:
					case 5:
						queryString = `http://localhost:3000/stamp3drv/protocolString`;
						break;
				}
				axios
					.post(queryString, datas)
					.then((response) => {
						if (response.status === 200) {
							this.$waveui.notify({
								message: 'Création reussit',
								timeout: 2000,
								bgColor: 'success',
								color: 'warning',
								dismiss: false,
								shadow: true,
								round: true,
								sm: true,
								icon: 'wi-check',
							});

							this.updateDatas(i);
						} else {
							console.error('Error adding step:', response.status, response.data);
						}
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			}
		},*/,
	},
};
</script>

<style scoped>
.controllerHeaders {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 0.3rem;
}

.Heads {
	border: 1px solid black;
	border-radius: 5px;

	padding: 0.3rem 0.8rem;
	cursor: pointer;

	transition: all 0.2s ease;
}
.Category {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
}

.functs,
.actions {
	justify-content: flex-end;
}

.Heads.selected {
	background: #54b946;
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
	border-bottom: 1px solid #1baf59;
	margin: 2.5rem auto;
}
</style>
