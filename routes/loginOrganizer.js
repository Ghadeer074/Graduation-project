const express = require('express');
const router = express.Router();
const loginOrganizerController = require('../controllers/loginOrganizerController');

// Routes for Organizer login
router.post('/login-organizer', loginOrganizerController.login);

module.exports = router;

