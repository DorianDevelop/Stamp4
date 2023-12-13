const router = require('express').Router(); //Créer le router
const controller = require('../controllers/stamp3uut.js'); //Import toutes les fonctions / queries SQL
const validator = require('../utils/requestValidatorStamp3UUT.js'); //Import checking received datas

//Gamme
router.get('/gammes', controller.getAllGammeLabel);
router.get('/gamme/:id', controller.getGammeByID);

router.post('/gamme', validator.validateGamme, controller.createGamme);
router.put('/gamme/:id', validator.validateGamme, controller.modifyGamme);
router.delete('/gamme/:id', controller.deleteGamme);

//UUT
router.get('/uuts', controller.getAllUUTLabel);
router.get('/uut/:id', controller.getUUTByID);
router.get('/uutsFiltered/:id', controller.getAllUUTRelatedGamme);

router.post('/uut', validator.validateUut, controller.createUUT);
router.put('/uut/:id', validator.validateUut, controller.modifyUUT);
router.delete('/uut/:id', controller.deleteUUT);

module.exports = router; //Export le router
