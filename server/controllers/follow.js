const db = require('../db');
const Follow = db().Follow;

/**
 * @name /api/follow/:followingId
 */
exports.follow = async (req, res, next) => {
  const followerId = req.user.id;
  const { followingId } = req.params;

  try {
    const follow = await Follow.create({ followingId, followerId });
    return res.status(200).json({ follow });
  } catch (err) {
    next(err);
  }
};

/**
 * @name /api/follow/:followingId
 */
exports.unfollow = async (req, res, next) => {
  const followerId = req.user.id;
  const { followingId } = req.params;

  try {
    const unfollow = await Follow.destroy({
      where: { followingId, followerId },
    });
    return res.status(200).json({ unfollow });
  } catch (err) {
    next(err);
  }
};
