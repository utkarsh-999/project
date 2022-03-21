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
  const { category } = req.params;

  const product = await Product.find({ category });

  return res.json({
    success: true,
    product,
  });
};

exports.getaAll = async (req, res) => {
  const product = await Product.find();

  res.send({
    success: true,
    product,
  });
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    return res.send("Product Deleted");
  } catch (err) {
    console.log(err);
  }
};
