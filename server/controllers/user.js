exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const error = new Error('Testing Error Handler...');
    error.status = 400;
    throw error;
  } catch (err) {
    next(err);
  }
};
