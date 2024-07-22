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

//#region Plugins
const plugSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(32).required(),
	when: Joi.date().allow(null).default('1900-01-01'),
	who: Joi.string().max(32).allow(null, '').default(''),
	comment: Joi.string().max(256).allow(null, '').default(''),
});

exports.validatePlug = (req, res, next) => {
	const { error } = plugSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};

const driverPlugSchema = Joi.object({
	id: Joi.number(),
	idATE: Joi.number().allow(null).default(0).required(),
	order: Joi.number().allow(null).default(0),
	valid: Joi.number().allow(null).default(0),
	label: Joi.string().max(32).required(),
	instID: Joi.string().allow('').max(32).default(''),
	protocol: Joi.string().allow('').max(16).default(''),
	driver: Joi.string().allow('').max(256).default(''),
	driverDll: Joi.string().allow('').max(256).default(''),
	wizard: Joi.string().allow('').max(256).default(''),
	port: Joi.string().allow('').max(16).default(''),
	address: Joi.string().allow('').max(16).default(''),
	subAddress: Joi.number().allow(null).default(0),
	init: Joi.string().allow('').max(512).default(''),
	reset: Joi.string().allow('').max(64).default(''),
	comment: Joi.string().allow('').max(256).default(''),
});

exports.validateDriverPlug = (req, res, next) => {
	const { error } = driverPlugSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};

const ActionPlugSchema = Joi.object({
	id: Joi.number(),
	idPlug: Joi.number().allow(null).default(0).required(),
	target: Joi.string().max(16).required(),
	funct: Joi.string().max(16).required(),
	organ: Joi.string().max(16).required(),
	action: Joi.string().max(16).required(),
	order: Joi.number().allow(null).default(0),
	label: Joi.string().max(32).allow('').default(''),
	idDriver: Joi.number().allow(null).default(0).required(),
	scpi: Joi.string().allow('').max(512).default(''),
	info: Joi.string().allow('').max(64).default(''),
});

exports.validateActionPlug = (req, res, next) => {
	const { error } = ActionPlugSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion
