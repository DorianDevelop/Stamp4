const handler = require("../services/handler.js");
const createConnection = require("../configs/database.config.js"); //Import la fonction créer un lien vers un base de données

//#region Gamme

exports.getAllGammeLabel = (req, res) => {
  const db = createConnection("stamp3uut");
  const query = "SELECT R.id, R.label FROM `range` as R ORDER BY 2 ASC";

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getGammeByID = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "SELECT * FROM `range` as R WHERE R.id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createGamme = (req, res) => {
  const db = createConnection("stamp3uut");
  const datas = [req.body.label, req.body.sName, req.body.when, req.body.who, req.body.comment];

  const query = "INSERT INTO `range`(`label`, `sName`, `when`, `who`, `comment`) VALUES (?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyGamme = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const datas = [req.body.label, req.body.sName, req.body.when, req.body.who, req.body.comment, requestId];

  const query = "UPDATE `range` SET `label` = ?, `sName` = ?, `when` = ?, `who` = ?, `comment` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteGamme = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "DELETE FROM `range` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

//#endregion

//#region UUT

exports.getAllUUTLabel = (req, res) => {
  const db = createConnection("stamp3uut");
  const query =
    "SELECT U.id, " +
    `CASE WHEN U.power IS NOT NULL AND U.power <> '' THEN CONCAT(U.refsku, "  [", U.power, " VA", "]") ELSE CONCAT(U.refsku, "  [0 VA]") END as label FROM uut as U ORDER BY label;`;

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getUUTByID = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "SELECT * FROM `uut` as U WHERE U.id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createUUT = (req, res) => {
  const db = createConnection("stamp3uut");
  const datas = [
    req.body.refsku,
    req.body.qualified,
    req.body.range,
    req.body.dateStart,
    req.body.dateEnd,
    req.body.date,
    req.body.who,
    req.body.comment,
    req.body.reference ? req.body.reference : "%1F%1Q%2Q%2Y%2W%1O%*U",
    req.body.serial,
    req.body.topo,
    req.body.design,
    req.body.power,
    req.body.backup,
    req.body.volt,
    req.body.freq,
    req.body.model,
    req.body.pnp,
    req.body.firm,
    req.body.sku,
    req.body.hiVolt,
    req.body.hiAmps,
    req.body.hiTime,
    req.body.hiRamp,
    req.body.hisVolt,
    req.body.hisAmps,
    req.body.hisTime,
    req.body.hisRamp,
    req.body.hifVolt,
    req.body.hifAmps,
    req.body.hifTime,
    req.body.hifRamp,
    req.body.gndAmps,
    req.body.gndOhms,
    req.body.gndTime,
    req.body.contAmps,
    req.body.contOhms,
    req.body.contTime,
    req.body.main1U ? req.body.main1U : "",
    req.body.main1Umaxi ? req.body.main1Umaxi : "",
    req.body.main1Umini ? req.body.main1Umini : "",
    req.body.main1Yield ? req.body.main1Yield : "",
    req.body.main1Imaxi ? req.body.main1Imaxi : "",
    req.body.main1Thdi ? req.body.main1Thdi : "",
    req.body.main2U ? req.body.main2U : "",
    req.body.main2Umaxi ? req.body.main2Umaxi : "",
    req.body.main2Umini ? req.body.main2Umini : "",
    req.body.main2Yield ? req.body.main2Yield : "",
    req.body.main2Imaxi ? req.body.main2Imaxi : "",
    req.body.main2Thdi ? req.body.main2Thdi : "",
    req.body.outU,
    req.body.outUtol,
    req.body.outThdu,
    req.body.outUdc,
    req.body.outF,
    req.body.outFtol,
    req.body.outVA,
    req.body.outW,
    req.body.outPhi,
    req.body.batU,
    req.body.batUmaxi,
    req.body.batUmini,
    req.body.batAH,
    req.body.batLife,
    req.body.batBranch,
    req.body.batConst1 ? req.body.batConst1 : "",
    req.body.batConst2 ? req.body.batConst2 : "",
    req.body.batConst3 ? req.body.batConst3 : "",
    req.body.batConst4 ? req.body.batConst4 : "",
    req.body.chrgU,
    req.body.chrgI,
    req.body.chrgTemp,
  ];

  const query =
    "INSERT INTO `uut` (`refsku`, `qualified`, `range`, `dateStart`, `dateEnd`, `date`, `who`, `comment`, `reference`, `serial`, `topo`, `design`, `power`, `backup`, `volt`, `freq`, `model`, `pnp`, `firm`, `sku`, `hiVolt`, `hiAmps`, `hiTime`, `hiRamp`, `hisVolt`, `hisAmps`, `hisTime`, `hisRamp`, `hifVolt`, `hifAmps`, `hifTime`, `hifRamp`, `gndAmps`, `gndOhms`, `gndTime`, `contAmps`, `contOhms`, `contTime`, `main1U`, `main1Umaxi`, `main1Umini`, `main1Yield`, `main1Imaxi`, `main1Thdi`, `main2U`, `main2Umaxi`, `main2Umini`, `main2Yield`, `main2Imaxi`, `main2Thdi`, `outU`, `outUtol`, `outThdu`, `outUdc`, `outF`, `outFtol`, `outVA`, `outW`, `outPhi`, `batU`, `batUmaxi`, `batUmini`, `batAH`, `batLife`, `batBranch`, `batConst1`, `batConst2`, `batConst3`, `batConst4`, `chrgU`, `chrgI`, `chrgTemp`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyUUT = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const datas = [
    req.body.refsku,
    req.body.qualified,
    req.body.range,
    req.body.dateStart,
    req.body.dateEnd,
    req.body.date,
    req.body.who,
    req.body.comment,
    req.body.reference ? req.body.reference : "%1F%1Q%2Q%2Y%2W%1O%*U",
    req.body.serial,
    req.body.topo,
    req.body.design,
    req.body.power,
    req.body.backup,
    req.body.volt,
    req.body.freq,
    req.body.model,
    req.body.pnp,
    req.body.firm,
    req.body.sku,
    req.body.hiVolt,
    req.body.hiAmps,
    req.body.hiTime,
    req.body.hiRamp,
    req.body.hisVolt,
    req.body.hisAmps,
    req.body.hisTime,
    req.body.hisRamp,
    req.body.hifVolt,
    req.body.hifAmps,
    req.body.hifTime,
    req.body.hifRamp,
    req.body.gndAmps,
    req.body.gndOhms,
    req.body.gndTime,
    req.body.contAmps,
    req.body.contOhms,
    req.body.contTime,
    req.body.main1U ? req.body.main1U : "",
    req.body.main1Umaxi ? req.body.main1Umaxi : "",
    req.body.main1Umini ? req.body.main1Umini : "",
    req.body.main1Yield ? req.body.main1Yield : "",
    req.body.main1Imaxi ? req.body.main1Imaxi : "",
    req.body.main1Thdi ? req.body.main1Thdi : "",
    req.body.main2U ? req.body.main2U : "",
    req.body.main2Umaxi ? req.body.main2Umaxi : "",
    req.body.main2Umini ? req.body.main2Umini : "",
    req.body.main2Yield ? req.body.main2Yield : "",
    req.body.main2Imaxi ? req.body.main2Imaxi : "",
    req.body.main2Thdi ? req.body.main2Thdi : "",
    req.body.outU,
    req.body.outUtol,
    req.body.outThdu,
    req.body.outUdc,
    req.body.outF,
    req.body.outFtol,
    req.body.outVA,
    req.body.outW,
    req.body.outPhi,
    req.body.batU,
    req.body.batUmaxi,
    req.body.batUmini,
    req.body.batAH,
    req.body.batLife,
    req.body.batBranch,
    req.body.batConst1 ? req.body.batConst1 : "",
    req.body.batConst2 ? req.body.batConst2 : "",
    req.body.batConst3 ? req.body.batConst3 : "",
    req.body.batConst4 ? req.body.batConst4 : "",
    req.body.chrgU,
    req.body.chrgI,
    req.body.chrgTemp,

    requestId,
  ];

  const query =
    "UPDATE `uut` SET `refsku` = ?, `qualified` = ?, `range` = ?, `dateStart` = ?, `dateEnd` = ?, `date` = ?, `who` = ?, `comment` = ?, `reference` = ?, `serial` = ?, `topo` = ?, `design` = ?, `power` = ?, `backup` = ?, `volt` = ?, `freq` = ?, `model` = ?, `pnp` = ?, `firm` = ?, `sku` = ?, `hiVolt` = ?, `hiAmps` = ?, `hiTime` = ?, `hiRamp` = ?, `hisVolt` = ?, `hisAmps` = ?, `hisTime` = ?, `hisRamp` = ?, `hifVolt` = ?, `hifAmps` = ?, `hifTime` = ?, `hifRamp` = ?, `gndAmps` = ?, `gndOhms` = ?, `gndTime` = ?, `contAmps` = ?, `contOhms` = ?, `contTime` = ?, `main1U` = ?, `main1Umaxi` = ?, `main1Umini` = ?, `main1Yield` = ?, `main1Imaxi` = ?, `main1Thdi` = ?, `main2U` = ?, `main2Umaxi` = ?, `main2Umini` = ?, `main2Yield` = ?, `main2Imaxi` = ?, `main2Thdi` = ?, `outU` = ?, `outUtol` = ?, `outThdu` = ?, `outUdc` = ?, `outF` = ?, `outFtol` = ?, `outVA` = ?, `outW` = ?, `outPhi` = ?, `batU` = ?, `batUmaxi` = ?, `batUmini` = ?, `batAH` = ?, `batLife` = ?, `batBranch` = ?, `batConst1` = ?, `batConst2` = ?, `batConst3` = ?, `batConst4` = ?, `chrgU` = ?, `chrgI` = ?, `chrgTemp` = ? WHERE id = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteUUT = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "DELETE FROM `uut` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.getAllUUTRelatedGamme = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.id];
  const query =
    "SELECT U.id, " +
    `CASE WHEN U.power IS NOT NULL AND U.power <> '' THEN CONCAT(U.refsku, "  [", U.power, " VA", "]") ELSE CONCAT(U.refsku, "  [0 VA]") END as label FROM uut as U ` +
    "WHERE U.range = ? ORDER BY label";

  db.query(query, [param], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getAllUUTRelatedGammeCtrl = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.ctrl, req.params.id];

  const query = `SELECT U.id, CASE WHEN U.power IS NOT NULL AND U.power <> '' THEN CONCAT(U.refsku, " [", U.power, " VA]") ELSE CONCAT(U.refsku, " [0 VA]") END AS label, Q.Qualified AS quali FROM uut AS U LEFT JOIN qualified AS Q ON Q.idUut = U.id AND Q.idCtrlFlt = ? WHERE U.range = ? ORDER BY quali DESC, label ASC;`;
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getAllUUTRelatedCtrl = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.ctrl];

  const query = `SELECT U.id, CASE WHEN U.power IS NOT NULL AND U.power <> '' THEN CONCAT(U.refsku, " [", U.power, " VA]") ELSE CONCAT(U.refsku, " [0 VA]") END AS label, Q.Qualified AS quali FROM uut AS U LEFT JOIN qualified AS Q ON Q.idUut = U.id AND Q.idCtrlFlt = ? ORDER BY quali DESC, label ASC;`;
  db.query(query, [param], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getWhereQualified = (req, res) => {
  const db = createConnection("stamp3uut");
  const id = [req.params.id];

  const query = `SELECT Q.idCtrlFlt FROM qualified as Q  WHERE Q.idUut = ?;`;
  db.query(query, id, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getQualifiedResult = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.id, req.params.ctrl];

  const query = `SELECT CASE WHEN COUNT(Q.id) = 0 THEN False WHEN COUNT(Q.id) = 1 THEN True ELSE 'Error' END as "Result" FROM qualified as Q  WHERE Q.idUut = ? AND Q.idCtrlFlt = ?;`;
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.qualifyUut = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.id, req.params.ctrl];

  const query = `INSERT INTO qualified(idUut, idCtrlFlt, Qualified) VALUES(?, ?, 1);`;

  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.unqualifyUut = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.id, req.params.ctrl];

  const query = `DELETE FROM qualified  WHERE idUut = ? AND idCtrlFlt = ?;`;
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.getSpecFromRangeAndCtrl = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.range, req.params.ctrl];

  const query = "SELECT * FROM `spec` WHERE `range` = ? AND ctrl = ?;";
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.linkUut = (req, res) => {
  const db = createConnection("stamp3uut");
  const datas = [req.body.idMain, req.body.idLink, req.body.idCtrl || null, req.body.No || ""];

  const query = `INSERT INTO link_uut_spec(idMain, idLink, idCtrl, No) VALUES(?, ?, ?, ?);`;

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.unlinkUut = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.id];

  const query = `DELETE FROM link_uut_spec WHERE id = ?;`;
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.getAllLinkedSpec = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.id];

  const query =
    "SELECT LUS.*, S.label as label FROM `link_uut_spec` as LUS JOIN `spec` as S on S.id = LUS.idLink WHERE `idMain` = ?;";
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getAllIdents = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.target, req.params.func, req.params.organ, req.params.action];

  const query =
    "SELECT ident FROM action WHERE idTarget = ? AND idFunc = ? AND idOrgan = ? AND idAction = ? GROUP BY ident ORDER BY ident ASC;";
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

//#endregion

//#region Spec

exports.getAllSpecLabel = (req, res) => {
  const db = createConnection("stamp3uut");
  const query = "SELECT S.id, S.label FROM `spec` as S";

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getSpecByID = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "SELECT * FROM `spec` as S WHERE S.id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createSpec = (req, res) => {
  const db = createConnection("stamp3uut");
  const datas = [
    req.body.label,
    req.body.range,
    req.body.ctrl,
    req.body.replay,
    req.body.date,
    req.body.who,
    req.body.comment,
  ];

  const query =
    "INSERT INTO `spec`(`label`, `range`, `ctrl`, `replay`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifySpec = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const datas = [
    req.body.label,
    req.body.range,
    req.body.ctrl,
    req.body.replay,
    req.body.date,
    req.body.who,
    req.body.comment,
    requestId,
  ];

  const query =
    "UPDATE spec SET `label` = ?, `range` = ?, `ctrl` = ?, `replay` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteSpec = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "DELETE FROM `spec` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.getAllSpecRelatedGamme = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = req.params.id;
  const query = "SELECT S.id, S.label FROM `spec` as S " + "WHERE S.range = ? ORDER BY label";

  db.query(query, [param], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.findNextIdSpec = (req, res) => {
  const db = createConnection("stamp3uut");
  const queryID =
    'SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = "spec" AND table_schema = "stamp3uut";';

  const queryHelp = "SET information_schema_stats_expiry = 0;";
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
  });
};

//#endregion

//#region STEP

exports.getAllStepLabel = (req, res) => {
  const db = createConnection("stamp3uut");
  const query = "SELECT S.id, S.label FROM `step` as S";

  db.query(query, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getAllStepRelatedGamme = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = req.params.id;
  const query = "SELECT S.id, S.label FROM `step` as S " + "WHERE S.range = ? ORDER BY label";

  db.query(query, [param], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getStepByID = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "SELECT * FROM `step` as S WHERE S.id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createStep = (req, res) => {
  const db = createConnection("stamp3uut");
  const datas = [req.body.label, req.body.tstFunc, req.body.range, req.body.date, req.body.who, req.body.comment];

  const query = "INSERT INTO `step`(`label`, `tstFunc`, `range`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyStep = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const datas = [
    req.body.label,
    req.body.tstFunc,
    req.body.range,
    req.body.date,
    req.body.who,
    req.body.comment,
    requestId,
  ];

  const query =
    "UPDATE step SET `label` = ?, `tstFunc` = ?, `range` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteStep = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "DELETE FROM `step` WHERE id = ?";
  const query2 = "DELETE FROM `action` WHERE idStep = ?";

  db.query(query2, [requestId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred \n" + error });
    } else {
      console.log("Delete all actions related to Step");
    }
  });

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.findNextIdStep = (req, res) => {
  const db = createConnection("stamp3uut");
  const queryID =
    'SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = "step" AND table_schema = "stamp3uut";';

  const queryHelp = "SET information_schema_stats_expiry = 0;";
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
  });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

exports.getAllSpecRelatedGamme = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = req.params.id;
  const query = "SELECT S.id, S.label FROM `spec` as S " + "WHERE S.range = ? ORDER BY label";

  db.query(query, [param], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getAllStepForASpec = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query =
    "SELECT ST.*, LSS.No, LSS.id as linkId FROM `spec` as SP " +
    "INNER JOIN `link_spec_step` as LSS on LSS.idMain = SP.id " +
    "INNER JOIN `step` as ST on ST.id = LSS.idLink " +
    "WHERE SP.id = ?;";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getAllStepForAGamme = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "SELECT ST.* FROM `step` as ST WHERE ST.range = ? ORDER BY ST.label ASC;";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

//Ajoute une Step à une SPEC
exports.addStepToSpec = (req, res) => {
  const db = createConnection("stamp3uut");
  const datas = [req.body.idMain, req.body.idLink, req.body.No ? req.body.No : null];
  const query = "INSERT INTO `link_spec_step`(`idMain`,`idLink`,`No`) VALUES (?, ?, ?);";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.deleteStepForSpec = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "DELETE FROM `link_spec_step` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

//#endregion

//#region Action

exports.getAllActionForAStep = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = req.params.id;
  const query = "SELECT A.* FROM `action` as A WHERE A.idStep = ? ORDER BY A.order";

  db.query(query, [param], (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.getAllActionForUUT = (req, res) => {
  const db = createConnection("stamp3uut");
  const param = [req.params.ctrl, req.params.id];
  const query =
    "SELECT DISTINCT S.label as bigKey, ST.label as smallKey, A.* from `link_uut_spec` as LUS JOIN `spec` as S on S.id = LUS.idLink JOIN `link_spec_step` as LSS on LUS.idLink = LSS.idMain " +
    "JOIN `action` as A on A.idStep = LSS.idLink JOIN `step` as ST on ST.id = LSS.idLink WHERE LUS.idCtrl = ? AND A.id IN (SELECT A.id from `link_uut_spec` as LUS JOIN `link_spec_step` as LSS on LUS.idLink = LSS.idMain JOIN `action` as A on A.idStep = LSS.idLink WHERE LUS.idMain = ?) ORDER BY A.order ASC;";
  db.query(query, param, (error, results) => {
    handler.handleReponse(res, error, results);
  });
  db.end();
};

exports.createAction = (req, res) => {
  const db = createConnection("stamp3uut");
  const datas = [
    req.body.idStep,
    req.body.range || null,
    req.body.order || null,
    req.body.track || null,
    req.body.errStamp || "",
    req.body.errApc || "",
    req.body.idTarget || null,
    req.body.idFunc || null,
    req.body.idOrgan || null,
    req.body.idAction || null,
    req.body.ident || "",
    req.body.pattern || "",
    req.body.param0 || "",
    req.body.param1 || "",
    req.body.param2 || "",
    req.body.param3 || "",
    req.body.param4 || "",
    req.body.param5 || "",
    req.body.param6 || "",
    req.body.param7 || "",
    req.body.param8 || "",
    req.body.param9 || "",
  ];

  const query =
    "INSERT INTO `action` (`idStep`, `range`, `order`, `track`, `errStamp`, `errApc`, `idTarget`, `idFunc`, `idOrgan`, `idAction`, `ident`, `pattern`, `param0`, `param1`, `param2`, `param3`, `param4`, `param5`, `param6`, `param7`, `param8`, `param9`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Creation succeed!");
  });
  db.end();
};

exports.modifyAction = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const datas = [
    req.body.idStep || null,
    req.body.range || null,
    req.body.order || null,
    req.body.track || null,
    req.body.errStamp || "",
    req.body.errApc || "",
    req.body.idTarget || null,
    req.body.idFunc || null,
    req.body.idOrgan || null,
    req.body.idAction || null,
    req.body.ident || "",
    req.body.pattern || "",
    req.body.param0 || "",
    req.body.param1 || "",
    req.body.param2 || "",
    req.body.param3 || "",
    req.body.param4 || "",
    req.body.param5 || "",
    req.body.param6 || "",
    req.body.param7 || "",
    req.body.param8 || "",
    req.body.param9 || "",

    requestId,
  ];

  const query =
    "UPDATE `action`  SET `idStep` = ?, `range` = ?, `order` = ?, `track` = ?, `errStamp` = ?, `errApc` = ?, `idTarget` = ?, `idFunc` = ?, `idOrgan` = ?, `idAction` = ?, `ident` = ?, `pattern` = ?, `param0` = ?, `param1` = ?, `param2` = ?, `param3` = ?, `param4` = ?, `param5` = ?, `param6` = ?, `param7` = ?, `param8` = ?, `param9` = ? WHERE `id` = ?;";

  db.query(query, datas, (error, results) => {
    handler.handleReponse(res, error, null, "Modification succeed!");
  });
  db.end();
};

exports.deleteAction = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "DELETE FROM `action` WHERE id = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};

exports.deleteActionByStep = (req, res) => {
  const db = createConnection("stamp3uut");
  const requestId = req.params.id;
  const query = "DELETE FROM `action` WHERE idStep = ?";

  db.query(query, [requestId], (error, results) => {
    handler.handleReponse(res, error, null, "Delete succeed!");
  });
  db.end();
};
//#endregion

exports.findNextIdStep = (req, res) => {
  const db = createConnection("stamp3uut");
  const queryID =
    "SELECT AUTO_INCREMENT FROM information_schema.tables " +
    'WHERE table_name = "step" AND table_schema = "stamp3uut";';

  const queryHelp = "SET information_schema_stats_expiry = 0;";
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
  });
};
