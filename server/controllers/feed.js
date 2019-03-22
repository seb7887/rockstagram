const db = require('../db');
const Op = db().Sequelize.Op;
const Photo = db().Photo;
const User = db().User;
const Follow = db().Follow;

/**
 * @name /api/feed
 */
exports.getPostFeed = async (req, res, next) => {
  const followerId = req.user.id;

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
};

exports.getUserFeed = async (req, res, next) => {
  const followerId = req.user.id;

  let following = await Follow.findAll({ where: { followerId } });
  following = following.map(follow => follow.followingId);

  let users;

  if (!following.length) {
    users = await User.findAll({
      where: {
        [Op.not]: {
          id: followerId,
        },
      },
    });
  } else {
    users = await User.findAll({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.not]: followerId,
            },
          },
          {
            id: {
              [Op.not]: following,
            },
          },
        ],
      },
    });
  }

  return res.status(200).json({ users });
};
