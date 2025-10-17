const express = require('express');
const router = express.Router();
const rockController = require('../controllers/rockController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', rockController.getRocks);
router.get('/nearby', rockController.getNearbyRocks);
router.get('/:id', rockController.getRockById);

// Protected routes
router.post('/', auth, rockController.createRock);
router.put('/:id', auth, rockController.updateRock);
router.delete('/:id', auth, rockController.deleteRock);
router.post('/:id/like', auth, rockController.likeRock);
router.post('/:id/comment', auth, rockController.addComment);

module.exports = router;
