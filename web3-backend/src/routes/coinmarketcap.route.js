const express = require("express");
const router = express.Router();

const cmcController = require("../controllers/coinmarketcap.controller");

router.get("/top5", cmcController.getTop5);
router.get("/getByID/:id", cmcController.byID);

module.exports = router;