<template>
	<Layout
		class="layout"
		routeAPI="/stamp3/target"
		:searchType="0"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-start">
					<w-input ref="labelInput" label-color="red" class="mb1 xs6 pa1" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input label-color="red" class="mb1 xs6 pa1" label="Label Anglais" v-model="props.datas.label_en"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 xs3 pa1" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="red" class="mb1 xs3 pa1" label="Date" type="date" v-model="props.datas.when"> </w-input>
				</w-flex>

				<w-textarea rows="4" :no-autogrow="true" label-color="red" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
		</template>
	</Layout>
</template>
<script>
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
		};
	},
	methods: {
		createJSONItem(datas) {
			return {
				label: datas.label,
				label_en: datas.label_en ? datas.label_en : '',
				who: datas.who ? datas.who : '',
				when: datas.when ? datas.when : '',
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
