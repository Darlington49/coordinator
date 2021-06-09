const ProductTypes = require("../models/ProductTypes");

exports.flash = (req, res, next) => {
    console.log(req.body);
  
  /*  ProductTypes.findById(prodId)
      .then((product) => {
        console.log(product);
        res.send(product.ProductName);
      })
      .catch((err) => console.log(err));*/
      res.send("hi")
  };