const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateJWT");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");

exports.signup = asyncHandler(async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const { fName, lName, email, password } = req.body;

  const newUser = new User({ fName, lName, email, password });
  await newUser.save();
  const token = await generateToken(
    {
      id: newUser._id,
      fName,
      lName,
      email,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
    },
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
      avatar: newUser.avatar,
    },
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const isPasswordCorrect = await bcrypt.compare(
    password,
    req.currentUser.password
  );
  if (!isPasswordCorrect) {
    const err = new ApiError("Invalid email or password", 400);
    return next(err);
  }

  const token = await generateToken(
    {
      id: req.currentUser._id,
      fName: req.currentUser.fName,
      lName: req.currentUser.lName,
      email: req.currentUser.email,
      avatar: req.currentUser.avatar,
      createdAt: req.currentUser.createdAt,
    },
    res
  );

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: req.currentUser._id,
      fName: req.currentUser.fName,
      lName: req.currentUser.lName,
      email: req.currentUser.email,
      token,
      avatar: req.currentUser.avatar,
      createdAt: req.currentUser.createdAt,
    },
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", null, {
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({ message: "User logged out successfully" });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.currentUser.id;
  if (!avatar) {
    const err = new ApiError("Avatar is required", 400);
    return next(err);
  }

  const uploadResult = await cloudinary.uploader.upload(avatar);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: uploadResult.secure_url },
    { new: true }
  );

  return res.status(200).json({
    message: "Profile updated successfully",
    user: {
      id: updatedUser._id,
      fName: updatedUser.fName,
      lName: updatedUser.lName,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      createdAt: updatedUser.createdAt,
    },
  });
});

exports.checkAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.currentUser.id);
  if (!user) {
    const err = new ApiError("User not found", 404);
    return next(err);
  }

  res.status(200).json({
    message: "User authenticated successfully",
    user: {
      id: req.currentUser.id,
      fName: req.currentUser.fName,
      lName: req.currentUser.lName,
      email: req.currentUser.email,
      avatar: user.avatar,
      createdAt: req.currentUser.createdAt,
    },
  });
});
