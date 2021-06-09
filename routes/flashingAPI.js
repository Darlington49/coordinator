const express = require("express");
const flashingAPI = require('../controllers/flashingAPI');

const router = express.Router();

router.get("/",flashingAPI.flashingAPIget);
router.post("/flash",flashingAPI.flashingAPI);
module.exports = router;