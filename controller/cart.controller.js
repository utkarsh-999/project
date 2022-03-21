const Product = require("../models/products.model");
const Cart = require("../models/cart.model");

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const product = await Product.findById(productId);
      const item = {
        productId: productId,
        name: product.name,
        price: product.price,
      };
      cart.items.push(item);
      cart.totalPrice += product.price;
      await cart.save();
      res.json({
        success: true,
      });
    } else {
      const cart = await Cart.create({
        productId,
        userId,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.deleteFromCart = async (req, res) => {
  const { productId, id } = req.body;
  const cart = await Cart.findById(id);
  const item = cart.items.findIndex((p) => p.id == productId);
  const product = await Product.findById(productId);
  if (product) {
    cart.totalPrice -= product.price;
  }
  if (item >= 0) {
    cart.items.splice(item, 1);
  }
};

exports.viewCart = async (req, res) => {
  const { id } = req.body;
  const cart = await Cart.findById(id);
  res.json({
    success: true,
    cart,
  });
};
