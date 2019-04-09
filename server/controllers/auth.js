const passport = require('passport');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

const signToken = id => {
  const jwtPayload = { id, expires: 1000 * 60 * 60 * 24 * 31 };
  return jwt.sign(jwtPayload, jwtSecret);
};

const createSession = id => {
  return signToken(id);
};

exports.signin = (req, res, next) => {
  passport.authenticate('login', (err, user) => {
    if (err || !user) {
      return next({ status: 401, message: err.message });
    }

    const token = createSession(user.id);

    res.cookie('token', token, {
      httpOnly: true,
      // 1000ms, 60s, 60min, 24hours, 31days = 1 month
      maxAge: 1000 * 60 * 60 * 24 * 31,
    });
    return res.status(200).json(user);
  })(req, res);
};

exports.signout = (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Goodbye!' });
};
