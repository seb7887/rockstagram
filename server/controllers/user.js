const bcrypt = require('bcryptjs');

const db = require('../db');
const User = db().User;
const Login = db().Login;

const hashPwd = password => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const generateLogin = async (email, password) => {
  const hashedPassword = hashPwd(password);
  const login = await Login.create({ hash: hashedPassword, email });
  return login;
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    // Hash password and store it in Login model
    const login = generateLogin(email, password);
    // Create a new user
    const user = await User.create({ name, email });
    return next();
  } catch (err) {
    next(err);
  }
};
