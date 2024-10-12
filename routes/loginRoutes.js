const express = require('express');
const router = express.Router();
const loginPilgrimController = require('../controllers/loginPilgrimController');
const loginOrganizerController = require('../controllers/loginOrganizerController');

// Routes for Pilgrim login
router.post('/login/pilgrim', loginPilgrimController.login);

// Routes for Organizer login
router.post('/login/organizer', loginOrganizerController.login);

module.exports = router;

