const express = require("express");
const User = require("../models/users.model");
const Token = require("../config/jwt");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNo } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNo,
  });
  const token = user.getJWTToken();

  res.json({
    success: true,
    user,
    token,
  });
};
//   Token();
// };

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return Error;
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return Error;
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return Error;
  }
  const token = user.getJWTToken();

  res.json({
    success: true,
    user,
    token,
  });
};

//   Token(user, res);
// };
