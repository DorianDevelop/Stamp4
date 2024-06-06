<template>
	<section id="container">
		<header class="header">
			<img src="@/assets/apc.jpg" alt="" />
			<div class="textes">
				<h2>STAMP3 - REPAIR Universal Test Equipment</h2>
				<h1>Specification Report</h1>
			</div>
			<h1 class="big_h1">BE325-IT</h1>
		</header>
		<section class="intro">
			<h1>SKU ref: BE325-IT</h1>
			<h2>Test Sequence: Unit Hypot Functional Test</h2>
			<h3>Stauts = Qualified</h3>
			<p>No start date</p>
			<p>No end date</p>
			<i>Writtent By:</i><br />
			<i>Last revision: 2019-02-12</i>
		</section>
		<section class="base">
			<p>Topology: Single</p>
			<p>Power: 325 VA</p>
			<p></p>
			<p>Autonomy: Unspecified</p>
			<p>Voltage: 230 V</p>
			<p>Frequency: Unspecified</p>
		</section>
		<section class="variables">
			<h3>Product variables</h3>
			<div class="categories">
				<h4>UUT</h4>
				<div class="cat">
					<p>SCAN_REF = BE325-IT</p>
					<p>UUT_TOPO = 1</p>
					<p>UUT_DESIGN = Free</p>
					<p></p>
					<p>UUT_POWER = 325</p>
					<p>UUT_BACKUP = Free</p>
					<p>UUT_VOLT = 230</p>
					<p>UUT_FREQ = Free</p>
					<p>UUT_MODEL = Free</p>
					<p>UUT_PNP = Free</p>
					<p>UUT_FIRM = Free</p>
					<p>UUT_SKU = Free</p>
				</div>
				<h4>HIPOT</h4>
				<div class="cat">
					<p>HI_VOLT = 1500</p>
					<p>HI_AMPS = 25</p>
					<p>HI_TIME = 1.0</p>
					<p>HI_RAMP = 1.0</p>
					<p>HIS_VOLT = Free</p>
					<p>HIS_AMPS = Free</p>
					<p>HIS_TIME = Free</p>
					<p>HIS_RAMP = Free</p>
					<p>HIF_VOLT = Free</p>
					<p>HIF_AMPS = Free</p>
					<p>HIF_TIME = Free</p>
					<p>HIF_RAMP = Free</p>
				</div>
				<h4>GROUND</h4>
				<div class="cat">
					<p>GND_AMPS = 25</p>
					<p>GND_OHMS = 180</p>
					<p>GND_TIME = 1.0</p>
					<p></p>
					<p>CONT_AMPS = Free</p>
					<p>CONT_OHMS = Free</p>
					<p>CONT_TIME = Free</p>
					<p></p>
				</div>
				<h4>MAINS 1</h4>
				<div class="cat">
					<p>MAIN1_U = Free</p>
					<p>MAIN1_UMAX = Free</p>
					<p>MAIN1_UMIN = Free</p>
					<p></p>
					<p>MAIN1_IMAX = Free</p>
					<p>MAIN1_YIELD = Free</p>
					<p>MAIN1_THDI = Free</p>
				</div>
				<h4>MAINS 2</h4>
				<div class="cat">
					<p>MAIN2_U = Free</p>
					<p>MAIN2_UMAX = Free</p>
					<p>MAIN2_UMIN = Free</p>
					<p></p>
					<p>MAIN2_IMAX = Free</p>
					<p>MAIN2_YIELD = Free</p>
					<p>MAIN2_THDI = Free</p>
				</div>
				<h4>OUTPUT</h4>
				<div class="cat">
					<p>OUT_U = Free</p>
					<p>OUT_UTOL = Free</p>
					<p>OUT_THDU = Free</p>
					<p>OUT_UDC = Free</p>
					<p>OUT_F = Free</p>
					<p>OUT_FTOL = 10</p>
					<p></p>
					<p></p>
					<p>OUT_VA = Free</p>
					<p>OUT_W = 175</p>
					<p>OUT_COSPHI = 50</p>
				</div>
				<h4>BATTERY</h4>
				<div class="cat">
					<p>BAT_U = Free</p>
					<p>BAT_U_MAX = Free</p>
					<p>BAT_U_MIN = Free</p>
					<p></p>
					<p>BAT_AH = Free</p>
					<p>BAT_LIFE = Free</p>
					<p>BAT_BRANCH = Free</p>
					<p>BAT_C1 = Free</p>
					<p>BAT_C2 = Free</p>
					<p>BAT_C3 = Free</p>
					<p>BAT_C4 = Free</p>
					<p>CHRG_U = Free</p>
					<p>CHRG_I = Free</p>
					<p>CHRG_T = Free</p>
				</div>
			</div>
		</section>
		<section class="specification">
			<h2>Begin of Test Specification</h2>
			<div class="spes">
				<h4>[010|00] _START_Test</h4>
				<div class="spe">
					<h5>[10] - test</h5>
					<div>
						<p>[10] [ DIV | MISC | TIME | NOW ] %Y_%j, An_Jour</p>
						<p>[11] [ DIV | MISC | TIME | NOW ] %j, JourNum</p>
						<p>[20] [ DIV | MISC | REC | FILEEXIST ] c:\autotest\, ~An_Jour~, TESTDONE, 1</p>
						<p>[25] [ DIV | MISC | JUMP | END ]</p>
						<p>[26] [ DIV | MISC | JUMP | SET ] TESTDONE</p>
						<p>[30] [ DIV | USER | GUI | VALID ] Title en, Controle fonctionnement barriere, Title xx, c:\Autotest\Testbarriere.jpg</p>
						<p>[40] [ DIV | MISC | REC | WRITECSV ] c:\\autotest, ~JourNum~, Test barriere, ~An_Jour~, ,</p>
					</div>
					<h5>[20] - Display Connexion</h5>
					<div>
						<p>
							[10] [ DIV | USER | GUI | VALID ] Product â€™~SCAN_REF~â€™ connexion, Raccordement du produit â€™~SCAN_REF~â€™, Title xx, S:\Customer Network
							Solution\Bitmaps\UnitHypotFunction
						</p>
					</div>
				</div>
			</div>
			<h2>End of Test Specification</h2>
		</section>
	</section>
</template>

<script>
export default {};
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

#container {
	max-width: 800px;
	margin: auto;
	font-size: 14px;
}

.header {
	width: 100%;
	height: 70px;
	background: #00a64f;

	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 2rem;

	padding: 0 5rem;
	margin: 1rem 0;
	color: white;
	font-size: 14px;
}
.header img {
	height: 100%;
	border-left: 3px solid white;
	border-right: 2px solid white;
}
.header .textes {
	font-size: 14px;
}
.header .big_h1 {
	font-size: 3rem;
}

.intro {
	padding: 0 2rem;
	margin-top: 1.5rem;
}
.intro h1 {
	font-size: 2rem;
}
.intro h2 {
	font-size: 1.5rem;
}
.intro h3 {
	text-decoration: underline;
	color: green;
}

.base {
	margin: 1.5rem 0;
	border-top: 1px solid #00a64f;
	border-bottom: 1px solid #00a64f;

	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	row-gap: 1.5rem;

	text-align: center;

	width: 100%;
	padding: 1rem 0;
	font-size: 14px;
}
.variables {
	padding: 0 2rem;
}

.variables h3 {
	font-weight: normal;
	text-decoration: underline;
	margin-bottom: 1.5rem;
}
.categories {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	gap: 0.5rem;
}
.categories .cat {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 1fr);
	row-gap: 1rem;

	text-align: left;
	width: 100%;

	padding: 0 4rem;
}
.categories h4 {
	margin-top: 0.7rem;
	text-decoration: underline;
	text-transform: uppercase;
}

.specification {
	border-bottom: 1px solid #00a64f;
	padding: 0 1rem 4rem 1rem;
	margin: 5rem 0;
}
.specification h2 {
	font-size: 1.5rem;
	margin: 2rem 0;
}
.specification h4 {
	font-size: 1.1rem;
	padding: 1rem 1.5rem 0rem 1.5rem;
}
.spe h5 {
	padding: 1rem 2rem 0.5rem 2rem;
}
.spe p {
	padding: 0 4rem;
}
</style>
