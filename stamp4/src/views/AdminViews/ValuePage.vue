<template>
	<Layout
		class="layout"
		routeAPI="/stamp3/value"
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
						label-color="red"
						class="mb1 xs6 pa1"
						label="Label"
						:validators="[validators.required]"
						v-model="props.datas.label"
					>
					</w-input>
					<w-input type="number" label-color="red" class="mb1 xs2 pa1" label="Id Famille" v-model="props.datas.idFamily">
					</w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 pa1" label="Type" v-model="props.datas.type"> </w-input>
					<w-input label-color="red" class="mb1 pa1" label="Valeur" v-model="props.datas.value"> </w-input>
				</w-flex>
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
				idFamily: datas.idFamily ? datas.idFamily : 0,
				type: datas.type ? datas.type : '',
				value: datas.value ? datas.value : '',
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
