const express = require("express");
const router = express.Router();
const shareholderController = require("../controller/shareholder");
router.post("/getID", shareholderController.getShareholderByName);
router.post("/search", shareholderController.searchName);
router.post("/", shareholderController.createShareholder);
module.exports = router;
