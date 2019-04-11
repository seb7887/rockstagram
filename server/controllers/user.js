const bcrypt = require('bcryptjs');

const db = require('../db');
const User = db().User;
const Login = db().Login;

/**
 * @name create-user
 */
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
    // Create a new user
    const user = await User.create({ name, email });
    // Hash password and store it in Login model
    const login = await generateLogin(email, password);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @name read-user
 */
const throwError = () => {
  throw new Error('Cannot find user');
};

const findUser = async id => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throwError();
  }

  return user;
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await findUser(id);

    if (!user) {
      throwError();
    }

    return res.status(200).json({ user });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

/**
 * @name update-user
 */
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, bio, profilePic } = req.body;

  try {
    // Update user model
    const updatedUser = await User.update(
      { name, email, bio, profilePic },
      { where: { id } },
    );

    if (!updatedUser[0]) {
      throwError();
    }

    return res.status(200).json({ message: 'User Updated!' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

/**
 * @name delete-user
 */
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Destroy user model
    const deletedUser = await User.destroy({ where: { id } });

    if (!deletedUser) {
      throwError();
    }

    return res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
