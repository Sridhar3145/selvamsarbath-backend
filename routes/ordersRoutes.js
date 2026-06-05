const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  placeOrder,
  getOrders,
} = require("../controllers/ordersController");

router.route("/").post(auth,placeOrder).get(auth,getOrders);

module.exports = router;
