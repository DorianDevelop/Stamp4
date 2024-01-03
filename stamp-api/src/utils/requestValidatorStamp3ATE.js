const Joi = require('joi');

//#region User
const userSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(64).required(),
	code: Joi.string().max(15).allow(null, '').default(''),
	pass: Joi.string().max(15).allow(null, '').default(''),
	level: Joi.number().allow(null).default(0),
	service: Joi.string().max(64).allow(null, '').default(''),
	date: Joi.date().allow(null).default('1900-01-01'),
	who: Joi.string().max(64).allow(null, '').default(''),
	comment: Joi.string().max(1024).allow(null, '').default(''),
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
	qualif: Joi.number().allow(null).default(0),
	langage: Joi.string().max(8).allow(null, '').default(''),
	name: Joi.string().max(32).allow(null, '').default(''),
	type: Joi.number().allow(null).default(0),
	func: Joi.number().allow(null).default(0),
	mode: Joi.string().max(16).allow(null, '').default(''),
	host: Joi.string().max(100).allow(null, '').default(''),
	index: Joi.string().max(16).allow(null, '').default(''),
	trace: Joi.number().allow(null).default(0),
	tPath: Joi.string().max(150).allow(null, '').default(''),
	quasar: Joi.number().allow(null).default(0),
	lQuasar: Joi.string().max(150).allow(null, '').default(''),
	nQuasar: Joi.string().max(256).allow(null, '').default(''),
	when: Joi.date().allow(null).default('1900-01-01'),
	who: Joi.string().max(32).allow(null, '').default(''),
	comment: Joi.string().max(256).allow(null, '').default(''),
	begin: Joi.number().allow(null).default(0),
});

exports.validateATE = (req, res, next) => {
	const { error } = ateSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion
