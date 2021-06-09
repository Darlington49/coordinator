const express = require("express");
const ProductTypesController = require('../controllers/ProductTypes');

const router = express.Router();

router.get("/",ProductTypesController.ProductTypesGet);
router.get("/add",ProductTypesController.getAddProduct);
router.post("/add",ProductTypesController.postAddProduct);
router.get("/ProductTypes",ProductTypesController.getProducts);
router.get('/:productId', ProductTypesController.getProduct);
module.exports = router;
