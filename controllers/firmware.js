const Firmware = require("../models/Firmware");
const firmwareGet = (req, res) => {
  Firmware.findAll()
    .then((firmwares) => {
      console.log(firmwares)
      res.render("firmware/firmware", {
        firmwares,
        pageTitle: "All firmwares",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  firmwareGet,
};
