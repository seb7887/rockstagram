const isTest = process.env.NODE_ENV === 'test';

require('dotenv').config();

const config = {
  port: process.env.PORT || 7777,
  db: isTest ? 'rockstagramdev' : process.env.DB,
  dbUser: isTest ? 'postgres' : process.env.DB_USER,
  dbPwd: isTest ? '' : process.env.DB_PWD,
  jwtSecret: process.env.JWTSECRET || 'jwtsecret',
  sentryDsn: process.env.SENTRY_DSN || '',
};

module.exports = config;
