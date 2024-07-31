const Joi = require("joi");

//#region Protocol
const protocolSchema = Joi.object({
  id: Joi.number(),
  label: Joi.string().max(64).required(),
  shortName: Joi.string().max(16).allow(null, "").default(""),
  repeatOrder: Joi.number().allow(null).default(0),
  fieldSlave: Joi.number().allow(null).default(0),
  fieldAddPrim: Joi.number().allow(null).default(0),
  fieldAddSecond: Joi.number().allow(null).default(0),
  fieldCmdString: Joi.number().allow(null).default(0),
  when: Joi.date().allow(null).default("1900-01-01"),
  who: Joi.string().max(64).allow(null, "").default(""),
  comment: Joi.string().max(1024).allow(null, "").default(""),
});

exports.validateProtocol = (req, res, next) => {
  const { error } = protocolSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ Error: "Bad request, try to verify the datas format\n" });
  }

  next();
};
//#endregion
//#region ProtocolDatas
const datasSchema = Joi.object({
  id: Joi.number(),
  idProtocol: Joi.number().allow(null).default(0).required(),
  label: Joi.string().max(32).required(),
  slave: Joi.string().max(32).allow("", null),
  addPrim: Joi.string().max(32).allow("", null),
  addSecond: Joi.string().max(32).allow("", null),
  type: Joi.string().max(32).allow("", null),
  complement: Joi.number().allow(null).default(0),
  access: Joi.string().max(32).allow("", null),
  cmdString: Joi.string().max(2048).allow("", null),
  answerExpected: Joi.number().allow(null).default(0),
  answerValue: Joi.string().max(32).allow("", null),
  time: Joi.string().max(5).allow("", null),
  loop: Joi.number().allow(null).default(0),
});

exports.validateProtocolDatas = (req, res, next) => {
  const { error } = datasSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ Error: "Bad request, try to verify the datas format\n" });
  }

  next();
};
//#endregion
