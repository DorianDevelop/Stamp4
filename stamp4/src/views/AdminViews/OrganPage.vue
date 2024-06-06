<template>
	<Layout
		class="layout"
		routeAPI="/stamp3/organ"
		:searchType="0"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end">
					<w-input ref="labelInput" label-color="red" class="mb1 xs6 pa1" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais" v-model="props.datas.label_en"> </w-input>
				</w-flex>

				<w-flex class="py2 align-end">
					<w-input label-color="red" class="mb1 xs3 pa1" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="red" class="mb1 xs3 pa1" label="Date" type="date" v-model="props.datas.when"> </w-input>
				</w-flex>

				<div class="groupOfSelect">
					<div class="selects">
						<p>Cible</p>
						<select v-model="props.datas.idTarget">
							<option v-for="item in allTargets" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
						<span v-if="showRequired && !props.datas.idTarget">This field is required</span>
					</div>
					<div class="selects">
						<p>Fonction</p>
						<select v-model="props.datas.idFunc">
							<option v-for="item in allFunctions" :key="item.id" :value="item.id">
								{{ item.label }}
							</option>
						</select>
						<span v-if="showRequired && !props.datas.idFunc">This field is required</span>
					</div>
				</div>

				<w-textarea rows="4" :no-autogrow="true" label-color="red" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>

			<!-- UGLY CODE? Maybe, but it's responsive display ^^' -->
			<div v-if="allFunctions">
				<div v-if="getAllFunctionsRelatedToTarget(props.datas.idTarget ? props.datas.idTarget : -1)"></div>
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
			allTargets: [],
			allFunctions: [],
			showRequired: false,
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
				label: datas.label,
				idTarget: datas.idTarget ? datas.idTarget : 0,
				idFunc: datas.idFunc ? datas.idFunc : 0,
				label_en: datas.label_en ? datas.label_en : '',
				who: datas.who ? datas.who : '',
				when: datas.when ? datas.when : '',
				comment: datas.comment ? datas.comment : '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			if (!datas.idTarget || datas.idTarget === null || datas.idTarget < 0) return false;
			if (!datas.idFunc || datas.idFunc === null || datas.idFunc < 0) return false;

			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
			this.showRequired = true;
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
	},
};
</script>
