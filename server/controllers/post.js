const passport = require('passport');

const db = require('../db');
const Photo = db().Photo;

/**
 * @name create-post
 */
exports.createPost = async (req, res, next) => {
  const { imageUrl, caption } = req.body;

  try {
    return res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};
