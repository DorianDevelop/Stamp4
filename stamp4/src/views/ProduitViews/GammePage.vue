<template>
	<Layout
		class="layout"
		routeAPI="/stamp3uut/gamme"
		:searchType="0"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-start">
					<w-input
						ref="labelInput"
						label-color="green"
						class="mb1 xs5 pa1"
						label="Label"
						:validators="[validators.required]"
						v-model="props.datas.label"
					>
					</w-input>
					<w-input label-color="green" class="mb1 xs4 pa1" label="Service" v-model="props.datas.sName"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-input label-color="green" class="mb1 xs3 pa1" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="green" class="mb1 xs3 pa1" label="Date" type="date" v-model="props.datas.when"> </w-input>
				</w-flex>

				<w-textarea
					rows="4"
					:no-autogrow="true"
					label-color="green"
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
		};
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
