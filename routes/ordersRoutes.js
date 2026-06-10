const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require('../middleware/adminMiddleware');
const {
  placeOrder,
  getOrders,
  updateOrderStatus
} = require("../controllers/ordersController");

router.route("/").post(auth, placeOrder).get(auth, admin, getOrders);
router.patch(
  "/:id/status", auth, admin,
  updateOrderStatus
);

module.exports = router;
