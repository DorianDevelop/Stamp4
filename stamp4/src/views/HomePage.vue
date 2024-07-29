<template>
	<div class="container">
		<img src="@/assets/icons/home.svg" alt="home icon" />
		<h1>
			Bienvenue <span>{{ name }}</span> !
		</h1>
		<p>Si vous rencontrer un seul problème, n'hésitez pas à contacter <br /><span>Christophe Daffos</span>.</p>
	</div>
</template>

<script>
import VueCookies from 'vue-cookies';

export default {
	name: 'HomePage',
	data() {
		return {
			name: '',
		};
	},
	mounted() {
		this.name = VueCookies.get('user').label;
	},
};
</script>
<style scoped>
.container {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	text-align: center;

	font-size: 1.2rem;
	gap: 2rem;

	position: relative;
}

h1 span {
	color: #23ce6b;
}

p {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 2rem;
}

p span {
	color: #23ce6b;
}

img {
	margin-top: -10rem;
	width: 170px;
}
</style>
