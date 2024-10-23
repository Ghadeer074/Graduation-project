const express = require('express');
const router = express.Router();
const loginPilgrimController = require('../controllers/loginPilgrimController');

// Handle GET request for the login page
router.get('/login-pilgrim', (req, res) => {
    console.log('Rendering login-pilgrim page'); 
    res.render('login-pilgrim');
});

router.get('/signUp-pilgrim', (req, res) => {
    res.render('signUp-pilgrim'); 
});              

// Handle POST request for login
router.post('/login-pilgrim', loginPilgrimController.login);

// Handle forgot password
router.get('/forgot-password-pilgrim', (req, res) => {
    res.render('forgot-password-pilgrim');  
});

// Verify identity route
router.post('/verify-identity', loginPilgrimController.verifyIdentity);

// Reset password route
router.post('/reset-password', loginPilgrimController.resetPassword);

module.exports = router;




