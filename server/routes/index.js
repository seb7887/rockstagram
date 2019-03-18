const express = require('express');
const router = express.Router();

/**
 * @name controllers
 */
const userController = require('../controllers/user');

/**
 * @name middleware
 */
const validation = require('../middleware/validation');

/**
 * @name users-routes
 */
router.post('/users', validation.validateRegister, userController.signup);

module.exports = router;
