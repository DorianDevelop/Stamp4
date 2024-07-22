const Joi = require('joi');

//#region TE
const teSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(64).required(),
	host: Joi.string().max(64).allow(null, '').default(''),
	email: Joi.string().max(64).allow(null, '').default(''),
	service: Joi.string().max(64).allow(null, '').default(''),
	date: Joi.date().allow(null).default('1900-01-01'),
	who: Joi.string().max(64).allow(null, '').default(''),
	comment: Joi.string().max(1024).allow(null, '').default(''),
});

exports.validateTE = (req, res, next) => {
	const { error } = teSchema.validate(req.body);
	if (error) {
		console.log(error);
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion
//#region Error
const errorSchema = Joi.object({
	id: Joi.number(),
	code: Joi.number().allow(null).default(0),
	module: Joi.string().max(16).allow(null, '').default(''),
	function: Joi.string().max(24).allow(null, '').default(''),
	label: Joi.string().max(32).required(),
	apcNo: Joi.number().allow(null).default(0),
	level: Joi.number().allow(null).default(0),
	helpF: Joi.string().max(256).allow(null, '').default(''),
	helpS: Joi.string().max(32).allow(null, '').default(''),
	msgFR: Joi.string().max(512).allow(null, '').default(''),
	msgEN: Joi.string().max(512).allow(null, '').default(''),
	msgXX: Joi.string().max(512).allow(null, '').default(''),
	comment: Joi.string().max(256).allow(null, '').default(''),
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
	id: Joi.number(),
	label: Joi.string().max(64).required(),
	idFamily: Joi.number().allow(null).default(0),
	type: Joi.string().max(16).allow(null, '').default(''),
	value: Joi.string().max(32).allow(null, '').default(''),
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
	label_fr: Joi.string().max(32).allow(null, '').default(''),
	label_en: Joi.string().max(32).allow(null, '').default(''),
	label_xx: Joi.string().max(32).allow(null, '').default(''),
	when: Joi.date().allow(null, '').default(''),
	who: Joi.string().max(32).allow(null, '').default(''),
	comment: Joi.string().max(512).allow(null, '').default(''),
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
	label_fr: Joi.string().max(32).allow(null, '').default(''),
	label_en: Joi.string().max(32).allow(null, '').default(''),
	label_xx: Joi.string().max(32).allow(null, '').default(''),
	when: Joi.date().allow(null, '').default(''),
	who: Joi.string().max(32).allow(null, '').default(''),
	comment: Joi.string().max(512).allow(null, '').default(''),
});

exports.validateFunct = (req, res, next) => {
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
	id: Joi.number(),
	label: Joi.string().max(32).required(),
	idTarget: Joi.number().min(0).required(), //TODO : savoir si on aurtorise de créer sans avoir de target
	idFunc: Joi.number().min(0).required(), //TODO : savoir si on aurtorise de créer sans avoir de funct
	label_fr: Joi.string().max(32).allow(null, '').default(''),
	label_en: Joi.string().max(32).allow(null, '').default(''),
	label_xx: Joi.string().max(32).allow(null, '').default(''),
	when: Joi.date().allow(null, '').default(''),
	who: Joi.string().max(32).allow(null, '').default(''),
	comment: Joi.string().max(512).allow(null, '').default(''),
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
	act: Joi.string().max(8).allow(null, '').default(''),
	track: Joi.number().min(0).allow(null).default(0),
	err: Joi.number().min(0).allow(null).default(0),
	ident: Joi.number().min(0).allow(null).default(0),
	label_fr: Joi.string().max(32).allow(null, '').default(''),
	label_en: Joi.string().max(32).allow(null, '').default(''),
	label_xx: Joi.string().max(32).allow(null, '').default(''),
	when: Joi.date().allow(null, '').default(''),
	who: Joi.string().max(32).allow(null, '').default(''),
	comment: Joi.string().max(512).allow(null, '').default(''),

	type0: Joi.string().max(16).allow(null, '').default(''),
	param0_fr: Joi.string().max(32).allow(null, '').default(''),
	param0_en: Joi.string().max(32).allow(null, '').default(''),
	param0_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose0: Joi.string().max(32).allow(null, '').default(''),
	type1: Joi.string().max(16).allow(null, '').default(''),
	param1_fr: Joi.string().max(32).allow(null, '').default(''),
	param1_en: Joi.string().max(32).allow(null, '').default(''),
	param1_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose1: Joi.string().max(32).allow(null, '').default(''),
	type2: Joi.string().max(16).allow(null, '').default(''),
	param2_fr: Joi.string().max(32).allow(null, '').default(''),
	param2_en: Joi.string().max(32).allow(null, '').default(''),
	param2_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose2: Joi.string().max(32).allow(null, '').default(''),
	type3: Joi.string().max(16).allow(null, '').default(''),
	param3_fr: Joi.string().max(32).allow(null, '').default(''),
	param3_en: Joi.string().max(32).allow(null, '').default(''),
	param3_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose3: Joi.string().max(32).allow(null, '').default(''),
	type4: Joi.string().max(16).allow(null, '').default(''),
	param4_fr: Joi.string().max(32).allow(null, '').default(''),
	param4_en: Joi.string().max(32).allow(null, '').default(''),
	param4_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose4: Joi.string().max(32).allow(null, '').default(''),
	type5: Joi.string().max(16).allow(null, '').default(''),
	param5_fr: Joi.string().max(32).allow(null, '').default(''),
	param5_en: Joi.string().max(32).allow(null, '').default(''),
	param5_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose5: Joi.string().max(32).allow(null, '').default(''),
	type6: Joi.string().max(16).allow(null, '').default(''),
	param6_fr: Joi.string().max(32).allow(null, '').default(''),
	param6_en: Joi.string().max(32).allow(null, '').default(''),
	param6_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose6: Joi.string().max(32).allow(null, '').default(''),
	type7: Joi.string().max(16).allow(null, '').default(''),
	param7_fr: Joi.string().max(32).allow(null, '').default(''),
	param7_en: Joi.string().max(32).allow(null, '').default(''),
	param7_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose7: Joi.string().max(32).allow(null, '').default(''),
	type8: Joi.string().max(16).allow(null, '').default(''),
	param8_fr: Joi.string().max(32).allow(null, '').default(''),
	param8_en: Joi.string().max(32).allow(null, '').default(''),
	param8_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose8: Joi.string().max(32).allow(null, '').default(''),
	type9: Joi.string().max(16).allow(null, '').default(''),
	param9_fr: Joi.string().max(32).allow(null, '').default(''),
	param9_en: Joi.string().max(32).allow(null, '').default(''),
	param9_xx: Joi.string().max(32).allow(null, '').default(''),
	purpose9: Joi.string().max(32).allow(null, '').default(''),
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
