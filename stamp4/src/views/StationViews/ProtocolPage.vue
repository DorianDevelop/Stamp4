<template>
	<Layout class="layout" routeAPI="/stamp3drv/protocol" :searchType="0" :formating="createJSONItem"
		:validation="validationBeforeSave" @update:validators="validateAll" :showBtns="showBtn">
		<template #default="props">
			{{ duppId }} et {{ props.selectedId }}
			<w-form class="editForm">
				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input ref="labelInput" label-color="green-dark1" class="xs5" label="Label"
						:validators="[validators.required]" v-model="props.datas.label"></w-input>
					<w-input label-color="green-dark1" class="xs3" label="Nom court"
						v-model="props.datas.shortName"></w-input>
					<w-input label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"></w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date" type="date"
						v-model="props.datas.date"></w-input>
				</w-flex>
				<div class="switchDetails">
					<w-flex class="column py1 align-center mb1 px1" gap="3">
						<p class="detailsTitle">Synchronisation</p>
						<div class="wrapper">
							<w-switch class="mr4" v-model="props.datas.repeatOrder" color="green"
								label="Répétition de l'ordre" label-color="green-dark1"></w-switch>
						</div>
					</w-flex>
					<w-flex class="column py1 align-center mb1 px1" gap="3">
						<p class="detailsTitle">Adressabilité</p>
						<div class="wrapper">
							<w-switch class="mr4" v-model="props.datas.fieldSlave" color="green" label="Numéro slave"
								label-color="green-dark1"></w-switch>
							<w-switch class="mr4" v-model="props.datas.fieldAddPrim" color="green"
								label="Adresse primaire" label-color="green-dark1"></w-switch>
							<w-switch class="mr4" v-model="props.datas.fieldAddSecond" color="green"
								label="Adresse secondaire" label-color="green-dark1"></w-switch>
						</div>
					</w-flex>
					<w-flex class="column py1 align-center mb1 px1" gap="3">
						<p class="detailsTitle">Divers</p>
						<div class="wrapper">
							<w-switch class="mr4" v-model="props.datas.fieldCmdString" color="green"
								label="Chaîne de commande" label-color="green-dark1"></w-switch>
						</div>
					</w-flex>
				</div>

				<div class="windowsContainer" v-if="duppId === null">
					<div class="window" v-for="(valeurs, i) in allDatas" :key="i">
						<div class="windowTitle" @click="toggleOpen(i)">
							<p>{{ names[i] }}</p>
							<button class="icon" :class="{ opened: opens[i] }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
									style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z">
									</path>
								</svg>
							</button>
						</div>
						<div class="windowContent" v-if="opens[i]">
							<div class="parameter" v-if="refreshTable">
								<w-button class="mb3" bg-color="green-dark1" color="white"
									@click="addEmptyRow(valeurs, i)">
									<w-icon class="mr1">wi-plus</w-icon>
									Ajout d'une ligne
								</w-button>
								<w-table :headers="getTableHeaders(i)" :items="valeurs" fixed-headers
									:sort="table.sorts[i]">
									<template #item="{ item }">
										<tr>
											<td v-for="(header, x) in getTableHeaders(i)" :key="x" class="inputTable"
												:class="`text-${header.key}`">
												<w-input v-if="!isSelectOrSwitch(header)" v-model="item[header.key]"
													:disabled="shouldBeDisabled(header.key, props.datas, item.answerExpected)"></w-input>
												<select v-else-if="header.key === 'access'" v-model="item[header.key]">
													<option value="WR">Write</option>
													<option value="RD">Read</option>
												</select>
												<select v-else-if="header.key === 'type'" v-model="item[header.key]"
													:class="`text-${header.key}`">
													<option v-for="t in types" :key="t.value" :value="t.value">
														{{ t.label }}
													</option>
												</select>
												<w-switch v-else v-model="item[header.key]" color="green"
													class="text-sync"></w-switch>
											</td>
											<td>
												<w-flex>
													<w-button class="btnRow" bg-color="error" icon="wi-cross"
														@click="deleteRow(i, item.id)"></w-button>
													<w-button class="btnRow" bg-color="success" icon="wi-check"
														@click="saveRow(item, i, true)"></w-button>
												</w-flex>
											</td>
										</tr>
									</template>
								</w-table>
							</div>
						</div>
					</div>
				</div>
				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm"
					label="Comment" v-model="props.datas.comment"></w-textarea>
			</w-form>
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
	props: {
		selectedId: {
			type: Number,
			default: -1,
		},
		datas: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			loadedId: null,
			duppId: null,
			opens: [false, false, false, false, false, false],
			names: [
				'Ordre - Write',
				'État - Read',
				'Paramètre - Write',
				'Valeur - Read',
				'Texte - Write',
				'Texte - Read',
			],
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
	},/*
	watch: {
		selectedId: {
			immediate: true,
			handler(newValue) {
				this.loadInitialData(newValue, this.datas.id || -1);
			},
		},
		'datas.id': {
			immediate: true,
			handler(newValue) {
				this.loadInitialData(this.selectedId, newValue);
			},
		},
	},*/
	methods: {
		async loadInitialData(selectedId, id) {
			console.log(selectedId, id);
			//await this.getAllDatasOfProtocol(selectedId, id);
		},
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
			if (!datas.label) return false;
			if (this.saveAll) this.saveAllDatas();
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
		},
		async getAllDatasOfProtocol(selectedId, id) {
			this.duppId = null;
			this.loadedId = id;
			if (this.loadedId === null || this.loadedId === -1) return false;
			try {
				const response = await axios.get(
					`http://localhost:3000/stamp3drv/protocolDatas/${this.loadedId}`
				);
				this.allDatas = response.data;
				if (selectedId === -1 && id !== -1 && id !== null) {
					const nextIdResponse = await axios.get(
						`http://localhost:3000/stamp3ate/findNextPlugID`
					);
					this.duppId = nextIdResponse.data[0].AUTO_INCREMENT;
				}
			} catch (error) {
				console.error('Error fetching data:', error);
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
		addEmptyRow(table, id) {
			table.push({});
			table[table.length - 1].access = id % 2 === 0 ? 'WR' : 'RD';
			this.table.sorts[id] = '+id';
		},
		async saveRow(row, i, reload) {
			const isCreate = row.id === undefined || row.id === null || this.duppId !== null;
			const datas = {
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
			let url = '';
			if (isCreate) {
				switch (i) {
					case 0:
					case 1:
						datas['complement'] = row.complement;
						url = `http://localhost:3000/stamp3drv/protocolBoolean/${row.id}`;
						break;
					case 2:
					case 3:
						datas['type'] = row.type;
						url = `http://localhost:3000/stamp3drv/protocolData/${row.id}`;
						break;
					case 4:
					case 5:
						url = `http://localhost:3000/stamp3drv/protocolString/${row.id}`;
						break;
				}
				await axios.put(url, datas);
			} else {
				switch (i) {
					case 0:
					case 1:
						datas['complement'] = row.complement;
						url = `http://localhost:3000/stamp3drv/protocolBoolean`;
						break;
					case 2:
					case 3:
						datas['type'] = row.type;
						url = `http://localhost:3000/stamp3drv/protocolData`;
						break;
					case 4:
					case 5:
						url = `http://localhost:3000/stamp3drv/protocolString`;
						break;
				}
				await axios.post(url, datas);
			}
			if (reload) {
				this.$waveui.notify({
					message: isCreate ? 'Création réussie' : 'Modification réussie',
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
		},
		async deleteRow(i, id) {
			if (id === undefined || id === null) {
				this.allDatas[i].pop();
				return;
			}
			let url = '';
			switch (i) {
				case 0:
				case 1:
					url = `http://localhost:3000/stamp3drv/protocolBoolean/${id}`;
					break;
				case 2:
				case 3:
					url = `http://localhost:3000/stamp3drv/protocolData/${id}`;
					break;
				case 4:
				case 5:
					url = `http://localhost:3000/stamp3drv/protocolString/${id}`;
					break;
			}
			await axios.delete(url);
			this.$waveui.notify({
				message: 'Suppression réussie',
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
		},
		async updateDatas(i) {
			let url = '';
			switch (i) {
				case 0:
				case 1:
					url = `http://localhost:3000/stamp3drv/protocolBooleans/${this.loadedId}`;
					break;
				case 2:
				case 3:
					url = `http://localhost:3000/stamp3drv/protocolDatas/${this.loadedId}`;
					break;
				case 4:
				case 5:
					url = `http://localhost:3000/stamp3drv/protocolStrings/${this.loadedId}`;
					break;
			}
			const response = await axios.get(url);
			this.allDatas[i] = response.data;
		},
		async saveAllDatas() {
			let index = 0;
			this.allDatas.forEach((all) => {
				all.forEach((e) => {
					e.idProtocol = this.loadedId || this.duppId;
					this.saveRow(e, index, true);
				});
				index++;
			});
		},
		toggleOpen(index) {
			this.opens[index] = !this.opens[index];
		},
		getTableHeaders(index) {
			return index === 2 || index === 3 ? this.table.header_two : this.table.header_one;
		},
		isSelectOrSwitch(header) {
			return ['access', 'answerExpected', 'type'].includes(header.key);
		},
	},
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>

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
