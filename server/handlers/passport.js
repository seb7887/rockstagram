const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTCookieComboStrategy = require('passport-jwt-cookiecombo');

const { jwtSecret } = require('../config');

const db = require('../db');
const Login = db().Login;
const User = db().User;

/**
 * @name local-stategy
 */
const localOpts = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use(
  'login',
  new LocalStrategy(localOpts, async (email, password, done) => {
    try {
      // Check if there is a user with that email
      const login = await Login.findOne({ where: { email } });
      if (!login) {
        throw new Error('Invalid Login');
      }

      // Check if the password is correct
      const { hash } = login;
      const isValid = bcrypt.compareSync(password, hash);

      if (!isValid) {
        throw new Error('Invalid Password');
      }

      // Get the authenticated user
      const user = await User.findOne({ where: { email } });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

/**
 * @name jwt-stategy
 */

const jwtOpts = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJWT.fromHeader('Authorization'),
};

passport.use(
  'jwt',
  new JWTStrategy(jwtOpts, async (token, done) => {
    try {
      const user = await User.findOne({ where: { id: token.id } });

      // Check if the token has expired
      if (Date.now() < token.expires) {
        throw new Error('Token expired');
      }

      // Everything is OK
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

/**
 * @name jwt-cookie-strategy
 */
const jwtCookieOpts = {
  secretOrPublicKey: jwtSecret,
};

passport.use(
  'jwt-cookiecombo',
  new JWTCookieComboStrategy(jwtCookieOpts, async (payload, done) => {
    console.log('payload', payload);
    try {
      const user = await User.findOne({ where: { id: payload.id } });

      // Check if the token has expired
      if (Date.now() < payload.expires) {
        throw new Error('Token expired');
      }

      // Everything is OK
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

module.exports = passport;
