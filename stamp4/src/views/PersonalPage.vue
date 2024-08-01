<template>
	<div class="container">
		<div class="donnees">
			<p class="title">Voici vos informations personnel :</p>
			<w-input label-color="blue" class="my4" label="Votre nom" v-model="datas.label"> </w-input>
			<w-input label-color="blue" class="my4" label="Votre mot de passe (faible sécurité)" v-model="datas.pass">
			</w-input>
			<w-input label-color="blue" class="my4" label="Votre Email" v-model="datas.email" v-if="!onlyOP"> </w-input>
			<w-input label-color="blue" class="my4" label="Votre Service" v-model="datas.service"> </w-input>
			<p>
				Vous êtes : <span>{{ datas.level }}</span>
			</p>
			<w-button @click="sauvegarder" bg-color="success"> Sauvegarder </w-button>
			<w-button class="deco" @click="disconnect" bg-color="error"> Déconnexion </w-button>
		</div>
	</div>
</template>
<script>
import VueCookies from 'vue-cookies';
import axios from 'axios';

export default {
	name: 'PersonalPage',
	data() {
		return {
			TE: null,
			OP: null,

			onlyOP: false,

			datas: {},
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
		this.OP = VueCookies.get('user');
		await axios
			.get(`http://localhost:3000/stamp3/teLabel/${VueCookies.get('user').label}`)
			.then((reponse) => reponse.data)
			.then((data) => {
				if (data.length === 1) {
					this.TE = data[0];
					this.combine();
				} else {
					this.datas = this.OP
					this.onlyOP = true;
					this.datas.level = this.levels.find((item) => item.id === this.OP.level).label
				}
			});
	},
	methods: {
		combine() {
			if (this.TE.label.toLowerCase() === this.OP.label.toLowerCase()) {
				this.datas = {
					label: this.TE.label,
					pass: this.OP.pass,
					level: this.levels.find((item) => item.id === this.OP.level).label,
					service: this.TE.service || this.OP.service,
					email: this.TE.email,
				};
			}
		},
		sauvegarder() {
			let temp = new Date().toLocaleDateString('fr-FR');
			let date = temp.split('/').reverse().join('-');

			const op_datas = {
				label: this.datas.label || '',
				code: this.OP.code,
				pass: this.datas.pass || '',
				level: this.OP.level || 0,
				service: this.datas.service || '',
				date: date || '1900-01-01',
				who: this.datas.label,
				comment: this.OP.comment || '',
			};
			const te_datas = {
				label: this.datas.label,
				host: this.TE.host || '',
				email: this.datas.email || '',
				service: this.datas.service || '',
				date: date || '1900-01-01',
				who: this.datas.label,
				comment: this.TE.comment || '',
			};

			axios
				.put(`http://localhost:3000/stamp3/te/${this.TE.id}`, te_datas)
				.then((reponse) => {
					if (reponse.status === 200) console.log('TE modifié !');
				})
				.catch((error) => {
					console.error(error, 'TE failed');
					return;
				});
			axios
				.put(`http://localhost:3000/stamp3ate/user/${this.OP.id}`, op_datas)
				.then((reponse) => {
					if (reponse.status === 200) console.log('OP modifié !');
				})
				.catch((error) => {
					console.error(error, 'OP failed');
					return;
				});

			this.$waveui.notify({
				message: 'Modification reussite',
				timeout: 2000,
				bgColor: 'success',
				color: 'warning',
				dismiss: false,
				shadow: true,
				round: true,
				sm: true,
				icon: 'wi-check',
			});

			VueCookies.remove('user');
			setTimeout(() => {
				window.location.href = '/stamp4';
			}, 100);
		},
		disconnect() {
			VueCookies.remove('user');
			setTimeout(() => {
				window.location.href = '/stamp4';
			}, 100);
		}
	},
};
</script>
<style scoped>
.donnees {
	width: 70%;
	border: 1px solid black;
	border-radius: 15px;
	margin: auto;
	padding: 1.5rem 2rem;
}

.donnees p {
	color: #57aff6;
	text-align: left;
}

.donnees p span {
	color: black;
	text-transform: uppercase;
}

p.title {
	color: #00203a;
	text-align: center;
	font-size: 1.5rem;
}

.donnees .w-button {
	padding: 0.5rem 1.2rem;
	font-size: 1.2rem;
	height: auto;

	margin: 1.2rem auto 0 auto;
	display: block;
}

.deco {
	position: absolute;
	right: 2rem;
	bottom: 2rem;
}
</style>
