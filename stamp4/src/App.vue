<template>
	<div id="app" v-if="showPage">
		<HorizontalNav />
		<router-view></router-view>
	</div>
	<div v-else class="connectionPage">
		<h1>Connecter-vous !</h1>
		<p class="user_label lab">Selectionnez vous</p>
		<v-select :options="allUsers" v-model="selectedUser"></v-select>
		<p class="pass_label lab">Mot de passe</p>
		<input type="password" class="pass" name="password" required v-model="password" />
		<w-button bg-color="green" color="white" @click="connect">
			Connection </w-button>
	</div>
</template>

<script>
import HorizontalNav from '@/components/HorizontalNav.vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import vSelect from 'vue-select';

export default {
	name: 'App',
	components: {
		HorizontalNav,
		vSelect,
	},
	data() {
		return {
			showPage: false,
			allUsers: [],

			selectedUser: null,
			password: "",
		};
	},
	async created() {
		if (!VueCookies.get('user')) {
			await axios
				.get('http://localhost:3000/stamp3ate/usersNoTag')
				.then((reponse) => reponse.data)
				.then((data) => {
					this.allUsers = data
				});
		} else {
			this.showPage = true;
		}
	},
	methods: {
		connect() {
			console.log(this.selectedUser.id, this.password);
			if (this.selectedUser.id !== null && this.selectedUser.id !== -1 && this.password !== "") {
				axios
					.get(`http://localhost:3000/stamp3ate/connectUser/${this.selectedUser.id}/${this.password}`)
					.then((reponse) => reponse.data)
					.then((data) => {
						if (data.length !== 1) {
							this.$waveui.notify({
								message: 'Connection échoué',
								timeout: 2000,
								bgColor: 'error',
								color: 'warning',
								dismiss: false,
								shadow: true,
								round: true,
								sm: true,
								icon: 'wi-cross',
							});
							return;
						} else {
							this.$waveui.notify({
								message: 'Connection réussite',
								timeout: 2000,
								bgColor: 'success',
								color: 'warning',
								dismiss: false,
								shadow: true,
								round: true,
								sm: true,
								icon: 'wi-check',
							});
							VueCookies.set('user', data[0], 34560000)
							this.showPage = true;
						}
					});
			}
		}
	}
};
</script>

<style scoped>
.connectionPage {
	height: 100vh;
	display: flex;
	flex-direction: column;
	margin: auto;

	padding: 17vh 0 0 0;
	font-size: 1.2rem;
	gap: 1rem;
}

.connectionPage h1 {
	color: rgb(0, 208, 0);
	text-align: center;
}

.connectionPage .v-select {
	width: 500px !important;
}

.lab {
	margin: 1rem 0 -0.8rem 0;
}

.pass {
	border: 1px solid rgb(60, 60, 60, .26);
	border-radius: 4px;
	padding: 9px 10px;
	background: none;
}

.connectionPage .w-button {
	margin-top: 2rem;
	width: 250px !important;
	height: 40px !important;
}
</style>
