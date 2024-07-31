<template>
	<div class="container">
		<div class="donnees">
			<p class="title">Voici vos informations personnel :</p>
			<w-input label-color="blue" class="my4" label="Votre nom" v-model="datas.label"> </w-input>
			<w-input label-color="blue" class="my4" label="Nom de votre PC" v-model="datas.host"> </w-input>
			<w-input label-color="blue" class="my4" label="Votre Email" v-model="datas.email"> </w-input>
			<w-input label-color="blue" class="my4" label="Votre Service" v-model="datas.service"> </w-input>
			<p>
				Vous êtes : <span>{{ datas.level }}</span>
			</p>
			<w-button @click="sauvegarder" bg-color="success"> Sauvegarder </w-button>
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
		await axios
			.get(`http://10.192.136.74:3000/stamp3ate/isAdmin/${VueCookies.get('user').label}`)
			.then((reponse) => reponse.data)
			.then((data) => {
				if (data.length === 1) {
					this.OP = data[0];
				} else {
					console.error("Nombre d'utilisateur dans Opérateur incorrect");
				}
			});
		await axios
			.get(`http://10.192.136.74:3000/stamp3/connect`)
			.then((reponse) => reponse.data)
			.then((data) => {
				if (data.length === 1) {
					this.TE = data[0];
					this.combine();
				} else {
					console.error("Nombre d'utilisateur dans TE incorrect");
				}
			});
	},
	methods: {
		combine() {
			if (this.TE.label.toLowerCase() === this.OP.label.toLowerCase()) {
				this.datas = {
					label: this.TE.label,
					host: this.TE.host,
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
				code: this.OP.code || '',
				pass: this.OP.pass || '',
				level: this.OP.level || 0,
				service: this.datas.service || '',
				date: date || '1900-01-01',
				who: this.datas.label,
				comment: this.OP.comment || '',
			};
			const te_datas = {
				label: this.datas.label,
				host: this.datas.host,
				email: this.datas.email || '',
				service: this.datas.service || '',
				date: date || '1900-01-01',
				who: this.datas.label,
				comment: this.TE.comment || '',
			};

			axios
				.put(`http://10.192.136.74:3000/stamp3/te/${this.TE.id}`, te_datas)
				.then((reponse) => {
					if (reponse.status === 200) console.log('TE modifié !');
				})
				.catch((error) => {
					console.error(error, 'TE failed');
					return;
				});
			axios
				.put(`http://10.192.136.74:3000/stamp3ate/user/${this.OP.id}`, op_datas)
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
				window.location.href = '/';
			}, 100);
		},
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
	padding: 0.5rem 1.5rem;
	font-size: 1.5rem;
	height: auto;

	margin: 1.5rem auto 0 auto;
	display: block;
}
</style>
