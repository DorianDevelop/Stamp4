<template>
	<Layout class="layout" routeAPI="/stamp3uut/uut" :searchType="2" :formating="createJSONItem"
		:validation="validationBeforeSave" @update:validators="validateAll" :showBtns="showBtn">
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input ref="labelInput" label-color="green-dark1" class="xs5" label="Référence SKU"
						:validators="[validators.required]" v-model="props.datas.refsku"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who">
					</w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.date">
					</w-input>
				</w-flex>

				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input label-color="green-dark1" class="xs3" label="Date début" type="date"
						v-model="props.datas.dateStart"></w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date fin" type="date"
						v-model="props.datas.dateEnd"></w-input>

					<div class="selects my1 ml5">
						<p>Gammes</p>
						<select v-model="props.datas.range">
							<option v-for="item in allGammes" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
					</div>
				</w-flex>
				<w-button :bg-color="qualified ? 'green' : 'red'" color="white"
					@click="openQualification(props.datas.range)">
					Qualifier
				</w-button>
				<div v-if="openQualif" class="qualification">
					<div class="bg" @click="closeQualification()"></div>
					<div class="contains">

						<w-button class="close" bg-color="error" @click="closeQualification"> Close
						</w-button>

						<div class="selects my1 ml5">
							<p>Choissisez un controle</p>
							<select v-model="selectedCtrl" @change="getSpecFromRangeAndCtrl()">
								<option v-for="item in ctrls" :key="item.id" :value="item.id">{{ item.label }}
								</option>
							</select>
						</div>
						<w-input label-color="green-dark1" class="xs3" label="Prochain numéro" v-model="nextNo">
						</w-input>
						<div class="spec_area">
							<div class="choose" v-if="chooseSpec.length > 0">
								<p v-for="choix in chooseSpec" :key="choix.id" @click="addSpec(choix.id)">{{ choix.label
									}}</p>
							</div>
							<div class="choose notfound" v-else>
								<p>Aucune spec trouvé.</p>
							</div>
							<div class="separator"></div>
							<div class="selected" v-if="linkedSpec.length > 0">
								<p v-for="selected in linkedSpec" :key="selected.id" @click="removeSpec(selected.id)">
									<span>{{ selected.No }} </span> {{
										selected.label
									}}
								</p>
							</div>
							<div class="selected notfound" v-else>
								<p>Aucune spec selectionné.</p>
							</div>
						</div>
						<w-switch class="mr4 qualifiedSwitch" v-model="qualified" color="green" label="Qualifié"
							label-color="green-dark1" @change="changeQualify"></w-switch>
					</div>
				</div>

				<div class="windowsContainer">
					<div class="window">
						<div class="windowTitle" @click="openProduit = !openProduit">
							<p>Produit</p>
							<button class="icon" :class="{ opened: openProduit }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
									style="fill: rgba(0, 0, 0, 1); msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z">
									</path>
								</svg>
							</button>
						</div>
						<div class="windowContent" v-if="openProduit">
							<w-input label-color="green-dark1" class="mb1 pa1" label="Format N° Série"
								v-model="props.datas.serial"></w-input>
							<w-flex class="py2 align-end mb1 px1">
								<w-input label-color="green-dark1" class="xs3" label="UUT_DESIGN - Désignation"
									v-model="props.datas.design"> </w-input>

								<div class="selects my1 ml5">
									<p>UUT_TOPO - Topologie</p>
									<select v-model="props.datas.topo">
										<option v-for="top in topologie" :key="top.id" :value="top.id">{{ top.label }}
										</option>
									</select>
								</div>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="UUT_POWER - Puiss. (VA)"
									v-model="props.datas.power"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="UUT_BACKUP - Autonomie"
									v-model="props.datas.backup"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="UUT_VOLT - Tension"
									v-model="props.datas.volt"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="UUT_FREQ - Fréquence"
									v-model="props.datas.freq"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="UUT_MODEL - Réf. produit"
									v-model="props.datas.model"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="UUT_PNP - Plug & Play"
									v-model="props.datas.pnp"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="UUT_FIRM - Firmware"
									v-model="props.datas.firm"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="UUT_SKU - SKU info"
									v-model="props.datas.sku"> </w-input>
							</w-flex>
						</div>
					</div>
					<div class="window">
						<div class="windowTitle" @click="openNormatif = !openNormatif">
							<p>Normatif</p>
							<button class="icon" :class="{ opened: openNormatif }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
									style="fill: rgba(0, 0, 0, 1); msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z">
									</path>
								</svg>
							</button>
						</div>
						<div class="windowContent" v-if="openNormatif">
							<w-divider class="mt3 mb1 mx1" color="grey-light2">Puissance</w-divider>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="HI_VOLT - Tension (V)"
									v-model="props.datas.hiVolt"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HI_AMPS - Limitation (mA)"
									v-model="props.datas.hiAmps"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HI_TIME - Maintien (S)"
									v-model="props.datas.hiTime"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HI_RAMP - Rampe (S)"
									v-model="props.datas.hiRamp"> </w-input>
							</w-flex>
							<w-divider class="mt3 mb1 mx1" color="grey-light2">TBTS</w-divider>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="HIS_VOLT - Tension (V)"
									v-model="props.datas.hisVolt"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HIS_AMPS - Limitation (mA)"
									v-model="props.datas.hisAmps"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HIS_TIME - Maintien (S)"
									v-model="props.datas.hisTime"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HIS_RAMP - Rampe (S)"
									v-model="props.datas.hisRamp"> </w-input>
							</w-flex>
							<w-divider class="mt3 mb1 mx1" color="grey-light2">Fonctionel</w-divider>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="HIF_VOLT - Tension (V)"
									v-model="props.datas.hifVolt"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HIF_AMPS - Limitation (mA)"
									v-model="props.datas.hifAmps"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HIF_TIME - Maintien (S)"
									v-model="props.datas.hifTime"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="HIF_RAMP - Rampe (S)"
									v-model="props.datas.hifRamp"> </w-input>
							</w-flex>
							<w-divider class="mt3 mb1 mx1" color="grey-light2">Terres</w-divider>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="GND_AMPS - Courant (A)"
									v-model="props.datas.gndAmps"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="GND_OMHS - Impédance (mΩ)"
									v-model="props.datas.gndOhms"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="GND_TIME - Maintien (S)"
									v-model="props.datas.gndTime"> </w-input>
							</w-flex>
							<w-divider class="mt3 mb1 mx1" color="grey-light2">Continuite</w-divider>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="CONT_AMPS - Courant (A)"
									v-model="props.datas.contAmps"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="CONT_OMHS - Impédance (mΩ)"
									v-model="props.datas.contOhms"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="CONT_TIME - Maintien (S)"
									v-model="props.datas.contTime"> </w-input>
							</w-flex>
						</div>
					</div>
					<div class="window">
						<div class="windowTitle" @click="openReseau = !openReseau">
							<p>Réseau</p>
							<button class="icon" :class="{ opened: openReseau }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
									style="fill: rgba(0, 0, 0, 1); msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z">
									</path>
								</svg>
							</button>
						</div>
						<div class="windowContent" v-if="openReseau">
							<w-divider class="mt3 mb1 mx1" color="grey-light2">Réseau 1</w-divider>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="MAIN1_U - Tension (V)"
									v-model="props.datas.main1U"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="MAIN1_UMAX - U maxi (V)"
									v-model="props.datas.main1Umaxi"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="MAIN1_UMIN - U mini (V)"
									v-model="props.datas.main1Umini"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="MAIN1_IMAX - I maxi (A)"
									v-model="props.datas.main1Imaxi"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="MAIN1_IYIELD - Rendement (η)"
									v-model="props.datas.main1Yield"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="MAIN1_THDI - THDI (%)"
									v-model="props.datas.main1Thdi"> </w-input>
							</w-flex>
							<w-divider class="mt3 mb1 mx1" color="grey-light2">Réseau 2</w-divider>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="MAIN2_U - Tension (V)"
									v-model="props.datas.main2U"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="MAIN2_UMAX - U maxi (V)"
									v-model="props.datas.main2Umaxi"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="MAIN2_UMIN - U mini (V)"
									v-model="props.datas.main2Umini"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="MAIN2_IMAX - I maxi (A)"
									v-model="props.datas.main2Imaxi"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="MAIN2_IYIELD - Rendement (η)"
									v-model="props.datas.main2Yield"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="MAIN2_THDI - THDI (%)"
									v-model="props.datas.main2Thdi"> </w-input>
							</w-flex>
						</div>
					</div>
					<div class="window">
						<div class="windowTitle" @click="openUtilisation = !openUtilisation">
							<p>Utilisation</p>
							<button class="icon" :class="{ opened: openUtilisation }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
									style="fill: rgba(0, 0, 0, 1); msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z">
									</path>
								</svg>
							</button>
						</div>
						<div class="windowContent" v-if="openUtilisation">
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="OUT_U - Tension (V)"
									v-model="props.datas.outU"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="OUT_UTOL - Tolérance (%)"
									v-model="props.datas.outUtol"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="OUT_THDU - THDU (%)"
									v-model="props.datas.outThdu"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="OUT_UDC - Composante DC (V)"
									v-model="props.datas.outUdc"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="OUT_F - Fréquence (HZ)"
									v-model="props.datas.outF"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="OUT_FTOL - Tolérance (%)"
									v-model="props.datas.outFtol"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="OUT_VA - Puissance (VA)"
									v-model="props.datas.outVA"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="OUT_W - Puissance (W)"
									v-model="props.datas.outW"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="OUT_COSPHI - Facteur (Φ)"
									v-model="props.datas.outPhi"> </w-input>
							</w-flex>
						</div>
					</div>
					<div class="window">
						<div class="windowTitle" @click="openBatt = !openBatt">
							<p>Batt. / Charg.</p>
							<button class="icon" :class="{ opened: openBatt }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
									style="fill: rgba(0, 0, 0, 1); msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z">
									</path>
								</svg>
							</button>
						</div>
						<div class="windowContent" v-if="openBatt">
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="BAT_U - U Batt. (V)"
									v-model="props.datas.batU"></w-input>
								<w-input label-color="green-dark1" class="xs3" label="BAT_U_MAX - U Maxi (V)"
									v-model="props.datas.batUmaxi"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="BAT_U_MIN - U Mini (V)"
									v-model="props.datas.batUmini"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="BAT_AH - Capacité (AH)"
									v-model="props.datas.batAH"></w-input>
								<w-input label-color="green-dark1" class="xs3" label="BAT_LIFE - Durée vie (Année)"
									v-model="props.datas.batLife"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="BAT_BRANCH - Branche (Nbr)"
									v-model="props.datas.batBranch"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="BAT_C1 - Batt C1"
									v-model="props.datas.batConst1"></w-input>
								<w-input label-color="green-dark1" class="xs3" label="BAT_C2 - Batt C2"
									v-model="props.datas.batConst2"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="BAT_C3 - Batt C3"
									v-model="props.datas.batConst3"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="BAT_C4 - Batt C4"
									v-model="props.datas.batConst4"> </w-input>
							</w-flex>
							<w-flex class="py2 align-end mb1 px1" gap="3">
								<w-input label-color="green-dark1" class="xs3" label="CHRG_U - U Floating (V)"
									v-model="props.datas.chrgU"></w-input>
								<w-input label-color="green-dark1" class="xs3" label="CHRG_I - I Chargeur (A)"
									v-model="props.datas.chrgI"> </w-input>
								<w-input label-color="green-dark1" class="xs3" label="CHRG_T - Degrée C°"
									v-model="props.datas.chrgTemp"> </w-input>
							</w-flex>
						</div>
					</div>
				</div>
				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm"
					label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
			<div
				v-if="getIfUUTIsQualified(props.selectedId ? props.selectedId : -1, props.datas.id ? props.datas.id : -1)">
			</div>
		</template>
	</Layout>
</template>
<script>
import axios from 'axios';
import Layout from '@/views/ItemLayout.vue';
import VueCookies from 'vue-cookies';

export default {
	components: {
		Layout,
	},
	data() {
		return {
			topologie: [
				{ id: 1, label: 'Monophasé' },
				{ id: 3, label: 'Triphasé' },
			],
			openProduit: false,
			openNormatif: false,
			openReseau: false,
			openUtilisation: false,
			openBatt: false,

			openQualif: false,
			qualified: false,
			creationId: null,
			selectedId: null,

			ctrls: [
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

			selectedCtrl: '000',
			chooseSpec: [],
			linkedSpec: [],
			nextNo: "10|00",

			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},
			allGammes: [],
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
		createJSONItem(datas) {
			return {
				refsku: datas.refsku,
				qualified: datas.qualified || null,
				range: datas.range || null,
				dateStart: datas.dateStart || null,
				dateEnd: datas.dateEnd || null,
				date: datas.date || '1900-01-01',
				who: datas.who || '',
				comment: datas.comment || '',
				reference: datas.reference || '%1F%1Q%2Q%2Y%2W%1O%*U',
				serial: datas.serial || '',
				topo: datas.topo || null,
				design: datas.design || '',
				power: datas.power || '',
				backup: datas.backup || '',
				volt: datas.volt || '',
				freq: datas.freq || '',
				model: datas.model || '',
				pnp: datas.pnp || '',
				firm: datas.firm || '',
				sku: datas.sku || '',
				hiVolt: datas.hiVolt || '',
				hiAmps: datas.hiAmps || '',
				hiTime: datas.hiTime || '',
				hiRamp: datas.hiRamp || '',
				hisVolt: datas.hisVolt || '',
				hisAmps: datas.hisAmps || '',
				hisTime: datas.hisTime || '',
				hisRamp: datas.hisRamp || '',
				hifVolt: datas.hifVolt || '',
				hifAmps: datas.hifAmps || '',
				hifTime: datas.hifTime || '',
				hifRamp: datas.hifRamp || '',
				gndAmps: datas.gndAmps || '',
				gndOhms: datas.gndOhms || '',
				gndTime: datas.gndTime || '',
				contAmps: datas.contAmps || '',
				contOhms: datas.contOhms || '',
				contTime: datas.contTime || '',
				main1U: datas.main1U || '',
				main1Umaxi: datas.main1Umaxi || '',
				main1Umini: datas.main1Umini || '',
				main1Yield: datas.main1Yield || '',
				main1Imaxi: datas.main1Imaxi || '',
				main1Thdi: datas.main1Thdi || '',
				main2U: datas.main2U || '',
				main2Umaxi: datas.main2Umaxi || '',
				main2Umini: datas.main2Umini || '',
				main2Yield: datas.main2Yield || '',
				main2Imaxi: datas.main2Imaxi || '',
				main2Thdi: datas.main2Thdi || '',
				outU: datas.outU || '',
				outUtol: datas.outUtol || '',
				outThdu: datas.outThdu || '',
				outUdc: datas.outUdc || '',
				outF: datas.outF || '',
				outFtol: datas.outFtol || '',
				outVA: datas.outVA || '',
				outW: datas.outW || '',
				outPhi: datas.outPhi || '',
				batU: datas.batU || '',
				batUmaxi: datas.batUmaxi || '',
				batUmini: datas.batUmini || '',
				batAH: datas.batAH || '',
				batLife: datas.batLife || '',
				batBranch: datas.batBranch || '',
				batConst1: datas.batConst1 || '',
				batConst2: datas.batConst2 || '',
				batConst3: datas.batConst3 || '',
				batConst4: datas.batConst4 || '',
				chrgU: datas.chrgU || '',
				chrgI: datas.chrgI || '',
				chrgTemp: datas.chrgTemp || '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.refsku || datas.refsku === '' || datas.refsku === null) return false;
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
		},
		qualify() {
			let id = this.selectedId;
			let ctrl = VueCookies.get('ctrl');
			if (id !== -1 && ctrl) {
				axios
					.post(`http://10.192.136.74:3000/stamp3uut/uutQualification/${id}/${ctrl.id}`)
					.then((response) => {
						if (response.status === 200) {
							this.$waveui.notify({
								message: 'Qualification reussite',
								timeout: 2000,
								bgColor: 'success',
								color: 'warning',
								dismiss: false,
								shadow: true,
								round: true,
								sm: true,
								icon: 'wi-check',
							});
						} else {
							console.error('Error qualifing:', response.status, response.data);
						}
						this.closeQualification()
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			}
		},
		unqualify() {
			let id = this.selectedId;
			let ctrl = VueCookies.get('ctrl');
			if (id !== -1 && ctrl) {
				axios
					.delete(`http://10.192.136.74:3000/stamp3uut/uutUnqualification/${id}/${ctrl.id}`)
					.then((response) => {
						if (response.status === 200) {
							this.$waveui.notify({
								message: 'Déqualification reussite',
								timeout: 2000,
								bgColor: 'success',
								color: 'warning',
								dismiss: false,
								shadow: true,
								round: true,
								sm: true,
								icon: 'wi-check',
							});
						} else {
							console.error('Error unqualifing:', response.status, response.data);
						}
						this.closeQualification()
					})
					.catch((error) => {
						console.error('Unexpected error:', error);
					});
			}
		},
		getIfUUTIsQualified(selectedId, id) {
			if (id !== -1) this.creationId = null;
			else this.creationId = selectedId;
			this.selectedId = id;
			let ctrl = VueCookies.get('ctrl');
			if (id !== -1 && ctrl) {
				axios
					.get(`http://10.192.136.74:3000/stamp3uut/uutQualified/${id}/${ctrl.id}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						let result = data[0].Result;
						this.qualified = result == 1 ? true : false;
					});
			}
			return true;
		},
		openQualification(range) {
			this.selectedRange = range;
			this.openQualif = true;
			this.getSpecFromRangeAndCtrl(range)
			this.getLinkedSpec()
		},
		closeQualification() {
			this.openQualif = false;
		},
		getSpecFromRangeAndCtrl() {
			let ctrl = parseInt(this.selectedCtrl)
			axios
				.get(`http://10.192.136.74:3000/stamp3uut/specFromRangeAndCtrl/${this.selectedRange}/${ctrl}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.chooseSpec = data
				});
		},
		addSpec(specId) {
			if (this.selectedId === null || this.selectedId === -1 || specId === null || specId === -1) return;
			let datas = {
				idMain: this.selectedId,
				idLink: specId,
				idCtrl: parseInt(this.selectedCtrl),
				No: this.nextNo
			}
			axios
				.post(`http://10.192.136.74:3000/stamp3uut/linkSpecToUUT`, datas)
				.then((response) => {
					if (response.status === 200) {
						this.$waveui.notify({
							message: 'Ajout de la Spec reussite',
							timeout: 2000,
							bgColor: 'success',
							color: 'warning',
							dismiss: false,
							shadow: true,
							round: true,
							sm: true,
							icon: 'wi-check',
						});
					} else {
						console.error('Error adding:', response.status, response.data);
					}
					this.getSpecFromRangeAndCtrl(this.selectedRange)
					this.getLinkedSpec()
				})
				.catch((error) => {
					console.error('Unexpected error:', error);
				});
		},
		removeSpec(specId) {
			if (this.selectedId === null || this.selectedId === -1 || specId === null || specId === -1) return;
			axios
				.delete(`http://10.192.136.74:3000/stamp3uut/unlinkSpecToUUT/${specId}`)
				.then((response) => {
					if (response.status === 200) {
						this.$waveui.notify({
							message: 'Suppréssion de la Spec reussite',
							timeout: 2000,
							bgColor: 'success',
							color: 'warning',
							dismiss: false,
							shadow: true,
							round: true,
							sm: true,
							icon: 'wi-check',
						});
					} else {
						console.error('Error deleting:', response.status, response.data);
					}
					this.getSpecFromRangeAndCtrl(this.selectedRange)
					this.getLinkedSpec()
				})
				.catch((error) => {
					console.error('Unexpected error:', error);
				});
		},
		getLinkedSpec() {
			if (this.selectedId === null || this.selectedId === -1) return;
			axios
				.get(`http://10.192.136.74:3000/stamp3uut/allLinkedSpec/${this.selectedId}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.linkedSpec = data
					this.nextNo = ((this.linkedSpec.length + 1) * 10).toString().padStart(3, '0') + "|00";
				});
		},
		changeQualify() {
			if (this.qualified) {
				this.qualify();
			} else {
				this.unqualify();
			}
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

.qualification .bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.213);

	z-index: 501;
}

.qualification .contains {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 70vw;
	height: 60vh;
	transform: translateX(-50%) translateY(-50%);
	background: rgb(255, 255, 255);

	z-index: 502;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem 0;
}

.contains .selects {
	width: 250px;
}

.contains .spec_area {
	height: 220px;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
}

.contains .spec_area .choose,
.contains .spec_area .selected {
	width: 250px;
	height: 220px;
	overflow-y: auto;
	overflow-x: auto;
}

.contains .spec_area .choose:not(.notfound) p,
.contains .spec_area .selected:not(.notfound) p {
	cursor: pointer;
	padding: 5px 10px;
}

.contains .spec_area .choose:not(.notfound) p:hover,
.contains .spec_area .selected:not(.notfound) p:hover {
	background: rgba(128, 128, 128, 0.153);
}

.notfound {
	color: red;
}

.selected span {
	color: green;
}

.contains .spec_area .separator {
	width: 1px;
	background: rgba(38, 38, 38, 0.226);
	height: 100%;
}

.contains .close {
	position: fixed;
	left: 10px;
	top: 10px;
}
</style>
