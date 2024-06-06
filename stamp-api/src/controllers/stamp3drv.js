const handler = require('../services/handler.js');
const createConnection = require('../configs/database.config.js'); //Import la fonction créer un lien vers un base de données
const stamp3drv = createConnection('stamp3drv'); //Créer le lien vers la base de donnée "stamp3"

//#region Protocol

exports.getAllProtocol = (req, res) => {
	const query = 'SELECT P.id, P.label FROM `protocol` as P ORDER BY P.label ASC;';

	stamp3drv.query(query, (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.getProtocolById = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `protocol` as P WHERE P.id = ?';

	stamp3drv.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, results);
	});
};

exports.createProtocol = (req, res) => {
	const datas = [
		req.body.label,
		req.body.shortName,
		req.body.repeatOrder,
		req.body.fieldSlave,
		req.body.fieldAddPrim,
		req.body.fieldAddSecond,
		req.body.fieldCmdString,
		req.body.when,
		req.body.who,
		req.body.comment,
	];
	const query =
		'INSERT INTO `protocol`(`label`, `shortName`, `repeatOrder`, `fieldSlave`, `fieldAddPrim`, `fieldAddSecond`, `fieldCmdString`, `when`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3drv.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyProtocol = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.label,
		req.body.shortName,
		req.body.repeatOrder,
		req.body.fieldSlave,
		req.body.fieldAddPrim,
		req.body.fieldAddSecond,
		req.body.fieldCmdString,
		req.body.when,
		req.body.who,
		req.body.comment,

		requestId,
	];
	const query =
		'UPDATE protocol SET `label` = ?, `shortName` = ?, `repeatOrder` = ?, `fieldSlave` = ?, `fieldAddPrim` = ?, `fieldAddSecond` = ?, `fieldCmdString` = ?, `when` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	stamp3drv.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.deleteProtocol = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `protocol` WHERE id = ?';

	stamp3drv.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

exports.getProtocolDatasById = (req, res) => {
	const requestId = req.params.id;

	let values = [];

	const query1_1 = 'SELECT DISTINCT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE B.access like "WR" AND P.id = ?';
	stamp3drv.query(query1_1, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query1_2 = 'SELECT DISTINCT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE B.access like "RD" AND P.id = ?';
	stamp3drv.query(query1_2, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query2_1 = 'SELECT DISTINCT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE D.access like "WR" AND P.id = ?';
	stamp3drv.query(query2_1, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query2_2 = 'SELECT DISTINCT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE D.access like "RD" AND P.id = ?';
	stamp3drv.query(query2_2, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query3_1 = 'SELECT DISTINCT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE S.access like "WR" AND P.id = ?';
	stamp3drv.query(query3_1, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query3_2 = 'SELECT DISTINCT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE S.access like "RD" AND P.id = ?';
	stamp3drv.query(query3_2, [requestId], (error, results) => {
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
//#region Protol datas

exports.deleteString = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `string` WHERE id = ?';

	stamp3drv.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

exports.deleteBoolean = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `boolean` WHERE id = ?';

	stamp3drv.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

exports.deleteData = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `data` WHERE id = ?';

	stamp3drv.query(query, [requestId], (error, results) => {
		handler.handleReponse(res, error, null, 'Delete succeed!');
	});
};

exports.getAllBooleans = (req, res) => {
	const requestId = req.params.id;

	let values = [];

	const query1_1 = 'SELECT DISTINCT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE B.access like "WR" AND P.id = ?';
	stamp3drv.query(query1_1, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query1_2 = 'SELECT DISTINCT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE B.access like "RD" AND P.id = ?';
	stamp3drv.query(query1_2, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
			res.status(200).json(values);
		}
	});
};

exports.createBoolean = (req, res) => {
	const datas = [
		req.body.idProtocol,
		req.body.label,
		req.body.slave,
		req.body.addPrim,
		req.body.addSecond,
		req.body.complement,
		req.body.access,
		req.body.cmdString,
		req.body.answerExpected,
		req.body.answerValue,
		req.body.time,
		req.body.loop,
	];
	const query =
		'INSERT INTO `boolean`(`idProtocol`, `label`, `slave`, `addPrim`, `addSecond`, `complement`, `access`, `cmdString`, `answerExpected`, `answerValue`, `time`, `loop`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3drv.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyBoolean = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.idProtocol,
		req.body.label,
		req.body.slave,
		req.body.addPrim,
		req.body.addSecond,
		req.body.complement,
		req.body.access,
		req.body.cmdString,
		req.body.answerExpected,
		req.body.answerValue,
		req.body.time,
		req.body.loop,

		requestId,
	];
	const query =
		'UPDATE boolean SET `idProtocol` = ?, `label` = ?, `slave` = ?, `addPrim` = ?, `addSecond` = ?, `complement` = ?, `access` = ?, `cmdString` = ?, `answerExpected` = ?, `answerValue` = ?, `time` = ?, `loop` = ? WHERE `id` = ?';

	stamp3drv.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.getAllDatas = (req, res) => {
	const requestId = req.params.id;

	let values = [];

	const query2_1 = 'SELECT DISTINCT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE D.access like "WR" AND P.id = ?';
	stamp3drv.query(query2_1, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query2_2 = 'SELECT DISTINCT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE D.access like "RD" AND P.id = ?';
	stamp3drv.query(query2_2, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
			res.status(200).json(values);
		}
	});
};

exports.createData = (req, res) => {
	const datas = [
		req.body.idProtocol,
		req.body.label,
		req.body.slave,
		req.body.addPrim,
		req.body.addSecond,
		req.body.type,
		req.body.access,
		req.body.cmdString,
		req.body.answerExpected,
		req.body.answerValue,
		req.body.time,
		req.body.loop,
	];
	const query =
		'INSERT INTO `data`(`idProtocol`, `label`, `slave`, `addPrim`, `addSecond`, `type`, `access`, `cmdString`, `answerExpected`, `answerValue`, `time`, `loop`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3drv.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyData = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.idProtocol,
		req.body.label,
		req.body.slave,
		req.body.addPrim,
		req.body.addSecond,
		req.body.type,
		req.body.access,
		req.body.cmdString,
		req.body.answerExpected,
		req.body.answerValue,
		req.body.time,
		req.body.loop,

		requestId,
	];
	const query =
		'UPDATE data SET `idProtocol` = ?,  `label` = ?, `slave` = ?, `addPrim` = ?, `addSecond` = ?, `type` = ?, `access` = ?, `cmdString` = ?, `answerExpected` = ?, `answerValue` = ?, `time` = ?, `loop` = ? WHERE `id` = ?';

	stamp3drv.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};

exports.getAllStrings = (req, res) => {
	const requestId = req.params.id;

	let values = [];

	const query3_1 = 'SELECT DISTINCT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE S.access like "WR" AND P.id = ?';
	stamp3drv.query(query3_1, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
		}
	});

	const query3_2 = 'SELECT DISTINCT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE S.access like "RD" AND P.id = ?';
	stamp3drv.query(query3_2, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			values.push(results);
			res.status(200).json(values);
		}
	});
};

exports.createString = (req, res) => {
	const datas = [
		req.body.idProtocol,
		req.body.label,
		req.body.slave,
		req.body.addPrim,
		req.body.addSecond,
		req.body.access,
		req.body.cmdString,
		req.body.answerExpected,
		req.body.answerValue,
		req.body.time,
		req.body.loop,
	];
	const query =
		'INSERT INTO `string`(`idProtocol`, `label`, `slave`, `addPrim`, `addSecond`, `access`, `cmdString`, `answerExpected`, `answerValue`, `time`, `loop`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	stamp3drv.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Creation succeed!');
	});
};

exports.modifyString = (req, res) => {
	const requestId = req.params.id;
	const datas = [
		req.body.idProtocol,
		req.body.label,
		req.body.slave,
		req.body.addPrim,
		req.body.addSecond,
		req.body.access,
		req.body.cmdString,
		req.body.answerExpected,
		req.body.answerValue,
		req.body.time,
		req.body.loop,

		requestId,
	];
	const query =
		'UPDATE string SET `idProtocol` = ?,  `label` = ?, `slave` = ?, `addPrim` = ?, `addSecond` = ?, `access` = ?, `cmdString` = ?, `answerExpected` = ?, `answerValue` = ?, `time` = ?, `loop` = ? WHERE `id` = ?';

	stamp3drv.query(query, datas, (error, results) => {
		handler.handleReponse(res, error, null, 'Modification succeed!');
	});
};
//#endregion

exports.findNextIdProtocol = (req, res) => {
	const queryID = 'SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = "protocol" AND table_schema = "stamp3drv";';

	const queryHelp = 'SET information_schema_stats_expiry = 0;';
	stamp3drv.query(queryHelp, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			stamp3drv.query(queryID, (error, results) => {
				if (error) {
					res.status(500).json({ error: 'An error occurred \n' + error });
				} else {
					res.status(200).json(results);
				}
			});
		}
	});
};
