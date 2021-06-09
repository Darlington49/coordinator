const express = require("express");
const flashController = require('../controllers/flash');

const router = express.Router();

router.get("/test",flashController.flash);
module.exports = router;
