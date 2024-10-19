const express = require("express");
const router = express.Router();
const homepil = require("../controllers/control-home-pil.js");

// reandring request page (home-pil page) - get request 
//router.get('/', homepil.homePil);
router.get('/homePilg', homepil.homePil);
module.exports = router;



