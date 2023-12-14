<template>
	<Layout
		class="layout"
		routeAPI="/stamp3uut/step"
		:searchType="1"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-start mb1 px1" gap="3">
					<w-input
						ref="labelInput"
						label-color="green-dark1"
						class="mb1 xs5 pa1"
						label="Label"
						:validators="[validators.required]"
						v-model="props.datas.label"
					>
					</w-input>
					<div class="selects my1 ml5">
						<p>Gammes</p>
						<select v-model="props.datas.range">
							<option v-for="item in allGammes" :key="item.id" :value="item.id">{{ item.label }}</option>
						</select>
					</div>
				</w-flex>

				<w-flex class="py2 align-start mb1 px1" gap="3">
					<w-input label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.when"> </w-input>
				</w-flex>

				<w-textarea
					rows="4"
					:no-autogrow="true"
					label-color="green-dark1"
					class="pa1 textAreaForm"
					label="Comment"
					v-model="props.datas.comment"
				>
				</w-textarea>
			</w-form>
		</template>
	</Layout>
</template>
<script>
import vSelect from 'vue-select';
import Layout from '@/views/ItemLayout.vue';
import axios from 'axios';

export default {
	components: {
		Layout,
		vSelect,
	},
	data() {
		return {
			validators: {
				required: (value) => !!value || 'This field is required',
			},
			allGammes: [],
			allSelectedSteps: [],
			allSteps: [],
			newStep: null,
			newStepNumber: 0,
		};
	},
	async mounted() {
		await axios
			.get('http://localhost:3000/stamp3uut/gammes')
			.then((reponse) => reponse.data)
			.then((data) => {
				this.allGammes = data;
			});
	},
	methods: {
		createJSONItem(datas) {
			return {
				label: datas.label,
				sName: datas.sName ? datas.sName : '',
				when: datas.when ? datas.when : '1900-01-01',
				who: datas.who ? datas.who : '',
				comment: datas.comment ? datas.comment : '',
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
