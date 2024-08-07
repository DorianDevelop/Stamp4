const router = require("express").Router(); //Créer le router
const controller = require("../controllers/stamp3uut.js"); //Import toutes les fonctions / queries SQL
const validator = require("../utils/requestValidatorStamp3UUT.js"); //Import checking received datas

//Gamme
router.get("/gammes", controller.getAllGammeLabel);
router.get("/gamme/:id", controller.getGammeByID);

router.post("/gamme", validator.validateGamme, controller.createGamme);
router.put("/gamme/:id", validator.validateGamme, controller.modifyGamme);
router.delete("/gamme/:id", controller.deleteGamme);

//UUT
router.get("/uuts", controller.getAllUUTLabel);
router.get("/uut/:id", controller.getUUTByID);
router.get("/uutsFiltered/:id", controller.getAllUUTRelatedGamme);
router.get("/uutsFiltered/:id/:ctrl", controller.getAllUUTRelatedGammeCtrl);
router.get("/uutsFilteredctrl/:ctrl", controller.getAllUUTRelatedCtrl);

router.post("/uut", validator.validateUut, controller.createUUT);
router.put("/uut/:id", validator.validateUut, controller.modifyUUT);
router.delete("/uut/:id", controller.deleteUUT);

//Spec
router.get("/specs", controller.getAllSpecLabel);
router.get("/spec/:id", controller.getSpecByID);
router.get("/specsFiltered/:id", controller.getAllSpecRelatedGamme);

router.post("/spec", validator.validateSpec, controller.createSpec);
router.put("/spec/:id", validator.validateSpec, controller.modifySpec);
router.delete("/spec/:id", controller.deleteSpec);

//Step
router.get("/steps", controller.getAllStepLabel);
router.get("/step/:id", controller.getStepByID);
router.get("/stepsFiltered/:id", controller.getAllStepForAGamme);
router.get("/findNextSpecID", controller.findNextIdSpec);

router.post("/step", validator.validateStep, controller.createStep);
router.put("/step/:id", validator.validateStep, controller.modifyStep);
router.delete("/step/:id", controller.deleteStep);
router.get("/findNextStepID", controller.findNextIdStep);

router.get("/stepForSpec/:id", controller.getAllStepForASpec);
router.get("/stepForGamme/:id", controller.getAllStepForAGamme);

router.post("/stepForSpec", validator.validateStepLinkSpec, controller.addStepToSpec);
router.delete("/stepForSpec/:id", controller.deleteStepForSpec);

//Action
router.get("/actionForStep/:id", controller.getAllActionForAStep);
router.get("/actionForUUTAndCtrl/:id/:ctrl", controller.getAllActionForUUT);

router.post("/action", validator.validateAction, controller.createAction);
router.put("/action/:id", validator.validateAction, controller.modifyAction);
router.delete("/action/:id", controller.deleteAction);
router.delete("/actionByStep/:id", controller.deleteActionByStep);

router.get("/findNextID", controller.findNextIdStep);
router.get("/whereUutQualified/:id", controller.getWhereQualified);
router.get("/uutQualified/:id/:ctrl", controller.getQualifiedResult);
router.post("/uutQualification/:id/:ctrl", controller.qualifyUut);
router.delete("/uutUnqualification/:id/:ctrl", controller.unqualifyUut);

router.get("/specFromRangeAndCtrl/:range/:ctrl", controller.getSpecFromRangeAndCtrl);
router.post("/linkSpecToUUT", controller.linkUut);
router.delete("/unlinkSpecToUUT/:id", controller.unlinkUut);

router.get("/allLinkedSpec/:id", controller.getAllLinkedSpec);

router.get("/allIdents/:target/:func/:organ/:action", controller.getAllIdents);

module.exports = router; //Export le router
