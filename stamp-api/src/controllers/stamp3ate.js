const handler = require('../services/handler.js');
const createConnection = require('../configs/database.config.js'); //Import la fonction créer un lien vers un base de données
const stamp3ate = createConnection('stamp3ate'); //Créer le lien vers la base de donnée "stamp3"

//#region OP (Opérateurs)

exports.getAllUser = (req, res) => {
	const query = `SELECT CASE WHEN U.level = 5 THEN CONCAT('[MANAGER] ', U.label)
		WHEN U.level = 4 THEN CONCAT('[ADMIN] ', U.label) WHEN U.level = 1 THEN CONCAT('[User] ', U.label) WHEN U.level = 2 THEN CONCAT('[ASQL] ', U.label)
		WHEN U.level = 3 THEN CONCAT('[Form] ', U.label) WHEN U.level = 99 THEN CONCAT('[Autre] ', U.label) ELSE CONCAT('[Undefined] ', U.label) END as 'label', U.id
		FROM user as U  ORDER BY CASE WHEN U.level = 5 THEN 1 WHEN U.level = 4 THEN 2 ELSE 3  END, label ASC;`;

	stamp3ate.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getUserById = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `user` as U WHERE U.id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createUser = (req, res) => {
	const datas = [req.body.label, req.body.code, req.body.pass, req.body.level, req.body.service, req.body.date, req.body.who, req.body.comment];

	const query = 'INSERT INTO `user`(`label`, `code`, `pass`, `level`, `service`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3ate.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyUser = (req, res) => {
	const requestId = req.params.id;
	const datas = [req.body.label, req.body.code, req.body.pass, req.body.level, req.body.service, req.body.date, req.body.who, req.body.comment, requestId];

	const query = 'UPDATE user SET `label` = ?, `code` = ?, `pass` = ?, `level` = ?, `service` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	stamp3ate.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteUser = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `user` WHERE id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

//#endregion
//-----------------------------------//
//#region ATE (Testeur)

exports.getAllATE = (req, res) => {
	const query = 'SELECT A.id, A.label FROM `ate` as A ORDER BY A.label';

	stamp3ate.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getATEById = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `ate` as A WHERE A.id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createATE = (req, res) => {
	const datas = [
		req.body.label,
		req.body.qualif,
		req.body.langage,
		req.body.name,
		req.body.type,
		req.body.func,
		req.body.mode,
		req.body.host,
		req.body.index,
		req.body.trace,
		req.body.tPath,
		req.body.quasar,
		req.body.lQuasar,
		req.body.nQuasar,
		req.body.when,
		req.body.who,
		req.body.comment,
		req.body.begin,
	];

	const query =
		'INSERT INTO `ate`(`label`, `qualif`, `langage`, `name`, `type`,`func`, `mode`, `host`, `index`, `trace`, `tPath`, `quasar`, `lQuasar`, `nQuasar`, `when`, `who`, `comment`, `begin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3ate.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyATE = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.label,
		req.body.qualif,
		req.body.langage,
		req.body.name,
		req.body.type,
		req.body.func,
		req.body.mode,
		req.body.host,
		req.body.index,
		req.body.trace,
		req.body.tPath,
		req.body.quasar,
		req.body.lQuasar,
		req.body.nQuasar,
		req.body.when,
		req.body.who,
		req.body.comment,
		req.body.begin,

		requestId,
	];

	const query =
		'UPDATE ate SET `label` = ?, `qualif` = ?, `langage` = ?, `name` = ?, `type` = ?, `func` = ?, `mode` = ?, `host` = ?, `index` = ?, `trace` = ?, `tPath` = ?, `quasar` = ?, `lQuasar` = ?, `nQuasar` = ?, `when` = ?, `who` = ?, `comment` = ?, `begin` = ? WHERE `id` = ?';

	stamp3ate.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteATE = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `ate` WHERE id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

//#endregion
//-----------------------------------//

//#region ATE (Testeur)

exports.getAllPlug = (req, res) => {
	const query = 'SELECT P.id, P.label FROM `plug` as P';

	stamp3ate.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getPlugById = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `plug` as P WHERE P.id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};
//#endregion
//-----------------------------------//
