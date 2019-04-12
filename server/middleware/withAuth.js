const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

const db = require('../db');
const User = db().User;

const withAuth = async (req, res, next) => {
  console.log('payload', req.cookies);
  const { token } = req.cookies;

  const { id } = jwt.verify(token, jwtSecret);
  console.log('id', id);
  try {
    const user = await User.findOne({ where: { id } });

    req.user = user;

    // Everything is OK
    return next();
  } catch (err) {
    return next({ status: 401, message: err.message });
  }
};

module.exports = withAuth;
