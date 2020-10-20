const express = require("express");
const router = express.Router();

const apiController = require("../controller/api");

router.post("/", apiController.getAll);
router.post("/regis", apiController.regis);
router.post("/login", apiController.login);

module.exports = router;
