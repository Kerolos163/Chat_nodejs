const jwt = require("jsonwebtoken");
const AppError = require("../utils/apiError");
const httpStatus = require("../utils/http_status");

const VerifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    const err = new AppError("No token provided", 404, httpStatus.fail);
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.currentUser = decoded;
    next();
  } catch (error) {
    const err = new AppError("Invalid token", 401, httpStatus.fail);
    return next(err);
  }
};

module.exports = VerifyToken;
