const express = require("express");
const FilesSystemController = require('../controllers/Filesystem');

const router = express.Router();

router.get("/",FilesSystemController.FilesSystemGet);
router.get("/add",FilesSystemController.getAddFilesSystem);
router.post("/add",FilesSystemController.postAddFilesSystem);

module.exports = router;
