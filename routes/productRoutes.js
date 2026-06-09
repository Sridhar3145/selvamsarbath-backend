const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductBySlug
} = require("../controllers/productController");

router.route("/").post(addProduct).get(getProducts);
router.get("/:slug", getProductBySlug);

module.exports = router;
