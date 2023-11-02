<template>
	<div class="search">
		<v-select :options="options" v-model="choice"></v-select>
	</div>
</template>

<script>
import vSelect from 'vue-select';
import axios from 'axios';

export default {
	props: {
		route: String,
		refreshSearch: Boolean,
	},
	components: {
		vSelect,
	},
	data() {
		return {
			options: [],
			selected: null,
			choice: this.selected,

			refresh: this.refreshSearch,
		};
	},
	created() {
		this.getValueForSelect();
	},
	methods: {
		async getValueForSelect() {
			await axios
				.get('http://localhost:3000' + this.route)
				.then((reponse) => reponse.data)
				.then((data) => {
					this.options = data;
				});
		},
	},
	watch: {
		choice(newVal) {
			this.$emit('update:selected', newVal);
		},
		refreshSearch(newVal) {
			this.options = [];
			this.selected = null;
			this.choice = this.selected;
			this.getValueForSelect();

			this.refresh = newVal;
		},
	},
};
</script>

<style scoped>
@import 'vue-select/dist/vue-select.css';
.search {
	width: 340px;
	background: var(--white);
	font-size: 0.8rem;

	height: 32px;
}
</style>
