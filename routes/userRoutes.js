const express = require('express');
const router = express.Router();

// Import functions correctly from controller
const { registerUser, authUser, changePassword } = require('../controllers/userController');

// Routes
router.post('/register', registerUser);
router.post('/login', authUser);
router.put('/change-password', changePassword);

module.exports = router;