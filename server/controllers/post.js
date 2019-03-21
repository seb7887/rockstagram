const passport = require('passport');

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
 * @name read-following-posts
 */
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Photo.findAll({
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
const throwError = () => {
  throw new Error('Cannot find post');
};

/**
 * @name check-owner-middleware
 */
exports.checkOwner = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await findPost(id);
    console.log('post', post);

    const isOwner = userId === post.User.id;
    console.log('isOwner', isOwner);

    if (!isOwner) {
      throw new Error('Forbidden');
    }

    return next();
  } catch (err) {
    next({ status: 403, message: err.message });
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

    if (!updatedPhoto[0]) {
      throwError();
    }

    return res.status(200).json({ message: 'Post updated!' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

/**
 * @name delete-post
 */
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await Photo.destroy({ where: { id } });

    if (!deletedPost) {
      throwError();
    }

    return res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
