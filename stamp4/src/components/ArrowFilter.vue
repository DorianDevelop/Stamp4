<template>
	<div class="empty">
		<p>
			Filtrer votre rechercher avec <span>{{ mot }}</span
			>.
		</p>
		<svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M10.2628 0.4561C10.0416 0.531723 9.8237 0.608856 9.60932 0.687302C6.88795 1.68309 4.72639 2.88815 3.24382 3.84528C2.55464 4.29021 2.01164 4.68192 1.62675 4.97467L1.76487 2.39922C1.77618 2.18806 1.61456 2.00467 1.40387 1.98961C1.19316 1.97453 1.01318 2.1335 1.00184 2.34467L0.817302 5.78577C0.80598 5.99693 0.967601 6.18033 1.17831 6.19539L4.61187 6.4409C4.82258 6.45598 5.00257 6.297 5.0139 6.08583C5.02522 5.87468 4.8636 5.69128 4.65289 5.67622L2.21031 5.50156C2.57237 5.23016 3.06025 4.88268 3.66522 4.49211C5.11094 3.55878 7.22284 2.38118 9.88215 1.4081C10.0626 1.34209 10.2455 1.27701 10.4309 1.21301L10.2628 0.4561Z"
				fill="black"
			/>
		</svg>
	</div>
</template>
<script>
export default {
	props: {
		adjectif: String,
		mot: String,
	},
};
</script>
<style scoped>
.empty {
	position: absolute;
	top: 60px;
	font-weight: 500;
	font-size: 18px;
}
.empty span {
	color: var(--darker-red);
}
</style>
