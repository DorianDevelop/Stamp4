const Joi = require('joi');

//#region TE
const teSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(64).required(),
	host: Joi.string().max(64).allow(null, ''),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.allow(null, ''),
	service: Joi.string().max(64).allow(null, ''),
	date: Joi.date().allow(null),
	who: Joi.string().max(64).allow(null, ''),
	comment: Joi.string().max(1024).allow(null, ''),
});

exports.validateTE = (req, res, next) => {
	console.log('Debugger', req.body);
	const { error } = teSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion
//#region Error
const errorSchema = Joi.object({
	id: Joi.number(),
	code: Joi.number().allow(null),
	module: Joi.string().max(16).allow(null, ''),
	function: Joi.string().max(24).allow(null, ''),
	label: Joi.string().max(32).required(),
	apcNo: Joi.number().allow(null),
	level: Joi.number().allow(null),
	helpF: Joi.string().max(256).allow(null, ''),
	helpS: Joi.string().max(32).allow(null, ''),
	msgFR: Joi.string().max(512).allow(null, ''),
	msgEN: Joi.string().max(512).allow(null, ''),
	msgXX: Joi.string().max(512).allow(null, ''),
	comment: Joi.string().max(256).allow(null, ''),
});

exports.validateError = (req, res, next) => {
	const { error } = errorSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion

//#region Value
const valueSchema = Joi.object({
	label: Joi.string().max(64).required(),
	idFamily: Joi.number().allow(null),
	type: Joi.string().max(16).allow(null, ''),
	value: Joi.string().max(32).allow(null, ''),
});

exports.validateValue = (req, res, next) => {
	const { error } = valueSchema.validate(req.body);
	if (error) {
		console.error(error);
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion

//#region Target
const targetSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(32).required(),
	label_fr: Joi.string().max(32).allow(null, ''),
	label_en: Joi.string().max(32).allow(null, ''),
	label_xx: Joi.string().max(32).allow(null, ''),
	when: Joi.date().allow(null, ''),
	who: Joi.string().max(32).allow(null, ''),
	comment: Joi.string().max(512).allow(null, ''),
});

exports.validateTarget = (req, res, next) => {
	const { error } = targetSchema.validate(req.body);
	if (error) {
		console.error(error);
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion

//#region Funct
const functSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(32).required(),
	idTarget: Joi.number().min(0).required(), //TODO : savoir si on aurtorise de créer sans avoir de target
	label_fr: Joi.string().max(32).allow(null, ''),
	label_en: Joi.string().max(32).allow(null, ''),
	label_xx: Joi.string().max(32).allow(null, ''),
	when: Joi.date().allow(null, ''),
	who: Joi.string().max(32).allow(null, ''),
	comment: Joi.string().max(512).allow(null, ''),
});

exports.validateFunct = (req, res, next) => {
	console.log(req.body);
	const { error } = functSchema.validate(req.body);
	if (error) {
		console.error(error);
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion

//#region Organ
const organSchema = Joi.object({
	label: Joi.string().max(32).required(),
	idTarget: Joi.number().min(0).required(), //TODO : savoir si on aurtorise de créer sans avoir de target
	idFunc: Joi.number().min(0).required(), //TODO : savoir si on aurtorise de créer sans avoir de funct
	label_fr: Joi.string().max(32).allow(null, ''),
	label_en: Joi.string().max(32).allow(null, ''),
	label_xx: Joi.string().max(32).allow(null, ''),
	when: Joi.date().allow(null, ''),
	who: Joi.string().max(32).allow(null, ''),
	comment: Joi.string().max(512).allow(null, ''),
});

exports.validateOrgan = (req, res, next) => {
	const { error } = organSchema.validate(req.body);
	if (error) {
		console.error(error);
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion

//#region Action
const actionSchema = Joi.object({
	label: Joi.string().max(32).required(),
	idTarget: Joi.number().min(0).required(), //TODO : savoir si on aurtorise de créer sans avoir de target
	idFunc: Joi.number().min(0).required(), //TODO : savoir si on aurtorise de créer sans avoir de funct
	idOrgan: Joi.number().min(0).required(), //TODO : savoir si on aurtorise de créer sans avoir de funct
	act: Joi.string().max(8).allow(null, ''),
	track: Joi.number().min(0).allow(null),
	err: Joi.number().min(0).allow(null),
	ident: Joi.number().min(0).allow(null),
	label_fr: Joi.string().max(32).allow(null, ''),
	label_en: Joi.string().max(32).allow(null, ''),
	label_xx: Joi.string().max(32).allow(null, ''),
	when: Joi.date().allow(null, ''),
	who: Joi.string().max(32).allow(null, ''),
	comment: Joi.string().max(512).allow(null, ''),

	type0: Joi.string().max(16).allow(null, ''),
	param0_fr: Joi.string().max(32).allow(null, ''),
	param0_en: Joi.string().max(32).allow(null, ''),
	param0_xx: Joi.string().max(32).allow(null, ''),
	purpose0: Joi.string().max(32).allow(null, ''),
	type1: Joi.string().max(16).allow(null, ''),
	param1_fr: Joi.string().max(32).allow(null, ''),
	param1_en: Joi.string().max(32).allow(null, ''),
	param1_xx: Joi.string().max(32).allow(null, ''),
	purpose1: Joi.string().max(32).allow(null, ''),
	type2: Joi.string().max(16).allow(null, ''),
	param2_fr: Joi.string().max(32).allow(null, ''),
	param2_en: Joi.string().max(32).allow(null, ''),
	param2_xx: Joi.string().max(32).allow(null, ''),
	purpose2: Joi.string().max(32).allow(null, ''),
	type3: Joi.string().max(16).allow(null, ''),
	param3_fr: Joi.string().max(32).allow(null, ''),
	param3_en: Joi.string().max(32).allow(null, ''),
	param3_xx: Joi.string().max(32).allow(null, ''),
	purpose3: Joi.string().max(32).allow(null, ''),
	type4: Joi.string().max(16).allow(null, ''),
	param4_fr: Joi.string().max(32).allow(null, ''),
	param4_en: Joi.string().max(32).allow(null, ''),
	param4_xx: Joi.string().max(32).allow(null, ''),
	purpose4: Joi.string().max(32).allow(null, ''),
	type5: Joi.string().max(16).allow(null, ''),
	param5_fr: Joi.string().max(32).allow(null, ''),
	param5_en: Joi.string().max(32).allow(null, ''),
	param5_xx: Joi.string().max(32).allow(null, ''),
	purpose5: Joi.string().max(32).allow(null, ''),
	type6: Joi.string().max(16).allow(null, ''),
	param6_fr: Joi.string().max(32).allow(null, ''),
	param6_en: Joi.string().max(32).allow(null, ''),
	param6_xx: Joi.string().max(32).allow(null, ''),
	purpose6: Joi.string().max(32).allow(null, ''),
	type7: Joi.string().max(16).allow(null, ''),
	param7_fr: Joi.string().max(32).allow(null, ''),
	param7_en: Joi.string().max(32).allow(null, ''),
	param7_xx: Joi.string().max(32).allow(null, ''),
	purpose7: Joi.string().max(32).allow(null, ''),
	type8: Joi.string().max(16).allow(null, ''),
	param8_fr: Joi.string().max(32).allow(null, ''),
	param8_en: Joi.string().max(32).allow(null, ''),
	param8_xx: Joi.string().max(32).allow(null, ''),
	purpose8: Joi.string().max(32).allow(null, ''),
	type9: Joi.string().max(16).allow(null, ''),
	param9_fr: Joi.string().max(32).allow(null, ''),
	param9_en: Joi.string().max(32).allow(null, ''),
	param9_xx: Joi.string().max(32).allow(null, ''),
	purpose9: Joi.string().max(32).allow(null, ''),
});

exports.validateAction = (req, res, next) => {
	const { error } = actionSchema.validate(req.body);
	if (error) {
		console.error(error);
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion
