const express = require("express");
const firmwareController = require('../controllers/firmware');

const router = express.Router();

router.get("/",firmwareController.firmwareGet);
router.get("/add",firmwareController.getAddfirmware);
router.post("/add",firmwareController.postAddfirmware);
module.exports = router;
