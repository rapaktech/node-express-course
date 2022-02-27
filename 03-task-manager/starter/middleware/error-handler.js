const { CustomAPIError } = require('../errors/custom-error');
const errorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof CustomAPIError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error });
}

module.exports = errorHandlerMiddleware;