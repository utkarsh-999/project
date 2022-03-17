const Product = require("../models/products.model");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const product = await Product.create({
      name,
      price,
      category,
      description,
    });
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.byCategory = async (req, res) => {
  const { category } = req.body;

  const product = await Product.find({ category });

  return res.json({
    success: true,
    product,
  });
};
