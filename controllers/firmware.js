const Firmware = require("../models/Firmware");

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
  res.render("firmware/Add", {
    pageTitle: "Add Product",
  });
};

const postAddfirmware = (req, res, next) => {
  console.log("=====>", req.files);
  Firmware.create({
    Compiled_Date: req.body.Compiled_Date,
    Version: req.body.Version,
    RepositoryURL: req.body.RepositoryURL,
    Name: req.body.RepositoryURL,
    Link: req.files[0].path,
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
