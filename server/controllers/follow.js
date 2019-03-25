const db = require('../db');
const Follow = db().Follow;
const User = db().User;

const userExists = async id => {
  const user = await User.findOne({ where: { id } });
  return user ? true : false;
};

/**
 * @name /api/follow/:followingId
 */
exports.follow = async (req, res, next) => {
  const followerId = req.user.id;
  const { followingId } = req.params;

  try {
    const exists = await userExists(followingId);
    if (!exists) {
      throw new Error('Unexistent User');
    }

    await Follow.create({ followingId, followerId });
    await User.increment('following', { where: { id: followerId } });
    await User.increment('followers', { where: { id: followingId } });
    return res.status(200).json({ message: 'Following' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

/**
 * @name /api/follow/:followingId
 */
exports.unfollow = async (req, res, next) => {
  const followerId = req.user.id;
  const { followingId } = req.params;

  try {
    const exists = await userExists(followingId);
    if (!exists) {
      throw new Error('Unexistent User');
    }

    const unfollowing = await Follow.destroy({
      where: { followingId, followerId },
    });

    if (!unfollowing) {
      throw new Error();
    }

    await User.decrement('following', { where: { id: followerId } });
    await User.decrement('followers', { where: { id: followingId } });

    return res.status(200).json({ message: 'Unfollowing' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
