const express = require('express');
const router = express.Router();
const huntController = require('../controllers/huntController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', huntController.getHunts);
router.get('/:id', huntController.getHuntById);

// Protected routes
router.post('/', auth, huntController.createHunt);
router.put('/:id', auth, huntController.updateHunt);
router.delete('/:id', auth, huntController.deleteHunt);
router.post('/:id/join', auth, huntController.joinHunt);
router.post('/:huntId/rocks/:rockId/found', auth, huntController.markRockFound);
router.get('/my/progress', auth, huntController.getMyHunts);

module.exports = router;
