<template>
	<div class="buttons">
		<w-tooltip v-if="displayEditBtn">
			<template #activator="{ on }">
				<w-button
					class="ma1 duplicateBtn"
					v-on="on"
					bg-color="blue-grey"
					color="white"
					:class="{ Desactiver: !active }"
					@click="confirmDuplicate.show = true"
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.33333 6.66667H6V8.66667H4V10H6V12H7.33333V10H9.33333V8.66667H7.33333V6.66667Z" fill="white" />
						<path
							d="M2.66668 14.6667H10.6667C11.402 14.6667 12 14.0687 12 13.3333V5.33333C12 4.598 11.402 4 10.6667 4H2.66668C1.93134 4 1.33334 4.598 1.33334 5.33333V13.3333C1.33334 14.0687 1.93134 14.6667 2.66668 14.6667ZM2.66668 5.33333H10.6667L10.668 13.3333H2.66668V5.33333Z"
							fill="white"
						/>
						<path
							d="M13.3333 1.33333H5.33334V2.66667H13.3333V10.6667H14.6667V2.66667C14.6667 1.93133 14.0687 1.33333 13.3333 1.33333Z"
							fill="white"
						/>
					</svg>
				</w-button>
			</template>
			Dupliquer
		</w-tooltip>
		<w-dialog v-model="confirmDuplicate.show" :width="600" title="Confirmation">
			<p class="text-center">Êtes-vous sure de vouloir dupliquer ?</p>

			<template #actions>
				<w-flex class="justify-space-evenly px-8">
					<w-button @click="confirmDuplicate.show = false" bg-color="error"> Cancel </w-button>
					<w-button @click="duplicating" bg-color="success"> Dupliquer </w-button>
				</w-flex>
			</template>
		</w-dialog>

		<w-tooltip v-if="displayEditBtn">
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
			Supprimer
		</w-tooltip>
		<w-dialog v-model="confirmDelete.show" :width="600" title="Confirmation">
			<p class="text-center">Êtes-vous sure de vouloir le supprimer ?</p>

			<template #actions>
				<w-flex class="justify-space-evenly px-8">
					<w-button @click="confirmDelete.show = false" bg-color="success"> Cancel </w-button>
					<w-button @click="deletion" bg-color="error"> Supprimer </w-button>
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
			Sauvegarder
		</w-tooltip>
		<w-dialog v-model="confirmSave.show" :width="600" title="Confirmation">
			<p class="text-center">Êtes-vous sure de vouloir sauvegarder ?</p>

			<template #actions>
				<w-flex class="justify-space-evenly px-8">
					<w-button @click="confirmSave.show = false" bg-color="error"> Cancel </w-button>
					<w-button @click="saving" bg-color="success"> Sauvegarder </w-button>
				</w-flex>
			</template>
		</w-dialog>

		<w-tooltip v-if="displayEditBtn">
			<template #activator="{ on }">
				<w-button class="ma1" v-on="on" bg-color="info" icon="wi-plus" @click="adding"></w-button>
			</template>
			Ajouter
		</w-tooltip>
	</div>
</template>

<script>
export default {
	props: {
		status: Boolean,
		displayEditBtn: Boolean,
	},
	data() {
		return {
			active: this.status,
			confirmDelete: { show: false },
			confirmSave: { show: false },
			confirmDuplicate: { show: false },
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
		duplicating() {
			this.confirmDuplicate.show = false;
			this.$emit('btn:dup');
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

.duplicateBtn {
	border-radius: 1386px;
	width: 65px;
	padding: 16px 0 !important;
}
</style>
