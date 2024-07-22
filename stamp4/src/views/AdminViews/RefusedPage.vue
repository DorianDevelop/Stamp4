<template>
	<div class="container">
		<h1>
			Désolé <span>{{ name }}</span> mais vous n'avez pas les droits d'accès à cette page.
		</h1>
		<h2>Si vous pensez que c'est une erreur alors contacter <span>Christophe Daffos</span>.</h2>
	</div>
</template>

<script>
import VueCookies from 'vue-cookies';

export default {
	name: 'RefusedPage',
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
	gap: 1rem;
}
h1 {
	margin-top: -5rem;
}
h2 span {
	color: #23ce6b;
}
h1 span {
	color: #ce2d2d;
}
</style>
