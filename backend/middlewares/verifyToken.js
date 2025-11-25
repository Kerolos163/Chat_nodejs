const jwt = require("jsonwebtoken");
const AppError = require("../utils/apiError");
const httpStatus = require("../utils/http_status");

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader) {
    const err = new AppError("No token provided", 404, httpStatus.fail);
    return next(err);
  }
  const token = authHeader.split(" ")[1];

  try {
    const CurrentUser = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = CurrentUser;
    next();
  } catch (error) {
    const err = new AppError("Invalid token", 404, httpStatus.fail);
    return next(err);
  }
};

module.exports = VerifyToken;
