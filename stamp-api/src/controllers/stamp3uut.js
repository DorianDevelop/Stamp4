const createConnection = require('../configs/database.config.js'); //Import la fonction créer un lien vers un base de données
const stamp3uut = createConnection('stamp3uut'); //Créer le lien vers la base de donnée "stamp3uut"
/*
 * Dans ce fichier, des morceaux de code sont entouré par des #region et #endregion
 * Ils permettent sur certains IDE de facilement organiser son fichier pendant la phase de dev
 * Si intéressé vous pouvez cherchez sur internet leur fonctionnement
 */

//#region Gamme

//Récupère tout les labels de la table "Gamme"
exports.getAllGammeLabel = (req, res) => {
	const query = 'SELECT R.id, R.label FROM `range` as R';

	stamp3uut.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Gamme"
exports.getGammeByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `range` as R WHERE R.id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'une nouvelle Gamme dans la table "Gamme"
exports.createGamme = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.sName ? req.body.sName : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'INSERT INTO `range`(`label`, `sName`, `when`, `who`, `comment`) VALUES (?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une Gamme dans la table "Gamme"
exports.modifyGamme = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.sName ? req.body.sName : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'UPDATE range SET `label` = ?, `sName` = ?, `when` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Gamme dans la table "Gamme"
exports.deleteGamme = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `range` WHERE id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

//#endregion

//#region UUT

//Récupère tout les labels de la table "UUT"
exports.getAllUUTLabel = (req, res) => {
	const query =
		'SELECT U.id, ' +
		`CASE WHEN U.power IS NOT NULL AND U.power <> '' THEN CONCAT(U.refsku, "  [", U.power, " VA", "]") ELSE CONCAT(U.refsku, "  [0 VA]") END as label FROM uut as U ORDER BY label;`;

	stamp3uut.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "UUT"
exports.getUUTByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `uut` as U WHERE U.id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'une nouvelle UUT dans la table "UUT"
exports.createUUT = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.refsku ? req.body.refsku : '',
		req.body.qualified ? req.body.qualified : null,
		req.body.range ? req.body.range : null,
		req.body.dateStart ? req.body.dateStart : null,
		req.body.dateEnd ? req.body.dateEnd : null,
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
		req.body.reference ? req.body.reference : '%1F%1Q%2Q%2Y%2W%1O%*U',
		req.body.serial ? req.body.serial : '',
		req.body.topo ? req.body.topo : null,
		req.body.design ? req.body.design : '',
		req.body.power ? req.body.power : '',
		req.body.backup ? req.body.backup : '',
		req.body.volt ? req.body.volt : '',
		req.body.freq ? req.body.freq : '',
		req.body.model ? req.body.model : '',
		req.body.pnp ? req.body.pnp : '',
		req.body.firm ? req.body.firm : '',
		req.body.sku ? req.body.sku : '',
		req.body.hiVolt ? req.body.hiVolt : '',
		req.body.hiAmps ? req.body.hiAmps : '',
		req.body.hiTime ? req.body.hiTime : '',
		req.body.hiRamp ? req.body.hiRamp : '',
		req.body.hisVolt ? req.body.hisVolt : '',
		req.body.hisAmps ? req.body.hisAmps : '',
		req.body.hisTime ? req.body.hisTime : '',
		req.body.hisRamp ? req.body.hisRamp : '',
		req.body.hifVolt ? req.body.hifVolt : '',
		req.body.hifAmps ? req.body.hifAmps : '',
		req.body.hifTime ? req.body.hifTime : '',
		req.body.hifRamp ? req.body.hifRamp : '',
		req.body.gndAmps ? req.body.gndAmps : '',
		req.body.gndOhms ? req.body.gndOhms : '',
		req.body.gndTime ? req.body.gndTime : '',
		req.body.contAmps ? req.body.contAmps : '',
		req.body.contOhms ? req.body.contOhms : '',
		req.body.contTime ? req.body.contTime : '',
		req.body.main1U ? req.body.main1U : '',
		req.body.main1Umaxi ? req.body.main1Umaxi : '',
		req.body.main1Umini ? req.body.main1Umini : '',
		req.body.main1Yield ? req.body.main1Yield : '',
		req.body.main1Imaxi ? req.body.main1Imaxi : '',
		req.body.main1Thdi ? req.body.main1Thdi : '',
		req.body.main2U ? req.body.main2U : '',
		req.body.main2Umaxi ? req.body.main2Umaxi : '',
		req.body.main2Umini ? req.body.main2Umini : '',
		req.body.main2Yield ? req.body.main2Yield : '',
		req.body.main2Imaxi ? req.body.main2Imaxi : '',
		req.body.main2Thdi ? req.body.main2Thdi : '',
		req.body.outU ? req.body.outU : '',
		req.body.outUtol ? req.body.outUtol : '',
		req.body.outThdu ? req.body.outThdu : '',
		req.body.outUdc ? req.body.outUdc : '',
		req.body.outF ? req.body.outF : '',
		req.body.outFtol ? req.body.outFtol : '',
		req.body.outVA ? req.body.outVA : '',
		req.body.outW ? req.body.outW : '',
		req.body.outPhi ? req.body.outPhi : '',
		req.body.batU ? req.body.batU : '',
		req.body.batUmaxi ? req.body.batUmaxi : '',
		req.body.batUmini ? req.body.batUmini : '',
		req.body.batAH ? req.body.batAH : '',
		req.body.batLife ? req.body.batLife : '',
		req.body.batBranch ? req.body.batBranch : '',
		req.body.batConst1 ? req.body.batConst1 : '',
		req.body.batConst2 ? req.body.batConst2 : '',
		req.body.batConst3 ? req.body.batConst3 : '',
		req.body.batConst4 ? req.body.batConst4 : '',
		req.body.chrgU ? req.body.chrgU : '',
		req.body.chrgI ? req.body.chrgI : '',
		req.body.chrgTemp ? req.body.chrgTemp : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'INSERT INTO `uut` (`refsku`, `qualified`, `range`, `dateStart`, `dateEnd`, `date`, `who`, `comment`, `reference`, `serial`, `topo`, `design`, `power`, `backup`, `volt`, `freq`, `model`, `pnp`, `firm`, `sku`, `hiVolt`, `hiAmps`, `hiTime`, `hiRamp`, `hisVolt`, `hisAmps`, `hisTime`, `hisRamp`, `hifVolt`, `hifAmps`, `hifTime`, `hifRamp`, `gndAmps`, `gndOhms`, `gndTime`, `contAmps`, `contOhms`, `contTime`, `main1U`, `main1Umaxi`, `main1Umini`, `main1Yield`, `main1Imaxi`, `main1Thdi`, `main2U`, `main2Umaxi`, `main2Umini`, `main2Yield`, `main2Imaxi`, `main2Thdi`, `outU`, `outUtol`, `outThdu`, `outUdc`, `outF`, `outFtol`, `outVA`, `outW`, `outPhi`, `batU`, `batUmaxi`, `batUmini`, `batAH`, `batLife`, `batBranch`, `batConst1`, `batConst2`, `batConst3`, `batConst4`, `chrgU`, `chrgI`, `chrgTemp`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une UUT dans la table "UUT"
exports.modifyUUT = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.refsku ? req.body.refsku : '',
		req.body.qualified ? req.body.qualified : null,
		req.body.range ? req.body.range : null,
		req.body.dateStart ? req.body.dateStart : null,
		req.body.dateEnd ? req.body.dateEnd : null,
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
		req.body.reference ? req.body.reference : '%1F%1Q%2Q%2Y%2W%1O%*U',
		req.body.serial ? req.body.serial : '',
		req.body.topo ? req.body.topo : null,
		req.body.design ? req.body.design : '',
		req.body.power ? req.body.power : '',
		req.body.backup ? req.body.backup : '',
		req.body.volt ? req.body.volt : '',
		req.body.freq ? req.body.freq : '',
		req.body.model ? req.body.model : '',
		req.body.pnp ? req.body.pnp : '',
		req.body.firm ? req.body.firm : '',
		req.body.sku ? req.body.sku : '',
		req.body.hiVolt ? req.body.hiVolt : '',
		req.body.hiAmps ? req.body.hiAmps : '',
		req.body.hiTime ? req.body.hiTime : '',
		req.body.hiRamp ? req.body.hiRamp : '',
		req.body.hisVolt ? req.body.hisVolt : '',
		req.body.hisAmps ? req.body.hisAmps : '',
		req.body.hisTime ? req.body.hisTime : '',
		req.body.hisRamp ? req.body.hisRamp : '',
		req.body.hifVolt ? req.body.hifVolt : '',
		req.body.hifAmps ? req.body.hifAmps : '',
		req.body.hifTime ? req.body.hifTime : '',
		req.body.hifRamp ? req.body.hifRamp : '',
		req.body.gndAmps ? req.body.gndAmps : '',
		req.body.gndOhms ? req.body.gndOhms : '',
		req.body.gndTime ? req.body.gndTime : '',
		req.body.contAmps ? req.body.contAmps : '',
		req.body.contOhms ? req.body.contOhms : '',
		req.body.contTime ? req.body.contTime : '',
		req.body.main1U ? req.body.main1U : '',
		req.body.main1Umaxi ? req.body.main1Umaxi : '',
		req.body.main1Umini ? req.body.main1Umini : '',
		req.body.main1Yield ? req.body.main1Yield : '',
		req.body.main1Imaxi ? req.body.main1Imaxi : '',
		req.body.main1Thdi ? req.body.main1Thdi : '',
		req.body.main2U ? req.body.main2U : '',
		req.body.main2Umaxi ? req.body.main2Umaxi : '',
		req.body.main2Umini ? req.body.main2Umini : '',
		req.body.main2Yield ? req.body.main2Yield : '',
		req.body.main2Imaxi ? req.body.main2Imaxi : '',
		req.body.main2Thdi ? req.body.main2Thdi : '',
		req.body.outU ? req.body.outU : '',
		req.body.outUtol ? req.body.outUtol : '',
		req.body.outThdu ? req.body.outThdu : '',
		req.body.outUdc ? req.body.outUdc : '',
		req.body.outF ? req.body.outF : '',
		req.body.outFtol ? req.body.outFtol : '',
		req.body.outVA ? req.body.outVA : '',
		req.body.outW ? req.body.outW : '',
		req.body.outPhi ? req.body.outPhi : '',
		req.body.batU ? req.body.batU : '',
		req.body.batUmaxi ? req.body.batUmaxi : '',
		req.body.batUmini ? req.body.batUmini : '',
		req.body.batAH ? req.body.batAH : '',
		req.body.batLife ? req.body.batLife : '',
		req.body.batBranch ? req.body.batBranch : '',
		req.body.batConst1 ? req.body.batConst1 : '',
		req.body.batConst2 ? req.body.batConst2 : '',
		req.body.batConst3 ? req.body.batConst3 : '',
		req.body.batConst4 ? req.body.batConst4 : '',
		req.body.chrgU ? req.body.chrgU : '',
		req.body.chrgI ? req.body.chrgI : '',
		req.body.chrgTemp ? req.body.chrgTemp : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'UPDATE `uut` SET `label` = ?, `refsku` = ?, `qualified` = ?, `range` = ?, `dateStart` = ?, `dateEnd` = ?, `date` = ?, `who` = ?, `comment` = ?, `reference` = ?, `serial` = ?, `topo` = ?, `design` = ?, `power` = ?, `backup` = ?, `volt` = ?, `freq` = ?, `model` = ?, `pnp` = ?, `firm` = ?, `sku` = ?, `hiVolt` = ?, `hiAmps` = ?, `hiTime` = ?, `hiRamp` = ?, `hisVolt` = ?, `hisAmps` = ?, `hisTime` = ?, `hisRamp` = ?, `hifVolt` = ?, `hifAmps` = ?, `hifTime` = ?, `hifRamp` = ?, `gndAmps` = ?, `gndOhms` = ?, `gndTime` = ?, `contAmps` = ?, `contOhms` = ?, `contTime` = ?, `main1U` = ?, `main1Umaxi` = ?, `main1Umini` = ?, `main1Yield` = ?, `main1Imaxi` = ?, `main1Thdi` = ?, `main2U` = ?, `main2Umaxi` = ?, `main2Umini` = ?, `main2Yield` = ?, `main2Imaxi` = ?, `main2Thdi` = ?, `outU` = ?, `outUtol` = ? WHERE id = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une UUT dans la table "UUT"
exports.deleteUUT = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `uut` WHERE id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "UUT"
exports.getAllUUTRelatedGamme = (req, res) => {
	const param = req.params.id;
	const query =
		'SELECT U.id, ' +
		`CASE WHEN U.power IS NOT NULL AND U.power <> '' THEN CONCAT(U.refsku, "  [", U.power, " VA", "]") ELSE CONCAT(U.refsku, "  [0 VA]") END as label FROM uut as U ` +
		'WHERE U.range = ? ORDER BY label';

	stamp3uut.query(query, [param], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//#endregion

//#region Spec

//Récupère tout les labels de la table "Spec"
exports.getAllSpecLabel = (req, res) => {
	const query = 'SELECT S.id, S.label FROM `spec` as S';

	stamp3uut.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Spec"
exports.getSpecByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `spec` as S WHERE S.id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'une nouvelle Spec dans la table "Spec"
exports.createSpec = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.range ? req.body.range : null,
		req.body.ctrl ? req.body.ctrl : null,
		req.body.replay ? req.body.replay : null,
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'INSERT INTO `spec`(`label`, `range`, `ctrl`, `replay`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une Spec dans la table "Spec"
exports.modifySpec = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.range ? req.body.range : null,
		req.body.ctrl ? req.body.ctrl : null,
		req.body.replay ? req.body.replay : null,
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'UPDATE spec SET `label` = ?, `range` = ?, `ctrl` = ?, `replay` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Spec dans la table "Spec"
exports.deleteSpec = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `spec` WHERE id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Spec"
exports.getAllSpecRelatedGamme = (req, res) => {
	const param = req.params.id;
	const query = 'SELECT S.id, S.label FROM `spec` as S ' + 'WHERE S.range = ? ORDER BY label';

	stamp3uut.query(query, [param], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//#endregion

//#region STEP
//Récupère tout les labels de la table "Step"
exports.getAllStepLabel = (req, res) => {
	const query = 'SELECT S.id, S.label FROM `step` as S';

	stamp3uut.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Step"
exports.getAllStepRelatedGamme = (req, res) => {
	const param = req.params.id;
	const query = 'SELECT S.id, S.label FROM `step` as S ' + 'WHERE S.range = ? ORDER BY label';

	stamp3uut.query(query, [param], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Step"
exports.getStepByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `step` as S WHERE S.id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

exports.createStep = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.tstFunc ? req.body.tstFunc : '',
		req.body.range ? req.body.range : null,
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'INSERT INTO `step`(`label`, `tstFunc`, `range`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une Spec dans la table "Step"
exports.modifyStep = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.tstFunc ? req.body.tstFunc : '',
		req.body.range ? req.body.range : null,
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'UPDATE step SET `label` = ?, `tstFunc` = ?, `range` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Step dans la table "Step"
exports.deleteStep = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `step` WHERE id = ?';
	const query2 = 'DELETE FROM `action` WHERE idStep = ?';

	stamp3uut.query(query2, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			console.log('Delete all actions related to Step');
		}
	});

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

//Récupère tout les champs d'une ligne spécifique de la table "Step"
exports.getAllSpecRelatedGamme = (req, res) => {
	const param = req.params.id;
	const query = 'SELECT S.id, S.label FROM `spec` as S ' + 'WHERE S.range = ? ORDER BY label';

	stamp3uut.query(query, [param], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les labels de la table "Step" pour une Spec
exports.getAllStepForASpec = (req, res) => {
	const requestId = req.params.id;
	const query =
		'SELECT ST.*, LSS.No, LSS.id as linkId FROM `spec` as SP ' +
		'INNER JOIN `link_spec_step` as LSS on LSS.idMain = SP.id ' +
		'INNER JOIN `step` as ST on ST.id = LSS.idLink ' +
		'WHERE SP.id = ?;';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les labels de la table "Step" pour une range
exports.getAllStepForAGamme = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT ST.* FROM `step` as ST WHERE ST.range = ?;';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Ajoute une Step à une SPEC
exports.addStepToSpec = (req, res) => {
	//Récupère les données pour la requête
	const datas = [req.body.idMain ? req.body.idMain : null, req.body.idLink ? req.body.idLink : null, req.body.No ? req.body.No : null];
	const query = 'INSERT INTO `link_spec_step`(`idMain`,`idLink`,`No`) VALUES (?, ?, ?);';

	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Spec dans la table "Spec"
exports.deleteStepForSpec = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `link_spec_step` WHERE id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

//#endregion

//#region Action

//Récupère tout les champs d'une ligne spécifique de la table "Step"
exports.getAllActionForAStep = (req, res) => {
	const param = req.params.id;
	const query = 'SELECT A.* FROM `action` as A WHERE A.idStep = ? ORDER BY A.order';

	stamp3uut.query(query, [param], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};
exports.getAllActionForUUT = (req, res) => {
	const param = req.params.id;
	const query = 'SELECT A.* from `link_uut_spec` as LUS JOIN `link_spec_step` as LSS on LUS.idLink = LSS.idMain JOIN `action` as A on A.idStep = LSS.idLink WHERE LUS.idMain = ?;';

	stamp3uut.query(query, [param], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

exports.getAllActionCategoriesById = (req, res) => {
	const param = req.params.id;
	const query =
		'SELECT S.label as catLabel, ST.label as stepLabel, A.id from `link_uut_spec` as LUS JOIN `spec` as S on S.id = LUS.idLink JOIN `link_spec_step` as LSS on LUS.idLink = LSS.idMain JOIN `action` as A on A.idStep = LSS.idLink JOIN `step` as ST on ST.id = LSS.idLink WHERE A.id = ?;';
	stamp3uut.query(query, [param], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

exports.createAction = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.idStep,
		req.body.range || null,
		req.body.order || null,
		req.body.track || null,
		req.body.errStamp || '',
		req.body.errApc || '',
		req.body.idTarget || null,
		req.body.idFunc || null,
		req.body.idOrgan || null,
		req.body.idAction || null,
		req.body.ident || '',
		req.body.pattern || '',
		req.body.param0 || '',
		req.body.param1 || '',
		req.body.param2 || '',
		req.body.param3 || '',
		req.body.param4 || '',
		req.body.param5 || '',
		req.body.param6 || '',
		req.body.param7 || '',
		req.body.param8 || '',
		req.body.param9 || '',
	];

	//Construit les "fondation" de la requête (sans les données)
	const query =
		'INSERT INTO `action` (`idStep`, `range`, `order`, `track`, `errStamp`, `errApc`, `idTarget`, `idFunc`, `idOrgan`, `idAction`, `ident`, `pattern`, `param0`, `param1`, `param2`, `param3`, `param4`, `param5`, `param6`, `param7`, `param8`, `param9`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une Spec dans la table "Action"
exports.modifyAction = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.idStep || null,
		req.body.range || null,
		req.body.order || null,
		req.body.track || null,
		req.body.errStamp || '',
		req.body.errApc || '',
		req.body.idTarget || null,
		req.body.idFunc || null,
		req.body.idOrgan || null,
		req.body.idAction || null,
		req.body.ident || '',
		req.body.pattern || '',
		req.body.param0 || '',
		req.body.param1 || '',
		req.body.param2 || '',
		req.body.param3 || '',
		req.body.param4 || '',
		req.body.param5 || '',
		req.body.param6 || '',
		req.body.param7 || '',
		req.body.param8 || '',
		req.body.param9 || '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'UPDATE `action`  SET `idStep` = ?, `range` = ?, `order` = ?, `track` = ?, `errStamp` = ?, `errApc` = ?, `idTarget` = ?, `idFunc` = ?, `idOrgan` = ?, `idAction` = ?, `ident` = ?, `pattern` = ?, `param0` = ?, `param1` = ?, `param2` = ?, `param3` = ?, `param4` = ?, `param5` = ?, `param6` = ?, `param7` = ?, `param8` = ?, `param9` = ? WHERE `id` = ?;';
	//Fusionnne la requête avec les données et execute la requête
	stamp3uut.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Step dans la table "Action"
exports.deleteAction = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `action` WHERE id = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

exports.deleteActionByStep = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `action` WHERE idStep = ?';

	stamp3uut.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};
//#endregion

exports.findNextIdStep = (req, res) => {
	const queryID = 'SELECT AUTO_INCREMENT FROM information_schema.tables ' + 'WHERE table_name = "step" AND table_schema = "stamp3uut";';

	const queryHelp = 'SET information_schema_stats_expiry = 0;';
	stamp3uut.query(queryHelp, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			stamp3uut.query(queryID, (error, results) => {
				if (error) {
					res.status(500).json({ error: 'An error occurred \n' + error });
				} else {
					res.status(200).json(results);
				}
			});
		}
	});
};
