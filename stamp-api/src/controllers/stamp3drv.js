const handler = require("../services/handler.js");
const createConnection = require("../configs/database.config.js"); //Import la fonction créer un lien vers un base de données

//#region Protocol

exports.getAllProtocol = (req, res) => {
  const db = createConnection("stamp3drv");
  const query = "SELECT P.id, P.label FROM `protocol` as P ORDER BY P.label ASC;";

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getProtocolById = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;
  const query = "SELECT * FROM `protocol` as P WHERE P.id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createProtocol = (req, res) => {
  const db = createConnection("stamp3drv");
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
    "INSERT INTO `protocol`(`label`, `shortName`, `repeatOrder`, `fieldSlave`, `fieldAddPrim`, `fieldAddSecond`, `fieldCmdString`, `when`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyProtocol = (req, res) => {
  const db = createConnection("stamp3drv");
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
    "UPDATE protocol SET `label` = ?, `shortName` = ?, `repeatOrder` = ?, `fieldSlave` = ?, `fieldAddPrim` = ?, `fieldAddSecond` = ?, `fieldCmdString` = ?, `when` = ?, `who` = ?, `comment` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteProtocol = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;
  const query = "DELETE FROM `protocol` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.getProtocolDatasById = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;

  let values = [];

  const query1_1 =
    'SELECT DISTINCT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE B.access like "WR" AND P.id = ?';
  db.query(query1_1, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
    }
  });

  const query1_2 =
    'SELECT DISTINCT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE B.access like "RD" AND P.id = ?';
  db.query(query1_2, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
    }
  });

  const query2_1 =
    'SELECT DISTINCT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE D.access like "WR" AND P.id = ?';
  db.query(query2_1, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
    }
  });

  const query2_2 =
    'SELECT DISTINCT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE D.access like "RD" AND P.id = ?';
  db.query(query2_2, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
    }
  });

  const query3_1 =
    'SELECT DISTINCT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE S.access like "WR" AND P.id = ?';
  db.query(query3_1, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
    }
  });

  const query3_2 =
    'SELECT DISTINCT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE S.access like "RD" AND P.id = ?';
  db.query(query3_2, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
      res.status(200).json(values);
    }
  });

  db.end();
};

//#endregion
//-----------------------------------//
//#region Protol datas

exports.deleteString = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;
  const query = "DELETE FROM `string` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.deleteBoolean = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;
  const query = "DELETE FROM `boolean` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.deleteData = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;
  const query = "DELETE FROM `data` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.getAllBooleans = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;

  let values = [];

  const query1_1 =
    'SELECT DISTINCT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE B.access like "WR" AND P.id = ?';
  db.query(query1_1, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
    }
  });

  const query1_2 =
    'SELECT DISTINCT B.* FROM `protocol` as P JOIN `boolean` as B on B.idProtocol = P.id WHERE B.access like "RD" AND P.id = ?';
  db.query(query1_2, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
      res.status(200).json(values);
    }
  });

  db.end();
};

exports.createBoolean = (req, res) => {
  const db = createConnection("stamp3drv");
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
    "INSERT INTO `boolean`(`idProtocol`, `label`, `slave`, `addPrim`, `addSecond`, `complement`, `access`, `cmdString`, `answerExpected`, `answerValue`, `time`, `loop`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyBoolean = (req, res) => {
  const db = createConnection("stamp3drv");
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
    "UPDATE boolean SET `idProtocol` = ?, `label` = ?, `slave` = ?, `addPrim` = ?, `addSecond` = ?, `complement` = ?, `access` = ?, `cmdString` = ?, `answerExpected` = ?, `answerValue` = ?, `time` = ?, `loop` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.getAllDatas = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;

  let values = [];

  const query2_1 =
    'SELECT DISTINCT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE D.access like "WR" AND P.id = ?';
  db.query(query2_1, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
    }
  });

  const query2_2 =
    'SELECT DISTINCT D.* FROM `protocol` as P JOIN `data` AS D on D.idProtocol = P.id WHERE D.access like "RD" AND P.id = ?';
  db.query(query2_2, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
      res.status(200).json(values);
    }
  });
};

exports.createData = (req, res) => {
  const db = createConnection("stamp3drv");
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
    "INSERT INTO `data`(`idProtocol`, `label`, `slave`, `addPrim`, `addSecond`, `type`, `access`, `cmdString`, `answerExpected`, `answerValue`, `time`, `loop`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyData = (req, res) => {
  const db = createConnection("stamp3drv");
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
    "UPDATE data SET `idProtocol` = ?,  `label` = ?, `slave` = ?, `addPrim` = ?, `addSecond` = ?, `type` = ?, `access` = ?, `cmdString` = ?, `answerExpected` = ?, `answerValue` = ?, `time` = ?, `loop` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.getAllStrings = (req, res) => {
  const db = createConnection("stamp3drv");
  const requestId = req.params.id;

  let values = [];

  const query3_1 =
    'SELECT DISTINCT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE S.access like "WR" AND P.id = ?';
  db.query(query3_1, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
    }
  });

  const query3_2 =
    'SELECT DISTINCT S.* FROM `protocol` as P JOIN `string` as S on S.idProtocol = P.id WHERE S.access like "RD" AND P.id = ?';
  db.query(query3_2, [requestId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      values.push(results);
      res.status(200).json(values);
    }
  });
};

exports.createString = (req, res) => {
  const db = createConnection("stamp3drv");
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
    "INSERT INTO `string`(`idProtocol`, `label`, `slave`, `addPrim`, `addSecond`, `access`, `cmdString`, `answerExpected`, `answerValue`, `time`, `loop`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyString = (req, res) => {
  const db = createConnection("stamp3drv");
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
    "UPDATE string SET `idProtocol` = ?,  `label` = ?, `slave` = ?, `addPrim` = ?, `addSecond` = ?, `access` = ?, `cmdString` = ?, `answerExpected` = ?, `answerValue` = ?, `time` = ?, `loop` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};
//#endregion

exports.findNextIdProtocol = (req, res) => {
  const db = createConnection("stamp3drv");
  const queryID =
    'SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = "protocol" AND table_schema = "stamp3drv";';

  /*const queryHelp = 'SET information_schema_stats_expiry = 0;';
	db.query(queryHelp, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			db.query(queryID, (error, results) => {
				if (error) {
					res.status(500).json({ error: 'An error occurred \n' + error });
				} else {
					res.status(200).json(results);
				}
			});
		}
		db.end();
	});*/

  db.query(queryID, (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      res.status(200).json(results);
    }
  });
  db.end();
};
