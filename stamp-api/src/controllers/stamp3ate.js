const createConnection = require('../configs/database.config.js'); //Import la fonction créer un lien vers un base de données
const stamp3ate = createConnection('stamp3ate'); //Créer le lien vers la base de donnée "stamp3"
/*
 * Dans ce fichier, des morceaux de code sont entouré par des #region et #endregion
 * Ils permettent sur certains IDE de facilement organiser son fichier pendant la phase de dev
 * Si intéressé vous pouvez cherchez sur internet leur fonctionnement
 */

//#region OP (Opérateurs)

//Récupère tout les labels de la table "user"
exports.getAllUser = (req, res) => {
	const query = `SELECT CASE WHEN U.level = 5 THEN CONCAT('[MANAGER] ', U.label)
		WHEN U.level = 4 THEN CONCAT('[ADMIN] ', U.label) WHEN U.level = 1 THEN CONCAT('[User] ', U.label) WHEN U.level = 2 THEN CONCAT('[ASQL] ', U.label)
		WHEN U.level = 3 THEN CONCAT('[Form] ', U.label) WHEN U.level = 99 THEN CONCAT('[Autre] ', U.label) ELSE CONCAT('[Undefined] ', U.label) END as 'label', U.id
		FROM user as U  ORDER BY CASE WHEN U.level = 5 THEN 1 WHEN U.level = 4 THEN 2 ELSE 3  END, label ASC;`;

	stamp3ate.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "user"
exports.getUserById = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `user` as U WHERE U.id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'un nouveau user dans la table "user"
exports.createUser = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.code ? req.body.code : '',
		req.body.pass ? req.body.pass : '',
		req.body.level ? req.body.level : 0,
		req.body.service ? req.body.service : '',
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'INSERT INTO `user`(`label`, `code`, `pass`, `level`, `service`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3ate.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'un user dans la table "user"
exports.modifyUser = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.code ? req.body.code : '',
		req.body.pass ? req.body.pass : '',
		req.body.level ? req.body.level : 0,
		req.body.service ? req.body.service : '',
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'UPDATE user SET `label` = ?, `code` = ?, `pass` = ?, `level` = ?, `service` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3ate.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'un user dans la table "user"
exports.deleteUser = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `user` WHERE id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

//#endregion
//-----------------------------------//

//#region ATE (Testeur)

//Récupère tout les labels de la table "ATE"
exports.getAllATE = (req, res) => {
	const query = 'SELECT A.id, A.label FROM `ate` as A ORDER BY A.label';

	stamp3ate.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "ATE"
exports.getATEById = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `ate` as A WHERE A.id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'un nouveau ATE dans la table "ATE"
exports.createATE = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.qualif ? req.body.qualif : 0,
		req.body.langage ? req.body.langage : '',
		req.body.name ? req.body.name : '',
		req.body.type ? req.body.type : 0,
		req.body.func ? req.body.func : 0,
		req.body.mode ? req.body.mode : '',
		req.body.host ? req.body.host : '',
		req.body.index ? req.body.index : '',
		req.body.trace ? req.body.trace : 0,
		req.body.tPath ? req.body.tPath : '',
		req.body.quasar ? req.body.quasar : '',
		req.body.lQuasar ? req.body.lQuasar : '',
		req.body.nQuasar ? req.body.nQuasar : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
		req.body.begin ? req.body.begin : 0,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'INSERT INTO `ate`(`label`, `qualif`, `langage`, `name`, `type`,`func`, `mode`, `host`, `index`, `trace`, `tPath`, `quasar`, `lQuasar`, `nQuasar`, `when`, `who`, `comment`, `begin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3ate.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'un user dans la table "ATE"
exports.modifyATE = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.qualif ? req.body.qualif : 0,
		req.body.langage ? req.body.langage : '',
		req.body.name ? req.body.name : '',
		req.body.type ? req.body.type : 0,
		req.body.func ? req.body.func : 0,
		req.body.mode ? req.body.mode : '',
		req.body.host ? req.body.host : '',
		req.body.index ? req.body.index : '',
		req.body.trace ? req.body.trace : 0,
		req.body.tPath ? req.body.tPath : '',
		req.body.quasar ? req.body.quasar : 0,
		req.body.lQuasar ? req.body.lQuasar : '',
		req.body.nQuasar ? req.body.nQuasar : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
		req.body.begin ? req.body.begin : 0,

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'UPDATE ate SET `label` = ?, `qualif` = ?, `langage` = ?, `name` = ?, `type` = ?, `func` = ?, `mode` = ?, `host` = ?, `index` = ?, `trace` = ?, `tPath` = ?, `quasar` = ?, `lQuasar` = ?, `nQuasar` = ?, `when` = ?, `who` = ?, `comment` = ?, `begin` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3ate.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'un user dans la table "ATE"
exports.deleteATE = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `ate` WHERE id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

//#endregion
//-----------------------------------//

//#region ATE (Testeur)

//Récupère tout les labels de la table "PLug"
exports.getAllPlug = (req, res) => {
	const query = 'SELECT P.id, P.label FROM `plug` as P';

	stamp3ate.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "PLug"
exports.getPlugById = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `plug` as P WHERE P.id = ?';

	stamp3ate.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};
//#endregion
//-----------------------------------//
