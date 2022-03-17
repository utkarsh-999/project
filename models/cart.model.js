const mongoose = require("mongoose");
const Product = require("./products.model");
const User = require("./users.model");

const cartScehma = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: Product,
        required: true,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: User,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", cartScehma);
