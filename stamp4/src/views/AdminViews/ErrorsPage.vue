<template>
	<Layout
		class="layout"
		routeAPI="/stamp3/error"
		:searchType="0"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-start">
					<w-input type="number" label-color="red" class="mb1 xs2 pa1" label="ApcNo" v-model="props.datas.apcNo"> </w-input>
					<w-input ref="codeInput" type="number" label-color="red" class="mb1 xs2 pa1" label="Code" v-model="props.datas.code" :validators="[validators.required]"> </w-input>
					<w-input ref="labelInput" label-color="red" class="mb1 xs5 pa1" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-input label-color="red" class="mb1 xs3 pa1" label="Function" v-model="props.datas.function"> </w-input>
					<w-input label-color="red" class="mb1 xs2 pa1" label="HelpF" v-model="props.datas.helpF"> </w-input>
					<w-input label-color="red" class="mb1 xs2 pa1" label="HelpS" v-model="props.datas.helpS"> </w-input>
					<w-input type="number" label-color="red" class="mb1 xs2 pa1" label="Level" v-model="props.datas.level"> </w-input>
					<w-input label-color="red" class="mb1 xs2 pa1" label="Module" v-model="props.datas.module"> </w-input>
				</w-flex>

				<w-flex class="py2 align-start">
					<w-textarea rows="5" :no-autogrow="true" label-color="red" class="pa1 textAreaForm" label="Message Français" v-model="props.datas.msgFR"> </w-textarea>
					<w-textarea rows="5" :no-autogrow="true" label-color="red" class="pa1 textAreaForm" label="Message Anglais" v-model="props.datas.msgEN"> </w-textarea>
				</w-flex>

				<w-textarea label-color="red" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
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
				code: datas.code,
				apcNo: datas.apcNo ? datas.apcNo : 0,
				function: datas.function ? datas.function : '',
				helpF: datas.helpF ? datas.helpF : '',
				helpS: datas.helpS ? datas.helpS : '',
				level: datas.level ? datas.level : 0,
				module: datas.module ? datas.module : '',
				msgEN: datas.msgEN ? datas.msgEN : '',
				msgFR: datas.msgFR ? datas.msgFR : '',
				comment: datas.comment ? datas.comment : '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			if (!datas.code || datas.code === null) return false;
			return true;
		},
		validateAll() {
			this.$refs.codeInput.validate();
			this.$refs.labelInput.validate();
		},
	},
};
</script>
