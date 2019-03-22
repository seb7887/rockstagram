const db = require('../db');
const Op = db().Sequelize.Op;
const Photo = db().Photo;
const User = db().User;
const Follow = db().Follow;

/**
 * @name /api/feed
 */
exports.getFeed = async (req, res, next) => {
  const followerId = req.user.id;

  try {
    let following = await Follow.findAll({ where: { followerId } });
    following = following.map(follow => follow.followingId);

    const posts = await Photo.findAll({
      attributes: ['id', 'imageUrl', 'caption', 'UserId', 'likes', 'createdAt'],
      where: {
        [Op.or]: [
          {
            UserId: followerId,
          },
          { UserId: following },
        ],
      },
      include: [User],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};
