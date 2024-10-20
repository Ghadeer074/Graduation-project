const express = require("express");
const router = express.Router();
const controlguide = require("../controllers/controlHajjGuide.js");

// reandring request page (hajjGuide) - get request 
router.get('/', controlguide.Guide);
module.exports = router;


