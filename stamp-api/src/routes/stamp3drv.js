const router = require('express').Router(); //Créer le router
const controller = require('../controllers/stamp3drv.js'); //Import toutes les fonctions / queries SQL
const validator = require('../utils/requestValidatorStamp3DRV.js'); //Import checking received datas

//Protocol
router.get('/protocols', controller.getAllProtocol);
router.get('/protocol/:id', controller.getProtocolById);

router.post('/protocol', validator.validateProtocol, controller.createProtocol);
router.put('/protocol/:id', validator.validateProtocol, controller.modifyProtocol);
router.delete('/protocol/:id', controller.deleteProtocol);

router.get('/protocolDatas/:id', controller.getProtocolDatasById);

module.exports = router; //Export le router
