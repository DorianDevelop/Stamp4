<template>
	<section id="report">
		<!-- TODO : Tout, refaire la page find-->
		<div class="topOptions">
			<SearchBarRange route="/stamp3uut/uuts" @update:selected="getValueForOne" :newItem="spaceTaker" :refreshSearch="spaceTaker" :displayArrow="spaceTaker" />
		</div>
		<div v-if="datas" class="infos" id="page-to-pdf">
			<p class="title">{{ datas.refsku }}</p>
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
								<p class="nom" v-if="item.param0">{{ `[${item.order}] ${actionNames[item.id]}` }}</p>
								<div class="paramsContainer">
									<p v-if="item.param0 && item.param0.trim() !== ''">{{ item.param0 }}</p>
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
			<div class="separator" v-if="allActions.length >= 1"></div>
			<button @click="downloadPDF">Print Download</button>
			<PDFArchitecture id="pdf" />
		</div>
	</section>
</template>
<script>
import axios from 'axios';
import SearchBarRange from '@/components/SearchBarRange.vue';

import html2pdf from 'html2pdf.js';

import PDFArchitecture from '@/components/PDFArchitecture.vue';

export default {
	data() {
		return {
			spaceTaker: false,
			selectedId: null,

			datas: null,
			allActions: [],
			actionNames: [],
		};
	},
	components: {
		SearchBarRange,
		PDFArchitecture,
	},
	methods: {
		async getValueForOne(val) {
			if (val == null) {
				this.selectedId = null;
				return;
			}

			this.selectedId = val.id;
			this.allActions = [];
			this.allComplements = [];

			await axios
				.get(`http://localhost:3000/stamp3uut/uut/${this.selectedId}`)
				.then((reponse) => reponse.data[0])
				.then((data) => {
					this.datas = data;
				})
				.then(() => {
					this.getAllCategories();
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
		async getAllCategories() {
			if (this.selectedId == null) return;
			let donnees = [];
			let temp = [];
			await axios
				.get(`http://localhost:3000/stamp3uut/actionForUUT/${this.selectedId}`)
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
		downloadPDF() {
			var element = document.getElementById('pdf');
			var opt = {
				margin: 0,
				filename: 'test.pdf',
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 2 },
				jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
			};

			// New Promise-based usage:
			html2pdf().set(opt).from(element).save();
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
	margin: 13.5rem auto 0 auto;
}
.topOptions {
	position: absolute;
	top: 75px;
	left: 40px;
}

.topOptions .fl {
	display: none;
}

.title {
	font-size: 1.5rem;
	margin-bottom: 2rem;

	text-align: center;
}

.details {
	display: flex;
	justify-content: space-between;
	padding: 0 3rem;
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
	border-right: 1px solid #119146;
	padding-right: 0.3rem;
	word-break: break-all;
	word-wrap: break-word;
}
.params {
	display: flex;
	align-items: flex-start;
	gap: 1rem;

	padding: 0.2rem 0.5rem;
	margin-top: 0.5rem;
	font-size: 0.85rem;
}

.paramsContainer {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.3rem;

	max-width: 70%;
}

.stepAction .nom {
	font-size: 1rem;
	margin-right: 0.8rem;
	border: none;
	width: 233px;
	padding-bottom: 0.25rem;
	color: #119146;
}

.bigKey {
	font-size: 1.05rem;
	font-weight: 600;
	text-align: center;
	color: #119146;
}
.smallKey {
	font-size: 0.9rem;
	margin: 0.5rem 0 0.4rem 0;
	text-align: center;
	text-decoration: underline;
	color: #119146;
}
</style>
