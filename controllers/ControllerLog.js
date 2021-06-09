const ControllerLog = require("../models/ControllerLog");
const ControllerLogGet = (req, res) => {
  ControllerLog.findAll()

    .then((items) => {
      console.log(items)
      res.render("ControllerLog/ControllerLog", {
        items: items,
        pageTitle: "All items",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  ControllerLogGet,
};