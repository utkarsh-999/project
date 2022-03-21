const mongoose = require("mongoose");
const User = require("./users.model");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
  avgRating: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: User,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
