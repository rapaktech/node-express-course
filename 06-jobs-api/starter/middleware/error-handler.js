const { CustomAPIError } = require('../errors/index');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (error, req, res, next) => {
  let customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something Went Wrong. Please Try Again Later'
  }

  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error.name === 'Validation Error') {
    customError.message = Object.values(error.errors).map((item) => item.message).join(',');
    customError.statusCode = 400;
  }

  if (error.code && error.code === 11000) {
    customError.message = `Duplicate Value Entered For ${Object.keys(error.keyValue)} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (error.name === 'Cast Error') {
    customError.message = `No Item Found With ID: ${error.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ message: customError.message });
}

module.exports = errorHandlerMiddleware;