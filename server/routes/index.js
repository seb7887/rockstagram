const express = require('express');
const router = express.Router();
const passport = require('passport');
const ExpressBrute = require('express-brute');

/**
 * @name controllers
 */
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');
const likeController = require('../controllers/like');
const followController = require('../controllers/follow');
const feedController = require('../controllers/feed');

/**
 * @name middleware
 */
const validation = require('../middleware/validation');

/**
 * @name brute-force-protection
 */
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

/**
 * @name auth-routes
 */
router.post('/signin', bruteforce.prevent, authController.signin);
router.post('/signout', authController.signout);

/**
 * @name users-routes
 */
router.post(
  '/users',
  validation.validateRegister,
  userController.signup,
  authController.signin,
);

router.get('/users/:id', userController.getUser);
router.put(
  '/users/:id',
  passport.authenticate('jwt', { session: false }),
  validation.validateUpdate,
  userController.updateUser,
);
router.delete(
  '/users/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser,
);

/**
 * @name posts-routes
 */
router.post(
  '/posts',
  passport.authenticate('jwt', { session: false }),
  validation.validatePost,
  postController.createPost,
);
router.get('/posts', postController.getUserPosts);
router.get('/posts/:id', postController.getPost);
router.put(
  '/posts/:id',
  passport.authenticate('jwt', { session: false }),
  validation.validatePostEdit,
  postController.checkOwner,
  postController.editPost,
);
router.delete(
  '/posts/:id',
  passport.authenticate('jwt', { session: false }),
  postController.checkOwner,
  postController.deletePost,
);

/**
 * @name comments-routes
 */
router.post(
  '/comments',
  passport.authenticate('jwt', { session: false }),
  commentController.createComment,
);
router.delete(
  '/comments/:id',
  passport.authenticate('jwt', { session: false }),
  commentController.deleteComment,
);

/**
 * @name like-routes
 */
router.post(
  '/like',
  passport.authenticate('jwt', { session: false }),
  likeController.likePost,
);
router.delete(
  '/like',
  passport.authenticate('jwt', { session: false }),
  likeController.unlikePost,
);

/**
 * @name follow-routes
 */
router.post(
  '/follow/:followingId',
  passport.authenticate('jwt', { session: false }),
  followController.follow,
);
router.delete(
  '/follow/:followingId',
  passport.authenticate('jwt', { session: false }),
  followController.unfollow,
);

/**
 * @name feed-routes
 */
router.get(
  '/feed/posts',
  passport.authenticate('jwt', { session: false }),
  feedController.getPostFeed,
);
router.get(
  '/feed/users',
  passport.authenticate('jwt', { session: false }),
  feedController.getUserFeed,
);

module.exports = router;
