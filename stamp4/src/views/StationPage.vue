<template>
	<div class="cardContainer">
		<router-link to="/station/plugins" class="card">
			<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: ">
				<path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path>
				<path d="M9.293 9.293 5.586 13l3.707 3.707 1.414-1.414L8.414 13l2.293-2.293zm5.414 0-1.414 1.414L15.586 13l-2.293 2.293 1.414 1.414L18.414 13z"></path>
			</svg>
			<p>Plugins</p>
		</router-link>
		<router-link to="/station/ates" class="card">
			<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M57.6 18C57.6 15.984 56.016 14.4 54 14.4H18C15.984 14.4 14.4 15.984 14.4 18V42.984C14.4 45 15.984 46.584 18 46.584H54C56.016 46.584 57.6 45 57.6 42.984V18ZM52.2 39.816C52.2 40.536 51.552 41.184 50.832 41.184H21.168C20.448 41.184 19.8 40.536 19.8 39.816V21.168C19.8 20.448 20.448 19.8 21.168 19.8H50.832C51.552 19.8 52.2 20.448 52.2 21.168V39.816ZM29.664 52.2C27.648 52.2 26.064 53.784 26.064 55.8V56.232C26.064 56.952 26.712 57.6 27.432 57.6H44.568C45.288 57.6 45.936 56.952 45.936 56.232V55.8C45.936 53.784 44.352 52.2 42.336 52.2H29.664Z"
					fill="black"
				/>
				<path
					d="M28.944 36.648H24.912C24.552 36.648 24.192 36.288 24.192 35.928V24.984C24.192 24.552 24.552 24.264 24.912 24.264H28.944C29.304 24.264 29.664 24.552 29.664 24.984V35.928C29.664 36.288 29.304 36.648 28.944 36.648Z"
					fill="black"
				/>
				<path
					d="M47.088 36.648H34.776C34.416 36.648 34.056 36.288 34.056 35.928V24.984C34.056 24.624 34.416 24.264 34.776 24.264H47.088C47.448 24.264 47.808 24.624 47.808 24.984V35.928C47.808 36.36 47.448 36.648 47.088 36.648Z"
					fill="black"
				/>
			</svg>

			<p>Testeurs</p>
		</router-link>
		<router-link to="/station/protocoles" class="card">
			<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1); msfilter: ">
				<path d="M21 5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5zM5 19V5h14l.002 14H5z"></path>
				<path d="M7 7h1.998v2H7zm4 0h6v2h-6zm-4 4h1.998v2H7zm4 0h6v2h-6zm-4 4h1.998v2H7zm4 0h6v2h-6z"></path>
			</svg>
			<p>Protocoles</p>
		</router-link>
		<router-link to="/station/operateurs" class="card">
			<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1); msfilter: ">
				<path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
			</svg>
			<p>Opérateurs</p>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'StationPage',
};
</script>
