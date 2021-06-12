const express = require("express");
const firmwareController = require("../controllers/firmware");
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

router.get("/", firmwareController.firmwareGet);
router.get("/add", firmwareController.getAddfirmware);
router.post("/add", upload.array("avatar"), firmwareController.postAddfirmware);
module.exports = router;
