const db = require('../db');
const Photo = db().Photo;
const Comment = db().Comment;

const postExists = async id => {
  const post = await Photo.findOne({ where: { id } });
  return post ? true : false;
};

/**
 * @name /api/comments?post=:id
 */
exports.createComment = async (req, res, next) => {
  const UserId = req.user.id;
  const id = req.query.post;
  const { commentText } = req.body;

  try {
    const exists = await postExists(id);

    if (!exists) {
      throw new Error('Unexistent post');
    }

    const comment = await Comment.create({ commentText, UserId, PhotoId: id });

    const post = await Photo.increment('comments', { where: { id } });

    return res.status(200).json({ comment, post: post[0][0][0] });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

/**
 * @name /api/comments/:id
 */
exports.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  const PhotoId = req.query.post;

  try {
    const exists = await postExists(PhotoId);

    if (!exists) {
      throw new Error('Unexistent post');
    }

    const deletedComment = await Comment.destroy({ where: { id } });

    if (!deletedComment) {
      throw new Error('Unexistent comment');
    }

    await Photo.decrement('comments', { where: { id: PhotoId } });

    return res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
