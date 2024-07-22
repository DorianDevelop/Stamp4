<template>
	<Layout
		class="layout"
		routeAPI="/stamp3drv/protocol"
		:searchType="0"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input ref="labelInput" label-color="green-dark1" class="xs5" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Nom court" v-model="props.datas.shortName"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.date"> </w-input>
				</w-flex>
				<div class="switchDetails">
					<w-flex class="column py1 align-center mb1 px1" gap="3">
						<p class="detailsTitle">Synchronisation</p>
						<div class="wrapper">
							<w-switch class="mr4" v-model="props.datas.repeatOrder" color="green" label="Répétition de l'ordre" label-color="green-dark1"></w-switch>
						</div>
					</w-flex>
					<w-flex class="column py1 align-center mb1 px1" gap="3">
						<p class="detailsTitle">Adressabilité</p>
						<div class="wrapper">
							<w-switch class="mr4" v-model="props.datas.fieldSlave" color="green" label="Numéro slave" label-color="green-dark1"></w-switch>
							<w-switch class="mr4" v-model="props.datas.fieldAddPrim" color="green" label="Adresse primaire" label-color="green-dark1"></w-switch>
							<w-switch class="mr4" v-model="props.datas.fieldAddSecond" color="green" label="Adresse secondaire" label-color="green-dark1"></w-switch>
						</div>
					</w-flex>
					<w-flex class="column py1 align-center mb1 px1" gap="3">
						<p class="detailsTitle">Divers</p>
						<div class="wrapper">
							<w-switch class="mr4" v-model="props.datas.fieldCmdString" color="green" label="Chaîne de commande" label-color="green-dark1"></w-switch>
						</div>
					</w-flex>
				</div>

				<div class="windowsContainer" v-if="props.selectedId !== -1">
					<div class="window" v-for="(valeurs, i) in allDatas" :key="i">
						<div class="windowTitle" @click="opens[i] = !opens[i]">
							<p>{{ names[i] }}</p>
							<button class="icon" :class="{ opened: opens[i] }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
								</svg>
							</button>
						</div>
						<div class="windowContent" v-if="opens[i]">
							<div class="parameter" v-if="definePagination(table.paginations[i], valeurs.length) && refreshTable">
								<w-button class="mb3" bg-color="green-dark1" color="white" @click="addEmptyRow(valeurs, i)">
									<w-icon class="mr1">wi-plus</w-icon>
									Ajout d'une ligne
								</w-button>
								<w-table :headers="i == 2 || i == 3 ? table.header_two : table.header_one" :items="valeurs" fixed-headers :pagination="table.paginations[i]" :sort="table.sorts[i]">
									<template #item="{ item }">
										<tr>
											<td v-for="(header, x) in i == 2 || i == 3 ? table.header_two : table.header_one" :key="x" class="inputTable" :class="`text-${header.key}`">
												<w-input
													v-if="header.key !== 'access' && header.key !== 'answerExpected' && header.key !== 'type'"
													v-model="item[header.key]"
													:disabled="shouldBeDisabled(header.key, props.datas, item.answerExpected)"
												>
												</w-input>
												<select v-else-if="header.key === 'access'" v-model="item[header.key]">
													<option value="WR">Write</option>
													<option value="RD">Read</option>
												</select>
												<select v-else-if="header.key === 'type'" v-model="item[header.key]" :class="`text-${header.key}`">
													<option v-for="t in types" :key="t.value" :value="t.value">{{ t.label }}</option>
												</select>
												<w-switch v-else v-model="item[header.key]" color="green" class="text-sync"></w-switch>
											</td>
											<td>
												<w-flex>
													<w-button class="btnRow" bg-color="error" icon="wi-cross" @click="deleteRow(i, item.id)"></w-button>
													<w-button class="btnRow" bg-color="success" icon="wi-check" @click="saveRow(item, i, true)"></w-button>
												</w-flex>
											</td>
										</tr>
									</template>
								</w-table>
							</div>
						</div>
					</div>
				</div>
				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
			<!-- UGLY CODE? Maybe, but it's responsive display ^^' -->
			<div v-if="getAllDatasOfProtocol(props.selectedId ? props.selectedId : -1, props.datas.id ? props.datas.id : -1)"></div>

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

			opens: [false, false, false, false, false, false],
			names: ['Ordre - Write', 'État - Read', 'Paramètre - Write', 'Valeur - Read', 'Texte - Write', 'Texte - Read'],

			allDatas: [],
			saveAll: true,

			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},

			table: {
				header_one: [
					{ label: 'Label', key: 'label' },
					{ label: 'Slave', key: 'slave' },
					{ label: 'Add pri', key: 'addPrim' },
					{ label: 'Add sec', key: 'addSecond' },
					{ label: 'Commandes', key: 'cmdString' },
					{ label: 'Sync', key: 'answerExpected', align: 'left' },
					{ label: 'Accès', key: 'access', align: 'left' },
					{ label: 'Délai(S)', key: 'time' },
					{ label: 'Boucles', key: 'loop' },
					{ label: 'Réponses', key: 'answerValue' },
				],
				header_two: [
					{ label: 'Label', key: 'label' },
					{ label: 'Slave', key: 'slave' },
					{ label: 'Add pri', key: 'addPrim' },
					{ label: 'Add sec', key: 'addSecond' },
					{ label: 'Commandes', key: 'cmdString' },
					{ label: 'Sync', key: 'answerExpected', align: 'center' },
					{ label: 'Type', key: 'type', align: 'center' },
					{ label: 'Accès', key: 'access', align: 'center' },
					{ label: 'Délai(S)', key: 'time' },
					{ label: 'Boucles', key: 'loop' },
					{ label: 'Réponses', key: 'answerValue' },
				],
				paginations: [
					{
						itemsPerPage: 10,
						total: 1,
					},
					{
						itemsPerPage: 10,
						total: 1,
					},
					{
						itemsPerPage: 10,
						total: 1,
					},
					{
						itemsPerPage: 10,
						total: 1,
					},
					{
						itemsPerPage: 10,
						total: 1,
					},
					{
						itemsPerPage: 10,
						total: 1,
					},
				],
				sorts: ['', '', '', '', '', ''],
			},
			refreshTable: true,

			types: [
				{ value: 'ASCII', label: 'Ascii' },
				{ value: '1B', label: '1bit' },
				{ value: '8BS', label: '8bitSign' },
				{ value: '8BNS', label: '8bitNoSign' },
				{ value: '16BS', label: '16bitSign' },
				{ value: '16BNS', label: '16bitNoSign' },
				{ value: '32BS', label: '32bitSign' },
				{ value: '32BNS', label: '32bitNoSign' },
				{ value: '32BF', label: '32bitFloat' },
			],
		};
	},
	methods: {
		createJSONItem(datas) {
			return {
				label: datas.label || '',
				shortName: datas.shortName || '',
				repeatOrder: datas.repeatOrder ? 1 : 0,
				fieldSlave: datas.fieldSlave ? 1 : 0,
				fieldAddPrim: datas.fieldAddPrim ? 1 : 0,
				fieldAddSecond: datas.fieldAddSecond ? 1 : 0,
				fieldCmdString: datas.fieldCmdString ? 1 : 0,
				when: datas.when || '1900-01-01',
				who: datas.who || '',
				comment: datas.comment || '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			if (this.saveAll) this.saveAllDatas();

			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
			return;
		},
		async getAllDatasOfProtocol(selectedId, id) {
			console.log(selectedId, id);
			this.duppId = null;
			this.loadedId = id;
			if (this.loadedId === null || this.loadedId === -1) return false;
			this.allDatas = [];
			await axios
				.get(`http://localhost:3000/stamp3drv/protocolDatas/${this.loadedId}`)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allDatas = data;
				});

			if (selectedId === -1 && id !== -1 && id !== null) {
				axios
					.get(`http://localhost:3000/stamp3ate/findNextPlugID`)
					.then((reponse) => reponse.data)
					.then((data) => {
						this.duppId = data[0].AUTO_INCREMENT;
						return true;
					});
			} else {
				return true;
			}
		},
		shouldBeDisabled(header, datas, answerEx) {
			if (header === 'slave' && !datas.fieldSlave) return true;
			if (header === 'addPrim' && !datas.fieldAddPrim) return true;
			if (header === 'addSecond' && !datas.fieldAddSecond) return true;
			if (header === 'cmdString' && !datas.fieldCmdString) return true;

			if (header === 'time' && !answerEx) return true;
			if (header === 'loop' && !answerEx) return true;
			if (header === 'answerValue' && !answerEx) return true;

			return false;
		},
		definePagination(pagi, length) {
			pagi.total = length;

			return true;
		},
		addEmptyRow(table, id) {
			table.push({});
			if (id % 2 == 1) table[table.length - 1].access = 'RD';
			if (id % 2 == 0) table[table.length - 1].access = 'WR';
			this.table.sorts[id] = '+id';
		},
		saveRow(row, i, reload) {
			let create = false;
			if ((row.id !== undefined && row.id !== null) || this.duppId !== null) {
				create = true;
			}

			let datas = {
				idProtocol: row.idProtocol || this.loadedId,
				label: row.label || '',
				slave: row.slave || '',
				addPrim: row.addPrim || '',
				addSecond: row.addSecond || '',
				access: row.access || '',
				cmdString: row.cmdString || '',
				answerExpected: row.answerExpected || 0,
				answerValue: row.answerValue || '',
				time: row.time || '',
				loop: row.loop || 0,
			};

			let queryString = '';
			if (create) {
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
		},
		deleteRow(i, id) {
			if (id < 0 || id === undefined || id === null) {
				this.allDatas[i].pop();
				return;
			}

			let queryString = '';
			switch (i) {
				case 0:
				case 1:
					queryString = `http://localhost:3000/stamp3drv/protocolBoolean/${id}`;
					break;
				case 2:
				case 3:
					queryString = `http://localhost:3000/stamp3drv/protocolData/${id}`;
					break;
				case 4:
				case 5:
					queryString = `http://localhost:3000/stamp3drv/protocolString/${id}`;
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

						this.updateDatas(i);
					} else {
						console.error('Error adding step:', response.status, response.data);
					}
				})
				.catch((error) => {
					console.error('Unexpected error:', error);
				});
		},
		async updateDatas(i) {
			let id = this.loadedId;
			let queryString = '';
			switch (i) {
				case 0:
				case 1:
					queryString = `http://localhost:3000/stamp3drv/protocolBooleans/${id}`;
					break;
				case 2:
				case 3:
					queryString = `http://localhost:3000/stamp3drv/protocolDatas/${id}`;
					break;
				case 4:
				case 5:
					queryString = `http://localhost:3000/stamp3drv/protocolStrings/${id}`;
					break;
			}
			axios
				.get(queryString)
				.then((reponse) => reponse.data)
				.then((data) => {
					switch (i) {
						case 0:
						case 1:
							this.allDatas[0] = data[0];
							this.allDatas[1] = data[1];
							break;
						case 2:
						case 3:
							this.allDatas[2] = data[0];
							this.allDatas[3] = data[1];
							break;
						case 4:
						case 5:
							this.allDatas[4] = data[0];
							this.allDatas[5] = data[1];
							break;
					}
					this.refreshTable = true;
				});
		},
		async saveAllDatas() {
			let index = 0;
			this.allDatas.forEach((all) => {
				all.forEach((e) => {
					e.idProtocol = this.loadedId;
					if (this.duppId !== null) {
						e.idProtocol = this.duppId;
					}
					this.saveRow(e, index, true);
				});
				index++;
			});
		},
	},
};
</script>
<style scoped>
.selects {
	color: #439b47;
	width: 100px;
	margin-top: -2px;
}

.selects select {
	width: 100%;
	padding: 4px 8px !important;
}

.detailsTitle {
	color: #439b47;
	font-size: 1.1rem;
	text-align: center;
	width: 100%;
	padding-bottom: 8px;

	border-bottom: 1px solid #439b47;
}

.switchDetails {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 1fr;
}

.wrapper {
	padding: 0 2rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.switchDetails .windowContent .parameter {
	padding: 0 0.1rem 1.5rem 0.1rem;
	font-size: 18px;
}

.separator {
	width: 650px;
	margin: auto;
	height: 1px;
	background: rgba(0, 0, 0, 0.208);
	margin-top: 1.5rem;
}

.separator:nth-last-child() {
	display: none;
}

td {
	font-size: 18px;
}

.text-label {
	min-width: 170px;
}
.text-cmdString {
	min-width: 130px;
}
.text-loop,
.text-time {
	width: 85px;
}

.text-type {
	width: 60px;
}
.text-answerValue {
	width: 100px;
}

.text-sync {
	padding-left: 5px;
}

.text-slave,
.text-addPrim,
.text-addSecond {
	width: 95px;
}

.text-access select {
	font-size: 1rem;
	padding: 0.15rem 0.3rem;
}

.w-input--disabled {
	position: relative;
}
.w-input--disabled::after {
	content: 'X';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	color: rgba(61, 61, 61, 0.2);
}

td {
	overflow: hidden;
}

.new {
	border: 1px solid red;
}

.inputTable {
	padding: 2px;
}

.btnRow {
	margin: 0 2px;
	padding: 2px 4px;
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
</style>
