<template>
	<Layout class="layout" routeAPI="/stamp3/action" :searchType="0" :formating="createJSONItem"
		:validation="validationBeforeSave" @update:validators="validateAll" :showBtns="showBtn">
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end">
					<w-input ref="labelInput" label-color="red" class="mb1 xs6 pa1" label="Label"
						:validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais" v-model="props.datas.label_en">
					</w-input>
				</w-flex>

				<w-flex class="py2 align-end">
					<w-input label-color="red" class="mb1 xs3 pa1" label="Créateur" v-model="props.datas.who">
					</w-input>
					<w-input label-color="red" class="mb1 xs3 pa1" label="Date" type="date" v-model="props.datas.when">
					</w-input>
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
					<div class="selects">
						<p>Organ</p>
						<select v-model="props.datas.idOrgan">
							<option v-for="item in allOrgans" :key="item.id" :value="item.id">
								{{ item.label }}
							</option>
						</select>
						<span v-if="showRequired && !props.datas.idOrgan">This field is required</span>
					</div>
				</div>
				<div class="w-flex justify-space-between align-center">
					<p class="label_param">Parametres</p>
					<p @click="openParameters = !openParameters" class="etendre_btn">Étendre</p>
				</div>
				<div class="parameters" :class="{ parameters_small: !openParameters }">
					<p>Parametre 0</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type0">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param0_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param0_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose0"> </w-input>
					</div>
					<p>Parametre 1</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type1">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param1_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param1_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose1"> </w-input>
					</div>
					<p>Parametre 2</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type2">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param2_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param2_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose2"> </w-input>
					</div>
					<p>Parametre 3</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type3">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param3_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param3_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose3"> </w-input>
					</div>
					<p>Parametre 4</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type4">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param4_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param4_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose4"> </w-input>
					</div>
					<p>Parametre 5</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type5">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param5_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param5_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose5"> </w-input>
					</div>
					<p>Parametre 6</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type6">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param6_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param6_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose6"> </w-input>
					</div>
					<p>Parametre 7</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type7">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param7_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param7_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose7"> </w-input>
					</div>
					<p>Parametre 8</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type8">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param8_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param8_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose8"> </w-input>
					</div>
					<p>Parametre 9</p>
					<div class="param w-flex my2">
						<w-input label-color="red" class="mb1 xs6 pa1" label="Type" v-model="props.datas.type9">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label" v-model="props.datas.param9_fr">
						</w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais"
							v-model="props.datas.param9_en"> </w-input>
						<w-input label-color="red" class="mb1 xs6 pa1" label="Par défault"
							v-model="props.datas.purpose9"> </w-input>
					</div>
				</div>

				<w-textarea rows="4" :no-autogrow="true" label-color="red" class="pa1 textAreaForm" label="Comment"
					v-model="props.datas.comment"> </w-textarea>
			</w-form>

			<!-- UGLY CODE? Maybe, but it's responsive display ^^' -->
			<div>
				<div v-if="getAllFunctionsRelatedToTarget(props.datas.idTarget ? props.datas.idTarget : -1)"></div>
				<div v-if="getAllOrgansRelatedToFunction(props.datas.idFunc ? props.datas.idFunc : -1)"></div>
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
			allOrgans: [],
			showRequired: false,

			openParameters: false,
		};
	},
	async mounted() {
		await axios
			.get('http://10.192.136.74:3000/stamp3/targets')
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
				idOrgan: datas.idOrgan ? datas.idOrgan : 0,
				act: datas.act ? datas.act : '',
				track: datas.track ? datas.track : 0,
				err: datas.err ? datas.err : 0,
				ident: datas.ident ? datas.ident : 0,
				label_en: datas.label_en ? datas.label_en : '',
				who: datas.who ? datas.who : '',
				when: datas.when ? datas.when : '1900-01-01',
				comment: datas.comment ? datas.comment : '',

				type0: datas.type0 ? datas.type0 : '',
				param0_fr: datas.param0_fr ? datas.param0_fr : '',
				param0_en: datas.param0_en ? datas.param0_en : '',
				param0_xx: datas.param0_xx ? datas.param0_xx : '',
				purpose0: datas.purpose0 ? datas.purpose0 : '',

				type1: datas.type1 ? datas.type1 : '',
				param1_fr: datas.param1_fr ? datas.param1_fr : '',
				param1_en: datas.param1_en ? datas.param1_en : '',
				param1_xx: datas.param1_xx ? datas.param1_xx : '',
				purpose1: datas.purpose1 ? datas.purpose1 : '',

				type2: datas.type2 ? datas.type2 : '',
				param2_fr: datas.param2_fr ? datas.param2_fr : '',
				param2_en: datas.param2_en ? datas.param2_en : '',
				param2_xx: datas.param2_xx ? datas.param2_xx : '',
				purpose2: datas.purpose2 ? datas.purpose2 : '',

				type3: datas.type3 ? datas.type3 : '',
				param3_fr: datas.param3_fr ? datas.param3_fr : '',
				param3_en: datas.param3_en ? datas.param3_en : '',
				param3_xx: datas.param3_xx ? datas.param3_xx : '',
				purpose3: datas.purpose3 ? datas.purpose3 : '',

				type4: datas.type4 ? datas.type4 : '',
				param4_fr: datas.param4_fr ? datas.param4_fr : '',
				param4_en: datas.param4_en ? datas.param4_en : '',
				param4_xx: datas.param4_xx ? datas.param4_xx : '',
				purpose4: datas.purpose4 ? datas.purpose4 : '',

				type5: datas.type5 ? datas.type5 : '',
				param5_fr: datas.param5_fr ? datas.param5_fr : '',
				param5_en: datas.param5_en ? datas.param5_en : '',
				param5_xx: datas.param5_xx ? datas.param5_xx : '',
				purpose5: datas.purpose5 ? datas.purpose5 : '',

				type6: datas.type6 ? datas.type6 : '',
				param6_fr: datas.param6_fr ? datas.param6_fr : '',
				param6_en: datas.param6_en ? datas.param6_en : '',
				param6_xx: datas.param6_xx ? datas.param6_xx : '',
				purpose6: datas.purpose6 ? datas.purpose6 : '',

				type7: datas.type7 ? datas.type7 : '',
				param7_fr: datas.param7_fr ? datas.param7_fr : '',
				param7_en: datas.param7_en ? datas.param7_en : '',
				param7_xx: datas.param7_xx ? datas.param7_xx : '',
				purpose7: datas.purpose7 ? datas.purpose7 : '',

				type8: datas.type8 ? datas.type8 : '',
				param8_fr: datas.param8_fr ? datas.param8_fr : '',
				param8_en: datas.param8_en ? datas.param8_en : '',
				param8_xx: datas.param8_xx ? datas.param8_xx : '',
				purpose8: datas.purpose8 ? datas.purpose8 : '',

				type9: datas.type9 ? datas.type9 : '',
				param9_fr: datas.param9_fr ? datas.param9_fr : '',
				param9_en: datas.param9_en ? datas.param9_en : '',
				param9_xx: datas.param9_xx ? datas.param9_xx : '',
				purpose9: datas.purpose9 ? datas.purpose9 : '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			if (!datas.idTarget || datas.idTarget === null || datas.idTarget < 0) return false;
			if (!datas.idFunc || datas.idFunc === null || datas.idFunc < 0) return false;
			if (!datas.idOrgan || datas.idOrgan === null || datas.idOrgan < 0) return false;

			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
			this.showRequired = true;
		},

		async getAllFunctionsRelatedToTarget(id) {
			if (id !== -1) {
				await axios
					.get(`http://10.192.136.74:3000/stamp3/functsWithTarget/${id}`)
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
					.get(`http://10.192.136.74:3000/stamp3/organsWithFunct/${id}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.allOrgans = data;
					});
			}

			return true;
		},
	},
};
</script>
