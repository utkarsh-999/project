const Product = require("../models/products.model");
const Cart = require("../models/cart.model");

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  const cart = await Cart.create({
    productId,
    userId,
  });
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
  // Cart.items.push(item);
  // let data = await Cart.save();
  // if (product) {
  //   Cart.items.push(product);
  //
  //   Cart.totalPrice += product.price;
  //   return this.save();
  // }
};

exports.deleteFromCart = async (req, res) => {
  const { productId } = req.body;
  const item = Cart.items.findIndex((p) => p.id == productId);
  const product = await Product.findById(productId);
  if (product) {
    Cart.totalPrice -= product.price;
  }
  if (item >= 0) {
    Cart.items.splice(item, 1);
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
