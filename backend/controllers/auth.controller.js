const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateJWT");

exports.signup = asyncHandler(async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const { fName, lName, email, password } = req.body;
  console.log(req.body);
  const newUser = new User({ fName, lName, email, password });
  await newUser.save();
  const token = await generateToken(
    { id: newUser._id, fName, lName, email },
    res
  );
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      fName: newUser.fName,
      lName: newUser.lName,
      email: newUser.email,
      token,
    },
  });
});

exports.login = (req, res) => {
  res.send("User logged in");
};

exports.logout = (req, res) => {
  res.send("User logged out");
};
