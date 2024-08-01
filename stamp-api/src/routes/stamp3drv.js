const router = require("express").Router(); //Créer le router
const controller = require("../controllers/stamp3drv.js"); //Import toutes les fonctions / queries SQL
const validator = require("../utils/requestValidatorStamp3DRV.js"); //Import checking received datas

//Protocol
router.get("/protocols", controller.getAllProtocol);
router.get("/protocol/:id", controller.getProtocolById);

router.post("/protocol", validator.validateProtocol, controller.createProtocol);
router.put("/protocol/:id", validator.validateProtocol, controller.modifyProtocol);
router.delete("/protocol/:id", controller.deleteProtocol);

router.get("/protocolDatas/:id", controller.getProtocolDatasById);

//Protocol DATAS
router.get("/protocolBooleans/:id", controller.getAllBooleans);
router.post("/protocolBoolean", validator.validateProtocolDatas, controller.createBoolean);
router.put("/protocolBoolean/:id", validator.validateProtocolDatas, controller.modifyBoolean);
router.delete("/protocolBoolean/:id", controller.deleteBoolean);

router.get("/protocolDatas/:id", controller.getAllDatas);
router.post("/protocolData", validator.validateProtocolDatas, controller.createData);
router.put("/protocolData/:id", validator.validateProtocolDatas, controller.modifyData);
router.delete("/protocolData/:id", controller.deleteData);

router.get("/protocolStrings/:id", controller.getAllStrings);
router.post("/protocolString", validator.validateProtocolDatas, controller.createString);
router.put("/protocolString/:id", validator.validateProtocolDatas, controller.modifyString);
router.delete("/protocolString/:id", controller.deleteString); //findNextIdProtocol

router.get("/findNextProtocolID", controller.findNextIdProtocol);

module.exports = router; //Export le router
