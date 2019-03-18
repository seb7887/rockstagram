const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const app = express();

const dev = process.env.NODE_ENV !== 'production';

/**
 * @name middleware-functions
 */
if (!dev) {
  app.use(compression());
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

/**
 * @name REST-Routes
 */
app.get('/', (req, res) => res.status(200).json('Hello World!'));

module.exports = app;
