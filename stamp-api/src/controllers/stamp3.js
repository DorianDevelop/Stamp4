const createConnection = require('../configs/database.config.js'); //Import la fonction créer un lien vers un base de données
const stamp3 = createConnection('stamp3'); //Créer le lien vers la base de donnée "stamp3"
/*
 * Dans ce fichier, des morceaux de code sont entouré par des #region et #endregion
 * Ils permettent sur certains IDE de facilement organiser son fichier pendant la phase de dev
 * Si intéressé vous pouvez cherchez sur internet leur fonctionnement
 */

//#region TE (Test Engineers)

//Récupère tout les labels de la table "TE" (les Test Engineers)
exports.getAllTeLabel = (req, res) => {
	const query = 'SELECT T.id, T.label FROM `te` as T';

	stamp3.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "TE" (Test Engineers)
exports.getTeByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `te` as T WHERE T.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'un nouveau TE dans la table "TE"
exports.createTE = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.host ? req.body.host : '',
		req.body.email ? req.body.email : '',
		req.body.service ? req.body.service : '',
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'INSERT INTO `te`(`label`, `host`, `email`, `service`, `date`, `who`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'un TE dans la table "TE"
exports.modifyTE = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.host ? req.body.host : '',
		req.body.email ? req.body.email : '',
		req.body.service ? req.body.service : '',
		req.body.date ? req.body.date : '1900-01-01',
		req.body.who ? req.body.who : '',
		req.body.comment ? req.body.comment : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'UPDATE te SET `label` = ?, `host` = ?, `email` = ?, `service` = ?, `date` = ?, `who` = ?, `comment` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'un TE dans la table "TE"
exports.deleteTE = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `te` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
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
//#region Errors

//Récupère tout les code d'erreur + labels de la table "Error"
exports.getAllErrorsCodeAndLabel = (req, res) => {
	const query = 'SELECT E.id, CONCAT("[", E.code,"] ", E.label) as label FROM `error` as E';

	stamp3.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Error"
exports.getErrorByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `error` as E WHERE E.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'une nouvelle erreur dans la table "Error"
exports.createError = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.code ? req.body.code : null,
		req.body.module ? req.body.module : '',
		req.body.function ? req.body.function : '',
		req.body.label ? req.body.label : '',
		req.body.apcNo ? req.body.apcNo : null,
		req.body.level ? req.body.level : null,
		req.body.helpF ? req.body.helpF : '',
		req.body.helpS ? req.body.helpS : '',
		req.body.msgFR ? req.body.msgFR : '',
		req.body.msgEN ? req.body.msgEN : '',
		req.body.msgXX ? req.body.msgXX : '',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'INSERT INTO `error`(`code`, `module`, `function`, `label`, `apcNo`, `level`, `helpF`, `helpS`, `msgFR`, `msgEN`, `msgXX`, `comment`) ' +
		'VALUES (?,?,?,?,?,?,?,?,?,?,?,?);';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une erreur dans la table "Error"
exports.modifyError = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.code ? req.body.code : null,
		req.body.module ? req.body.module : '',
		req.body.function ? req.body.function : '',
		req.body.label ? req.body.comment : '',
		req.body.apcNo ? req.body.apcNo : null,
		req.body.level ? req.body.level : null,
		req.body.helpF ? req.body.helpF : '',
		req.body.helpS ? req.body.helpS : '',
		req.body.msgFR ? req.body.msgFR : '',
		req.body.msgEN ? req.body.msgEN : '',
		req.body.msgXX ? req.body.msgXX : '',
		req.body.comment ? req.body.comment : '',

		//Pour le WHERE
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'UPDATE `error` SET `code` = ?, `module` = ?, `function` = ?, `label` = ?, `apcNo` = ?, `level` = ?, `helpF` = ?, `helpS` = ?, `msgFR` = ?, `msgEN` = ?, `msgXX` = ?, `comment` = ?' +
		' WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Erreur dans la table "Error"
exports.deleteError = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `error` WHERE `id` = ?';

	stamp3.query(query, [requestId], (error, results) => {
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
//#region Values

//Récupère tout les type de value + labels de la table "Value"
exports.getAllValuesTypeAndLabel = (req, res) => {
	const query = 'SELECT V.id, V.type, V.label FROM `value` as V';

	stamp3.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Value"
exports.getValueByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `value` as V WHERE V.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'une nouvelle Value dans la table "Value"
exports.createValue = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.idFamily ? req.body.idFamily : null,
		req.body.type ? req.body.type : '',
		req.body.value ? req.body.value : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'INSERT INTO `value`(`label`, `idFamily`, `type`, `value`) VALUES (?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une Value dans la table "Value"
exports.modifyValue = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.idFamily ? req.body.idFamily : null,
		req.body.type ? req.body.type : '',
		req.body.value ? req.body.value : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query = 'UPDATE `value` SET `label` = ?, `idFamily` = ?, `type` = ?, `value` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Value dans la table "Value"
exports.deleteValue = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `value` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
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
//#region Targets

//Récupère tout les labels de la table "Target"
exports.getAllTargetsLabel = (req, res) => {
	const query = 'SELECT T.id, T.label FROM `target` as T ORDER BY T.label';

	stamp3.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Target"
exports.getTargetByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `target` as T WHERE T.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'une nouvelle Target dans la table "Target"
exports.createTarget = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who ? req.body.who : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'INSERT INTO `target`(`label`, `label_fr`, `label_en`, `label_xx`, `who`, `when`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une Target dans la table "Target"
exports.modifyTarget = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who ? req.body.who : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.comment ? req.body.comment : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'UPDATE `target` SET `label` = ?, `label_fr` = ?, `label_en` = ?, `label_xx`, `who` = ?, `when` = ?, `comment` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Target dans la table "Target"
exports.deleteTarget = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `target` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
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
//#region Functs

//Récupère tout les labels de la table "Funct"
exports.getAllFunctsLabel = (req, res) => {
	const query =
		'SELECT F.id, CONCAT(T.label,":", F.label) as label ' +
		'FROM `funct` as F ' +
		'LEFT JOIN `target` as T ON F.idTarget=T.id ORDER BY label;';

	stamp3.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Funct"
exports.getFunctByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `funct` as F WHERE F.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'une nouvelle Funct dans la table "Funct"
exports.createFunct = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.idTarget ? req.body.idTarget : null,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who ? req.body.who : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'INSERT INTO `funct`(`label`, `idTarget`, `label_fr`, `label_en`, `label_xx`, `who`, `when`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une Funct dans la table "Funct"
exports.modifyFunct = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.idTarget ? req.body.idTarget : null,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who ? req.body.who : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.comment ? req.body.comment : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'UPDATE `funct` SET `label` = ?, `idTarget` = ?, `label_fr` = ?, `label_en` = ?, `label_xx`, `who` = ?, `when` = ?, `comment` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Funct dans la table "Funct"
exports.deleteFunct = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `funct` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
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
//#region Organs

//Récupère tout les labels de la table "Organ"
exports.getAllOrgansLabel = (req, res) => {
	const query =
		'SELECT O.id, CONCAT(T.label,":", F.label,":", O.label) as label ' +
		'FROM `organ` as O LEFT JOIN `funct` as F ON O.idFunc=F.id ' +
		'LEFT JOIN `target` as T ON F.idTarget=T.id ORDER BY label;';

	stamp3.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Organ"
exports.getOrganByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `organs` as O WHERE O.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Fonction pour insérer les données d'un nouveau Organ dans la table "Organ"
exports.createOrgan = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.idTarget ? req.body.idTarget : null,
		req.body.idFunc ? req.body.idFunc : null,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who ? req.body.who : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.comment ? req.body.comment : '',
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'INSERT INTO `organ`(`label`, `idTarget`, `idFunc`, `label_fr`, `label_en`, `label_xx`, `who`, `when`, `comment`) VALUES (?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'un Organ dans la table "Organ"
exports.modifyOrgan = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.idTarget ? req.body.idTarget : null,
		req.body.idFunc ? req.body.idFunc : null,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who ? req.body.who : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.comment ? req.body.comment : '',

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'UPDATE `organ` SET `label` = ?, `idTarget` = ?, `idFunc` = ?, `label_fr` = ?, `label_en` = ?, `label_xx`, `who` = ?, `when` = ?, `comment` = ? WHERE `id` = ?';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'un Organ dans la table "Organ"
exports.deleteOrgan = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `organ` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
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
//#region Action
//Récupère tout les labels de la table "Action"
exports.getAllActionsLabel = (req, res) => {
	//Query simple
	//const query = 'SELECT A.id, A.label FROM action as A';

	//Query qui permet la concatination des différents label de action, function, organ, etc... permettant l'identification de l'action plus facile
	const query =
		'SELECT action.id, CONCAT(target.label,":", funct.label,":", organ.label,":", action.label) as label' +
		' FROM `action` LEFT JOIN `organ` ON action.idOrgan=organ.id LEFT JOIN `funct` ON organ.idFunc=funct.id ' +
		'LEFT JOIN `target` ON funct.idTarget=target.id ORDER BY label;';

	stamp3.query(query, (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};

//Récupère tout les champs d'une ligne spécifique de la table "Action"
exports.getActionByID = (req, res) => {
	const requestId = req.params.id;
	const query = 'SELECT * FROM `action` as A WHERE A.id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		if (error) {
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json(results);
		}
	});
};
//Fonction pour insérer les données d'une nouvelle Action dans la table "Action"
exports.createAction = (req, res) => {
	//Récupère les données pour la requête
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.idTarget ? req.body.idTarget : null,
		req.body.idFunc ? req.body.idFunc : null,
		req.body.idOrgan ? req.body.idOrgan : null,
		req.body.act ? req.body.act : '',
		req.body.track ? req.body.track : null,
		req.body.err ? req.body.err : null,
		req.body.ident ? req.body.ident : null,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who ? req.body.who : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.comment ? req.body.comment : '',

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
	//Construit les "fondation" de la requête (sans les données)
	const query =
		'INSERT INTO `action`(`label`, `idTarget`, `idFunc`, `idOrgan`, `act`, `track`, `err`, `ident`,' +
		' `label_fr`, `label_en`, `label_xx`, `who`, `when`, `comment`,' +
		'`type0`, `param0_fr`, `param0_en`, `param0_xx`, `purpose0`, `type1`, `param1_fr`, `param1_en`, `param1_xx`, `purpose1`,' +
		'`type2`, `param2_fr`, `param2_en`, `param2_xx`, `purpose2`, `type3`, `param3_fr`, `param3_en`, `param3_xx`, `purpose3`,' +
		'`type4`, `param4_fr`, `param4_en`, `param4_xx`, `purpose4`, `type5`, `param5_fr`, `param5_en`, `param5_xx`, `purpose5`,' +
		'`type6`, `param6_fr`, `param6_en`, `param6_xx`, `purpose6`, `type7`, `param7_fr`, `param7_en`, `param7_xx`, `purpose7`,' +
		'`type8`, `param8_fr`, `param8_en`, `param8_xx`, `purpose8`, `type9`, `param9_fr`, `param9_en`, `param9_xx`, `purpose9`' +
		') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Creation succeed!' });
		}
	});
};

//Fonction pour modifier les données d'une Action dans la table "Action"
exports.modifyAction = (req, res) => {
	//Récupère les données pour la requête
	const requestId = req.params.id;
	const datas = [
		req.body.label ? req.body.label : '',
		req.body.idTarget ? req.body.idTarget : null,
		req.body.idFunc ? req.body.idFunc : null,
		req.body.idOrgan ? req.body.idOrgan : null,
		req.body.act ? req.body.act : '',
		req.body.track ? req.body.track : null,
		req.body.err ? req.body.err : null,
		req.body.ident ? req.body.ident : null,
		req.body.label_fr ? req.body.label_fr : '',
		req.body.label_en ? req.body.label_en : '',
		req.body.label_xx ? req.body.label_xx : '',
		req.body.who ? req.body.who : '',
		req.body.when ? req.body.when : '1900-01-01',
		req.body.comment ? req.body.comment : '',

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

		//Pour le "WHERE"
		requestId,
	];
	//Construit les "fondation" de la requête (sans les données)
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

	//Fusionnne la requête avec les données et execute la requête
	stamp3.query(query, datas, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Modification succeed!' });
		}
	});
};

//Fonction pour supprimer les données d'une Action dans la table "Action"
exports.deleteAction = (req, res) => {
	const requestId = req.params.id;
	const query = 'DELETE FROM `action` WHERE id = ?';

	stamp3.query(query, [requestId], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred \n' + error });
		} else {
			res.status(200).json({ message: 'Deletion succeed!' });
		}
	});
};

//#endregion
