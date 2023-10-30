<template>
	<div class="container">
		<div class="topOptions">
			<SearchBar :choices="options" :selected="selected" @update:selected="choiceChanged" />
			<ButtonBar :status="selectedId !== null" @btn:save="saveSelection" @btn:delete="deleteSelection" />
		</div>
		<slot name="content"> </slot>
	</div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import ButtonBar from '@/components/ButtonBar.vue';
import { reactive, toRefs } from 'vue';

export default {
	name: 'SimpleViewLayout',
	components: {
		SearchBar,
		ButtonBar,
	},
	data() {
		return {
			options: [],
			selected: null,
			selectedId: null,

			datas: [],
		};
	},
	provide() {
		return {
			state: this.state,
		};
	},
	setup() {
		const state = reactive({
			selectedId: null,
			datas: [],
			test: 'LOL',
		});
		return [toRefs(state)];
	},
	mounted() {
		this.getValueForSelect();
	},
	methods: {
		getValueForSelect() {
			axios
				.get('http://localhost:3000/stamp3/te')
				.then((reponse) => reponse.data)
				.then((data) => {
					this.options = data;
				});
		},
		getValueForOne(id) {
			axios
				.get('http://localhost:3000/stamp3/te/' + id)
				.then((reponse) => reponse.data[0])
				.then((data) => {
					this.datas = data;
				});
		},
		choiceChanged(val) {
			if (val == null) {
				this.selectedId = null;
				return;
			}

			this.selectedId = val.id;
			this.getValueForOne(this.selectedId);
		},
		saveSelection() {
			if (this.selectedId == null) return;
			console.log('SAVE');
		},
		deleteSelection() {
			if (this.selectedId == null) return;
			console.log('DELETE');
		},
	},
};
</script>

<style scoped>
.topOptions {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
