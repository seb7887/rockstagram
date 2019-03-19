const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const validator = require('express-validator');

const app = express();
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';

/**
 * @name middleware-functions
 */
const errorHandler = require('./handlers/error');

if (!dev) {
  app.use(compression());
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cors());
app.use(helmet());

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
