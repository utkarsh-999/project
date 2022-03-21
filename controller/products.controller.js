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

exports.getAll = async (req, res) => {
  const product = await Product.find();
  return res.send({
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

exports.addReview = async (req, res) => {
  const { rating, comment, userId, productId } = req.body;
  try {
    const review = {
      rating,
      comment,
      userId,
    };
    const product = await Product.findById(productId);
    const reviewed = product.reviews.find(
      (i) => i.userId.toString() === userId.toString()
    );
    if (reviewed) {
      res.send("Already Reviewed");
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((i) => {
      avg += i.rating;
    });
    product.avgRating = avg / product.reviews.length;
    await product.save();
  } catch (err) {
    console.log(err);
  }
};
