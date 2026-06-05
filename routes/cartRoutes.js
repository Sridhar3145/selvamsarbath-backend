const express = require("express");
const router = express.Router();
const {addToCart,updateCart,deleteFromCart,getCart} = require('../controllers/cartController')
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getCart);   
router.post("/add", auth, addToCart);
router.put("/update", auth, updateCart);
router.delete("/delete/:productId", auth, deleteFromCart);

module.exports = router;
