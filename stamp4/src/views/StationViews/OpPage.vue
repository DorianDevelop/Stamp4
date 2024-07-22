<template>
	<Layout
		class="layout"
		routeAPI="/stamp3ate/user"
		:searchType="0"
		:formating="createJSONItem"
		:validation="validationBeforeSave"
		@update:validators="validateAll"
		:showBtns="showBtn"
	>
		<template #default="props">
			<w-form class="editForm">
				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input ref="labelInput" label-color="green-dark1" class="xs3" label="Label" :validators="[validators.required]" v-model="props.datas.label"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Service" v-model="props.datas.service"> </w-input>
					<v-select v-if="isAdmin" :options="levels" v-model="props.datas.level" :reduce="(level) => level.id"></v-select>
				</w-flex>

				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input label-color="green-dark1" class="xs3" label="Code" v-model="props.datas.code"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Pass" v-model="props.datas.pass"> </w-input>
				</w-flex>

				<w-flex class="py2 align-end mb1 px1" gap="3">
					<w-input label-color="green-dark1" class="xs3" label="Créateur" v-model="props.datas.who"> </w-input>
					<w-input label-color="green-dark1" class="xs3" label="Date" type="date" v-model="props.datas.date"> </w-input>
				</w-flex>

				<w-textarea rows="4" :no-autogrow="true" label-color="green-dark1" class="pa1 textAreaForm" label="Comment" v-model="props.datas.comment"> </w-textarea>
			</w-form>
		</template>
	</Layout>
</template>
<script>
import vSelect from 'vue-select';
import Layout from '@/views/ItemLayout.vue';
import { getIfAdmin } from '@/helpers/utilities.js';

export default {
	components: {
		Layout,
		vSelect,
	},
	data() {
		return {
			isAdmin: false,
			showBtn: true,
			validators: {
				required: (value) => !!value || 'This field is required',
			},
			levels: [
				{
					id: 1,
					label: 'Opérateur',
				},
				{
					id: 2,
					label: 'Technicien',
				},
				{
					id: 4,
					label: 'Admin',
				},
			],
		};
	},
	async mounted() {
		let isAdmin = await getIfAdmin();
		this.isAdmin = isAdmin;
	},
	methods: {
		createJSONItem(datas) {
			return {
				label: datas.label || '',
				code: datas.code || '',
				pass: datas.pass || '',
				level: datas.level || 0,
				service: datas.service || '',
				date: datas.date || '1900-01-01',
				who: datas.who || '',
				comment: datas.comment || '',
			};
		},
		validationBeforeSave(datas) {
			if (!datas.label || datas.label === '' || datas.label === null) return false;
			if (datas.level === 4 && !this.isAdmin) {
				this.$waveui.notify({
					message: `Vous ne pouvez pas modifier le profil d'un ADMIN en ne l'étant pas vous-même.`,
					timeout: 5000,
					bgColor: 'error',
					color: 'warning',
					dismiss: false,
					shadow: true,
					round: true,
					sm: true,
					icon: 'wi-cross',
				});
				return 'Pas les droits';
			}
			return true;
		},
		validateAll() {
			this.$refs.labelInput.validate();
		},
	},
};
</script>

<style scoped>
.v-select {
	width: 250px;
}

.v-select select {
	width: 100%;
}
</style>
