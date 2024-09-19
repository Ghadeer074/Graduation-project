const express = require("express");
const router = express.Router();
const control = require("../controllers/controler landing.js");

// reandring request page (landing page) - get request 
router.get('/', control.landing);
module.exports = router;


