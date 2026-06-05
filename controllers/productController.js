const Item = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    await Item.create({ title, description, price, image });

    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const item = await Item.find();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = { addProduct, getProducts };
