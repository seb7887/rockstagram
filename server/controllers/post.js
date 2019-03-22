const db = require('../db');
const Photo = db().Photo;
const User = db().User;

/**
 * @name /api/posts
 */
exports.createPost = async (req, res, next) => {
  const { imageUrl, caption } = req.body;
  // Get current user id
  const UserId = req.user.id;

  try {
    // Create a new post
    const post = await Photo.create({ imageUrl, caption, UserId });
    return res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

/**
 * @name /api/posts?user=id
 */
exports.getUserPosts = async (req, res, next) => {
  const UserId = req.query.user;

  try {
    const posts = await Photo.findAll({
      where: { UserId: UserId },
      attributes: ['id', 'imageUrl', 'caption', 'UserId', 'createdAt'],
      include: [User],
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

/**
 * @name /api/posts/:id
 */
const findPost = async id => {
  const post = await Photo.findOne({
    where: { id },
    attributes: ['id', 'imageUrl', 'caption', 'UserId', 'createdAt'],
    include: [User],
  });

  return post;
};

exports.getPost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await findPost(id);
    // TODO: comments, etc...

    if (!post) {
      throw new Error('Post not found');
    }

    return res.status(200).json({ post });
  } catch (err) {
    next({ status: 404, message: err.message });
  }
};

/**
 * @name error-notification
 */
const throwError = status => {
  let err;

  if (status === 403) {
    err = new Error('Forbidden');
    err.status = status;
  } else {
    err = new Error('Cannot find post');
    err.status = 400;
  }

  throw err;
};

/**
 * @name check-owner-middleware
 */
exports.checkOwner = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await findPost(id);

    if (!post) {
      throwError(400);
    }

    const isOwner = userId === post.User.id;

    if (!isOwner) {
      throwError(403);
    }

    return next();
  } catch (err) {
    next({ status: err.status, message: err.message });
  }
};

/**
 * @name edit-post
 */
exports.editPost = async (req, res, next) => {
  const { id } = req.params;
  const { caption } = req.body;

  try {
    const updatedPost = await Photo.update(
      {
        caption,
      },
      { where: { id } },
    );

    return res.status(200).json({ message: 'Post updated!' });
  } catch (err) {
    next({ status: err.status, message: err.message });
  }
};

/**
 * @name delete-post
 */
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await Photo.destroy({ where: { id } });

    return res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    next({ status: err.status, message: err.message });
  }
};
