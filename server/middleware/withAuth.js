const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

const db = require('../db');
const User = db().User;

const withAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log('TOKEN', token);

    if (!token) {
      throw new Error('Unauthorized');
    }

    const { id } = jwt.verify(token, jwtSecret);
    console.log('id', id);

    const user = await User.findOne({ where: { id } });

    req.user = user;

    // Everything is OK
    return next();
  } catch (err) {
    return next({ status: 401, message: err.message });
  }
};

module.exports = withAuth;
