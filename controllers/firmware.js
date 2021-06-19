const Firmware = require("../models/Firmware");
const File = require("../models/file");

const firmwareGet = (req, res) => {
  
  Firmware.findAll()
    .then((firmwares) => {
      console.log(firmwares);
      res.render("firmware/firmware", {
        firmwares,
        pageTitle: "All firmwares",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getAddfirmware = (req, res, next) => {

  File.findAll()
  .then((files) => {
    console.log(files);
    res.render("firmware/Add", {
      pageTitle: "Add Product",
      files:files
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

const postAddfirmware = (req, res, next) => {
  // console.log("=====>", req.files);
  console.log("=====>", req.body);
  Firmware.create({
    Compiled_Date: req.body.Compiled_Date,
    Version: req.body.Version,
    RepositoryURL: req.body.RepositoryURL,
    Name: req.body.RepositoryURL,
    Link: req.files[0].path,
    fileId: req.body.fileId,
  })
    .then((result) => {
      console.log("Created firmware");
       res.redirect("/firmware");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  firmwareGet,
  getAddfirmware,
  postAddfirmware,
};
