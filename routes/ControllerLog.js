const express = require("express");
const ControllerLogController = require('../controllers/ControllerLog');

const router = express.Router();

router.get("/",ControllerLogController.ControllerLogGet);
module.exports = router;
