<template>
	<nav>
		<div class="home">
			<a class="homeLink" href="/">
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
					<p>Plugins</p>
					<router-link to="/station/ates" class="sub-router-link">Testeurs</router-link>
					<router-link to="/station/protocoles" class="sub-router-link">Protocoles</router-link>
					<router-link to="/station/operateurs" class="sub-router-link">Opérateurs</router-link>
				</div>
			</router-link>
			<router-link to="/analyse" class="router-link">
				Analyse
				<div class="hoverLink">
					<router-link to="/analyse/raports" class="sub-router-link">Raports</router-link>
					<router-link to="/analyse/analyses" class="sub-router-link">Analyses</router-link>
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
			<p>Dorian Faure</p>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			isAdmin: true,
		};
	},
};
</script>

<style scoped>
nav {
	position: fixed;
	top: 0;
	left: 50%;

	width: 1350px;
	max-width: 100%;
	height: 35px;
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
	width: 200px;
	height: 100%;

	display: flex;
	align-items: center;
	margin-left: -0.5rem;
}

.homeLink {
	margin-left: -0.5rem;
	padding: 0 0.2rem;
}

nav img {
	max-height: 80%;
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

	padding: 0 1rem;
	cursor: pointer;

	transition: all 0.35s ease;
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

	font-size: 0.75rem;

	display: none;
}

.router-link:hover .hoverLink {
	display: flex;
}

.hoverLink .sub-router-link:hover {
	text-decoration: underline;
}
</style>
