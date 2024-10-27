const express = require('express');
const router = express.Router();
const homePilController = require('../controllers/control-home-pil');

// Route to display the pilgrim's homepage
router.get('/homePilg', homePilController.homePil);

module.exports = router;
