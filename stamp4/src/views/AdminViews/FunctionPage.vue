<template>
	<Layout
		class="layout"
		routeAPI="/stamp3/funct"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-start">
					<w-input
						ref="labelInput"
						label-color="red"
						class="mb1 xs6 pa1"
						label="Label"
						:validators="[validators.required]"
						v-model="props.datas.label"
					>
					</w-input>
					<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais" v-model="props.datas.label_en"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 xs3 pa1" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="red" class="mb1 xs3 pa1" label="Date" type="date" v-model="props.datas.when"> </w-input>
				</w-flex>

				<div class="selects">
					<p>Target</p>
					<select v-model="props.datas.idTarget">
						<option v-for="item in allTargets" :key="item.id" :value="item.id">{{ item.label }}</option>
					</select>
				</div>

				<w-textarea
					rows="4"
					:no-autogrow="true"
					label-color="red"
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
import axios from 'axios';
import Layout from '@/views/ItemLayout.vue';

export default {
	components: {
		Layout,
	},
	data() {
		return {
			validators: {
				required: (value) => !!value || 'This field is required',
			},
			allTargets: [],
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
		getLabelById(id) {
			let item = this.allTargets.find((item) => item.id === id);
			return item ? item.label : 'Label not found';
		},
		createJSONItem(datas) {
			console.log(datas);
			return {
				label: datas.label,
				idTarget: datas.idTarget ? datas.idTarget : 0,
				label_en: datas.label_en ? datas.label_en : '',
				who: datas.who ? datas.who : '',
				when: datas.when ? datas.when : '',
				comment: datas.comment ? datas.comment : '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			if (!datas.idTarget || datas.idTarget === null || datas.idTarget < 0) return false;
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
	color: #fa3317;
	font-size: 1rem !important;
	margin: 0 auto;
}
.selects p {
	scale: 0.9;
}

.selects select {
	margin-top: 4px;
	border: none;
	padding: 8px 16px;
	box-shadow: 0 0 2px rgba(90, 90, 90, 0.5);
}

.selects select * {
	border: none;
}
</style>
