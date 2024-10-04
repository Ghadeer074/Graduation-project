const express = require("express");
const router = express.Router();
const orgAcc = require("../controllers/control-org");

router.get('/',orgAcc.signOrgGet);
router.post('/signup-organizer', orgAcc.signOrgPost);

module.exports = router;