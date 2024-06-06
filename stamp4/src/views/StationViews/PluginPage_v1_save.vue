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

				<div class="controllerContainer">
					<div class="controllerHeaders">
						<h1>Plug-IN::</h1>
						<div class="groupOfSelect">
							<div class="paramSelect">
								<select v-model="selected.idTarget" @change="resetNext(0)">
									<option v-for="item in allTargets" :key="item.id" :value="item.id">{{ item.label }}</option>
								</select>
							</div>
							<h1>::</h1>
							<div class="paramSelect">
								<select v-model="selected.idFunc" @change="resetNext(1)">
									<option v-for="item in allFunctions" :key="item.id" :value="item.id">
										{{ item.label }}
									</option>
								</select>
							</div>
							<h1>::</h1>
							<div class="paramSelect">
								<select v-model="selected.idOrgan" @change="resetNext(2)">
									<option v-for="item in allOrgans" :key="item.id" :value="item.id">
										{{ item.label }}
									</option>
								</select>
							</div>
							<h1>::</h1>
							<div class="paramSelect">
								<select v-model="selected.idAction" @change="loadPageAction">
									<option v-for="item in allActs" :key="item.id" :value="item.id">
										{{ item.label }}
									</option>
								</select>
							</div>
						</div>
					</div>
					<div class="controllerContent" v-if="loadedActions.length > 0">
						<p>{{ loadedActions }}</p>
					</div>
				</div>

				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
			<div>
				<div v-if="getAllDriversAndActionOfPlugins(props.datas.id ? props.datas.id : -1)"></div>
				<div v-if="getAllFunctionsRelatedToTarget(selected.idTarget ? selected.idTarget : -1)"></div>
				<div v-if="getAllOrgansRelatedToFunction(selected.idFunc ? selected.idFunc : -1)"></div>
				<div v-if="getAllActionsRelatedToOrgan(selected.idOrgan ? selected.idOrgan : -1)"></div>
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

			allDrivers: [],
			allActions: [],
			allActionsToShow: [],

			selected: {
				idTarget: null,
				idFunc: null,
				idOrgan: null,
				idAction: null,
			},

			allTargets: [],
			allFunctions: [],
			allOrgans: [],
			allActs: [],

			loadedActions: [],
		};
	},
	async mounted() {
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
				});
			await axios
				.get(`http://localhost:3000/stamp3ate/actionsForPlug/${id}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allActions = data;
				});

			return false;
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
		resetNext(index) {
			switch (index) {
				case 0:
					this.selected.idFunc = -1;
					this.selected.idOrgan = -1;
					this.selected.idAction = -1;
					break;
				case 1:
					this.selected.idOrgan = -1;
					this.selected.idAction = -1;
					break;
				case 2:
					this.selected.idAction = -1;
					break;

				default:
					break;
			}
		},
		loadPageAction() {
			let target = this.allTargets.find((x) => x.id === this.selected.idTarget);
			let funct = this.allFunctions.find((x) => x.id === this.selected.idFunc);
			let organ = this.allOrgans.find((x) => x.id === this.selected.idOrgan);
			let act = this.allActs.find((x) => x.id === this.selected.idAction);

			this.loadedActions = this.allActions.filter((x) => x.target === target.label && x.organ === organ.label && x.funct === funct.label && x.action === act.label);
		},
	},
};
</script>

<style scoped>
.controllerHeaders {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 0;
}

.groupOfSelect {
	gap: 0;
}

h1 {
	font-weight: 600;
}

.paramSelect select {
	font-size: 1.75rem;
	font-weight: 600;
	border: 1px solid rgba(0, 0, 0, 0.132);
	padding: 8px 2px;
	appearance: none;
	cursor: pointer;
	width: 100px;

	text-align: center;
}
</style>
