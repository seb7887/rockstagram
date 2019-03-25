const fs = require('fs');
const winston = require('winston');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: 'logs/error.log',
      maxSize: 1048576,
      maxFiles: 7,
      json: true,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: false,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: message => {
    logger.info(message);
  },
};

module.exports = logger;
