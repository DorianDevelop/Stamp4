const Joi = require('joi');

//#region Protocol
const protocolSchema = Joi.object({
	id: Joi.number(),
	label: Joi.string().max(64).required(),
	shortName: Joi.string().max(16).allow(null, ''),
	repeatOrder: Joi.number().allow(null),
	fieldSlave: Joi.number().allow(null),
	fieldAddPrim: Joi.number().allow(null),
	fieldAddSecond: Joi.number().allow(null),
	fieldCmdString: Joi.number().allow(null),
	when: Joi.date().allow(null),
	who: Joi.string().max(64).allow(null, ''),
	comment: Joi.string().max(1024).allow(null, ''),
});

exports.validateProtocol = (req, res, next) => {
	const { error } = protocolSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ Error: 'Bad request, try to verify the datas format\n' });
	}

	next();
};
//#endregion
