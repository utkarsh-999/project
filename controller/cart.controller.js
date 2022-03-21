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
      res.send("Product added");
    } else {
      const cart = await Cart.create({
        productId,
        userId,
      });
      return res.send("Cart created");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const item = cart.items.findIndex((p) => p.id == productId);
      const product = await Product.findById(productId);
      if (product) {
        cart.totalPrice -= product.price;
      }
      if (item) {
        cart.items.splice(item, 1);
        await cart.save();
      }
      return res.send("Product deleted");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.viewCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    console.log(cart);
    res.json({
      success: true,
      data: cart,
    });
  } catch {
    console.log(err);
  }
};
