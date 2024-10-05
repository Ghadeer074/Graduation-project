const express = require("express");
const router = express.Router();
const pilgrimAcc = require("../controllers/control-pilgrimAcc");

router.get('/',pilgrimAcc.signPilGet);
router.post('/signup-pilgrim',pilgrimAcc.signUpPil);

module.exports = router;