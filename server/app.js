const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');

const app = express();
const logger = require('./logger');
const routes = require('./routes');
const errorHandler = require('./handlers/error');

require('./handlers/passport');

const dev = process.env.NODE_ENV !== 'production';
const { clientUrl } = require('./config');

/**
 * @name middleware-functions
 */

if (!dev) {
  app.use(compression());
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());

const corstOptions = {
  credentials: true,
  origin: process.env.CLIENT || clientUrl,
};

app.use(cors(corstOptions));
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));

/**
 * @name REST-Routes
 */
app.use('/api', routes);

/**
 * @name error-handling
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
