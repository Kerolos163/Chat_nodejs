const { validationResult } = require("express-validator");
const ApiError = require("../utils/apiError");
const httpStatus = require("../utils/http_status");

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const parsedErrors = errors.array().map((errItem) => ({
      status: errItem.type === "field" ? httpStatus.fail : httpStatus.error,
      message: errItem.msg,
    }));
    return next(new ApiError(parsedErrors[0].message, 400));
  }
  next();
};

module.exports = validatorMiddleware;
