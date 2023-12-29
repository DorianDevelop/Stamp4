const router = require('express').Router(); //Créer le router
const controller = require('../controllers/stamp3ate.js'); //Import toutes les fonctions / queries SQL
const validator = require('../utils/requestValidatorStamp3ATE.js'); //Import checking received datas

//USER
router.get('/users', controller.getAllUser);
router.get('/user/:id', controller.getUserById);

router.post('/user', validator.validateUser, controller.createUser);
router.put('/user/:id', validator.validateUser, controller.modifyUser);
router.delete('/user/:id', controller.deleteUser);

//ATE
router.get('/ates', controller.getAllATE);
router.get('/ate/:id', controller.getATEById);

router.post('/ate', validator.validateATE, controller.createATE);
router.put('/ate/:id', validator.validateATE, controller.modifyATE);
router.delete('/ate/:id', controller.deleteATE);

//Plug
router.get('/plugs', controller.getAllPlug);
router.get('/plug/:id', controller.getPlugById);

module.exports = router; //Export le router
