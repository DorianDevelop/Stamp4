<template>
	<div class="cardContainer">
		<router-link to="/admin/te" class="card">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="72"
				height="72"
				viewBox="0 0 24 24"
				style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
			>
				<path d="M20 18v-3a8 8 0 0 0-5-7.4V13h-1V5h-4v8H9V7.6A8 8 0 0 0 4 15v3H2v2h20v-2z"></path>
			</svg>
			<p>Ingénieurs d'essais</p>
		</router-link>

		<router-link to="/admin/errors" class="card">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="72"
				height="72"
				viewBox="0 0 24 24"
				style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
			>
				<path
					d="M16.707 2.293A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707l-5-5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"
				></path>
			</svg>

			<p>Erreurs</p>
		</router-link>

		<router-link to="/admin/values" class="card">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="72"
				height="72"
				viewBox="0 0 24 24"
				style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
			>
				<path
					d="M2 8v4.001h1V18H2v3h16l3 .001V21h1v-3h-1v-5.999h1V8L12 2 2 8zm4 10v-5.999h2V18H6zm5 0v-5.999h2V18h-2zm7 0h-2v-5.999h2V18zM14 8a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 8z"
				></path>
			</svg>

			<p>Valeurs</p>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'AdminPage',
};
</script>
<style scoped>
.cardContainer {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;

	width: 900px;
	height: calc(100vh - 35px);
	margin-top: 35px;
}

.card {
	height: 270px;
	width: 200px;
	box-shadow: 0 0 2px rgba(90, 90, 90, 0.4);
	border-radius: 25px;
	font-size: 1.5rem;
	text-align: center;

	margin: 0 0.4rem;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 2rem;
	align-items: center;
	padding-top: 3rem;

	cursor: pointer;
	transition: all 0.1s ease;
}
.card:hover {
	box-shadow: 0 0 4px rgba(90, 90, 90, 0.9);
	opacity: 0.9;
}
</style>
