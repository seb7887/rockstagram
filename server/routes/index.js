const express = require('express');
const router = express.Router();

/**
 * @name controllers
 */
const userController = require('../controllers/user');

/**
 * @name auth-routes
 */
router.post('/users', userController.signup);

module.exports = router;
