<template>
	<section id="report">
		<!-- TODO : Tout, refaire la page find-->
		<div class="topOptions">
			<SearchBar route="/stamp3uut/uuts" @update:selected="getValueForOne" :newItem="spaceTaker"
				:refreshSearch="spaceTaker" :displayArrow="false" />
		</div>
		<div v-if="datas" class="infos">
			<div class="name">
				<h1 class="uut_title">{{ datas.refsku }}</h1>
				<h3 v-if="gamme !== null">{{ gamme.label }}</h3>
				<p>Voici les contrôles dans lesquels cette UUT a été qualifié :</p>
			</div>
			<div v-if="allCtrlQualifier.length > 0">
				<div class="ctrl" v-for="ctrl in allCtrlQualifier" :key="ctrl.id">
					<h2 class="ctrl_title">{{ ctrl.label }}</h2>
					<div class="ctrl_btns">
						<w-button bg-color="blue" color="white" @click="createReport(ctrl.id)"> Prévisualiser
						</w-button>
						<!--<w-button bg-color="green" color="white" @click="downloadPDF(ctrl.id)"> Télécharger </w-button>-->
					</div>
					<div class="ctrl_overlay_background" v-if="showRaport" @click="showRaport = false"></div>
					<w-button class="close" bg-color="error" @click="showRaport = false" v-if="showRaport"> Close
					</w-button>
					<w-button class="download" bg-color="green" color="white" @click="downloadPDF(ctrl.id)"
						v-if="showRaport"> Télécharger </w-button>
					<div id="pdf" class="ctrl_overlay ctrl_pdf" v-if="showRaport">
						<p class="title">{{ datas.refsku }}</p>
						<p class="subtitle">{{ allCtrlQualifier.find((item) => item.id === '' + this.selectedCtrl).label
							}}</p>
						<div class="details">
							<div>
								<p>Test séquence : {{ datas.refsku }}</p>
								<p>Status : {{ datas.dateEnd ? datas.dateEnd : 'N/A' }}</p>
								<p>Créer par : {{ datas.who ? datas.who : 'N/A' }}</p>
							</div>
							<div>
								<p>Start : {{ datas.dateStart ? datas.dateStart : 'N/A' }}</p>
								<p>End : {{ datas.dateEnd ? datas.dateEnd : 'N/A' }}</p>
								<p>Dernière révision : {{ datas.refsku }}</p>
							</div>
						</div>
						<div class="separator"></div>
						<div class="product">
							<p>Topology : {{ datas.topo == 1 ? 'Monophasé' : 'Triphasé' }}</p>
							<p>Puissance : {{ datas.power ? '' + datas.power + ' VA' : 'N/A' }}</p>
							<p>Autonomie : {{ datas.backup ? '' + datas.backup + ' mn' : 'N/A' }}</p>
							<p>Tension : {{ datas.volt ? '' + datas.volt + ' V' : 'N/A' }}</p>
							<p>Fréquence : {{ datas.freq ? '' + datas.freq + ' Hz' : 'N/A' }}</p>
						</div>
						<div class="separator"></div>
						<div class="variables">
							<div class="cat">
								<p class="nom">UUT</p>
								<p><span>SCAN_REF = </span>{{ datas.refsku }}</p>
								<p><span>UUT_TOPO = </span>{{ datas.topo }}</p>
								<p><span>UUT_DESIGN = </span>{{ datas.design }}</p>
								<p><span>UUT_POWER = </span>{{ datas.power }}</p>
								<p><span>UUT_BACKUP = </span>{{ datas.backup }}</p>
								<p><span>UUT_VOLT = </span>{{ datas.volt }}</p>
								<p><span>UUT_FREQ = </span>{{ datas.freq }}</p>
								<p><span>UUT_MODEL = </span>{{ datas.model }}</p>
								<p><span>UUT_PNP = </span>{{ datas.pnp }}</p>
								<p><span>UUT_FIRM = </span>{{ datas.firm }}</p>
								<p><span>UUT_SKU = </span>{{ datas.sku }}</p>
							</div>
							<div class="cat">
								<p class="nom">HIPOT</p>
								<p><span>HI_VOLT = </span>{{ datas.hiVolt }}</p>
								<p><span>HI_AMPS = </span>{{ datas.hiAmps }}</p>
								<p><span>HI_TIME = </span>{{ datas.hiTime }}</p>
								<p><span>HI_RAMP = </span>{{ datas.hiRamp }}</p>
								<p><span>HIS_VOLT = </span>{{ datas.hisVolt }}</p>
								<p><span>HIS_AMPS = </span>{{ datas.hisAmps }}</p>
								<p><span>HIS_TIME = </span>{{ datas.hisTime }}</p>
								<p><span>HIS_RAMP = </span>{{ datas.hisRamp }}</p>
								<p><span>HIF_VOLT = </span>{{ datas.hifVolt }}</p>
								<p><span>HIF_AMPS = </span>{{ datas.hifAmps }}</p>
								<p><span>HIF_TIME = </span>{{ datas.hifTime }}</p>
								<p><span>HIF_RAMP = </span>{{ datas.hifRamp }}</p>
							</div>
							<div class="cat">
								<p class="nom">GROUND</p>
								<p><span>GND_AMPS = </span>{{ datas.gndAmps }}</p>
								<p><span>GND_OHMS = </span>{{ datas.gndOhms }}</p>
								<p><span>GND_TIME = </span>{{ datas.gndTime }}</p>
								<p><span>CONT_AMPS = </span>{{ datas.contAmps }}</p>
								<p><span>CONT_OHMS = </span>{{ datas.contOhms }}</p>
								<p><span>CONT_TIME = </span>{{ datas.contTime }}</p>
							</div>
							<div class="cat">
								<p class="nom">MAINS 1</p>
								<p><span>MAIN1_U = </span>{{ datas.main1U }}</p>
								<p><span>MAIN1_UMAX = </span>{{ datas.main1Umaxi }}</p>
								<p><span>MAIN1_UMIN = </span>{{ datas.main1Umini }}</p>
								<p><span>MAIN1_IMAX = </span>{{ datas.main1Imaxi }}</p>
								<p><span>MAIN1_YIELD = </span>{{ datas.main1Yield }}</p>
								<p><span>MAIN1_THDI = </span>{{ datas.main1Thdi }}</p>
							</div>
							<div class="cat">
								<p class="nom">MAINS 2</p>
								<p><span>MAIN2_U = </span>{{ datas.main2U }}</p>
								<p><span>MAIN2_UMAX = </span>{{ datas.main2Umaxi }}</p>
								<p><span>MAIN2_UMIN = </span>{{ datas.main2Umini }}</p>
								<p><span>MAIN2_IMAX = </span>{{ datas.main2Imaxi }}</p>
								<p><span>MAIN2_YIELD = </span>{{ datas.main2Yield }}</p>
								<p><span>MAIN2_THDI = </span>{{ datas.main2Thdi }}</p>
							</div>
							<div class="cat">
								<p class="nom">OUTPUT</p>
								<p><span>OUT_U = </span>{{ datas.outU }}</p>
								<p><span>OUT_UTOL = </span>{{ datas.outUtol }}</p>
								<p><span>OUT_THDU = </span>{{ datas.outThdu }}</p>
								<p><span>OUT_UDC = </span>{{ datas.outUdc }}</p>
								<p><span>OUT_F = </span>{{ datas.outF }}</p>
								<p><span>OUT_FTOL = </span>{{ datas.outFtol }}</p>
								<p><span>OUT_VA = </span>{{ datas.outVA }}</p>
								<p><span>OUT_W = </span>{{ datas.outW }}</p>
								<p><span>OUT_COSPHI = </span>{{ datas.outPhi }}</p>
							</div>
							<div class="cat">
								<p class="nom">BATTERY</p>
								<p><span>BAT_U = </span>{{ datas.batU }}</p>
								<p><span>BAT_U_MAX = </span>{{ datas.batUmaxi }}</p>
								<p><span>BAT_U_MIN = </span>{{ datas.batUmini }}</p>
								<p><span>BAT_AH = </span>{{ datas.batAH }}</p>
								<p><span>BAT_LIFE = </span>{{ datas.batLife }}</p>
								<p><span>BAT_BRANCH = </span>{{ datas.batBranch }}</p>
								<p><span>BAT_C1 = </span>{{ datas.batConst1 }}</p>
								<p><span>BAT_C2 = </span>{{ datas.batConst2 }}</p>
								<p><span>BAT_C3 = </span>{{ datas.batConst3 }}</p>
								<p><span>BAT_C4 = </span>{{ datas.batConst4 }}</p>
								<p><span>CHRG_U = </span>{{ datas.chrgU }}</p>
								<p><span>CHRG_I = </span>{{ datas.chrgI }}</p>
								<p><span>CHRG_T = </span>{{ datas.chrgTemp }}</p>
							</div>
						</div>
						<div class="separator"></div>
						<div class="tests">
							<div v-for="cat in allActions" :key="cat.bigKey">
								<p class="bigKey">{{ cat.bigKey }}</p>
								<div v-for="small in cat.datas" :key="small.smallKey">
									<p class="smallKey">{{ small.smallKey }}</p>
									<div class="stepAction" v-for="item in small.actions" :key="item.id">
										<div class="params">
											<p class="nom" v-if="item.param0">
												{{
													`[${item.order}]
												${actionNames[item.id]}`
												}}
											</p>
											<div class="paramsContainer">
												<p class="no-separation"
													v-if="item.param0 && item.param0.trim() !== ''">{{ item.param0 }}
												</p>
												<p v-if="item.param1 && item.param1.trim() !== ''">{{ item.param1 }}</p>
												<p v-if="item.param2 && item.param2.trim() !== ''">{{ item.param2 }}</p>
												<p v-if="item.param3 && item.param3.trim() !== ''">{{ item.param3 }}</p>
												<p v-if="item.param4 && item.param4.trim() !== ''">{{ item.param4 }}</p>
												<p v-if="item.param5 && item.param5.trim() !== ''">{{ item.param5 }}</p>
												<p v-if="item.param6 && item.param6.trim() !== ''">{{ item.param6 }}</p>
												<p v-if="item.param7 && item.param7.trim() !== ''">{{ item.param7 }}</p>
												<p v-if="item.param8 && item.param8.trim() !== ''">{{ item.param8 }}</p>
												<p v-if="item.param9 && item.param9.trim() !== ''">{{ item.param9 }}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<h2 class="ctrl_title">Cette UUT jamais été qualifié.</h2>
			</div>
			<!--<button @click="downloadPDF">Print Download</button>
			<PDFArchitecture id="pdf" />-->
		</div>
	</section>
</template>
<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';

import { jsPDF } from 'jspdf';

//import PDFArchitecture from '@/components/PDFArchitecture.vue';

export default {
	name: 'RapportPage',
	data() {
		return {
			showRaport: false,
			spaceTaker: false,
			selectedId: null,
			selectedCtrl: 0,

			datas: null,
			allActions: [],
			actionNames: [],
			gamme: null,

			allCtrlQualifier: [],
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
		};
	},
	components: {
		SearchBar,
		//PDFArchitecture,
	},
	methods: {
		async getValueForOne(val) {
			if (val == null) {
				this.selectedId = null;
				return;
			}
			this.allCtrlQualifier = [];

			this.selectedId = val.id;
			this.allActions = [];
			this.allComplements = [];

			await axios
				.get(`http://localhost:3000/stamp3uut/uut/${this.selectedId}`)
				.then((reponse) => reponse.data[0])
				.then((data) => {
					this.datas = data;

					axios
						.get(`http://localhost:3000/stamp3uut/gamme/${data.range}`)
						.then((reponse) => reponse.data[0])
						.then((gamme) => {
							this.gamme = gamme;
						});
				});
			axios
				.get(`http://localhost:3000/stamp3uut/whereUutQualified/${this.selectedId}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					data.forEach((d) => {
						let ctrl = this.ctrls.find((item) => item.id === '' + d.idCtrlFlt);
						this.allCtrlQualifier.push(ctrl);
					});
				});

			if (this.datas.date) {
				let englishDate = new Date(this.datas.date).toLocaleDateString('fr-FR');
				this.datas.date = englishDate.split('/').reverse().join('-');
			}
			if (this.datas.when) {
				let englishDate = new Date(this.datas.when).toLocaleDateString('fr-FR');
				this.datas.when = englishDate.split('/').reverse().join('-');
			}
		},
		async createReport(idCtrl) {
			if (this.selectedId == null) return;
			this.selectedCtrl = idCtrl;
			let donnees = [];
			let temp = [];
			this.allActions = [];
			await axios
				.get(`http://localhost:3000/stamp3uut/actionForUUTAndCtrl/${this.selectedId}/${idCtrl}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					donnees = data;
				})
				.then(() => {
					donnees.forEach((val) => {
						let copy = Object.assign({}, val);
						delete copy.bigKey;
						delete copy.smallKey;
						this.getActionName(copy);

						let exist = false;
						if (temp !== null) {
							temp.forEach((t) => {
								if (t.bigKey === val.bigKey) {
									exist = true;
									let exist2 = false;
									t.datas.forEach((data) => {
										if (data.smallKey === val.smallKey) {
											exist2 = true;
											data.actions.push(copy);
										}
									});
									if (!exist2) {
										t.datas.push({
											smallKey: val.smallKey,
											actions: [copy],
										});
									}
								}
							});
						}
						if (!exist || temp === null) {
							temp.push({
								bigKey: val.bigKey,
								datas: [
									{
										smallKey: val.smallKey,
										actions: [copy],
									},
								],
							});
						}
					});
				})
				.then(() => {
					this.showRaport = true;
				});
			this.allActions = temp;
		},
		async getActionName(datas) {
			let d = {
				idTarget: datas.idTarget,
				idFunc: datas.idFunc,
				idOrgan: datas.idOrgan,
				idAction: datas.idAction,
			};
			await axios
				.post(`http://localhost:3000/stamp3/actionFullName`, d)
				.then((reponse) => reponse.data[0])
				.then((data) => {
					this.actionNames[datas.id] = data.label;
				});
		},
		async downloadPDF() {
			//await this.createReport(idCtrl);
			let name = 'Raport_' + this.datas.refsku + '_' + this.allCtrlQualifier.find((item) => item.id === '' + this.selectedCtrl).label + '.pdf';
			let pdf = document.getElementById('pdf');
			console.log(pdf, pdf.classList);
			pdf.classList.remove('ctrl_overlay');
			console.log(pdf, pdf.classList);
			//return;
			const doc = new jsPDF({
				orientation: 'l',
				unit: 'pt',
				format: [1670, 1700],
			});

			doc.html(pdf, {
				callback: function (doc) {
					doc.save(name);
				},
				autoPaging: 'text',
			});

			//doc.save(name);
		},
	},
};
</script>
<style scoped>
#report {
	width: 98vw;
	font-size: 15px;
}

.infos {
	padding-left: 2rem;
	padding-right: 2rem;

	width: 85%;
	margin: 7.5rem auto 0 auto;
}

.topOptions {
	position: relative;
	top: 75px;
	left: 40px;
}

.topOptions .fl {
	display: none;
}

.title {
	font-size: 2.5rem;
	margin-bottom: 2rem;
	margin-top: 1rem;

	text-align: center;
}

.subtitle {
	margin: -1.5rem 0 1rem 0;
}

.details {
	display: flex;
	justify-content: space-between;
	padding: 0 3rem;
	width: 50%;
}

.separator {
	width: 75%;
	margin: 2rem auto;
	border: 1px solid rgba(90, 90, 90, 0.151);
}

.product {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
}

.variables {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.cat {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1.2rem;

	justify-items: center;

	padding: 2.5rem 2rem 1.5rem 2rem;
	position: relative;
	font-size: 1.05rem;
}

.cat .nom {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	font-size: 0.9rem;
}

.cat .nom {
	padding-bottom: 0.1rem;
	border-bottom: 1px solid #119146;
}

.cat span {
	color: #119146;
}

.stepAction {
	margin: 0.3rem 0 0.4rem 0;
	position: relative;
}

.params p {
	border-left: 1px solid #119146;
	padding-left: 0.35rem;
	word-break: break-all;
	word-wrap: break-word;
}

.no-separation {
	border-left: none !important;
}

.params {
	display: flex;
	align-items: flex-start;
	gap: 1rem;

	padding: 0.2rem 0.5rem;
	padding-left: 3rem;
	margin-top: 0.5rem;
	font-size: 0.85rem;
}

.paramsContainer {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.35rem;

	max-width: 70%;
}

.stepAction .nom {
	font-size: 1rem;
	margin-right: 0.8rem;
	border: none;
	width: 380px;
	padding-bottom: 0.25rem;
	color: #119146;
}

.bigKey {
	font-size: 1.05rem;
	font-weight: 600;
	text-align: center;
	color: #119146;

	margin-top: 1.5rem;
	padding-top: 1.5rem;
	position: relative;
}

.bigKey::before {
	content: '';
	display: block;
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);

	width: 75%;
	border: 1px solid rgba(90, 90, 90, 0.415);
}

.smallKey {
	font-size: 0.9rem;
	margin: 0.5rem 0 0.4rem 0;
	text-align: center;
	text-decoration: underline;
	color: #119146;
}

.uut_title {
	font-size: 3rem;
}

.ctrl_title {
	color: #e31936;
	font-size: 2rem;
}

.ctrl {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 2rem;
}

.ctrl_btns {
	display: flex;
	gap: 1rem;
}

.ctrl_btns .w-button {
	font-size: 1.2rem;
	padding: 0.8rem 1.5rem;
	width: 175px;
}

.name {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	margin-bottom: 2rem;
}

.name h3 {
	font-size: 1.8rem;
}

.ctrl_overlay_background {
	z-index: 500;
	background: rgba(0, 0, 0, 0.307);
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}

.ctrl_overlay {
	width: 90% !important;
	height: 95%;
	background: white;
	overflow-y: auto;
	z-index: 505;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}

.ctrl_pdf {
	width: 1700px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	padding: 1rem 0;
}

.close {
	position: absolute;
	top: 40px;
	right: 110px;
	z-index: 999;
}

.download {
	position: absolute;
	top: 40px;
	left: 100px;
	z-index: 999;
}
</style>
