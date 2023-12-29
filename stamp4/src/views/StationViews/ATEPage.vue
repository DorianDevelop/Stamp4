<template>
	<Layout
		class="layout"
		routeAPI="/stamp3ate/ate"
		:searchType="0"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-start mb1 px1" gap="3">
					<w-input ref="labelInput" label-color="green-dark1" class="xs3" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Nom" v-model="props.datas.name"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Host (identifiant)" v-model="props.datas.host"> </w-input>
					<w-input label-color="green-dark1" class="xs1" label="Indice" v-model="props.datas.indice"> </w-input>
				</w-flex>

				<div class="groupOfSelect">
					<div class="selects smaller">
						<p>Mode</p>
						<select v-model="props.datas.mode">
							<option v-for="item in modes" :key="item" :value="item.value">
								{{ item.label }}
							</option>
						</select>
					</div>
					<div class="selects smaller">
						<p>Qualifié</p>
						<select v-model="props.datas.qualif">
							<option v-for="item in qualified" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
					</div>
					<div class="selects smaller">
						<p>Langage</p>
						<select v-model="props.datas.langage">
							<option v-for="item in langages" :key="item" :value="item">
								{{ item }}
							</option>
						</select>
					</div>
					<div class="selects">
						<p>Fonction</p>
						<select v-model="props.datas.func">
							<option v-for="item in testTypes" :key="item" :value="item.id">
								{{ item.label }}
							</option>
						</select>
					</div>
					<div class="selects">
						<p>Type</p>
						<select v-model="props.datas.type">
							<option v-for="item in plugs" :key="item" :value="item.id">
								{{ item.label }}
							</option>
						</select>
					</div>
				</div>

				<w-flex class="py2 align-start mb1 px1 mt4" gap="3">
					<div class="selects smaller2">
						<p>Sauvegarder</p>
						<select v-model="props.datas.trace">
							<option v-for="item in qualified" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
					</div>
					<w-input label-color="green-dark1" class="xs3" label="Chemin fichier log" v-model="props.datas.tPath"> </w-input>
				</w-flex>
				<w-flex class="py2 align-start mb4 px1 mt2" gap="3">
					<div class="selects smaller2">
						<p>Sauvegarder</p>
						<select v-model="props.datas.quasar">
							<option v-for="item in qualified" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
					</div>
					<w-input label-color="green-dark1" class="xs3" label="Chemin local Quasar" v-model="props.datas.lQuasar"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Chemin réseau Quasar" v-model="props.datas.nQuasar"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start mb1 px1" gap="3">
					<w-input label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.when"> </w-input>
				</w-flex>

				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
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
			qualified: [
				{ id: 0, label: 'Non' },
				{ id: 1, label: 'Oui' },
			],
			langages: ['FR', 'EN', 'XX'],
			modes: [
				{ value: 'FAC', label: 'Factory' },
				{ value: 'RMA', label: 'RMA' },
				{ value: 'CMA', label: 'CMA' },
			],
			testTypes: [
				{ id: '000', label: 'Non défini !' },
				{ id: '100', label: 'Optical Inspection' },
				{ id: '110', label: 'In Circuit Test' },
				{ id: '130', label: 'PCB Functional Test' },
				{ id: '175', label: 'Pressure/Leak Test' },
				{ id: '190', label: 'Electrical Safety Test' },
				{ id: '210', label: 'Unit Hypot Functional Test' },
				{ id: '230', label: 'Battery Test' },
				{ id: '240', label: 'Charge' },
				{ id: '250', label: 'Discharge Test' },
				{ id: '252', label: 'AQL Discharge Test' },
				{ id: '260', label: 'Battery Charge Test' },
				{ id: '280', label: 'Discharge Retest' },
				{ id: '285', label: 'Pre-Cover Inspection' },
				{ id: '300', label: 'Recharge' },
				{ id: '310', label: 'Final Test' },
				{ id: '320', label: 'Final Electrical Safety Test' },
				{ id: '340', label: 'System Config' },
				{ id: '360', label: 'Sys Final Diag Test' },
				{ id: '370', label: 'Sys Acoustic Test' },
				{ id: '390', label: 'Sys Acoustic Diag Test' },
				{ id: '400', label: 'Sys Burn-in Test' },
				{ id: '420', label: 'Sys Burn-in Diag Test' },
				{ id: '430', label: 'Pre-Box Inspection' },
				{ id: '500', label: 'Finished Product Audit' },
				{ id: '510', label: 'Japan Pre-Inspection' },
				{ id: '951', label: 'REP Clear Customer Data' },
				{ id: '952', label: 'REP Flash new revision' },
				{ id: '953', label: 'REP RIN test specifique' },
				{ id: '999', label: 'Station de dévelopement' },
			],
			plugs: [],
		};
	},
	methods: {
		createJSONItem(datas) {
			return {
				label: datas.label || '',
				qualif: datas.qualif || 0,
				langage: datas.langage || '',
				name: datas.name || '',
				type: datas.type || 0,
				func: datas.func || 0,
				mode: datas.mode || '',
				host: datas.host || '',
				index: datas.index || '',
				trace: datas.trace || 0,
				tPath: datas.tPath || '',
				quasar: datas.quasar || '',
				lQuasar: datas.lQuasar || '',
				nQuasar: datas.nQuasar || '',
				when: datas.when || '1900-01-01',
				who: datas.who || '',
				comment: datas.comment || '',
				begin: datas.begin || 0,
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
		},
	},
	async mounted() {
		await axios
			.get('http://localhost:3000/stamp3ate/plugs')
			.then((reponse) => reponse.data)
			.then((data) => {
				this.plugs = data;
			});
	},
};
</script>

<style scoped>
.selects {
	color: #76c76b;
	width: 275px;
}

.selects select {
	width: 100%;
}

.smaller,
.smaller2 {
	width: 100px;
}
.smaller2 select {
	padding: 4px 8px;
	width: 100px;
}
</style>
