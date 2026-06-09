const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  slug: String,
});


module.exports = mongoose.model("Item", productSchema, "products");
