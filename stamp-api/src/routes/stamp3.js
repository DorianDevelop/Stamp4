const router = require("express").Router(); //Créer le router
const controller = require("../controllers/stamp3.js"); //Import toutes les fonctions / queries SQL
const validator = require("../utils/requestValidatorStamp3.js"); //Import checking received datas

//router.get("/hostname", controller.getUserHostname);
//router.get("/connect", controller.connectUser);

//TE
router.get("/tes", controller.getAllTeLabel);
router.get("/te/:id", controller.getTeByID);
router.get("/teLabel/:label", controller.getTeByLabel);

router.post("/te", validator.validateTE, controller.createTE);
router.put("/te/:id", validator.validateTE, controller.modifyTE);
router.delete("/te/:id", controller.deleteTE);

//Error
router.get("/errors", controller.getAllErrorsCodeAndLabel);
router.get("/error/:id", controller.getErrorByID);

router.post("/error", validator.validateError, controller.createError);
router.put("/error/:id", validator.validateError, controller.modifyError);
router.delete("/error/:id", controller.deleteError);

//Value
router.get("/values", controller.getAllValuesTypeAndLabel);
router.get("/value/:id", controller.getValueByID);

router.post("/value", validator.validateValue, controller.createValue);
router.put("/value/:id", validator.validateValue, controller.modifyValue);
router.delete("/value/:id", controller.deleteValue);

//Target
router.get("/targets", controller.getAllTargetsLabel);
router.get("/target/:id", controller.getTargetByID);

router.post("/target", validator.validateTarget, controller.createTarget);
router.put("/target/:id", validator.validateTarget, controller.modifyTarget);
router.delete("/target/:id", controller.deleteTarget);

//Funct
router.get("/functs", controller.getAllFunctsLabel);
router.get("/funct/:id", controller.getFunctByID);
router.get("/functsWithTarget/:id", controller.getAllFunctOfTarget);

router.post("/funct", validator.validateFunct, controller.createFunct);
router.put("/funct/:id", validator.validateFunct, controller.modifyFunct);
router.delete("/funct/:id", controller.deleteFunct);

//Organ
router.get("/organs", controller.getAllOrgansLabel);
router.get("/organ/:id", controller.getOrganByID);
router.get("/organsWithFunct/:id", controller.getAllOrgansByFunct);

router.post("/organ", validator.validateOrgan, controller.createOrgan);
router.put("/organ/:id", validator.validateOrgan, controller.modifyOrgan);
router.delete("/organ/:id", controller.deleteOrgan);

//Action
router.get("/actions", controller.getAllActionsLabel);
router.get("/action/:id", controller.getActionByID);
router.get("/actionsWithOrgan/:id", controller.getAllActionsFromOrgan);

router.post("/action", validator.validateAction, controller.createAction);
router.put("/action/:id", validator.validateAction, controller.modifyAction);
router.delete("/action/:id", controller.deleteAction);

router.get("/allCategories", controller.getAllCategories);
//Bad code but forced bc of old man
router.post("/actionFullName", controller.getActionFullName);

module.exports = router; //Export le router
