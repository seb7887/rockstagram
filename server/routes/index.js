const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * @name controllers
 */
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

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

module.exports = router;
