const Joi = require('joi');

//#region Gamme
const gammeSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(64).required(),
	sName: Joi.string().max(64).allow(null, ''),
	when: Joi.date().allow(null),
	who: Joi.string().max(64).allow(null, ''),
	comment: Joi.string().max(1024).allow(null, ''),
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
	qualified: Joi.boolean().allow(null),
	range: Joi.number().allow(null),
	dateStart: Joi.date().allow(null),
	dateEnd: Joi.date().allow(null),
	date: Joi.date().allow(null),
	who: Joi.string().max(25).allow(null, ''),
	comment: Joi.string().allow(null, '').max(1024),
	reference: Joi.string().max(32).allow(null, ''),
	serial: Joi.string().allow(null, '').max(32),
	topo: Joi.number().allow(null),
	design: Joi.string().max(64).allow(null, ''),
	power: Joi.string().max(10).allow(null, ''),
	backup: Joi.string().max(5).allow(null, ''),
	volt: Joi.string().max(10).allow(null, ''),
	freq: Joi.string().max(5).allow(null, ''),
	model: Joi.string().max(25).allow(null, ''),
	pnp: Joi.string().max(25).allow(null, ''),
	firm: Joi.string().max(25).allow(null, ''),
	sku: Joi.string().max(25).allow(null, ''),
	hiVolt: Joi.string().max(8).allow(null, ''),
	hiAmps: Joi.string().max(8).allow(null, ''),
	hiTime: Joi.string().max(8).allow(null, ''),
	hiRamp: Joi.string().max(8).allow(null, ''),
	hisVolt: Joi.string().max(8).allow(null, ''),
	hisAmps: Joi.string().max(8).allow(null, ''),
	hisTime: Joi.string().max(8).allow(null, ''),
	hisRamp: Joi.string().max(8).allow(null, ''),
	hifVolt: Joi.string().max(8).allow(null, ''),
	hifAmps: Joi.string().max(8).allow(null, ''),
	hifTime: Joi.string().max(8).allow(null, ''),
	hifRamp: Joi.string().max(8).allow(null, ''),
	gndAmps: Joi.string().max(8).allow(null, ''),
	gndOhms: Joi.string().max(8).allow(null, ''),
	gndTime: Joi.string().max(8).allow(null, ''),
	contAmps: Joi.string().max(8).allow(null, ''),
	contOhms: Joi.string().max(8).allow(null, ''),
	contTime: Joi.string().max(8).allow(null, ''),
	main1U: Joi.string().max(8).allow(null, ''),
	main1Umaxi: Joi.string().max(8).allow(null, ''),
	main1Umini: Joi.string().max(8).allow(null, ''),
	main1Yield: Joi.string().max(8).allow(null, ''),
	main1Imaxi: Joi.string().max(8).allow(null, ''),
	main1Thdi: Joi.string().max(8).allow(null, ''),
	main2U: Joi.string().max(8).allow(null, ''),
	main2Umaxi: Joi.string().max(8).allow(null, ''),
	main2Umini: Joi.string().max(8).allow(null, ''),
	main2Yield: Joi.string().max(8).allow(null, ''),
	main2Imaxi: Joi.string().max(8).allow(null, ''),
	main2Thdi: Joi.string().max(8).allow(null, ''),
	outU: Joi.string().max(8).allow(null, ''),
	outUtol: Joi.string().max(8).allow(null, ''),
	outThdu: Joi.string().max(8).allow(null, ''),
	outUdc: Joi.string().max(8).allow(null, ''),
	outF: Joi.string().max(8).allow(null, ''),
	outFtol: Joi.string().max(8).allow(null, ''),
	outVA: Joi.string().max(8).allow(null, ''),
	outW: Joi.string().max(8).allow(null, ''),
	outPhi: Joi.string().max(8).allow(null, ''),
	batU: Joi.string().max(8).allow(null, ''),
	batUmaxi: Joi.string().max(8).allow(null, ''),
	batUmini: Joi.string().max(8).allow(null, ''),
	batAH: Joi.string().max(8).allow(null, ''),
	batLife: Joi.string().max(8).allow(null, ''),
	batBranch: Joi.string().max(8).allow(null, ''),
	batConst1: Joi.string().max(8).allow(null, ''),
	batConst2: Joi.string().max(8).allow(null, ''),
	batConst3: Joi.string().max(8).allow(null, ''),
	batConst4: Joi.string().max(8).allow(null, ''),
	chrgU: Joi.string().max(8).allow(null, ''),
	chrgI: Joi.string().max(8).allow(null, ''),
	chrgTemp: Joi.string().max(8).allow(null, ''),
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
	range: Joi.number().allow(null),
	ctrl: Joi.number().allow(null),
	label: Joi.string().max(64).required(),
	replay: Joi.number().allow(null),
	date: Joi.date().allow(null),
	who: Joi.string().max(64).allow(null, ''),
	comment: Joi.string().max(1024).allow(null, ''),
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
	tstFunc: Joi.string().max(10).allow(null, ''),
	label: Joi.string().max(64).required(),
	range: Joi.number().allow(null),
	date: Joi.date().allow(null),
	who: Joi.string().max(64).allow(null, ''),
	comment: Joi.string().max(1024).allow(null, ''),
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
	No: Joi.number().allow(null),
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
	idStep: Joi.number().integer().allow(null),
	range: Joi.number().integer().allow(null),
	order: Joi.number().integer().allow(null),
	track: Joi.number().integer().allow(null),
	errStamp: Joi.string().max(16).allow(null, ''),
	errApc: Joi.string().max(16).allow(null, ''),
	idTarget: Joi.number().integer().allow(null),
	idFunc: Joi.number().integer().allow(null),
	idOrgan: Joi.number().integer().allow(null),
	idAction: Joi.number().integer().allow(null),
	ident: Joi.string().max(32).allow(null, ''),
	pattern: Joi.string().max(10).allow(null, ''),
	param0: Joi.string().max(128).allow(null, ''),
	param1: Joi.string().max(128).allow(null, ''),
	param2: Joi.string().max(128).allow(null, ''),
	param3: Joi.string().max(256).allow(null, ''),
	param4: Joi.string().max(256).allow(null, ''),
	param5: Joi.string().max(256).allow(null, ''),
	param6: Joi.string().max(128).allow(null, ''),
	param7: Joi.string().max(128).allow(null, ''),
	param8: Joi.string().max(128).allow(null, ''),
	param9: Joi.string().max(128).allow(null, ''),
});

exports.validateAction = (req, res, next) => {
	const { error } = actionSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};

//#endregion
