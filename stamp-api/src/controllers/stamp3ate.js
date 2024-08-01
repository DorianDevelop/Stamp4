const handler = require("../services/handler.js");
const createConnection = require("../configs/database.config.js"); //Import la fonction créer un lien vers un base de données

exports.getIfAdmin = (req, res) => {
  const db = createConnection("stamp3ate");
  const username = req.params.name;
  const query = "SELECT * FROM `user` as U WHERE U.label = ?";

  db.query(query, [username], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

//#region OP (Opérateurs)

exports.getAllUser = (req, res) => {
  const db = createConnection("stamp3ate");
  const query = `SELECT CASE WHEN U.level = 4 THEN CONCAT('[ADMIN] ', U.label) WHEN U.level = 1 THEN CONCAT('[OPERATEUR] ', U.label) 
		WHEN U.level = 2 THEN CONCAT('[TECHNICIEN] ', U.label) ELSE CONCAT('[Undefined] ', U.label) END as 'label', U.id FROM user as U ORDER BY CASE WHEN U.level = 4 
		THEN 1 WHEN U.level = 2 THEN 2 ELSE 3 END, label ASC;`;

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getAllUserWithoutTag = (req, res) => {
  const db = createConnection("stamp3ate");
  const query = `SELECT U.label, U.id FROM user as U ORDER BY CASE WHEN U.level = 4 
		THEN 1 WHEN U.level = 2 THEN 2 ELSE 3 END, label ASC;`;

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.connectUser = (req, res) => {
  const db = createConnection("stamp3ate");
  const param = [req.params.idUser, req.params.pass];

  const query = "SELECT * FROM user WHERE id = ? AND pass = ?;";
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getUserById = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "SELECT * FROM `user` as U WHERE U.id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createUser = (req, res) => {
  const db = createConnection("stamp3ate");
  const datas = [
    req.body.label,
    req.body.code,
    req.body.pass,
    req.body.level,
    req.body.service,
    req.body.date,
    req.body.who,
    req.body.comment,
  ];

  const query =
    "INSERT INTO `user`(`label`, `code`, `pass`, `level`, `service`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyUser = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const datas = [
    req.body.label,
    req.body.code,
    req.body.pass,
    req.body.level,
    req.body.service,
    req.body.date,
    req.body.who,
    req.body.comment,
    requestId,
  ];

  const query =
    "UPDATE user SET `label` = ?, `code` = ?, `pass` = ?, `level` = ?, `service` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteUser = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "DELETE FROM `user` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

//#endregion
//-----------------------------------//
//#region ATE (Testeur)

exports.getAllATE = (req, res) => {
  const db = createConnection("stamp3ate");
  const query = "SELECT A.id, A.label FROM `ate` as A ORDER BY A.label";

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getATEById = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "SELECT * FROM `ate` as A WHERE A.id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createATE = (req, res) => {
  const db = createConnection("stamp3ate");
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
    "INSERT INTO `ate`(`label`, `qualif`, `langage`, `name`, `type`,`func`, `mode`, `host`, `index`, `trace`, `tPath`, `quasar`, `lQuasar`, `nQuasar`, `when`, `who`, `comment`, `begin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyATE = (req, res) => {
  const db = createConnection("stamp3ate");
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
    "UPDATE ate SET `label` = ?, `qualif` = ?, `langage` = ?, `name` = ?, `type` = ?, `func` = ?, `mode` = ?, `host` = ?, `index` = ?, `trace` = ?, `tPath` = ?, `quasar` = ?, `lQuasar` = ?, `nQuasar` = ?, `when` = ?, `who` = ?, `comment` = ?, `begin` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteATE = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "DELETE FROM `ate` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

//#endregion
//-----------------------------------//

//#region Plugins

exports.getAllPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const query = "SELECT P.id, P.label FROM `plug` as P ORDER BY 2";

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getPlugById = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "SELECT * FROM `plug` as P WHERE P.id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const datas = [req.body.label, req.body.when, req.body.who, req.body.comment];

  const query = "INSERT INTO `plug`(`label`, `when`, `who`, `comment`) VALUES (?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const datas = [req.body.label, req.body.when, req.body.who, req.body.comment, requestId];

  const query = "UPDATE plug SET `label` = ?, `when` = ?, `who` = ?, `comment` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deletePlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "DELETE FROM `plug` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.findNextIdPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const queryID =
    'SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = "plug" AND table_schema = "stamp3ate";';

  /*const queryHelp = "SET information_schema_stats_expiry = 0;";
  db.query(queryHelp, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      db.query(queryID, (error, results) => {
        if (error) {
          res.status(500).json({ error: "An error occurred \n" + error });
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

//Drivers

exports.getDriversOfPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "SELECT * FROM `driver` where idATE = ? ORDER BY `order`";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createDriversOfPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const datas = [
    req.body.idATE,
    req.body.order,
    req.body.valid,
    req.body.label,
    req.body.instID,
    req.body.protocol,
    req.body.driver,
    req.body.driverDll,
    req.body.wizard,
    req.body.port,
    req.body.address,
    req.body.subAddress,
    req.body.init,
    req.body.reset,
    req.body.comment,
  ];

  const query =
    "INSERT INTO `driver`(`idATE`, `order`, `valid`, `label`, `instID`, `protocol`, `driver`, `driverDll`, `wizard`, `port`, `address`, `subAddress`, `init`, `reset`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyDriversOfPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const datas = [
    req.body.idATE,
    req.body.order,
    req.body.valid,
    req.body.label,
    req.body.instID,
    req.body.protocol,
    req.body.driver,
    req.body.driverDll,
    req.body.wizard,
    req.body.port,
    req.body.address,
    req.body.subAddress,
    req.body.init,
    req.body.reset,
    req.body.comment,
    requestId,
  ];
  console.log(datas);

  const query =
    "UPDATE `driver` SET `idATE` = ?, `order` = ?, `valid` = ?, `label` = ?, `instID` = ?, `protocol` = ?, `driver` = ?, `driverDll` = ?, `wizard` = ?, `port` = ?, `address` = ?, `subAddress` = ?, `init` = ?, `reset` = ?, `comment` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteDriversOfPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "DELETE FROM `driver` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.createDefaultDriver = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const datas = [requestId, requestId, requestId, requestId];
  const query =
    "INSERT INTO driver (idAte, `order`, valid, label, instID, protocol, driver, driverDLL, wizard, port, address, subAddress, init, reset, comment) VALUES " +
    "(?, 4, 1, 'PRINTER_TICKET', NULL, NULL, 'C:Stamp3IVIPluginPrinterIDP3550Stamp3PlugInPrinterIDP3550.vi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)," +
    "(?, 3, 1, 'POPUP_BASIC', NULL, NULL, 'C:Stamp3IVIPluginPopupStamp3PopUpBasic.vi', NULL, 'C:Stamp3IVIPluginPopupPopupBasicWizard.xml', NULL, NULL, NULL, NULL, NULL, NULL)," +
    "(?, 2, 1, 'DIV_BASIC', NULL, NULL, 'C:Stamp3IVIPluginIDVIStamp3PlugInIDVI.vi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)," +
    "(?, 1, 1, 'NULL_DRIVER', NULL, NULL, 'C:Stamp3IVIPluginNULLstamp3ateNULL.vi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

//Actions

exports.getActionsOfPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "SELECT * FROM `action` where idPlug = ? ORDER BY `order`";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createActionsOfPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const datas = [
    req.body.idPlug,
    req.body.target,
    req.body.funct,
    req.body.organ,
    req.body.action,
    req.body.order,
    req.body.label,
    req.body.idDriver,
    req.body.scpi,
    req.body.info,
  ];

  const query =
    "INSERT INTO `action`(`idPlug`, `target`, `funct`, `organ`, `action`, `order`, `label`, `idDriver`, `scpi`, `info`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyActionsOfPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const datas = [
    req.body.idPlug,
    req.body.target,
    req.body.funct,
    req.body.organ,
    req.body.action,
    req.body.order,
    req.body.label,
    req.body.idDriver,
    req.body.scpi,
    req.body.info,
    requestId,
  ];

  const query =
    "UPDATE `action` SET `idPlug` = ?, `target` = ?, `funct` = ?, `organ` = ?, `action` = ?, `order` = ?, `label` = ?, `idDriver` = ?, `scpi` = ?, `info` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteActionsOfPlug = (req, res) => {
  const db = createConnection("stamp3ate");
  const requestId = req.params.id;
  const query = "DELETE FROM `action` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

//#endregion
//-----------------------------------//
