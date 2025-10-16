const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);

// Protected routes
router.get('/profile/me', auth, userController.getProfile);
router.put('/profile/me', auth, userController.updateProfile);

module.exports = router;
