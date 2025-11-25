const httpStatus = require("./http_status");

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4")
      ? httpStatus.fail
      : httpStatus.error;
    this.isOperational = true;
  }
}

module.exports = ApiError;
