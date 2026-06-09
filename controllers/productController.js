const Item = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { title, description, price, image, slug } = req.body;
    await Item.create({ title, description, price, image, slug });

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

const getProductBySlug = async (req, res) => {
  try {
    const product = await Item.findOne({
      slug: req.params.slug,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = { addProduct, getProducts, getProductBySlug };
