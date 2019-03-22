const db = require('../db');
const Follow = db().Follow;

/**
 * @name /api/follow/:followingId
 */
exports.follow = async (req, res, next) => {
  const followerId = req.user.id;
  const { followingId } = req.params;

  try {
    await Follow.create({ followingId, followerId });
    return res.status(200).json({ message: 'Following' });
  } catch (err) {
    next({ status: 400, message: 'Unexistent User' });
  }
};

/**
 * @name /api/follow/:followingId
 */
exports.unfollow = async (req, res, next) => {
  const followerId = req.user.id;
  const { followingId } = req.params;

  try {
    const unfollowing = await Follow.destroy({
      where: { followingId, followerId },
    });

    if (!unfollowing) {
      throw new Error();
    }

    return res.status(200).json({ message: 'Unfollowing' });
  } catch (err) {
    next({ status: 400, message: 'Unexistent User' });
  }
};
