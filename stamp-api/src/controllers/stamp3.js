const handler = require('../services/handler.js');
const createConnection = require('../configs/database.config.js'); //Import la fonction créer un lien vers un base de données
const stamp3 = createConnection('stamp3'); //Créer le lien vers la base de donnée "stamp3"

//#region TE (Test Engineers)

exports.getAllTeLabel = (req, res) => {
	const query = 'SELECT T.id, T.label FROM `te` as T';

	stamp3.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getTeByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `te` as T WHERE T.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createTE = (req, res) => {
	const datas = [req.body.label, req.body.host, req.body.email, req.body.service, req.body.date, req.body.who, req.body.comment];

	const query = 'INSERT INTO `te`(`label`, `host`, `email`, `service`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?)';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyTE = (req, res) => {
	const requestId = req.params.id;
	const datas = [req.body.label, req.body.host, req.body.email, req.body.service, req.body.date, req.body.who, req.body.comment, requestId];

	const query = 'UPDATE te SET `label` = ?, `host` = ?, `email` = ?, `service` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteTE = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `te` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

//#endregion
//-----------------------------------//
//#region Errors

exports.getAllErrorsCodeAndLabel = (req, res) => {
	const query = 'SELECT E.id, CONCAT("[", E.code,"] ", E.label) as label FROM `error` as E';

	stamp3.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getErrorByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `error` as E WHERE E.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createError = (req, res) => {
	const datas = [
		req.body.code,
		req.body.module,
		req.body.function,
		req.body.label,
		req.body.apcNo,
		req.body.level,
		req.body.helpF,
		req.body.helpS,
		req.body.msgFR,
		req.body.msgEN,
		req.body.msgXX,
		req.body.comment,
	];

	const query =
		'INSERT INTO `error`(`code`, `module`, `function`, `label`, `apcNo`, `level`, `helpF`, `helpS`, `msgFR`, `msgEN`, `msgXX`, `comment`) ' + 'VALUES (?,?,?,?,?,?,?,?,?,?,?,?);';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyError = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.code,
		req.body.module,
		req.body.function,
		req.body.label,
		req.body.apcNo,
		req.body.level,
		req.body.helpF,
		req.body.helpS,
		req.body.msgFR,
		req.body.msgEN,
		req.body.msgXX,
		req.body.comment,

		requestId,
	];

	const query =
		'UPDATE `error` SET `code` = ?, `module` = ?, `function` = ?, `label` = ?, `apcNo` = ?, `level` = ?, `helpF` = ?, `helpS` = ?, `msgFR` = ?, `msgEN` = ?, `msgXX` = ?, `comment` = ?' +
		' WHERE `id` = ?';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteError = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `error` WHERE `id` = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

//#endregion
//-----------------------------------//
//#region Values

exports.getAllValuesTypeAndLabel = (req, res) => {
	const query = 'SELECT V.id, V.type, V.label FROM `value` as V';

	stamp3.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getValueByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `value` as V WHERE V.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createValue = (req, res) => {
	const datas = [req.body.label, req.body.idFamily, req.body.type, req.body.value ? req.body.value : ''];

	const query = 'INSERT INTO `value`(`label`, `idFamily`, `type`, `value`) VALUES (?, ?, ?, ?)';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyValue = (req, res) => {
	const requestId = req.params.id;
	const datas = [req.body.label, req.body.idFamily, req.body.type, req.body.value, requestId];

	const query = 'UPDATE `value` SET `label` = ?, `idFamily` = ?, `type` = ?, `value` = ? WHERE `id` = ?';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteValue = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `value` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

//#endregion
//-----------------------------------//
//#region Targets

exports.getAllTargetsLabel = (req, res) => {
	const query = 'SELECT T.id, T.label FROM `target` as T ORDER BY T.label';

	stamp3.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getTargetByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `target` as T WHERE T.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createTarget = (req, res) => {
	const datas = [
		req.body.label,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who,
		req.body.when,
		req.body.comment,
	];

	const query = 'INSERT INTO `target`(`label`, `label_fr`, `label_en`, `label_xx`, `who`, `when`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?)';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyTarget = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.label,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who,
		req.body.when,
		req.body.comment,

		requestId,
	];

	const query = 'UPDATE `target` SET `label` = ?, `label_fr` = ?, `label_en` = ?, `label_xx` = ?, `who` = ?, `when` = ?, `comment` = ? WHERE `id` = ?';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteTarget = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `target` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

//#endregion
//-----------------------------------//
//#region Functs

exports.getAllFunctsLabel = (req, res) => {
	const query = 'SELECT F.id, CONCAT(T.label,":", F.label) as label ' + 'FROM `funct` as F ' + 'LEFT JOIN `target` as T ON F.idTarget=T.id ORDER BY label;';

	stamp3.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getFunctByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `funct` as F WHERE F.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getAllFunctOfTarget = (req, res) => {
	const param = req.params.id;
	const query = 'SELECT F.id, F.label as label ' + 'FROM `funct` as F ' + 'INNER JOIN `target` as T ON F.idTarget=T.id WHERE T.id = ? ORDER BY label;';

	stamp3.query(query, [param], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createFunct = (req, res) => {
	const datas = [
		req.body.label,
		req.body.idTarget,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who,
		req.body.when,
		req.body.comment,
	];

	const query = 'INSERT INTO `funct`(`label`, `idTarget`, `label_fr`, `label_en`, `label_xx`, `who`, `when`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyFunct = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.label,
		req.body.idTarget,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who,
		req.body.when,
		req.body.comment,

		requestId,
	];

	const query = 'UPDATE `funct` SET `label` = ?, `idTarget` = ?, `label_fr` = ?, `label_en` = ?, `label_xx` = ?, `who` = ?, `when` = ?, `comment` = ? WHERE `id` = ?';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteFunct = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `funct` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

//#endregion
//-----------------------------------//
//#region Organs

exports.getAllOrgansLabel = (req, res) => {
	const query =
		'SELECT O.id, CONCAT(T.label,":", F.label,":", O.label) as label ' +
		'FROM `organ` as O LEFT JOIN `funct` as F ON O.idFunc=F.id ' +
		'LEFT JOIN `target` as T ON F.idTarget=T.id ORDER BY label;';

	stamp3.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getOrganByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `organ` as O WHERE O.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getAllOrgansByFunct = (req, res) => {
	const param = req.params.id;
	const query = 'SELECT O.id, O.label as label ' + 'FROM `organ` as O INNER JOIN `funct` as F ON O.idFunc=F.id ' + 'WHERE F.id = ? ORDER BY label;';

	stamp3.query(query, [param], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createOrgan = (req, res) => {
	const datas = [
		req.body.label,
		req.body.idTarget,
		req.body.idFunc,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who,
		req.body.when,
		req.body.comment,
	];

	const query = 'INSERT INTO `organ`(`label`, `idTarget`, `idFunc`, `label_fr`, `label_en`, `label_xx`, `who`, `when`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyOrgan = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.label,
		req.body.idTarget,
		req.body.idFunc,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who,
		req.body.when,
		req.body.comment,

		requestId,
	];

	const query = 'UPDATE `organ` SET `label` = ?, `idTarget` = ?, `idFunc` = ?, `label_fr` = ?, `label_en` = ?, `label_xx` = ?, `who` = ?, `when` = ?, `comment` = ? WHERE `id` = ?';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteOrgan = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `organ` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

//#endregion
//-----------------------------------//
//#region Action

exports.getAllActionsLabel = (req, res) => {
	//Query simple
	//const query = 'SELECT A.id, A.label FROM action as A';

	//Query qui permet la concatination des différents label de action, function, organ, etc... permettant l'identification de l'action plus facile
	const query =
		'SELECT action.id, CONCAT(target.label,":", funct.label,":", organ.label,":", action.label) as label' +
		' FROM `action` LEFT JOIN `organ` ON action.idOrgan=organ.id LEFT JOIN `funct` ON organ.idFunc=funct.id ' +
		'LEFT JOIN `target` ON funct.idTarget=target.id ORDER BY label;';

	stamp3.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getActionByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `action` as A WHERE A.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createAction = (req, res) => {
	const datas = [
		req.body.label,
		req.body.idTarget,
		req.body.idFunc,
		req.body.idOrgan,
		req.body.act,
		req.body.track,
		req.body.err,
		req.body.ident,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who,
		req.body.when,
		req.body.comment,

		req.body.type0 ? req.body.type0 : '',
		req.body.param0_fr ? req.body.param0_fr : '',
		req.body.param0_en ? req.body.param0_en : '',
		req.body.param0_xx ? req.body.param0_xx : '',
		req.body.purpose0 ? req.body.purpose0 : '',
		req.body.type1 ? req.body.type1 : '',
		req.body.param1_fr ? req.body.param1_fr : '',
		req.body.param1_en ? req.body.param1_en : '',
		req.body.param1_xx ? req.body.param1_xx : '',
		req.body.purpose1 ? req.body.purpose1 : '',
		req.body.type2 ? req.body.type2 : '',
		req.body.param2_fr ? req.body.param2_fr : '',
		req.body.param2_en ? req.body.param2_en : '',
		req.body.param2_xx ? req.body.param2_xx : '',
		req.body.purpose2 ? req.body.purpose2 : '',
		req.body.type3 ? req.body.type3 : '',
		req.body.param3_fr ? req.body.param3_fr : '',
		req.body.param3_en ? req.body.param3_en : '',
		req.body.param3_xx ? req.body.param3_xx : '',
		req.body.purpose3 ? req.body.purpose3 : '',
		req.body.type4 ? req.body.type4 : '',
		req.body.param4_fr ? req.body.param4_fr : '',
		req.body.param4_en ? req.body.param4_en : '',
		req.body.param4_xx ? req.body.param4_xx : '',
		req.body.purpose4 ? req.body.purpose4 : '',
		req.body.type5 ? req.body.type5 : '',
		req.body.param5_fr ? req.body.param5_fr : '',
		req.body.param5_en ? req.body.param5_en : '',
		req.body.param5_xx ? req.body.param5_xx : '',
		req.body.purpose5 ? req.body.purpose5 : '',
		req.body.type6 ? req.body.type6 : '',
		req.body.param6_fr ? req.body.param6_fr : '',
		req.body.param6_en ? req.body.param6_en : '',
		req.body.param6_xx ? req.body.param6_xx : '',
		req.body.purpose6 ? req.body.purpose6 : '',
		req.body.type7 ? req.body.type7 : '',
		req.body.param7_fr ? req.body.param7_fr : '',
		req.body.param7_en ? req.body.param7_en : '',
		req.body.param7_xx ? req.body.param7_xx : '',
		req.body.purpose7 ? req.body.purpose7 : '',
		req.body.type8 ? req.body.type8 : '',
		req.body.param8_fr ? req.body.param8_fr : '',
		req.body.param8_en ? req.body.param8_en : '',
		req.body.param8_xx ? req.body.param8_xx : '',
		req.body.purpose8 ? req.body.purpose8 : '',
		req.body.type9 ? req.body.type9 : '',
		req.body.param9_fr ? req.body.param9_fr : '',
		req.body.param9_en ? req.body.param9_en : '',
		req.body.param9_xx ? req.body.param9_xx : '',
		req.body.purpose9 ? req.body.purpose9 : '',
	];

	const query =
		'INSERT INTO `action`(`label`, `idTarget`, `idFunc`, `idOrgan`, `act`, `track`, `err`, `ident`,' +
		' `label_fr`, `label_en`, `label_xx`, `who`, `when`, `comment`,' +
		'`type0`, `param0_fr`, `param0_en`, `param0_xx`, `purpose0`, `type1`, `param1_fr`, `param1_en`, `param1_xx`, `purpose1`,' +
		'`type2`, `param2_fr`, `param2_en`, `param2_xx`, `purpose2`, `type3`, `param3_fr`, `param3_en`, `param3_xx`, `purpose3`,' +
		'`type4`, `param4_fr`, `param4_en`, `param4_xx`, `purpose4`, `type5`, `param5_fr`, `param5_en`, `param5_xx`, `purpose5`,' +
		'`type6`, `param6_fr`, `param6_en`, `param6_xx`, `purpose6`, `type7`, `param7_fr`, `param7_en`, `param7_xx`, `purpose7`,' +
		'`type8`, `param8_fr`, `param8_en`, `param8_xx`, `purpose8`, `type9`, `param9_fr`, `param9_en`, `param9_xx`, `purpose9`' +
		') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyAction = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.label,
		req.body.idTarget,
		req.body.idFunc,
		req.body.idOrgan,
		req.body.act,
		req.body.track,
		req.body.err,
		req.body.ident,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who,
		req.body.when,
		req.body.comment,

		req.body.type0 ? req.body.type0 : '',
		req.body.param0_fr ? req.body.param0_fr : '',
		req.body.param0_en ? req.body.param0_en : '',
		req.body.param0_xx ? req.body.param0_xx : '',
		req.body.purpose0 ? req.body.purpose0 : '',
		req.body.type1 ? req.body.type1 : '',
		req.body.param1_fr ? req.body.param1_fr : '',
		req.body.param1_en ? req.body.param1_en : '',
		req.body.param1_xx ? req.body.param1_xx : '',
		req.body.purpose1 ? req.body.purpose1 : '',
		req.body.type2 ? req.body.type2 : '',
		req.body.param2_fr ? req.body.param2_fr : '',
		req.body.param2_en ? req.body.param2_en : '',
		req.body.param2_xx ? req.body.param2_xx : '',
		req.body.purpose2 ? req.body.purpose2 : '',
		req.body.type3 ? req.body.type3 : '',
		req.body.param3_fr ? req.body.param3_fr : '',
		req.body.param3_en ? req.body.param3_en : '',
		req.body.param3_xx ? req.body.param3_xx : '',
		req.body.purpose3 ? req.body.purpose3 : '',
		req.body.type4 ? req.body.type4 : '',
		req.body.param4_fr ? req.body.param4_fr : '',
		req.body.param4_en ? req.body.param4_en : '',
		req.body.param4_xx ? req.body.param4_xx : '',
		req.body.purpose4 ? req.body.purpose4 : '',
		req.body.type5 ? req.body.type5 : '',
		req.body.param5_fr ? req.body.param5_fr : '',
		req.body.param5_en ? req.body.param5_en : '',
		req.body.param5_xx ? req.body.param5_xx : '',
		req.body.purpose5 ? req.body.purpose5 : '',
		req.body.type6 ? req.body.type6 : '',
		req.body.param6_fr ? req.body.param6_fr : '',
		req.body.param6_en ? req.body.param6_en : '',
		req.body.param6_xx ? req.body.param6_xx : '',
		req.body.purpose6 ? req.body.purpose6 : '',
		req.body.type7 ? req.body.type7 : '',
		req.body.param7_fr ? req.body.param7_fr : '',
		req.body.param7_en ? req.body.param7_en : '',
		req.body.param7_xx ? req.body.param7_xx : '',
		req.body.purpose7 ? req.body.purpose7 : '',
		req.body.type8 ? req.body.type8 : '',
		req.body.param8_fr ? req.body.param8_fr : '',
		req.body.param8_en ? req.body.param8_en : '',
		req.body.param8_xx ? req.body.param8_xx : '',
		req.body.purpose8 ? req.body.purpose8 : '',
		req.body.type9 ? req.body.type9 : '',
		req.body.param9_fr ? req.body.param9_fr : '',
		req.body.param9_en ? req.body.param9_en : '',
		req.body.param9_xx ? req.body.param9_xx : '',
		req.body.purpose9 ? req.body.purpose9 : '',

		requestId,
	];

	const query =
		'UPDATE `action` SET `label` = ?, `idTarget` = ?, `idFunc` = ?, `idOrgan` = ?, `act` = ?, `track` = ?, `err` = ?, `ident` = ?,' +
		' `label_fr` = ?, `label_en` = ?, `label_xx` = ?, `who` = ?, `when` = ?, `comment` = ?, ' +
		'`type0`= ?, `param0_fr`= ?, `param0_en`= ?, `param0_xx`= ?, `purpose0`= ?, ' +
		'`type1`= ?, `param1_fr`= ?, `param1_en`= ?, `param1_xx`= ?, `purpose1`= ?, ' +
		'`type2`= ?, `param2_fr`= ?, `param2_en`= ?, `param2_xx`= ?, `purpose2`= ?, ' +
		'`type3`= ?, `param3_fr`= ?, `param3_en`= ?, `param3_xx`= ?, `purpose3`= ?, ' +
		'`type4`= ?, `param4_fr`= ?, `param4_en`= ?, `param4_xx`= ?, `purpose4`= ?, ' +
		'`type5`= ?, `param5_fr`= ?, `param5_en`= ?, `param5_xx`= ?, `purpose5`= ?, ' +
		'`type6`= ?, `param6_fr`= ?, `param6_en`= ?, `param6_xx`= ?, `purpose6`= ?, ' +
		'`type7`= ?, `param7_fr`= ?, `param7_en`= ?, `param7_xx`= ?, `purpose7`= ?, ' +
		'`type8`= ?, `param8_fr`= ?, `param8_en`= ?, `param8_xx`= ?, `purpose8`= ?, ' +
		'`type9`= ?, `param9_fr`= ?, `param9_en`= ?, `param9_xx`= ?, `purpose9`= ? ' +
		' WHERE `id` = ?';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteAction = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `action` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

exports.getAllActionsFromOrgan = (req, res) => {
	const param = req.params.id;
	const query = 'SELECT A.id, A.label as label ' + 'FROM `action` as A INNER JOIN `organ` as O ON A.idOrgan=O.id ' + 'WHERE O.id = ? ORDER BY label;';

	stamp3.query(query, [param], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

//#endregion

exports.getActionFullName = (req, res) => {
	const datas = [
		req.body.idTarget ? req.body.idTarget : 10,
		req.body.idFunc ? req.body.idFunc : 1,
		req.body.idOrgan ? req.body.idOrgan : 30,
		req.body.idAction ? req.body.idAction : 1,
	];

	const query =
		'SELECT CONCAT(T.label, ":", F.label, ":", O.label, ":", A.label) as `label` ' +
		'FROM `target` as T, `funct` as F, `organ` as O, `action` as A ' +
		'WHERE T.id = ? AND F.id = ? AND O.id = ? AND A.id = ?;';

	stamp3.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getAllCategories = (req, res) => {
	const query1 = 'SELECT T.label FROM `target` as T;';
	const query2 = 'SELECT F.label FROM `funct` as F; ';
	const query3 = 'SELECT O.label FROM `organ` as O; ';
	const query4 = 'SELECT A.label FROM `action` as A;';

	allAnswer = [];

	stamp3.query(query1, (error, results) => {
		if (error) {
		} else {
			allAnswer.push(results);
		}
	});
	stamp3.query(query2, (error, results) => {
		if (error) {
		} else {
			allAnswer.push(results);
		}
	});
	stamp3.query(query3, (error, results) => {
		if (error) {
		} else {
			allAnswer.push(results);
		}
	});
	stamp3.query(query4, (error, results) => {
		if (error) {
		} else {
			allAnswer.push(results);
			res.status(200).json(allAnswer);
		}
	});
};
