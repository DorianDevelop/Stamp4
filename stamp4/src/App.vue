<template>
	<div id="app" v-if="showPage">
		<HorizontalNav />
		<router-view></router-view>
	</div>
	<div v-else-if="!showMissingUser && !showPage" class="loadingPage">
		<h1>Connection...</h1>
	</div>
	<div v-else class="loadingPage">
		<h1><span>Utilisateur inconnue</span></h1>
		<h2>Merci de contacter <span>Christophe Daffos</span> pour qu'il vous ajoute.</h2>
		<h2>
			Voici votre hostname : <span>{{ hostname }}</span>
		</h2>
	</div>
</template>

<script>
import HorizontalNav from '@/components/HorizontalNav.vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
	name: 'App',
	components: {
		HorizontalNav,
	},
	data() {
		return {
			showPage: false,
			showMissingUser: false,

			hostname: null,
		};
	},
	async created() {
		if (!VueCookies.get('user')) {
			await axios
				.get('http://localhost:3000/stamp3/connect')
				.then((reponse) => reponse.data)
				.then((data) => {
					if (data.length !== 1) {
						this.showMissingUser = true;
						this.showPage = false;

						axios
							.get('http://localhost:3000/stamp3/hostname')
							.then((reponse) => reponse.data)
							.then((data) => {
								this.hostname = data.hostname;
							});
					} else {
						VueCookies.set('user', data[0], 604000);
						this.showPage = true;
						this.showMissingUser = false;
					}
				});
		} else {
			this.showPage = true;
			this.showMissingUser = false;
		}
	},
};
</script>

<style scoped>
.loadingPage {
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	text-align: center;

	font-size: 1.2rem;
	gap: 1rem;
}

.loadingPage span {
	color: #ce2d2d;
}
</style>
