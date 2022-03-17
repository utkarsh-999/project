const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    require: true,
    type: String,
  },
  lastName: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
    validate: [validator.isEmail],
  },
  password: {
    require: true,
    type: String,
    select: false,
    minlength: [8],
  },
  phoneNo: {
    require: true,
    type: String,
    minlength: [10],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, `${process.env.JWT_SECRET_KEY}`);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
