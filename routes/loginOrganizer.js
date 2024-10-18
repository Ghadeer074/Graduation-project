const express = require('express');
const router = express.Router();
const loginOrganizerController = require('../controllers/loginOrganizerController');


// Handle GET request for the login page
router.get('/login-organizer', (req, res) => {
    console.log('Rendering login-organizer page');  // Add this log to verify the route is hit
    res.render('login-organizer');
});

// Routes for Organizer login
router.post('/login-organizer', loginOrganizerController.login);

module.exports = router;

