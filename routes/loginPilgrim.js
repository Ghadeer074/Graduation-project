const express = require('express');
const router = express.Router();
const loginPilgrimController = require('../controllers/loginPilgrimController');

// Handle GET request for the login page
router.get('/login-pilgrim', (req, res) => {
    console.log('Rendering login-pilgrim page');  // Add this log to verify the route is hit
    res.render('login-pilgrim');
});

router.get('/signUp-pilgrim', (req, res) => {
    res.render('signUp-pilgrim'); // تأكد من أن لديك صفحة signUp-pilgrim.ejs
});              
// Handle POST request for login
router.post('/login-pilgrim', loginPilgrimController.login);

module.exports = router;
