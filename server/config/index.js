const dev = process.env.NODE_ENV !== 'production';

require('dotenv').config();

const config = {
  port: process.env.PORT || 7777,
  db: process.env.DB,
  dbUser: process.env.DB_USER,
  dbPwd: process.env.DB_PWD,
};

module.exports = config;
