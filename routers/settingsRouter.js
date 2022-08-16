const express = require('express');
const settingsController = require('../controllers/settingsController');

const router = express.Router();

router.post('/send-settings', settingsController.sendSettings);

router.post('/receive-token', settingsController.addDeviceToken);

router.post('/start-service', settingsController.startService);

module.exports = router;