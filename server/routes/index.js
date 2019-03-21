const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * @name controllers
 */
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const postController = require('../controllers/post');

/**
 * @name middleware
 */
const validation = require('../middleware/validation');

/**
 * @name auth-routes
 */
router.post('/signin', authController.signin);
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

module.exports = router;
