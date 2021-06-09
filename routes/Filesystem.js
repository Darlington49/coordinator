const express = require("express");
const firmwareController = require('../controllers/firmware');

const router = express.Router();

router.get("/",firmwareController.firmwareGet);
module.exports = router;
