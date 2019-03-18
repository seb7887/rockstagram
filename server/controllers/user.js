exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    throw new Error('Testing Error Handler...');
  } catch (err) {
    next(err);
  }
};
