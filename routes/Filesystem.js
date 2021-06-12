const express = require("express");
const FilesSystemController = require('../controllers/Filesystem');

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    // or
    // uuid, or fieldname
    cb(null, originalname);
  },
});
const upload = multer({ storage }); // or simply { dest: 'uploads/' }

router.get("/",FilesSystemController.FilesSystemGet);
router.get("/add",FilesSystemController.getAddFilesSystem);
router.post("/add", upload.array("avatar"),FilesSystemController.postAddFilesSystem);

module.exports = router;
