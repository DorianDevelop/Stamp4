const createConnection = require('../configs/database.config.js'); //Import la fonction créer un lien vers un base de données
const stamp3drv = createConnection('stamp3drv'); //Créer le lien vers la base de donnée "stamp3"
/*
 * Dans ce fichier, des morceaux de code sont entouré par des #region et #endregion
 * Ils permettent sur certains IDE de facilement organiser son fichier pendant la phase de dev
 * Si intéressé vous pouvez cherchez sur internet leur fonctionnement
 */

//#region Protocol

exports.getAllProtocol = (req, res) => {
	const query = 'SELECT P.id, P.label FROM `protocol` as P ORDER BY P.label ASC;';

	stamp3drv.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

exports.getProtocolById = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `protocol` as P WHERE P.id = ?';

	stamp3drv.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

exports.createProtocol = (req, res) => {
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.shortName ? req.body.shortName : '',
		req.body.repeatOrder ? req.body.repeatOrder : 0,
		req.body.fieldSlave ? req.body.fieldSlave : 0,
		req.body.fieldAddPrim ? req.body.fieldAddPrim : 0,
		req.body.fieldAddSecond ? req.body.fieldAddSecond : 0,
		req.body.fieldCmdString ? req.body.fieldCmdString : 0,
		req.body.when ? req.body.when : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
	];
	const query =
		'INSERT INTO `protocol`(`label`, `shortName`, `repeatOrder`, `fieldSlave`, `fieldAddPrim`, `fieldAddSecond`, `fieldCmdString`, `when`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3drv.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

exports.modifyProtocol = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.shortName ? req.body.shortName : '',
		req.body.repeatOrder ? req.body.repeatOrder : 0,
		req.body.fieldSlave ? req.body.fieldSlave : 0,
		req.body.fieldAddPrim ? req.body.fieldAddPrim : 0,
		req.body.fieldAddSecond ? req.body.fieldAddSecond : 0,
		req.body.fieldCmdString ? req.body.fieldCmdString : 0,
		req.body.when ? req.body.when : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',

		requestId,
	];
	const query =
		'UPDATE protocol SET `label` = ?, `shortName` = ?, `repeatOrder` = ?, `fieldSlave` = ?, `fieldAddPrim` = ?, `fieldAddSecond` = ?, `fieldCmdString` = ?, `when` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	stamp3drv.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

exports.deleteProtocol = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `protocol` WHERE id = ?';

	stamp3drv.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

exports.getProtocolDatasById = (req, res) => {
	const requestId = req.params.id;

	let values = [];

	const query1 = 'SELECT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE P.id = ?';
	stamp3drv.query(query1, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query2 = 'SELECT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE P.id = ?';
	stamp3drv.query(query2, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query3 = 'SELECT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE P.id = ?';
	stamp3drv.query(query3, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
			res.status(200).json(values);
		}
	});
};

//#endregion
//-----------------------------------//
