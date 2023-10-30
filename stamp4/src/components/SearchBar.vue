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
	},
	components: {
		vSelect,
	},
	data() {
		return {
			options: [],
			selected: null,
			choice: this.selected,
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
		selected(newVal) {
			this.choice = newVal;
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
