const Joi = require('joi');

//#region Gamme
const gammeSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(64).required(),
	sName: Joi.string().max(64).allow(null, '').default(''),
	when: Joi.date().allow(null).default('1900-01-01'),
	who: Joi.string().max(64).allow(null, '').default(''),
	comment: Joi.string().max(1024).allow(null, '').default(''),
});

exports.validateGamme = (req, res, next) => {
	const { error } = gammeSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion

//#region UUT
const uutSchema = Joi.object({
	id: Joi.number(),
	refsku: Joi.string().required(),
	qualified: Joi.boolean().allow(null).default(0),
	range: Joi.number().allow(null).default(0),
	dateStart: Joi.date().allow(null).default('1900-01-01'),
	dateEnd: Joi.date().allow(null).default('1900-01-01'),
	date: Joi.date().allow(null).default('1900-01-01'),
	who: Joi.string().max(25).allow(null, '').default(''),
	comment: Joi.string().allow(null, '').default('').max(1024),
	reference: Joi.string().max(32).allow(null, '').default(''),
	serial: Joi.string().allow(null, '').default('').max(32),
	topo: Joi.number().allow(null).default(0),
	design: Joi.string().max(64).allow(null, '').default(''),
	power: Joi.string().max(10).allow(null, '').default(''),
	backup: Joi.string().max(5).allow(null, '').default(''),
	volt: Joi.string().max(10).allow(null, '').default(''),
	freq: Joi.string().max(5).allow(null, '').default(''),
	model: Joi.string().max(25).allow(null, '').default(''),
	pnp: Joi.string().max(25).allow(null, '').default(''),
	firm: Joi.string().max(25).allow(null, '').default(''),
	sku: Joi.string().max(25).allow(null, '').default(''),
	hiVolt: Joi.string().max(8).allow(null, '').default(''),
	hiAmps: Joi.string().max(8).allow(null, '').default(''),
	hiTime: Joi.string().max(8).allow(null, '').default(''),
	hiRamp: Joi.string().max(8).allow(null, '').default(''),
	hisVolt: Joi.string().max(8).allow(null, '').default(''),
	hisAmps: Joi.string().max(8).allow(null, '').default(''),
	hisTime: Joi.string().max(8).allow(null, '').default(''),
	hisRamp: Joi.string().max(8).allow(null, '').default(''),
	hifVolt: Joi.string().max(8).allow(null, '').default(''),
	hifAmps: Joi.string().max(8).allow(null, '').default(''),
	hifTime: Joi.string().max(8).allow(null, '').default(''),
	hifRamp: Joi.string().max(8).allow(null, '').default(''),
	gndAmps: Joi.string().max(8).allow(null, '').default(''),
	gndOhms: Joi.string().max(8).allow(null, '').default(''),
	gndTime: Joi.string().max(8).allow(null, '').default(''),
	contAmps: Joi.string().max(8).allow(null, '').default(''),
	contOhms: Joi.string().max(8).allow(null, '').default(''),
	contTime: Joi.string().max(8).allow(null, '').default(''),
	main1U: Joi.string().max(8).allow(null, '').default(''),
	main1Umaxi: Joi.string().max(8).allow(null, '').default(''),
	main1Umini: Joi.string().max(8).allow(null, '').default(''),
	main1Yield: Joi.string().max(8).allow(null, '').default(''),
	main1Imaxi: Joi.string().max(8).allow(null, '').default(''),
	main1Thdi: Joi.string().max(8).allow(null, '').default(''),
	main2U: Joi.string().max(8).allow(null, '').default(''),
	main2Umaxi: Joi.string().max(8).allow(null, '').default(''),
	main2Umini: Joi.string().max(8).allow(null, '').default(''),
	main2Yield: Joi.string().max(8).allow(null, '').default(''),
	main2Imaxi: Joi.string().max(8).allow(null, '').default(''),
	main2Thdi: Joi.string().max(8).allow(null, '').default(''),
	outU: Joi.string().max(8).allow(null, '').default(''),
	outUtol: Joi.string().max(8).allow(null, '').default(''),
	outThdu: Joi.string().max(8).allow(null, '').default(''),
	outUdc: Joi.string().max(8).allow(null, '').default(''),
	outF: Joi.string().max(8).allow(null, '').default(''),
	outFtol: Joi.string().max(8).allow(null, '').default(''),
	outVA: Joi.string().max(8).allow(null, '').default(''),
	outW: Joi.string().max(8).allow(null, '').default(''),
	outPhi: Joi.string().max(8).allow(null, '').default(''),
	batU: Joi.string().max(8).allow(null, '').default(''),
	batUmaxi: Joi.string().max(8).allow(null, '').default(''),
	batUmini: Joi.string().max(8).allow(null, '').default(''),
	batAH: Joi.string().max(8).allow(null, '').default(''),
	batLife: Joi.string().max(8).allow(null, '').default(''),
	batBranch: Joi.string().max(8).allow(null, '').default(''),
	batConst1: Joi.string().max(8).allow(null, '').default(''),
	batConst2: Joi.string().max(8).allow(null, '').default(''),
	batConst3: Joi.string().max(8).allow(null, '').default(''),
	batConst4: Joi.string().max(8).allow(null, '').default(''),
	chrgU: Joi.string().max(8).allow(null, '').default(''),
	chrgI: Joi.string().max(8).allow(null, '').default(''),
	chrgTemp: Joi.string().max(8).allow(null, '').default(''),
});

exports.validateUut = (req, res, next) => {
	const { error } = uutSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion

//#region Spec
const specSchema = Joi.object({
	id: Joi.number(),
	range: Joi.number().allow(null).default(0),
	ctrl: Joi.number().allow(null).default(0),
	label: Joi.string().max(64).required(),
	replay: Joi.number().allow(null).default(0),
	date: Joi.date().allow(null).default('1900-01-01'),
	who: Joi.string().max(64).allow(null, '').default(''),
	comment: Joi.string().max(1024).allow(null, '').default(''),
});

exports.validateSpec = (req, res, next) => {
	const { error } = specSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};

//Step
const stepSchema = Joi.object({
	id: Joi.number(),
	tstFunc: Joi.string().max(10).allow(null, '').default(''),
	label: Joi.string().max(64).required(),
	range: Joi.number().allow(null).default(0),
	date: Joi.date().allow(null).default('1900-01-01'),
	who: Joi.string().max(64).allow(null, '').default(''),
	comment: Joi.string().max(1024).allow(null, '').default(''),
});

exports.validateStep = (req, res, next) => {
	const { error } = stepSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};

//StepLinkSpec
const stepLinkSpecSchema = Joi.object({
	id: Joi.number(),
	idMain: Joi.number().required(),
	idLink: Joi.number().required(),
	No: Joi.number().allow(null).default(0),
});

exports.validateStepLinkSpec = (req, res, next) => {
	const { error } = stepLinkSpecSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};

//#endregion

//Actions
const actionSchema = Joi.object({
	id: Joi.number(),
	idStep: Joi.number().integer().allow(null).default(0),
	range: Joi.number().integer().allow(null).default(0),
	order: Joi.number().integer().allow(null).default(0),
	track: Joi.number().integer().allow(null).default(0),
	errStamp: Joi.string().max(16).allow(null, '').default(''),
	errApc: Joi.string().max(16).allow(null, '').default(''),
	idTarget: Joi.number().integer().allow(null).default(0),
	idFunc: Joi.number().integer().allow(null).default(0),
	idOrgan: Joi.number().integer().allow(null).default(0),
	idAction: Joi.number().integer().allow(null).default(0),
	ident: Joi.string().max(32).allow(null, '').default(''),
	pattern: Joi.string().max(10).allow(null, '').default(''),
	param0: Joi.string().max(128).allow(null, '').default(''),
	param1: Joi.string().max(128).allow(null, '').default(''),
	param2: Joi.string().max(128).allow(null, '').default(''),
	param3: Joi.string().max(256).allow(null, '').default(''),
	param4: Joi.string().max(256).allow(null, '').default(''),
	param5: Joi.string().max(256).allow(null, '').default(''),
	param6: Joi.string().max(128).allow(null, '').default(''),
	param7: Joi.string().max(128).allow(null, '').default(''),
	param8: Joi.string().max(128).allow(null, '').default(''),
	param9: Joi.string().max(128).allow(null, '').default(''),
});

exports.validateAction = (req, res, next) => {
	const { error } = actionSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};

//#endregion
