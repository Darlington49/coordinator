const FlashingRequest = require("../models/FlashingRequest");
const FlashingRequestGet = (req, res) => {
  FlashingRequest.findAll()
    .then((items) => {
      console.log(items)
      res.render("FlashingRequest/FlashingRequest", {
        items: items,
        pageTitle: "All items",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  FlashingRequestGet,
};