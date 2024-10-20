const express = require("express");
const router = express.Router();
const controlguide = require("../controllers/controlHajjGuide.js");

// This will handle requests to "/hujjGuide"
router.get('/', controlguide.Guide);

module.exports = router;
