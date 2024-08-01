const router = require("express").Router(); //Créer le router
const controller = require("../controllers/stamp3ate.js"); //Import toutes les fonctions / queries SQL
const validator = require("../utils/requestValidatorStamp3ATE.js"); //Import checking received datas

router.get("/isAdmin/:name", controller.getIfAdmin);

//USER
router.get("/users", controller.getAllUser);
router.get("/usersNoTag", controller.getAllUserWithoutTag);
router.get("/user/:id", controller.getUserById);
router.get("/connectUser/:idUser/:pass", controller.connectUser);

router.post("/user", validator.validateUser, controller.createUser);
router.put("/user/:id", validator.validateUser, controller.modifyUser);
router.delete("/user/:id", controller.deleteUser);

//ATE
router.get("/ates", controller.getAllATE);
router.get("/ate/:id", controller.getATEById);

router.post("/ate", validator.validateATE, controller.createATE);
router.put("/ate/:id", validator.validateATE, controller.modifyATE);
router.delete("/ate/:id", controller.deleteATE);

//Plug
router.get("/plugs", controller.getAllPlug);
router.get("/plug/:id", controller.getPlugById);

router.post("/plug", validator.validatePlug, controller.createPlug);
router.put("/plug/:id", validator.validatePlug, controller.modifyPlug);
router.delete("/plug/:id", controller.deletePlug);
router.get("/findNextPlugID", controller.findNextIdPlug);

router.post("/defaultDriver/:id", controller.createDefaultDriver);

router.get("/driversForPlug/:id", controller.getDriversOfPlug);
router.post("/driversForPlug", validator.validateDriverPlug, controller.createDriversOfPlug);
router.put("/driversForPlug/:id", validator.validateDriverPlug, controller.modifyDriversOfPlug);
router.delete("/driversForPlug/:id", controller.deleteDriversOfPlug);

router.get("/actionsForPlug/:id", controller.getActionsOfPlug);
router.post("/actionsForPlug", validator.validateActionPlug, controller.createActionsOfPlug);
router.put("/actionsForPlug/:id", validator.validateActionPlug, controller.modifyActionsOfPlug);
router.delete("/actionsForPlug/:id", controller.deleteActionsOfPlug);

module.exports = router; //Export le router
