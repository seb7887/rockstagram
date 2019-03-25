const Sentry = require('@sentry/node');
const logger = require('../logger');
const { sentryDsn } = require('../config');

const dev = process.env.NODE_ENV !== 'production';

if (!dev) {
  Sentry.init({
    dsn: sentryDsn,
  });
}

const logError = err => {
  logger.error(err);
};

const reportError = err => {
  Sentry.captureEvent(err);
};

const errorHandler = (error, req, res, next) => {
  logError(error);
  if (!dev) reportError(error);

  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'Something went wrong',
    },
  });
};

module.exports = errorHandler;
