const httpStatus = require("../utils/http_status");
const ApiError = require("../utils/apiError");

exports.notFoundRoute = (req, res, next) => {
  const err = new ApiError(`Not Found - ${req.originalUrl}`, 404);
  next(err);
};

//? Send detailed error in development mode
const sendErrorForDev = (res, err) =>
  res.status(err.statusCode).json({
    errors: [
      {
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
      },
    ],
  });

//! Send simplified error in production mode
const sendErrorForProd = (res, err) =>
  res.status(err.statusCode).json({
    errors: [
      {
        status: err.status,
        message: err.message,
      },
    ],
  });

exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || httpStatus.error;

  if (process.env.node_env === "development") {
    sendErrorForDev(res, err);
  } else {
    sendErrorForProd(res, err);
  }
};
