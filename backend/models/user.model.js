const mongoose = require("mongoose");
const validator = require("validator");

const mongooseSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [50, "First name must be at most 50 characters long"],
    },
    lName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [50, "Last name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Filed must be a valid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", mongooseSchema, "users");
