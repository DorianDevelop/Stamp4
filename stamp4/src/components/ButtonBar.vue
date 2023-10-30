<template>
	<div class="buttons">
		<w-tooltip>
			<template #activator="{ on }">
				<w-button
					class="ma1"
					v-on="on"
					bg-color="error"
					icon="wi-cross"
					:class="{ Desactiver: !active }"
					@click="confirmDelete.show = true"
				></w-button>
			</template>
			Delete
		</w-tooltip>
		<w-dialog v-model="confirmDelete.show" :width="600" title="Confirmation">
			<p class="text-center">Êtes-vous sure de vouloir le supprimer ?</p>

			<template #actions>
				<w-flex class="justify-space-evenly px-8">
					<w-button @click="confirmDelete.show = false" bg-color="success"> Cancel </w-button>
					<w-button @click="deletion" bg-color="error"> Confirm </w-button>
				</w-flex>
			</template>
		</w-dialog>

		<w-tooltip>
			<template #activator="{ on }">
				<w-button
					class="ma1"
					v-on="on"
					bg-color="success"
					icon="wi-check"
					:class="{ Desactiver: !active }"
					@click="confirmSave.show = true"
				></w-button>
			</template>
			Save
		</w-tooltip>
		<w-dialog v-model="confirmSave.show" :width="600" title="Confirmation">
			<p class="text-center">Êtes-vous sure de vouloir sauvegarder ?</p>

			<template #actions>
				<w-flex class="justify-space-evenly px-8">
					<w-button @click="confirmSave.show = false" bg-color="error"> Cancel </w-button>
					<w-button @click="saving" bg-color="success"> Confirm </w-button>
				</w-flex>
			</template>
		</w-dialog>

		<w-tooltip>
			<template #activator="{ on }">
				<w-button class="ma1" v-on="on" bg-color="info" icon="wi-plus" @click="adding"></w-button>
			</template>
			Ajout
		</w-tooltip>
	</div>
</template>

<script>
export default {
	props: {
		status: Boolean,
	},
	data() {
		return {
			active: this.status,
			confirmDelete: { show: false },
			confirmSave: { show: false },
		};
	},
	watch: {
		status(newVal) {
			this.active = newVal;
		},
	},
	methods: {
		deletion() {
			this.confirmDelete.show = false;
			this.$emit('btn:delete');
		},
		saving() {
			this.confirmSave.show = false;
			this.$emit('btn:save');
		},
		adding() {
			this.$emit('btn:add');
		},
	},
};
</script>

<style scoped>
.buttons {
	display: flex;
	align-items: center;
	justify-content: center;

	gap: 0.2rem;
}
button {
	padding: 1rem 2rem;
}
.Desactiver {
	display: none;
}
</style>
