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

		<router-link to="/admin/targets" class="card">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="72"
				height="72"
				viewBox="0 0 24 24"
				style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
			>
				<circle cx="12" cy="12" r="3"></circle>
				<path
					d="M13 4.069V2h-2v2.069A8.008 8.008 0 0 0 4.069 11H2v2h2.069A8.007 8.007 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
				></path>
			</svg>

			<p>Targets</p>
		</router-link>

		<router-link to="/admin/functions" class="card">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="72"
				height="72"
				viewBox="0 0 24 24"
				style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
			>
				<path
					d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"
				></path>
			</svg>

			<p>Fonctions</p>
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
