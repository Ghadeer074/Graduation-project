const express = require("express");
const router = express.Router();
const pilgrimAcc = require("../controllers/control pilgrimAcc");

router.get('/',signPilGet);
router.post('/signUp pilgrim',pilgrimAcc.signUpPil);

module.exports = router;