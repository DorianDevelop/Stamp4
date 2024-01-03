<template>
	<Layout
		class="layout"
		routeAPI="/stamp3uut/uut"
		:searchType="1"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<div class="groupOfSelect">
					<div class="selects">
						<p>Cible</p>
						<select v-model="allSelects.idTarget">
							<option v-for="item in allTargets" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
					</div>
					<div class="selects">
						<p>Fonction</p>
						<select v-model="allSelects.idFunc" :disabled="!(allSelects.idTarget && allSelects.idTarget !== -1)">
							<option v-for="item in allFunctions" :key="item.id" :value="item.id">
								{{ item.label }}
							</option>
						</select>
					</div>
					<div class="selects">
						<p>Organ</p>
						<select v-model="allSelects.idOrgan" :disabled="!(allSelects.idFunc && allSelects.idFunc !== -1)">
							<option v-for="item in allOrgans" :key="item.id" :value="item.id">
								{{ item.label }}
							</option>
						</select>
					</div>
					<div class="selects">
						<p>Actions</p>
						<select v-model="allSelects.idAction" :disabled="!(allSelects.idOrgan && allSelects.idOrgan !== -1)">
							<option v-for="item in allActs" :key="item.id" :value="item.id">
								{{ item.label }}
							</option>
						</select>
					</div>
				</div>
				<w-flex class="align-start xs6 dates" gap="3">
					<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs3" label="Date début" type="date" v-model="props.datas.dateStart"> </w-input>
					<w-input @input="hasBeenSaved = false" label-color="green-dark1" class="xs3" label="Date de fin" type="date" v-model="props.datas.dateEnd"> </w-input>
				</w-flex>
				<w-flex class="justify-space-evenly">
					<div class="selects">
						<p>Mesures</p>
						<select v-model="allSelects.idMesure">
							<option v-for="item in allMesures" :key="item.id" :value="item.id">
								{{ item.label }}
							</option>
						</select>
					</div>
					<button>Run analyse</button>
				</w-flex>
			</w-form>
			<!-- UGLY CODE? Maybe, but it's responsive display ^^' -->
			<div>
				<div v-if="getAllFunctionsRelatedToTarget(allSelects.idTarget ? allSelects.idTarget : -1)"></div>
				<div v-if="getAllOrgansRelatedToFunction(allSelects.idFunc ? allSelects.idFunc : -1)"></div>
				<div v-if="getAllActionsRelatedToOrgan(allSelects.idOrgan ? allSelects.idOrgan : -1)"></div>
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
			showBtn: false,
			validators: {
				required: (value) => !!value || 'This field is required',
			},

			allTargets: [],
			allFunctions: [],
			allOrgans: [],
			allActs: [],

			allSelects: {
				No: 50,
				idTarget: null,
				idFunc: null,
				idOrgan: null,
				idAction: null,
				idMesure: null,
			},

			allMesures: [
				{ id: 0, label: 'JSP' },
				{ id: 1, label: 'Je sais toujours pas' },
			],
		};
	},
	async mounted() {
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
			return true;
		},
		validateAll() {
			console.log('R');
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

button {
	background: none;
	border: none;
	padding: 0.5rem 1.5rem;
	cursor: pointer;
	box-shadow: 0 0 2px rgba(90, 90, 90, 0.4);
	transition: all 0.3s ease;
	border-radius: 3px;
}
button:hover {
	box-shadow: 0 0 2px rgba(90, 90, 90, 0.7);
}
button:active {
	background: rgba(90, 90, 90, 0.5);
}

.dates {
	padding: 4px 2px;
	margin: auto;
	margin-bottom: 2px;
}
</style>
