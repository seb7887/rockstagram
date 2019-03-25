const db = require('../db');
const Photo = db().Photo;
const Like = db().Like;

const postExists = async id => {
  const post = await Photo.findOne({ where: { id } });
  return post ? true : false;
};

/**
 * @name /api/like?post=:id
 */
exports.likePost = async (req, res, next) => {
  const UserId = req.user.id;
  const PhotoId = req.query.post;

  try {
    const exists = await postExists(PhotoId);
    if (!exists) {
      throw new Error('Unexistent Post');
    }

    const like = await Like.create({ UserId, PhotoId });

    if (!like) {
      throw new Error('Cannot like post');
    }

    await Photo.increment('likes', { where: { id: PhotoId } });

    return res.status(200).json({ message: 'Like!' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

/**
 * @name /api/like?post=:id
 */
exports.unlikePost = async (req, res, next) => {
  const UserId = req.user.id;
  const PhotoId = req.query.post;

  try {
    const exists = await postExists(PhotoId);
    if (!exists) {
      throw new Error('Unexistent Post');
    }

    const unlike = await Like.destroy({ where: { UserId, PhotoId } });

    if (!unlike) {
      throw new Error('Cannot unlike post');
    }

    await Photo.decrement('likes', { where: { id: PhotoId } });

    return res.status(200).json({ message: 'Unlike!' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
