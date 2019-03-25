const logger = require('../logger');

const logError = err => {
  logger.error(err);
};

const errorHandler = (error, req, res, next) => {
  logError(error);
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'Something went wrong',
    },
  });
};

module.exports = errorHandler;
