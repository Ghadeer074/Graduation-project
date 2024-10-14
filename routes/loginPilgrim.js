const express = require('express');
const router = express.Router();
const loginPilgrimController = require('../controllers/loginPilgrimController');

// Handle GET request for the login page
router.get('/login-pilgrim', (req, res) => {
    res.render('login-pilgrim');  // Renders the login page
});

// Handle POST request for login
router.post('/login-pilgrim', loginPilgrimController.login);

module.exports = router;
