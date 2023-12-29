const Joi = require('joi');

//#region User
const userSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(64).required(),
	code: Joi.string().max(15).allow(null, ''),
	pass: Joi.string().max(15).allow(null, ''),
	level: Joi.number().allow(null),
	service: Joi.string().max(64).allow(null, ''),
	date: Joi.date().allow(null),
	who: Joi.string().max(64).allow(null, ''),
	comment: Joi.string().max(1024).allow(null, ''),
});

exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion

//#region ATE
const ateSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(32).required(),
	qualif: Joi.number().allow(null),
	langage: Joi.string().max(8).allow(null, ''),
	name: Joi.string().max(32).allow(null, ''),
	type: Joi.number().allow(null),
	func: Joi.number().allow(null),
	mode: Joi.string().max(16).allow(null, ''),
	host: Joi.string().max(100).allow(null, ''),
	index: Joi.string().max(16).allow(null, ''),
	trace: Joi.number().allow(null),
	tPath: Joi.string().max(150).allow(null, ''),
	quasar: Joi.number().allow(null),
	lQuasar: Joi.string().max(150).allow(null, ''),
	nQuasar: Joi.string().max(256).allow(null, ''),
	when: Joi.date().allow(null),
	who: Joi.string().max(32).allow(null, ''),
	comment: Joi.string().max(256).allow(null, ''),
	begin: Joi.number().allow(null),
});

exports.validateATE = (req, res, next) => {
	const { error } = ateSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion
