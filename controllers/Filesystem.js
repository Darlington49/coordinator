const FilesSystem = require("../models/Filesystem");

const FilesSystemGet = (req, res) => {
  FilesSystem.findAll()
    .then((filesystems) => {
      console.log(filesystems);
      res.render("filesystem/filesystem", {
        filesystems,
        pageTitle: "All filesystems",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getAddFilesSystem = (req, res, next) => {
  res.render("filesystem/Add", {
    pageTitle: "Add Product",
  });
};

const postAddFilesSystem = (req, res, next) => {
  FilesSystem.create({
    Compiled_Date: req.body.Compiled_Date,
    Version: req.body.Version,
    RepositoryURL: req.body.RepositoryURL,
  })
    .then((result) => {
      console.log("Created filesystem");
        res.redirect("/filesystem");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  FilesSystemGet,
  getAddFilesSystem,
  postAddFilesSystem,
};
