const express = require("express");
const router = express.Router();
const homeorg = require("../controllers/control home-org.js");

// reandring request page (home-org page) - get request 
router.get('/', homeorg.homeOrg);
module.exports = router;

