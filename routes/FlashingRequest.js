const express = require("express");
const FlashingRequestController = require('../controllers/FlashingRequest');

const router = express.Router();

router.get("/",FlashingRequestController.FlashingRequestGet);
module.exports = router;
