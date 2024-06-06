<template>
	<Layout class="layout" routeAPI="/stamp3/te" :searchType="0" :formating="createJSONItem" :validation="validationBeforeSave" @update:validators="validateAll" :showBtns="showBtn">
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end">
					<w-input ref="labelInput" label-color="red" class="mb1 xs5 pa1" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input ref="hostInput" label-color="red" class="mb1 xs4 pa1" label="Host" :validators="[validators.required]" v-model="props.datas.host"> </w-input>
					<w-input label-color="red" class="mb1 xs4 pa1" label="Service" v-model="props.datas.service"> </w-input>
				</w-flex>

				<w-flex class="py2 align-end">
					<w-input label-color="red" class="mb1 xs6 pa1" label="Email" v-model="props.datas.email"> </w-input>
					<w-input label-color="red" class="mb1 xs3 pa1" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="red" class="mb1 xs3 pa1" label="Date" type="date" v-model="props.datas.date"> </w-input>
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
				host: datas.host,
				email: datas.email ? datas.email : '',
				service: datas.service ? datas.service : '',
				date: datas.date ? datas.date : '1900-01-01',
				who: datas.who ? datas.who : '',
				comment: datas.comment ? datas.comment : '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			if (!datas.host || datas.host === '' || datas.host === null) return false;
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
			this.$refs.hostInput.validate();
		},
	},
};
</script>
