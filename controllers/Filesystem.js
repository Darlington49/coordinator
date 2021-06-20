const FilesSystem = require("../models/Filesystem");
const File = require("../models/file");

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
  
    File.findAll({ attributes: ["id", "name","Actor","RepositoryURL","Version"] })
    .then((files) => {
      console.log(files);
    res.render("Filesystem/Add", {
      pageTitle: "Add Product",
      files:files
    });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error", detail: err });
    });
  };

const postAddFilesSystem = (req, res, next) => {
 // console.log("=====>", req.files);
  FilesSystem.create({
    Compiled_Date: req.body.Compiled_Date,
    Version: req.body.Version,
    RepositoryURL: req.body.RepositoryURL,
    Name: req.body.RepositoryURL,
    Link: req.files[0].path,
    fileId: req.body.fileId,
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
