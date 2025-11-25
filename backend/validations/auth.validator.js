const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

exports.signupValidation = [
  check("fName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("First name must be at most 50 characters long"),
  check("lName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Last name must be at most 50 characters long"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .custom((value, { req }) => {
      const existingUser = User.findOne({ email: value });
      if (existingUser) {
        throw new ApiError("Email already in use", 400);
      }

      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorMiddleware,
];
