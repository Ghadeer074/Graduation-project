const express = require('express');
const router = express.Router();
const loginOrganizerController = require('../controllers/loginOrganizerController');

// Handle GET request for the login page
router.get('/login-organizer', (req, res) => {
    res.render('login-organizer');
});

router.get('/signup-organizer', (req, res) => {
    res.render('signup-organizer');
});

// Routes for Organizer login
router.post('/login-organizer', loginOrganizerController.login);

// Handle forgot password
router.get('/forgot-password-organizer', (req, res) => {
    res.render('forgot-password-organizer');
});

// Verify identity route
router.post('/verify-identity-organizer', loginOrganizerController.verifyIdentity);

// Reset password route
router.post('/reset-password-organizer', loginOrganizerController.resetPassword);

module.exports = router;




