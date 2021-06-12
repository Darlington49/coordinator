const Firmware = require("../models/Firmware");
const ProductTypes = require("../models/ProductTypes");
const Filesystem = require("../models/Filesystem");

const ProductTypesGet = (req, res) => {
  ProductTypes.findAll()
    .then((products) => {
      res.render("productType/productTypes", {
        prods: products,
        pageTitle: "All Products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getAddProduct = (req, res, next) => {
  let firmware = [];
  let filesystem = [];

  Firmware.findAll()
    .then((items) => {
      firmware = items;
      //console.log(firmware);
      Filesystem.findAll()
        .then((items) => {
          filesystem = items;
          // console.log(Filesystem);
          // console.log("dfdfdfdfd", firmware, filesystem);
          res.render("productType/Add", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false,
            firmware,
            filesystem,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  // Filesystem.findAll()
  //   .then((items) => {
  //     filesystem = items;
  //     console.log(Filesystem);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // console.log("dfdfdfdfd", firmware, filesystem);
  // res.render("productType/Add", {
  //   pageTitle: "Add Product",
  //   path: "/admin/add-product",
  //   editing: false,
  //   firmware,
  //   filesystem,
  // });
};

const postAddProduct = (req, res, next) => {
  console.log("postAddProduct");
  console.log(req.body);

  const ProductName = req.body.ProductName;
  ProductTypes.create({
    ProductName: ProductName,
    FilesystemId: req.body.FileSystemID,
    FirmwareId: req.body.firmwareID,
  })
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/ProductTypes");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProducts = (req, res, next) => {
  ProductTypes.findAll()
    .then((products) => {
      console.log(products);
      res.send(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);

  ProductTypes.findAll({
    where: {
      id: prodId,
    },
  })
    .then((product) => {
      console.log(product);
      //res.send(product);
      // create a view
      res.render("productType/productType", {
        pageTitle: "View Product",
        product,
      });

    })
    .catch((err) => console.log(err));
};

//add All functions here
module.exports = {
  ProductTypesGet,
  getAddProduct,
  postAddProduct,
  getProducts,
  getProduct,
};
