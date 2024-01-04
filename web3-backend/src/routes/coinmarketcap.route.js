const express = require("express");
const router = express.Router();

const cmcController = require("../controllers/coinmarketcap.controller");

router.get("/top5", cmcController.getTop5);
router.get("/getByID/:id", cmcController.byID);
router.get("/getByIDs/:ids", cmcController.byIDs);
router.get("/categories", cmcController.getCategories);

module.exports = router;