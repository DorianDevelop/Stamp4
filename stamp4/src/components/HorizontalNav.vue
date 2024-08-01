<template>
	<nav>
		<div class="home">
			<a class="homeLink" href="/stamp4">
				<img src="@/assets/icons/home.svg" alt="home icon" />
			</a>
		</div>
		<div class="links">
			<router-link to="/produit" class="router-link">
				Produit
				<div class="hoverLink">
					<router-link to="/produit/gammes" class="sub-router-link">Gammes</router-link>
					<router-link to="/produit/uuts" class="sub-router-link">UUT</router-link>
					<router-link to="/produit/specs" class="sub-router-link">Spec</router-link>
					<router-link to="/produit/sequences" class="sub-router-link">Sequences</router-link>
				</div>
			</router-link>
			<router-link to="/station" class="router-link">
				Station
				<div class="hoverLink">
					<router-link to="/station/plugins" class="sub-router-link">Plugins</router-link>
					<router-link to="/station/ates" class="sub-router-link">Testeurs</router-link>
					<router-link to="/station/protocoles" class="sub-router-link">Protocoles</router-link>
					<router-link to="/station/operateurs" class="sub-router-link">Opérateurs</router-link>
				</div>
			</router-link>
			<router-link to="/analyse" class="router-link">
				Analyse
				<div class="hoverLink">
					<router-link to="/analyse/rapports" class="sub-router-link">Rapports</router-link>
				</div>
			</router-link>

			<router-link to="/admin" v-if="isAdmin" class="adminLink router-link">
				A.D.M.I.N
				<div class="hoverLink">
					<router-link to="/admin/te" class="sub-router-link">TE</router-link>
					<router-link to="/admin/errors" class="sub-router-link">Erreurs</router-link>
					<router-link to="/admin/values" class="sub-router-link">Valeurs</router-link>
					<router-link to="/admin/cibles" class="sub-router-link">Cibles</router-link>
					<router-link to="/admin/fonctions" class="sub-router-link">Fonctions</router-link>
					<router-link to="/admin/organs" class="sub-router-link">Organs</router-link>
					<router-link to="/admin/actions" class="sub-router-link">Actions</router-link>
				</div>
			</router-link>
		</div>
		<div class="account">
			<router-link to="/personal" class="sub-router-link">{{ username }}</router-link>
		</div>
	</nav>
</template>

<script>
import VueCookies from 'vue-cookies';
import { getIfAdmin } from '@/helpers/utilities.js';
export default {
	data() {
		return {
			isAdmin: false,
			username: 'Unknown',
		};
	},
	async mounted() {
		let isAdmin = await getIfAdmin();
		this.isAdmin = isAdmin;

		this.username = VueCookies.get('user').label;
	},
};
</script>

<style scoped>
nav {
	position: fixed;
	top: 0;
	left: 50%;

	width: 1900px;
	max-width: 100%;
	height: 45px;
	transform: translateX(-50%);

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0px 1rem;

	border-bottom: 1px solid rgba(90, 90, 90, 0.5);
	background: #ffffff;
	z-index: 499;
}

.home {
	width: 250px;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.homeLink {
	margin-left: -0.5rem;
	padding: 0 0.2rem;
}

nav img {
	max-height: 120%;
}

.links {
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
}

.homeLink,
.router-link {
	height: 100%;
	display: flex;
	align-items: center;

	padding: 0.5rem 2.5rem;
	font-size: 1.2rem;
	cursor: pointer;

	transition: all 0.35s ease;
}

.home .homeLink {
	padding: 0;
}

.homeLink:hover,
.router-link:hover {
	background: var(--smoked-white);
}

.router-link {
	position: relative;
}

.router-link-active.router-link {
	background: var(--emerald);
	color: var(--white);
}

.router-link-active.router-link:hover {
	background: var(--darker-emerald) !important;
}

.adminLink {
	color: var(--red);
}

.router-link-active.adminLink {
	background: var(--red);
	color: var(--white);
}

.router-link-active.adminLink:hover {
	background: var(--darker-red) !important;
}

.account {
	width: 200px;
	text-align: right;
	color: var(--darker-emerald);

	cursor: pointer;
}

.hoverLink {
	position: absolute;
	top: 100%;
	left: 0;

	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	width: 100%;
	padding: 1rem 0.5rem;

	background: inherit;
	color: inherit;

	border: 1px solid var(--black);
	border-top: none;

	font-size: 1rem;

	display: none;
}

.router-link:hover .hoverLink {
	display: flex;
}

.hoverLink .sub-router-link:hover {
	text-decoration: underline;
}
</style>
