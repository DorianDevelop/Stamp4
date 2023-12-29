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
				<w-flex class="py2 align-start mb1 px1" gap="3">
					<w-input ref="labelInput" label-color="green-dark1" class="xs5" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Nom court" v-model="props.datas.shortName"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.date"> </w-input>
				</w-flex>

				<div class="windowsContainer">
					<div class="window">
						<div class="windowTitle" @click="openOrdre = !openOrdre">
							<p>Ordre</p>
							<button class="icon" :class="{ opened: openOrdre }">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: ">
									<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
								</svg>
							</button>
						</div>
						<div class="windowContent" v-if="openOrdre">
							<div class="adding">
								<p class="addingLabel">Ajout de step</p>
							</div>
							<p>Details</p>
						</div>
					</div>
				</div>
				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
		</template>
	</Layout>
</template>
<script>
//import axios from 'axios';
import Layout from '@/views/ItemLayout.vue';

export default {
	components: {
		Layout,
	},
	data() {
		return {
			openOrdre: false,

			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},
		};
	},
	methods: {
		createJSONItem(datas) {
			return { datas };
		},
		validationBeforeSave(datas) {
			if (!datas.refsku || datas.refsku === '' || datas.refsku === null) return false;
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
		},
	},
};
</script>
<style scoped>
.selects {
	color: #76c76b;
	width: 200px;
}

.selects select {
	width: 100%;
}
</style>
