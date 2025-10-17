const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', achievementController.getAchievements);
router.get('/:id', achievementController.getAchievementById);

// Protected routes
router.post('/', auth, achievementController.createAchievement);
router.post('/award', auth, achievementController.awardAchievement);
router.get('/user/:userId', achievementController.getUserAchievements);
router.get('/user/me/achievements', auth, achievementController.getUserAchievements);

module.exports = router;
