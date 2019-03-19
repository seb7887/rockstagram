const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

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

module.exports = passport;
