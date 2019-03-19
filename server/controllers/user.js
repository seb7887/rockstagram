const db = require('../db');
const User = db().User;

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email });
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
