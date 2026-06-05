const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
} = require("../controllers/productController");

router.route("/").post(addProduct).get(getProducts);

module.exports = router;
