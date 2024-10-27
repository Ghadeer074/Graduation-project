const express = require('express');
const router = express.Router();
const homeOrgController = require('../controllers/control-home-org');  // Import the controller

// Route to render the organizer's homepage
router.get('/homeOrg', homeOrgController.homeOrg);

module.exports = router;
