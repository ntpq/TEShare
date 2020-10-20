const express = require("express");
const router = express.Router();
const stockController = require("../controller/stock");

router.get("/", stockController.getAllStock);
router.post("/getId", stockController.getStockByCode);
router.post("/getById", stockController.getStockById);
router.post("/", stockController.createStock);
router.post("/ADD", stockController.createShareholderInStock);
module.exports = router;
